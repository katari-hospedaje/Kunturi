/* ═══════════════════════════════════════════════════════════════════
   KUNTURI HOSTEL — main.js
   Arica, Chile · Andino Contemporáneo
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── 1. LUCIDE ICONS INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  init();
});

/* ─── 2. MAIN INIT ─── */
function init() {
  setupNavbar();
  setupMobileMenu();
  setupScrollReveal();
  setupBackToTop();
  setupForm();
  setupDateDefaults();
  setupGalleryZoom();
  setupSmoothScrollLinks();
  setupActiveNavLinks();
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR — scroll class + shrink effect
   ═══════════════════════════════════════════════════════════════════ */
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ═══════════════════════════════════════════════════════════════════
   MOBILE MENU — hamburger toggle
   ═══════════════════════════════════════════════════════════════════ */
function setupMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => (s.style.cssText = ''));
    }
  });

  // Close on mobile link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL — intersection observer
   ═══════════════════════════════════════════════════════════════════ */
function setupScrollReveal() {
  // Elements to animate
  const selectors = [
    '.room-card',
    '.servicio-item',
    '.testimonio-card',
    '.highlight-item',
    '.valor-item',
    '.gallery-item',
    '.nosotros-content',
    '.nosotros-visual',
    '.ubicacion-content',
    '.ubicacion-map',
    '.contacto-info',
    '.contacto-form',
    '.sernatur-banner',
    '.rooms-note',
    '.address-box',
    '.channel-btn',
    '.info-item',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger children in grids
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════
   BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════════════════════ */
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT FORM — validation + success state
   ═══════════════════════════════════════════════════════════════════ */
function setupForm() {
  const form       = document.getElementById('reservationForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const original = btnText ? btnText.textContent : submitBtn.textContent;
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Enviando…';

    // Simulate async send (replace with real fetch/emailjs/formspree)
    await delay(1600);

    // Success
    form.querySelectorAll('input, select, textarea').forEach(el => (el.value = ''));
    submitBtn.disabled = false;
    if (btnText) btnText.textContent = original;

    if (successMsg) {
      successMsg.classList.add('visible');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => successMsg.classList.remove('visible'), 6000);
    }

    // Re-init icons in case new ones were rendered
    if (typeof lucide !== 'undefined') lucide.createIcons();
  });

  // Real-time validation feedback
  form.querySelectorAll('input[required], select[required]').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) valid = false;
  });

  // Date logic
  const checkin  = form.querySelector('#checkin');
  const checkout = form.querySelector('#checkout');
  if (checkin && checkout && checkin.value && checkout.value) {
    if (new Date(checkout.value) <= new Date(checkin.value)) {
      setError(checkout, 'La salida debe ser posterior a la llegada');
      valid = false;
    }
  }

  return valid;
}

function validateField(field) {
  clearError(field);
  if (!field.value.trim()) {
    setError(field, 'Este campo es requerido');
    return false;
  }
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    setError(field, 'Ingresa un email válido');
    return false;
  }
  return true;
}

function setError(field, msg) {
  field.style.borderColor = '#E85D04';
  field.style.background  = 'rgba(232,93,4,.05)';
  let err = field.parentElement.querySelector('.field-error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText =
      'display:block;font-size:0.75rem;color:#E85D04;margin-top:0.25rem;font-weight:500;';
    field.parentElement.appendChild(err);
  }
  err.textContent = msg;
}

function clearError(field) {
  field.style.borderColor = '';
  field.style.background  = '';
  const err = field.parentElement.querySelector('.field-error');
  if (err) err.remove();
}

/* ═══════════════════════════════════════════════════════════════════
   DATE DEFAULTS — set min dates for check-in / check-out
   ═══════════════════════════════════════════════════════════════════ */
function setupDateDefaults() {
  const checkin  = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (!checkin || !checkout) return;

  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  checkin.min  = formatDate(today);
  checkout.min = formatDate(tomorrow);

  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const next = new Date(checkin.value);
    next.setDate(next.getDate() + 1);
    checkout.min = formatDate(next);
    if (checkout.value && new Date(checkout.value) <= new Date(checkin.value)) {
      checkout.value = formatDate(next);
    }
  });
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY ZOOM — lightbox-style overlay
   ═══════════════════════════════════════════════════════════════════ */
function setupGalleryZoom() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'galleryOverlay';
  overlay.style.cssText = `
    display:none; position:fixed; inset:0; z-index:2000;
    background:rgba(28,28,28,.95); align-items:center; justify-content:center;
    cursor:zoom-out; backdrop-filter:blur(8px);
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    max-width:90vw; max-height:90vh; border-radius:16px; overflow:hidden;
    box-shadow:0 32px 80px rgba(0,0,0,.6); position:relative;
    animation: zoomIn 0.25s cubic-bezier(.4,0,.2,1) both;
  `;

  // Add zoom animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes zoomIn { from { opacity:0; transform:scale(.92); } to { opacity:1; transform:scale(1); } }
    @keyframes zoomOut { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(.92); } }
  `;
  document.head.appendChild(style);

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.style.cssText = `
    position:absolute; top:1rem; right:1rem; z-index:10;
    background:rgba(0,0,0,.5); color:white; border:none; border-radius:50%;
    width:36px; height:36px; font-size:1rem; cursor:pointer; line-height:1;
    display:flex; align-items:center; justify-content:center;
    transition:background .2s;
  `;
  closeBtn.addEventListener('mouseenter', () => (closeBtn.style.background = 'rgba(232,93,4,.8)'));
  closeBtn.addEventListener('mouseleave', () => (closeBtn.style.background = 'rgba(0,0,0,.5)'));

  overlay.appendChild(content);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.style.display = 'none';
    content.innerHTML = '';
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
  closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const placeholder = item.querySelector('.img-placeholder');
      if (!placeholder) return;

      // Clone the placeholder into the overlay as a "zoomed" version
      const clone = placeholder.cloneNode(true);
      clone.style.cssText = `
        width: min(600px, 90vw);
        height: min(450px, 70vh);
        border-radius: 0;
      `;
      // Get label text for caption
      const labelSpan = placeholder.querySelector('.gallery-overlay span, .placeholder-label span');
      const caption   = labelSpan ? labelSpan.textContent : '';

      const wrap = document.createElement('div');
      wrap.style.position = 'relative';
      wrap.appendChild(clone);

      if (caption) {
        const cap = document.createElement('div');
        cap.textContent = caption;
        cap.style.cssText = `
          padding:0.75rem 1.25rem; background:#1C1C1C; color:#F3EAD7;
          font-family:'Quicksand',sans-serif; font-weight:600; font-size:0.9rem;
          text-align:center; letter-spacing:0.03em;
        `;
        wrap.appendChild(cap);
      }

      content.innerHTML = '';
      content.style.animation = 'none';
      content.appendChild(wrap);
      // Retrigger animation
      requestAnimationFrame(() => {
        content.style.animation = 'zoomIn 0.25s cubic-bezier(.4,0,.2,1) both';
      });

      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   SMOOTH SCROLL — for all anchor links
   ═══════════════════════════════════════════════════════════════════ */
function setupSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      const offset = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════
   ACTIVE NAV LINKS — highlight current section while scrolling
   ═══════════════════════════════════════════════════════════════════ */
function setupActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 76;

  const highlight = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top <= navH + 60) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--naranja)';
        link.style.background = 'rgba(232,93,4,.1)';
      } else {
        link.style.color = '';
        link.style.background = '';
      }
    });
  };

  window.addEventListener('scroll', highlight, { passive: true });
  highlight();
}

/* ═══════════════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════════════ */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

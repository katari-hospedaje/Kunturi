# 🦅 Kunturi Hostel — Sitio Web

> Landing page oficial de **Kunturi Hostel**, ubicado en Arica, Chile.  
> Estética **Andino Contemporáneo** · Construido con HTML, CSS y JavaScript puros.

---

## 📁 Estructura del proyecto

```
kunturi/
├── index.html        ← Página principal (toda la estructura semántica)
├── styles.css        ← Estilos completos con variables CSS y diseño responsive
├── main.js           ← Interactividad: navbar, formulario, galería, animaciones
└── README.md         ← Este archivo
```

> **No hay dependencias de build.** Todo corre directamente en el navegador.  
> Las fuentes se cargan desde Google Fonts y los íconos desde Lucide (CDN).

---

## 🎨 Identidad de marca

| Token | Valor | Uso |
|---|---|---|
| `--naranja` | `#E85D04` | Color principal, CTAs, énfasis |
| `--verde` | `#A8C757` | Acento secundario, confirmaciones |
| `--beige` | `#F3EAD7` | Fondo cálido general |
| `--negro` | `#1C1C1C` | Texto principal |
| `--tierra` | `#6B4F3A` | Apoyo, etiquetas, detalles |

**Tipografías:**
- `Quicksand` → Títulos, logo, navegación, botones
- `Work Sans` → Cuerpo de texto, formularios, descripciones

---

## 🗂️ Secciones de la página

| # | Sección | ID | Descripción |
|---|---|---|---|
| 1 | **Navbar** | `#navbar` | Logo, navegación fija, botón CTA |
| 2 | **Hero** | `#inicio` | Tagline, CTA principal, estadísticas |
| 3 | **Banner SERNATUR** | — | Certificación oficial de hospedaje |
| 4 | **Nosotros** | `#nosotros` | Historia, valores, personalidad de marca |
| 5 | **Habitaciones** | `#habitaciones` | 3 tipos de alojamiento con precios |
| 6 | **Servicios** | `#servicios` | 9 servicios con íconos visuales |
| 7 | **Ubicación** | `#ubicacion` | Highlights de Arica + mapa embed |
| 8 | **Galería** | `#galeria` | Grid 6 imágenes + lightbox al click |
| 9 | **Testimonios** | `#testimonios` | 4 reseñas de huéspedes |
| 10 | **Contacto** | `#contacto` | Formulario + canales directos |
| 11 | **Footer** | — | Logo, links, SERNATUR, redes sociales |

---

## ⚙️ Funcionalidades JavaScript (`main.js`)

### Navbar inteligente
- Clase `.scrolled` al pasar 40px de scroll → fondo sólido + sombra
- Oculta/muestra automáticamente el estilo según posición

### Menú móvil
- Hamburger con animación → X al abrir
- Se cierra al hacer click en cualquier link o fuera del menú

### Scroll Reveal
- `IntersectionObserver` detecta elementos al entrar en viewport
- Clase `.reveal` → `.visible` con fade + translateY
- Delays escalonados para grids (`.reveal-delay-1/2/3`)

### Formulario de contacto
- Validación en tiempo real (blur + submit)
- Validación de email con regex
- Validación de fechas (salida > llegada)
- Estado de carga (`Enviando…`) con `disabled`
- Mensaje de éxito animado (se oculta a los 6 segundos)
- **Integración lista para reemplazar** el `await delay()` con `fetch()` real

### Fechas inteligentes
- `min` de check-in = hoy
- `min` de check-out = día siguiente al check-in (actualiza dinámicamente)

### Galería con Lightbox
- Click en cualquier imagen abre overlay oscuro con animación `zoomIn`
- Cierre con click afuera, botón ✕ o tecla `Escape`
- Muestra el nombre de la imagen como caption

### Botón "Volver arriba"
- Aparece al bajar 500px
- Scroll suave al inicio

### Links activos en navbar
- Resalta el link de la sección actualmente visible mientras el usuario hace scroll

---

## 🚀 Cómo usar

### Opción 1 — Abrir directo
```bash
# Simplemente abre index.html en tu navegador
open index.html
```

### Opción 2 — Servidor local (recomendado para el mapa)
```bash
# Con Python 3
python3 -m http.server 3000

# Con Node.js (npx)
npx serve .

# Con VS Code → instala extensión "Live Server" → click derecho → Open with Live Server
```

Luego abre: **http://localhost:3000**

---

## 🔌 Integraciones pendientes (para producción)

### Formulario de contacto
El formulario actualmente simula el envío. Conectar con una de estas opciones:

**Opción A — Formspree (más simple):**
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

**Opción B — EmailJS (sin backend):**
```js
// En main.js, reemplaza `await delay(1600)` por:
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
  name:    form.querySelector('#name').value,
  email:   form.querySelector('#email').value,
  checkin: form.querySelector('#checkin').value,
  // ...
});
```

**Opción C — fetch() a tu propio endpoint:**
```js
const res = await fetch('/api/reservas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form))),
});
```

### Mapa de Google
El mapa embed apunta a Arica de forma genérica. Para mostrar la ubicación exacta:
1. Abre [Google Maps](https://maps.google.com)
2. Busca la dirección exacta del hostel
3. Haz click en **Compartir → Insertar un mapa**
4. Reemplaza el `src` del `<iframe>` en `index.html`

### WhatsApp
Reemplaza `56912345678` con el número real (código de país + número sin espacios):
```
https://wa.me/56XXXXXXXXX
```

### Redes sociales
Actualiza los links en el Footer y sección Contacto:
```
https://instagram.com/TU_USUARIO
https://facebook.com/TU_PAGINA
```

### Google Analytics (opcional)
```html
<!-- Añadir antes de </head> en index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

---

## 🖼️ Reemplazar imágenes placeholder

Las imágenes son gradientes CSS en `styles.css`. Para reemplazarlas con fotos reales:

1. Agrega las imágenes a una carpeta `/img/`
2. En `index.html`, reemplaza el `<div class="img-placeholder ...">` por:
```html
<img src="img/nombre-foto.jpg" alt="Descripción" loading="lazy" />
```
3. Aplica estilos al `<img>`:
```css
img { width: 100%; height: 100%; object-fit: cover; display: block; }
```

**Tamaños recomendados:**
| Imagen | Tamaño ideal |
|---|---|
| Hero background | 1920 × 1080px |
| Habitaciones (cards) | 800 × 450px |
| Galería principal | 1200 × 900px |
| Galería secundarias | 600 × 600px |
| Nosotros | 800 × 600px |

---

## 📱 Responsive

| Breakpoint | Comportamiento |
|---|---|
| `> 1024px` | Layout completo de escritorio |
| `≤ 1024px` | Habitaciones en 2 columnas, footer en 2 col |
| `≤ 900px` | Menú hamburger, columnas a 1, galería 2×2 |
| `≤ 640px` | Todo en 1 columna, hero compacto |
| `≤ 400px` | Servicios y valores en 1 columna |

---

## ♿ Accesibilidad

- HTML semántico (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- `aria-label` en botones icónicos y nav
- `aria-expanded` en el menú hamburger
- `alt` en SVGs con `aria-label`
- `loading="lazy"` en iframe del mapa
- Contraste de color revisado para texto/fondo
- `scroll-padding-top` para que los anchors no queden bajo el navbar fijo

---

## 🧰 Dependencias externas (CDN — sin instalación)

| Librería | Versión | Uso |
|---|---|---|
| [Lucide Icons](https://lucide.dev) | latest | Íconos SVG |
| [Google Fonts — Quicksand](https://fonts.google.com/specimen/Quicksand) | — | Tipografía principal |
| [Google Fonts — Work Sans](https://fonts.google.com/specimen/Work+Sans) | — | Tipografía secundaria |

---

## 📋 Checklist antes de publicar

- [ ] Reemplazar número de WhatsApp real
- [ ] Actualizar links de Instagram y Facebook
- [ ] Reemplazar email `hola@kunturihostel.cl` con el real
- [ ] Conectar formulario (Formspree / EmailJS / propio)
- [ ] Reemplazar iframe del mapa con coordenadas exactas
- [ ] Subir fotos reales en `/img/` y reemplazar placeholders
- [ ] Verificar número de registro SERNATUR y actualizar si aplica
- [ ] Revisar precios de habitaciones
- [ ] Agregar Google Analytics (opcional)
- [ ] Configurar dominio y hosting (Vercel, Netlify, cPanel, etc.)
- [ ] Verificar en móvil real (iOS + Android)
- [ ] Agregar favicon (`/favicon.ico` o `<link rel="icon">`)

---

## 🌐 Deploy rápido (recomendado)

**Netlify** (gratis, drag & drop):
1. Comprime la carpeta `kunturi/` en un `.zip`
2. Ve a [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
3. Arrastra el `.zip` → listo en segundos

**Vercel** (con Git):
```bash
npm i -g vercel
cd kunturi/
vercel
```

---

## 🦅 Créditos

Diseño y desarrollo para **Kunturi Hostel** · Arica, Chile  
Estética: Andino Contemporáneo  
Stack: HTML5 · CSS3 · JavaScript ES2022 (vanilla)  
Sin frameworks · Sin dependencias de build

---

*"La libertad de un hostel con la tranquilidad de sentirte en casa."*

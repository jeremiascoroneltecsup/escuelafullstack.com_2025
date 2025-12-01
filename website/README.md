# Escuela FULLSTACK - Website Moderno Odoo

Sitio web moderno y interactivo para la plataforma de capacitación más grande de Latinoamérica en Odoo.

## 🎨 Características de Diseño

### Paleta de Colores
- **Gradiente Principal**: #481350 (Púrpura oscuro) → #154196 (Azul)
- **Color de Acción**: #dc4837 (Coral/Rojo)
- **Acento Dorado**: #f39c12 (Para destacar elementos)

### Elementos Destacados

#### 🎲 Cubo 3D Interactivo "Plan Completo Odoo"
- Rotación automática 360°
- Control manual con mouse drag
- Pausa al hacer hover
- 6 caras mostrando diferentes módulos de Odoo
- Totalmente responsive y optimizado para móvil
- Controles de navegación incluidos

#### ❓ Sección de Preguntas Frecuentes (FAQ)
- 8 preguntas frecuentes pre-cargadas
- Acordeón interactivo con animaciones suaves
- Diseño limpio y fácil de leer
- Primer item abierto por defecto

#### ✨ Animaciones y Micro-interacciones
- Scroll animations con AOS library
- Parallax effect en hero background
- Counter animations para estadísticas
- Hover effects en todas las cards
- Transiciones suaves en botones y enlaces
- Dots pattern animado en background

## 📁 Estructura del Proyecto

```
website/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos principales con paleta de colores
└── js/
    └── main.js         # JavaScript para interactividad
```

## 🚀 Características Implementadas

### Secciones Principales
1. **Hero Section** - Con cubo 3D interactivo
2. **Rutas de Especialización** - 6 categorías principales
3. **Módulos Plan Completo Odoo** - 20 módulos con iconos
4. **Planes y Precios** - Plan Basic y Plan Expert
5. **Lanzamientos de la Semana** - 4 cursos destacados
6. **Testimonios** - 4 testimonios de alumnos reales
7. **Ruta del Éxito** - 4 beneficios principales
8. **Beneficios** - 4 ventajas competitivas
9. **FAQ** - 8 preguntas frecuentes
10. **Clases en Vivo** - 3 sesiones activas
11. **Footer** - Completo con enlaces y redes sociales

### Funcionalidades JavaScript
- ✅ Navbar con scroll effect y smooth scroll
- ✅ Cubo 3D con rotación automática y control manual
- ✅ FAQ accordion totalmente funcional
- ✅ Animaciones de scroll (AOS)
- ✅ Counter animations para estadísticas
- ✅ Parallax effect en hero
- ✅ Botón flotante "Mentor IA"
- ✅ Sistema de notificaciones
- ✅ Modal para videos (demo)
- ✅ Búsqueda en tiempo real
- ✅ Lazy loading de imágenes
- ✅ Event tracking (preparado para analytics)

### Responsive Design
- 📱 Mobile First approach
- 💻 Optimizado para tablets
- 🖥️ Desktop con aprovechamiento completo del espacio
- 📐 Breakpoints: 480px, 768px, 1024px

## 🎯 Cómo Usar

### 1. Abrir el sitio web
Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python 3
cd website
python -m http.server 8000

# Con Node.js (http-server)
npx http-server website -p 8000

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

### 2. Interactuar con el Cubo 3D
- **Automático**: El cubo rota solo
- **Mouse**: Click y arrastra para rotar manualmente
- **Botones**: Usa los controles debajo del cubo
- **Touch**: En móvil, desliza con el dedo

### 3. Explorar FAQ
- Click en cualquier pregunta para expandir/contraer
- Solo una pregunta abierta a la vez
- Primera pregunta abierta por defecto

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --color-purple-dark: #481350;
    --color-blue-primary: #154196;
    --color-coral: #dc4837;
    /* ... más variables */
}
```

### Modificar Contenido del Cubo
Edita el HTML en `index.html`, sección `.cube-face`:

```html
<div class="cube-face cube-front">
    <!-- Tu contenido aquí -->
</div>
```

### Agregar/Editar FAQ
En `index.html`, sección `.faq-container`:

```html
<div class="faq-item">
    <button class="faq-question">
        <span>Tu pregunta aquí</span>
        <i class="fas fa-chevron-down"></i>
    </button>
    <div class="faq-answer">
        <p>Tu respuesta aquí</p>
    </div>
</div>
```

## 📦 Dependencias Externas

### CDN Incluidos
- **Font Awesome 6.4.0** - Iconos
- **Google Fonts (Inter)** - Tipografía
- **AOS 2.3.1** - Animaciones de scroll

### Opcional
Para desarrollo avanzado, puedes agregar:
- GSAP - Animaciones más complejas
- Three.js - Gráficos 3D avanzados
- Swiper.js - Carruseles

## 🔧 Optimizaciones Implementadas

- ✅ CSS Variables para fácil personalización
- ✅ Lazy loading de imágenes
- ✅ Debounce en eventos de scroll
- ✅ RequestAnimationFrame para animaciones suaves
- ✅ IntersectionObserver para animaciones al scroll
- ✅ CSS Grid y Flexbox para layouts responsive
- ✅ Código modular y comentado
- ✅ Accesibilidad básica (aria-labels, alt texts)

## 🌟 Próximas Mejoras Sugeridas

1. **Backend Integration**
   - Conectar con API de Odoo
   - Sistema de autenticación
   - Dashboard de estudiantes

2. **Características Adicionales**
   - Chatbot IA funcional
   - Sistema de pagos integrado
   - Calendario de clases en vivo
   - Progreso de cursos

3. **SEO y Performance**
   - Meta tags Open Graph
   - Structured Data (JSON-LD)
   - Service Worker para PWA
   - Optimización de imágenes WebP

4. **Analytics**
   - Google Analytics 4
   - Hotjar o similar
   - A/B Testing

## 📝 Notas Importantes

- Las imágenes usan placeholders de Unsplash y Pravatar
- Los videos de demo usan YouTube embeds
- El botón "Mentor IA" muestra un alert (requiere integración)
- Los métodos de pago son visuales (requiere Stripe/PayPal)

## 🆘 Troubleshooting

### El cubo 3D no rota
- Verifica que JavaScript esté habilitado
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de que `main.js` esté cargando correctamente

### Las animaciones no funcionan
- Verifica que AOS CDN esté cargando
- Revisa la conexión a internet
- Prueba en otro navegador

### Responsive no funciona bien
- Limpia el caché del navegador (Ctrl + Shift + R)
- Prueba en modo incógnito
- Verifica los media queries en DevTools

## 👨‍💻 Desarrollo

Desarrollado con:
- HTML5 semántico
- CSS3 moderno (Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla JS, sin frameworks)
- Mobile-first responsive design

## 📄 Licencia

Este proyecto es un diseño de referencia para Escuela FULLSTACK.

---

**¡Listo para producción!** 🚀

Abre `index.html` en tu navegador para ver el sitio web completo.

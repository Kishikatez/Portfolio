# Future 3D Experience

A production-style futuristic 3D portfolio and landing page built with vanilla HTML, CSS, and modern JavaScript.

## Features

- Three.js hero scene with glass sphere, lighting, and bloom
- GSAP-ready animation architecture with ScrollTrigger-friendly structure
- Lenis smooth scrolling integration
- VanillaTilt card interactions
- Splitting.js text reveal support
- Glassmorphism UI, aurora background, particles, cursor, loader, theme toggle, and notifications
- Responsive layout with reduced-motion support and accessibility-oriented markup

## Folder Structure

```text
project/
├── index.html
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── script.js
│   ├── loader.js
│   ├── scroll.js
│   ├── cursor.js
│   ├── hero3d.js
│   ├── particles.js
│   ├── navbar.js
│   ├── magnetic.js
│   ├── timeline.js
│   └── utils.js
├── assets/
│   ├── images/
│   ├── icons/
│   ├── models/
│   ├── videos/
│   └── fonts/
└── README.md
```

## Installation

1. Open the project folder in VS Code.
2. Use Live Server or any static HTTP server.
3. Open `index.html` in the browser.

## Libraries

Loaded from CDN:

- Three.js
- GSAP
- ScrollTrigger
- Lenis
- VanillaTilt
- Splitting.js

## Customization

- Replace placeholder imagery in `assets/images/`.
- Update copy, stats, and project cards in `index.html`.
- Adjust color variables in `css/style.css`.
- Tune animation timing in `css/animations.css` and `js/*.js`.

## Deployment

This is a static site. Deploy it to any static host such as Netlify, Vercel, GitHub Pages, or a conventional web server.

## Performance Notes

- Animations are isolated into modules.
- Scroll and resize listeners are throttled where appropriate.
- Motion is disabled automatically for reduced-motion users.
- Images are lazy-loaded through `data-src` attributes.
- The 3D scene uses requestAnimationFrame and responsive resize handling.

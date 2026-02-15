# Developer Portfolio + APEX Drupal Theme

This repository contains:

1. **Portfolio Website** — A modern, single-page portfolio (`index.html`) showcasing my work as a Full Stack / Theme Developer.
2. **APEX Theme** — A premium multipurpose Drupal business theme with 5 demo variations and eCommerce support.

## 🌐 Live Portfolio

The portfolio is deployed and shareable via GitHub Pages:

**[View Portfolio →](https://YOUR_USERNAME.github.io/apex-theme/)**

> Replace `YOUR_USERNAME` with your actual GitHub username after pushing.

## 📂 Repository Structure

```
/
├── index.html              ← Portfolio website (GitHub Pages entry point)
├── portfolio/index.html    ← Portfolio source copy
├── apex/                   ← APEX Drupal Theme
│   ├── apex.info.yml       ← Theme definition
│   ├── apex.libraries.yml  ← Asset libraries
│   ├── apex.theme          ← PHP hooks & preprocessors
│   ├── config/             ← Schema & default settings
│   ├── css/                ← 30+ stylesheets
│   │   ├── base/           ← Variables, reset, layout, typography
│   │   ├── components/     ← Header, nav, hero, cards, forms, etc.
│   │   ├── demos/          ← 5 demo variation overrides
│   │   ├── commerce/       ← Products, cart, checkout, wishlist
│   │   └── utilities/      ← Dark mode, animations, RTL, print
│   ├── js/                 ← 7 JavaScript modules
│   ├── templates/          ← 20+ Twig templates
│   └── demos/              ← 5 self-contained demo packages
│       ├── corporate/
│       ├── startup/
│       ├── portfolio/
│       ├── medical/
│       └── finance/
└── README.md
```

## 🚀 Deployment Instructions

### GitHub Pages (Portfolio)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch** → `main` → `/ (root)`
4. Your portfolio will be live at `https://YOUR_USERNAME.github.io/apex-theme/`

### APEX Theme (Drupal)

1. Copy the `apex/` folder into your Drupal installation's `themes/custom/` directory
2. Enable the theme via **Appearance** in the Drupal admin or run:
   ```bash
   drush theme:enable apex
   drush config:set system.theme default apex
   ```

## ✨ Portfolio Features

- Dark mode toggle with system preference detection
- Smooth scroll navigation with active link highlighting
- Scroll-reveal animations (IntersectionObserver)
- Glassmorphism header with backdrop blur
- Responsive mobile navigation
- Contact form with validation
- SEO meta tags + Open Graph
- Accessible (focus rings, ARIA labels, reduced motion support)
- Zero dependencies (standalone HTML file)

## 📋 APEX Theme Features

- 5 Demo Variations: Corporate, Startup, Portfolio, Medical, Finance
- Full dark mode with CSS custom properties
- Drupal Commerce integration (products, cart, checkout, wishlist)
- 15+ page templates
- WCAG 2.1 AA accessibility compliance
- RTL language support
- 180+ design tokens
- Mobile-first responsive design
- Print stylesheet
- CKEditor 5 styled content

## 📄 License

All rights reserved. This code is provided for portfolio demonstration purposes.

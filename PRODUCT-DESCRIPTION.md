# APEX — Multipurpose Business Theme for Drupal 10/11

## Tagline

A premium, production-ready Drupal theme with 5 stunning demo variations — built for businesses, startups, portfolios, healthcare, and finance.

---

## Short Description (150 chars)

APEX is a premium Drupal 10/11 theme with 5 demo variations, dark mode, RTL support, eCommerce integration, and 180+ CSS custom properties.

---

## Full Description

### 🚀 One Theme. Five Industries. Unlimited Possibilities.

**APEX** is a meticulously crafted, multipurpose Drupal theme designed for professionals who demand quality. Whether you're building a corporate website, launching a SaaS product, showcasing a creative portfolio, running a medical practice, or managing a financial firm — APEX has you covered.

### ⚡ 5 Ready-to-Use Demo Variations

| Demo             | Industry               | Color Palette     |
| ---------------- | ---------------------- | ----------------- |
| 🏢 **Corporate** | Enterprise / Agency    | Navy + Gold       |
| 🚀 **Startup**   | SaaS / Tech            | Purple + Cyan     |
| 🎨 **Portfolio** | Creative / Design      | Terracotta + Sage |
| 🏥 **Medical**   | Healthcare / Clinic    | Teal + Blue       |
| 💰 **Finance**   | Financial / Consulting | Emerald + Gold    |

Each demo includes unique typography, layout patterns, and visual identity — not just a color swap.

### 🎯 Key Features

- **Drupal 10 & 11 Compatible** — Built with `core_version_requirement: ^10 || ^11`
- **180+ CSS Custom Properties** — Effortless customization without touching source code
- **Dark Mode** — Full dark theme with smooth transition toggle
- **RTL Support** — Complete right-to-left language layout
- **WCAG 2.1 AA Accessible** — Skip links, ARIA labels, focus indicators, reduced-motion support
- **Mobile-First Responsive** — Fluid typography with `clamp()`, responsive grid system
- **Drupal Commerce Integration** — Product listings, cart, checkout, wishlists, account pages
- **Print Stylesheet** — Clean, ink-saving print layout included
- **CKEditor 5 Styled** — WYSIWYG content matches your frontend perfectly
- **IntersectionObserver Animations** — Smooth scroll-triggered reveal effects
- **25+ Regions** — Header, footer, sidebar, content, highlighted, and more

### 📦 What's Included (106 Files)

```
apex/
├── apex.info.yml               — Theme definition
├── apex.libraries.yml          — Asset library declarations
├── apex.theme                  — Preprocess hooks
├── config/                     — Default settings & schema
├── css/ (30+ files)
│   ├── base/                   — Variables, reset, layout, typography
│   ├── components/             — Header, nav, hero, cards, forms, footer
│   ├── demos/                  — 5 industry-specific stylesheets
│   ├── commerce/               — Product, cart, checkout, wishlist
│   └── utilities/              — Dark mode, animations, RTL, print, a11y
├── js/ (7 modules)
│   ├── apex.js                 — Core initialization
│   ├── navigation.js           — Mobile menu & dropdowns
│   ├── dark-mode.js            — Theme toggle with localStorage
│   ├── animations.js           — Scroll-triggered animations
│   ├── commerce.js             — Cart & product interactions
│   ├── quick-view.js           — Product quick-view modal
│   └── widgets.js              — Tabs, accordions, back-to-top
├── templates/ (20+ Twig)
│   ├── layout/                 — html, page, region templates
│   ├── block/                  — Block, branding, local actions
│   ├── components/             — Hero, card, CTA, testimonial, pricing
│   ├── node/                   — Node & teaser templates
│   ├── commerce/               — Product, cart, checkout templates
│   ├── page/                   — Front, about, services, blog, contact, shop
│   └── misc/                   — Breadcrumb, messages, pager
└── demos/ (5 packages)
    └── corporate|startup|portfolio|medical|finance/
        ├── info.yml, config/, templates/, README.md
```

### 🛠️ Technical Highlights

- **Zero JavaScript frameworks** — Vanilla JS with `Drupal.behaviors` pattern
- **No build tools required** — Pure CSS, no Sass/PostCSS compilation needed
- **CSS Grid + Flexbox** — Modern layout with graceful fallbacks
- **Fluid spacing system** — Consistent spacing scale with custom properties
- **Modular architecture** — Each component is independently switchable
- **Semantic HTML5** — Proper heading hierarchy, landmarks, and microdata-ready

### 🎨 Customization

Override any of the 180+ CSS custom properties in the `:root` block to completely transform the theme:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-accent;
  --font-primary: "Your Font", sans-serif;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}
```

### ✅ Requirements

- Drupal 10.x or 11.x
- PHP 8.1+
- No additional modules required (Commerce module optional for eCommerce features)

### 📄 License

Standard commercial license. Use on unlimited personal and client projects.

---

## Tags

Drupal, Drupal Theme, Drupal 10, Drupal 11, Multipurpose, Business, Corporate, Startup, Portfolio, Medical, Finance, Dark Mode, RTL, eCommerce, Responsive, Accessible, WCAG, CSS Custom Properties

## Category

CMS Themes → Drupal

## Compatible With

Drupal 10, Drupal 11, Drupal Commerce

## Live Preview

https://mohamedsharaf45.github.io/apex-theme/demos/

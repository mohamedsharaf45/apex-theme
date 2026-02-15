# Apex Startup Demo

Modern, bold demo for tech startups, SaaS products, and innovation companies.

## Overview

The Startup demo features a vibrant purple-indigo palette with glassmorphism effects, animated gradients, and a modern geometric feel. Perfect for SaaS landing pages, app showcases, and technology companies.

## Color Palette

| Token         | Value     | Usage                        |
| ------------- | --------- | ---------------------------- |
| Primary       | `#7c3aed` | Buttons, gradients, links    |
| Primary Light | `#8b5cf6` | Hover states, glows          |
| Primary Dark  | `#6d28d9` | Active states, dark sections |
| Secondary     | `#0f172a` | Backgrounds, text            |
| Accent (Cyan) | `#06b6d4` | Highlights, badges           |

## Setup Instructions

### 1. Enable the Startup Demo

Go to **Appearance > Apex Settings > Demo** and select **Startup**.

### 2. Import Configuration

```bash
drush config:import --partial --source=themes/apex/demos/startup/config
```

### 3. Recommended Content

- **Homepage**: SaaS-style landing page with features, pricing, and CTA
- **Features**: Detailed feature pages with screenshots
- **Pricing**: Comparison table with monthly/yearly toggle
- **Blog**: Tech blog with code snippets and tutorials
- **About**: Company story and team
- **Contact**: Simple contact form

## Key Design Elements

- **Glassmorphism Cards**: Frosted glass effect using `backdrop-filter`
- **Animated Gradients**: CSS gradient animations on hero and CTA sections
- **Floating Shapes**: Decorative animated shapes in background
- **Device Frames**: Product screenshots in laptop/phone mockups
- **Glow Effects**: Subtle glowing borders and shadows

## Screenshots

Place demo screenshots in the `images/` folder.

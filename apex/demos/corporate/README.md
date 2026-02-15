# Apex Corporate Demo

Professional business demo for corporate enterprises, agencies, and consulting firms.

## Overview

The Corporate demo features a polished, authoritative design with a navy blue and gold accent palette. It's ideal for professional services companies, law firms, financial consultants, and corporate agencies.

## Color Palette

| Token         | Value     | Usage                   |
| ------------- | --------- | ----------------------- |
| Primary       | `#1e40af` | Headers, buttons, links |
| Primary Light | `#3b82f6` | Hover states, accents   |
| Primary Dark  | `#1e3a8a` | Footer, dark sections   |
| Secondary     | `#1e293b` | Text, dark backgrounds  |
| Accent (Gold) | `#d97706` | CTAs, highlights        |

## Setup Instructions

### 1. Enable the Corporate Demo

Go to **Appearance > Apex Settings > Demo** and select **Corporate** from the demo dropdown.

Alternatively, set the body class programmatically:

```php
// In a custom module or settings.php
$config['apex.settings']['demo'] = 'corporate';
```

### 2. Import Configuration

Import the demo-specific block configuration:

```bash
drush config:import --partial --source=themes/apex/demos/corporate/config
```

### 3. Create Content

Use the following content structure for the best results:

- **Front Page**: Set a node or view as the front page
- **About Page**: Create a Basic Page at `/about`
- **Services**: Create service nodes or use Views
- **Team**: Create team member nodes
- **Portfolio/Case Studies**: Create portfolio content type
- **Blog**: Standard Article content type

### 4. Block Placement

Place the following blocks in the appropriate regions:

| Block          | Region         |
| -------------- | -------------- |
| Hero Banner    | Hero           |
| Services Grid  | Content Top    |
| About Section  | Content        |
| Team Carousel  | Content        |
| Testimonials   | Content Bottom |
| Client Logos   | Content Bottom |
| Newsletter CTA | Footer Top     |

## Demo Pages

- **Homepage** — Hero + services + about + stats + testimonials + CTA
- **About Us** — Company story, mission, values, team
- **Services** — Service grid with detail pages
- **Portfolio** — Filterable project showcase
- **Blog** — News and insights
- **Contact** — Contact form with office locations

## Customization

Override corporate-specific styles by creating a CSS file and adding it after the demo library:

```yaml
# mytheme.libraries.yml
corporate-overrides:
  css:
    theme:
      css/corporate-overrides.css: {}
  dependencies:
    - apex/demo-corporate
```

## Screenshots

Place demo screenshots in the `images/` folder for preview purposes.

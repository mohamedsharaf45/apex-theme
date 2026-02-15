# Apex Finance Demo

An elegant, authoritative demo for financial advisors, law firms, and consulting firms.

## Overview

The Finance demo features a refined deep green and gold palette with sophisticated typography. Designed for wealth management firms, accounting practices, law firms, insurance agencies, and financial consultants.

## Color Palette

| Token         | Value     | Usage                          |
| ------------- | --------- | ------------------------------ |
| Primary       | `#065f46` | Headers, buttons, links        |
| Primary Light | `#059669` | Hover states, highlights       |
| Primary Dark  | `#064e3b` | Footer, dark sections          |
| Secondary     | `#1c1917` | Text, backgrounds              |
| Accent (Gold) | `#b45309` | CTAs, trust badges, highlights |

## Setup Instructions

### 1. Enable the Finance Demo

Go to **Appearance > Apex Settings > Demo** and select **Finance**.

### 2. Import Configuration

```bash
drush config:import --partial --source=themes/apex/demos/finance/config
```

### 3. Recommended Content Types

- **Service**: Title, icon, description, detailed page
- **Team Member / Advisor**: Name, photo, title, credentials, bio, specializations
- **Case Study**: Title, client industry, challenge, solution, results
- **Testimonial**: Quote, client name, company, rating
- **Blog**: Financial insights, market updates, compliance news

### 4. Key Pages

| Page              | Path            | Description                          |
| ----------------- | --------------- | ------------------------------------ |
| Homepage          | `/`             | Hero + services + trust + CTA        |
| Services          | `/services`     | Wealth management, tax, etc.         |
| About / Our Firm  | `/about`        | Firm history, values, certifications |
| Team / Advisors   | `/team`         | Advisor profiles with credentials    |
| Case Studies      | `/case-studies` | Client success stories               |
| Resources         | `/resources`    | Articles, guides, tools              |
| Contact / Consult | `/contact`      | Consultation request form            |

## Key Design Elements

- **Refined Typography**: Elegant heading styles with generous letter-spacing
- **Gold Accents**: Subtle gold highlights for trust and premium feel
- **Trust Badges**: Certification and compliance indicators
- **Dark Sections**: Charcoal backgrounds for authority and contrast
- **Subtle Animations**: Restrained fade-in effects—nothing flashy
- **Professional Cards**: Team and service cards with hover lift effects

## Screenshots

Place demo screenshots in the `images/` folder.

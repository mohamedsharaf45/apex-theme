# Apex Portfolio Demo

A visually rich, editorial demo for designers, photographers, and creative agencies.

## Overview

The Portfolio demo features a warm, artistic palette with terracotta and sage tones, editorial typography using Playfair Display, and masonry layouts. Ideal for showcasing creative work, photography, and design projects.

## Color Palette

| Token         | Value     | Usage                   |
| ------------- | --------- | ----------------------- |
| Primary       | `#b45309` | Accents, links, buttons |
| Primary Light | `#d97706` | Hover states            |
| Primary Dark  | `#92400e` | Active states           |
| Secondary     | `#292524` | Text, backgrounds       |
| Accent (Sage) | `#059669` | Tags, highlights        |

## Setup Instructions

### 1. Enable the Portfolio Demo

Go to **Appearance > Apex Settings > Demo** and select **Portfolio**.

### 2. Import Configuration

```bash
drush config:import --partial --source=themes/apex/demos/portfolio/config
```

### 3. Recommended Content Types

- **Portfolio Item**: Title, images (gallery field), category, client, description
- **Case Study**: Title, hero image, challenge, solution, results, gallery
- **Blog Post**: Standard Article content type with featured image

### 4. Portfolio Grid

The portfolio grid supports filtering by category using `data-apex-filter-grid` attributes. Add taxonomy terms for project categories.

## Key Design Elements

- **Editorial Typography**: Playfair Display for headings, generous whitespace
- **Masonry Grid**: CSS columns-based masonry for portfolio items
- **Parallax Hero**: Full-screen heroes with scroll parallax effect
- **Lightbox Gallery**: Click-to-zoom image viewing
- **Hover Reveal**: Caption overlay on hover for portfolio tiles
- **Asymmetric Layouts**: Creative grid layouts with varied column widths

## Screenshots

Place demo screenshots in the `images/` folder.

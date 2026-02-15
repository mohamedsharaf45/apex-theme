# Apex Medical Demo

A clean, trustworthy demo for clinics, hospitals, and healthcare providers.

## Overview

The Medical demo features a calming teal and blue palette with clean layouts focused on trust, accessibility, and easy navigation. Designed for hospitals, clinics, dental practices, veterinary offices, and health-related services.

## Color Palette

| Token         | Value     | Usage                    |
| ------------- | --------- | ------------------------ |
| Primary       | `#0d9488` | Headers, buttons, links  |
| Primary Light | `#14b8a6` | Hover states, highlights |
| Primary Dark  | `#0f766e` | Footer, dark sections    |
| Secondary     | `#1e293b` | Text, backgrounds        |
| Accent (Blue) | `#2563eb` | Badges, info elements    |

## Setup Instructions

### 1. Enable the Medical Demo

Go to **Appearance > Apex Settings > Demo** and select **Medical**.

### 2. Import Configuration

```bash
drush config:import --partial --source=themes/apex/demos/medical/config
```

### 3. Recommended Content Types

- **Department**: Title, icon, description, doctor references
- **Doctor/Staff**: Name, photo, specialization, credentials, bio, schedule
- **Service**: Title, description, icon, pricing (optional)
- **Testimonial**: Quote, patient name (anonymized), rating
- **Blog/Health Tip**: Standard Article content type

### 4. Key Pages

| Page         | Path           | Description                        |
| ------------ | -------------- | ---------------------------------- |
| Homepage     | `/`            | Hero + departments + doctors + CTA |
| Departments  | `/departments` | All departments grid               |
| Doctors      | `/doctors`     | Staff profiles directory           |
| Appointments | `/appointment` | Booking form                       |
| About        | `/about`       | Hospital story, mission, values    |
| Contact      | `/contact`     | Locations, phone, map              |
| Blog         | `/blog`        | Health tips and news               |

## Accessibility Notes

The Medical demo prioritizes WCAG 2.1 AA compliance:

- High contrast ratios for all text
- Clear focus indicators
- Keyboard-navigable menus and forms
- Screen reader-friendly content structure
- Skip navigation links

## Screenshots

Place demo screenshots in the `images/` folder.

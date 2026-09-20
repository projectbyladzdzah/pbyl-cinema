# PBYL Cinema

> **Cinematic Photography Portfolio & Visual Exhibition**  
> An edge-to-edge, bespoke vertical reel designed for photographers and visual storytellers.

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-222?style=for-the-badge&logo=github)](https://projectbyladzdzah.github.io/pbyl-cinema/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla_HTML%2FCSS%2FESM-orange?style=for-the-badge)](https://developer.mozilla.org/)

---

## Overview

**PBYL Cinema** is an immersive, full-screen digital photography exhibition. Built without bulky frameworks, it combines analog film aesthetics with fluid physics-based interactions:

- **100% Full-Bleed Layout**: Every frame fills the entire viewport (`100vw × 100dvh`) without restrictive borders, card margins, or artificial gutters.
- **Inertial Spring-Snap Engine**: Vertical scrolling driven by custom RAF friction physics and GSAP interpolation for smooth plate transitions.
- **Editorial Typography Overlay**: Minimalist lower-third metadata displaying frame index, album collection, artist attribution, shot narrative, and analog camera specs.
- **Zen View Mode**: Instant toggle for distraction-free, 100% raw photo viewing with zero UI chrome.
- **Dual-Layer Portrait Support**: Adaptive portrait orientation handling using ambient optical background diffusion and high-fidelity vertical framing.
- **Protected Admin Studio**: A discreet, client-side curator workspace guarded by password authentication (`Shift + A`).

---

## Features

### 🎞️ Cinema Reel Experience
- **Infinite Looping Reel**: Seamless cyclical slide indexing with wrap-around coordinates.
- **Analog Parallax & Motion Blur**: Subtle vertical parallax offset and dynamic SVG velocity blur during swift scroll sweeps.
- **Multi-Album Filtering**: Dedicated album dropdown selector allowing seamless filtering by thematic photo series.
- **Aspect Ratio Console**: Switchable viewport masking (Scope `2.39:1`, European `1.66:1`, Medium Format `4:5`, and Square `1:1`).

### 🧘 Zen Mode
Press <kbd>Space</kbd> or click **Zen View** (`👁`) at the bottom right to fade out all navigation bars, indicators, and text overlays, immersing the viewer entirely in the photographic composition.

### 🔒 Secret Admin Studio
The administration interface is hidden from public view to preserve the gallery aesthetic:
- **Triggers**: Double-click the **PBYL CINEMA** logo, press <kbd>Shift</kbd> + <kbd>A</kbd>, or navigate to `#admin`.
- **Capabilities**: Create thematic albums, manage photo metadata (titles, narratives, camera specs, film stock), upload custom files (converted locally to data URIs), and change access credentials.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Space</kbd> or <kbd>Z</kbd> | Toggle **Zen View** (hide/show all UI overlays) |
| <kbd>↓</kbd> / <kbd>Page Down</kbd> | Advance to next photograph |
| <kbd>↑</kbd> / <kbd>Page Up</kbd> | Return to previous photograph |
| <kbd>Shift</kbd> + <kbd>A</kbd> | Open **Admin Login Gate** |
| <kbd>Esc</kbd> | Exit Zen View / Close active modal |

---

## Architecture & File Structure

```
pbyl-cinema/
├── .nojekyll                 # Bypasses Jekyll processing on GitHub Pages
├── index.html                # Single-page application shell and admin dialogs
├── css/
│   └── cinema.css            # Complete design system, typography, and layout rules
├── js/
│   ├── cinema-reel.js        # Reel render pipeline, RAF loop, inertia, and gestures
│   └── portfolio-manager.js  # Curated data store, album hierarchy, and localStorage API
└── README.md
```

### Technology Stack
- **Core**: Semantic HTML5, Vanilla JavaScript (ES Modules).
- **Styling**: Vanilla CSS (Custom properties, CSS Grid, Flexbox, backdrop-filter blur).
- **Animation**: [GSAP 3](https://greensock.com/gsap/) for smooth entrance sequencing and velocity tweening.
- **Storage**: Browser `localStorage` for offline edits and immediate client-side persistence.
- **Hosting Target**: GitHub Pages (Static, zero backend configuration required).

---

## Getting Started

### Local Development

No installation or build steps are required. Serve the root directory using any local static HTTP server:

Using Python 3:
```bash
python -m http.server 8080
```

Using Node.js (`npx serve`):
```bash
npx serve .
```

Open your browser at `http://localhost:8080/`.

---

## Deploying to GitHub Pages

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "docs: add professional README"
   git push -u origin main
   ```
2. In your repository on GitHub, open **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and `/ (root)`.
   - Click **Save**.
4. Your portfolio will be live at:
   `https://projectbyladzdzah.github.io/pbyl-cinema/`

---

## Adding New Photographs

Photographs can be added in two ways:

1. **Via Admin Studio (In-Browser)**:
   - Double-click the logo or press <kbd>Shift</kbd> + <kbd>A</kbd>.
   - Enter your password to access the studio.
   - Upload images from your computer or paste remote image URLs.
2. **Via Code (Permanent for all visitors)**:
   - Open [`js/portfolio-manager.js`](./js/portfolio-manager.js).
   - Add new slide objects to `DEFAULT_SLIDES` with your image URL, title, album, and camera details.
   - Commit and push to GitHub:
     ```bash
     git add .
     git commit -m "feat: add new series photos"
     git push
     ```

---

## License

Distributed under the [MIT License](LICENSE).

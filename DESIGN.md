# DESIGN.md — Creative Direction: Photography Portfolio

This document sets the creative direction and visual identity for **PBYL Cinema Photography Portfolio**. It is the primary reference that prevents generic AI slop and sterile voids (satisfying antislop rule R-37).

---

## 1. Brand Identity & Personality

- **Identity**: Editorial & Fine Art Photography Studio.
- **Tone & Mood**: Archival, understated, poetic, contemplative, cinematic.
- **Purpose**: Present photographic works with museum-grade care and breathing room. The interface serves as a discreet frame, letting photography command 100% of the emotional weight.
- **Anti-Slop Vow**: No floating purple glowing orbs, no generic "Unlock your vision" headers, no fake counters or star ratings, no emoji-ridden bullets.

---

## 2. Color Palette (R-29: 2-3 Core + 1 Accent)

- **Base Canvas (Dark Room Mode)**: `#0c0d0f` (Ebonized Charcoal — deep neutral black, not blueish)
- **Secondary Surface**: `#16181b` (Soft Carbon card/overlay surface)
- **Primary Text**: `#f3f2ee` (Warm Archival Bone / Paper Off-White, high contrast WCAG AA > 14:1)
- **Muted Text / Metadata**: `#9b9ca1` (Silver Gray for focal length, aperture, location — contrast ratio > 4.8:1)
- **Deliberate Accent (Singular)**: `#d8a47f` (Warm Amber/Sepia Tone — reserved exclusively for active tags, subtle hover indicators, and focal accents)

*(Light Mode equivalent supported via CSS variables: Canvas `#f8f7f4`, Surface `#efede8`, Text `#17181c`, Muted `#6b6c72`, Accent `#9b623d`)*

---

## 3. Typography Hierarchy

- **Display & Headlines**: An editorial, high-contrast serif (e.g. *Playfair Display* or *Newsreader* / *Cormorant Garamond* via Google Fonts).
- **Body & Captions / Technical Specs**: A refined, highly legible grotesque sans (e.g. *Geist*, *Inter*, or *Outfit*).
- **Metadata**: Monospace / tabular numbers for camera EXIF data (ISO, shutter speed, lens).
- **Rules**:
  - No default system generic fonts.
  - Strict line-height (`1.2` for titles, `1.6` for narrative text).
  - Letter-spacing: delicate tracking on uppercase category labels (`letter-spacing: 0.12em`).

---

## 4. Liveliness Dials

- **ENERGY: 2 / 5 (Restrained & Elegant)**:
  - Generous whitespace, deliberate stillness, museum-like contemplation.
- **RHYTHM: 3 / 5 (Editorial Asymmetry)**:
  - Alternating single full-bleed hero images, staggered diptychs, and tight curations.
  - Avoid repetitive 3x3 uniform grid cards.
- **MOTION: 2 / 5 (Subtle & Purposeful)**:
  - Smooth opacity cross-fades (250–350ms, ease-out).
  - Subtle hover zoom on photo frames (`scale(1.015)` max).
  - No bouncing elements, marquee scrollers, or spinning loaders.

---

## 5. Photography Layout & Components

1. **The Hero Exhibition**:
   - A full-bleed or wide-aspect signature photograph with minimal overlaid title, photographer credit, and location.
2. **Curated Collections / Series**:
   - Series groupings (e.g., *Shadows of the City*, *Solitude & Silence*, *Editorial Portraits*).
   - Diptych and triptych pairings that tell a story.
3. **Photo Lightbox / Detail View**:
   - Minimalist full-screen viewer with EXIF metadata (camera, focal length, aperture, year).
   - Clean keyboard navigation (Esc to close, Left/Right arrows to navigate).
4. **Photographer Bio / Statement**:
   - Genuine personal narrative on technique, philosophy, and artistic inquiry.
   - Contact form or direct inquiry link (email, Instagram, WhatsApp) with clean states.

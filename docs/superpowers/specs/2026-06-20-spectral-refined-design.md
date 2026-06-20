# Spectral, refined — portfolio polish pass

Date: 2026-06-20

## Goal

Refine the existing "Spectral" portfolio per the owner's review. Keep the violet→crimson
spectral aesthetic and the two animations the owner likes (cursor "sensor" lens, scan line),
but remove company-sensitive labels, make the background coherent instead of "messy," fix the
flat-black background below the hero, and add tasteful scroll-driven life.

## Decisions (from brainstorming)

- Keep the spectral *look*; strip literal labels. `IRODORI` / `18-band` / exact nm may appear
  **only** in the ANSWER-Lite experience bullet. Nowhere else.
- Brand: `rp` + accent dot + `singh`. Remove the `410–940nm` nav band tag.
- Hero readout strip: keep the animated bars; genericize ticks + caption (no nm, no band count).
- Background: one fixed full-page shader field; dims as you scroll. Plus richer scroll reveals.

## Changes

### 1. Labels (de-company)
- `Nav.tsx`: brand markup → `rp` + `.` accent + `singh`; delete `nav__band` span.
- `Hero.tsx`: spectro `__ticks` → abstract markers (no nm); `__cap` → non-scientific copy,
  drop "18 bands".
- `globals.css`: soften identity comments referencing 18 bands / 410–940nm.
- Leave the ANSWER-Lite / IRODORI experience bullet in `page.tsx` unchanged.

### 2. Coherent shader (`SpectralCanvas.tsx`)
- Re-author the fragment shader: color driven primarily by vertical position (spectrum reads as
  layered strata) displaced by slow directional flow noise → calm flowing light, not splotches.
- Lower contrast, slower motion. Keep cursor lens + subtle scan line.

### 3. Persistent field + scroll life
- Promote the canvas to a single fixed full-page background (z-index 0) rendered once at page
  root, behind a relative content layer. Remove the hero-local instance.
- Add `uScroll` uniform fed by scroll progress; field advances + global intensity falls off below
  the hero. CSS veil keeps section text readable.
- Section panels already have solid-ish backgrounds; ensure body lets the field show in gutters
  without hurting contrast.
- Upgrade `Reveal.tsx` easing/stagger; add sequential timeline reveal, staggered capture cards,
  kicker line draw-in, and a light scrubbed hero-content fade on scroll. All respect
  `prefers-reduced-motion`.

### 4. Finishing touches
- Brand + readout restyle, hover/focus consistency, section rhythm. No new sections or content
  rewrites beyond labels.

## Out of scope
New sections, content rewrites, neutral/non-spectral redesign.

## Verification
- `next build` passes; no TS/lint errors.
- Manual: hero animates; scrolling never shows flat black; labels gone except the allowed bullet;
  reduced-motion disables motion.

# Rudra Pratap Singh — Portfolio ("Spectral")

A Next.js portfolio built around one idea: **light and wavelength**, grounded in the
hyperspectral work (the IRODORI 18-band camera, 410–940nm). Color, motion, and structure
all derive from the spectrum.

## Concept
- **Palette:** deep cold-ink base with a disciplined duotone from real wavelengths,
  spectral violet (~410nm) to near-infrared crimson (~940nm).
- **Hero:** a live WebGL spectral field (GLSL shader) with a sweeping scan line, and a
  cursor that acts as a **sensor** — moving it pushes the field toward the infrared and
  brightens it.
- **Wavelength rail:** the top progress bar maps scroll position to 410→940nm, so the page
  *is* a spectrum you move through.
- **Spectrometer:** an animated 410–940nm analyzer strip in the hero.
- **About photo:** duotone-graded, shifts to "infrared" on hover.
- Tabular-mono numerals throughout (a nod to competitive programming).

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- `@react-three/fiber` + `three` for the WebGL shader
- `framer-motion` for reveals, `lenis` for weighted smooth scroll
- Custom CSS design system in `src/app/globals.css` (Tailwind v4 is available but the
  bespoke look is hand-written CSS)

Fully responsive, keyboard-accessible, and honours `prefers-reduced-motion` (the shader
freezes, reveals and smooth-scroll disable).

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy
```bash
npm run build && npm start
```
Deploys to **Vercel** with zero config (import the repo, or run `vercel`).

## Editing content
- **Hero / sections:** `src/app/page.tsx` (about, experience, stack, contact are inline here).
- **Projects:** `src/components/Projects.tsx` — the `PROJECTS` array. Update each `link` to
  the real repo when ready (they currently point at the GitHub profile).
- **Stats:** `src/components/Stats.tsx`.
- **Hero + spectrometer:** `src/components/Hero.tsx`.
- **Shader:** `src/components/SpectralCanvas.tsx` (GLSL in the `fragment` string).
- **Photo:** replace the `.about__photo-ph` block in `page.tsx` with
  `<img src="/assets/rudra.jpg" alt="Rudra Pratap Singh" />`. The duotone + IR-hover are
  applied by CSS automatically. Put the image in `public/assets/`.
- **Résumé:** `public/assets/Rudra_Pratap_Singh_Resume.pdf`.

## Notes
- The previous zero-dependency static version is archived at `../portfolio-static-v1`.

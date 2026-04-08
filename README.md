# Vishwas Tiwari — Portfolio

Personal portfolio site for **Vishwas Tiwari** (AI enthusiast & developer). Dark, cyan-accent **“Cyber‑Neural”** UI inspired by a Google Stitch design pass: glass-style surfaces, Space Grotesk / Inter / Manrope typography, and a shared **neural canvas** graphic between the landing intro and hero.

## Features

- **Landing intro** — Full-screen sequence on `/`: scattered nodes → letter-by-letter name reveal → nodes converge into the same graph used in the hero (SVG + Framer Motion; no video). **Skip** is available. Hero content stays hidden until the intro hands off.
- **Hero** — Two-column layout with résumé CTAs, social links, and the neural canvas inside a glass card.
- **Sections** — About, skills, experience, education, project highlights (bento-style grid + link to full portfolio), contact (mailto + WhatsApp), footer.
- **Portfolio route** — `/portfolio` for an extended project gallery.
- **Responsive** — Mobile-friendly header and layouts.

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- [React Router](https://reactrouter.com/) · [TanStack Query](https://tanstack.com/query) · [Framer Motion](https://www.framer.com/motion/)
- ESLint

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

```bash
npm run build    # production build → dist/
npm run preview  # serve dist locally
```

## Project notes

- **Résumé PDF** — Expected at `public/Vishwas_Tiwari_Resume.pdf` (download button in hero/header).
- **Profile image** — About section may reference `public/` assets; replace placeholders as needed.
- **Intro timing** — Controlled in `src/components/SiteIntro.tsx`. Shared graph data lives in `src/lib/neuralCanvasLayout.ts` (used by `IntroNeuralStage` and `NeuralOrb`).

## Scripts

| Command        | Description           |
| -------------- | --------------------- |
| `npm run dev`  | Start dev server      |
| `npm run build`| Production build      |
| `npm run preview` | Preview production |
| `npm run lint` | Run ESLint            |

---

© Vishwas Tiwari. All rights reserved.

# Null Field Research — Website

The public website of Null Field Research: exact arbitrary-precision arithmetic (**PFN**)
and certified onboard AI inference (**Project DEOX**) for intelligence, defence, and space.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/pfn` | PFN — exact arithmetic architecture, benchmarks & charts |
| `/deox` | Project DEOX — certified compute execution in orbit |
| `/writing` | Writing index |
| `/writing/the-vertical-lie` | Essay (light editorial layout) |
| `/writing/the-dual-bubble-hypothesis` | Essay with interactive 3D scene (light editorial layout) |
| `/contact` | Contact |

The two long-form essays intentionally render as light "paper" documents inside the dark
shell; the `.editorial` scope in `index.css` re-grounds the design tokens for them.

## Tech stack

- **React 19** + **TypeScript**, routed with `react-router-dom` (HashRouter)
- **Vite 7** build; route-level code splitting (`React.lazy`) — three.js and recharts load
  only on the routes that use them
- **Tailwind CSS 3** compiled via PostCSS (`tailwind.config.js`, `index.css`)
- **framer-motion** for entrance animation, **recharts** for benchmark charts,
  **three.js** for the Dual Bubble scene
- All imagery is served locally from `public/assets/` — no external image dependencies at runtime.
  Photography sourced under the Unsplash License (free commercial use); the Earth and nebula
  photographs are NASA imagery (public domain) distributed via Unsplash

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # tsc --noEmit && vite build → dist/
npm run preview
```

## Content conventions

- Benchmark figures trace to `BENCHMARK_REPORT.md` (PFN 0.1.0 vs GMP 6.3.0, Feb 2026).
- DEOX claims carry explicit status labels — `[ ours · simulation · pre-silicon ]` — at
  every occurrence; simulation numbers are never presented as silicon numbers.
- Public contact addresses: `contact@null-field.com` · `partnership@null-field.com`.

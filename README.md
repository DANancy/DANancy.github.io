# Yangyang Cai: Desktop Portfolio

A static, single-page portfolio inspired by a calm desktop workspace. The overview loads first; About, Work, Community, Books, Just for Fun, and Contact open as separate in-page windows without route changes.

## Development

```bash
npm ci
npm run dev
npm run lint
npm run build
```

The Next.js static export is written to `out/`. GitHub Pages deployment runs through `.github/workflows/deploy.yml` after pushes to `main`.

## Content and assets

- Routes and global styles: `src/app/`
- Window content and navigation: `src/data/desktop.ts`
- Main interaction component: `src/components/desktop/DesktopPortfolio.tsx`
- Visual system: `src/components/desktop/desktop.css`
- Analytics integration: `src/components/analytics/GoogleAnalytics.tsx`
- Imported application images: `src/assets/`
- URL-addressable static images: `public/assets/`

The `@/` TypeScript alias points to `src/`. Personal source material and design references remain outside the application structure and are not included in production unless explicitly imported.

## Project structure

```text
src/
  app/          Next.js routes and layout
  assets/       Images imported by components
  components/   Reusable interface components
  content/      Long-form and legacy page content
  data/         Structured navigation and project data
public/
  assets/       Static files referenced by URL
```

# Yangyang Cai: Desktop Portfolio

A static portfolio inspired by a calm desktop workspace, in English and Simplified Chinese (`/zh-hans/`). Each section (About, Work, Business, Community, Just for Fun, Links) is its own pre-rendered route shown as a desktop window, so every page is crawlable on its own.

## Development

```bash
npm ci
npm run dev
npm run lint
npm run build
```

The Next.js static export is written to `out/`. `npm run build` also runs `scripts/set-html-lang.mjs`, which marks the Chinese pages `lang="zh-Hans"`. GitHub Pages deployment runs through `.github/workflows/deploy.yml` after pushes to `main` (Node 22; the build is retried up to 3 times because Turbopack's Google Fonts loader fails intermittently).

Other scripts:

- `node scripts/validate-seo.mjs`: after a build, checks internal links, JSON-LD and that `robots.txt`, `sitemap.xml` and `llms.txt` exist
- `node scripts/optimize-images.mjs`: regenerates web-sized WebP copies of heavy images into `src/assets/optimized/`

## Content and assets

- Routes and global styles: `src/app/`
- Window content and navigation: `src/data/desktop.ts`
- Main interaction component: `src/components/desktop/DesktopPortfolio.tsx`
- Visual system: `src/components/desktop/desktop.css`
- Analytics integration: `src/components/analytics/GoogleAnalytics.tsx`
- SEO: per-page metadata in `src/app/**/page.tsx`, shared entities in `src/lib/` (`person.ts`, `podcast.ts`, `og.tsx`), generated share images in `src/app/og/`, plus `src/app/sitemap.ts`, `src/app/robots.ts` and `public/llms.txt`
- Design decisions and SEO history: `design.md`
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

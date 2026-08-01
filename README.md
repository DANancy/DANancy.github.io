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

- Window content and navigation: `content/desktop.ts`
- Main interaction component: `components/desktop/DesktopPortfolio.tsx`
- Visual system: `components/desktop/desktop.css`
- Source and rendered images: `assets/` (imported through Next.js)

The character is a single cropped pose derived from `assets/yangyangcai.jpg`; the full character sheet is not displayed or copied into the public site.

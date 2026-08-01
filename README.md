# Fly Through My World

Yangyang Cai's static personal portfolio combines an exploratory magical world with conventional, recruiter-friendly portfolio pages. The interactive MVP lives at `/explore`; the existing pages remain fast, semantic fallbacks.

## Stack and local development

- Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- Procedural HTML/CSS world with requestAnimationFrame movement; no backend, API key, database, or paid service

```bash
npm ci
npm run dev
npm run lint
npm run build
```

The static production site is generated in `out/`.

## Content updates

- Edit `content/world.ts` to update world landmarks and Simple Portfolio copy.
- Add a project by adding a typed landmark with a unique `id`, a zone, coordinates, panel copy, and an optional internal `href`.
- Add a landmark by extending `worldLandmarks`; the scene and accessible portfolio render from the same data.
- Add a zone by extending `ZoneId`, `zones`, and the corresponding presentational block in `WorldScene.tsx`.
- Existing detailed content lives in `content/`, with pages under `app/(site)` and `app/projects`.

The sprite is procedural CSS in `world.css`. To replace it with a model later, preserve the movement and selection interface in `WorldScene` and swap only its sprite renderer.

## GitHub Pages and custom domain

The single deployment method is `.github/workflows/deploy.yml`. A push to `main` runs `npm ci`, builds the static export, preserves `CNAME`, and deploys `out/` with GitHub Pages Actions. In repository settings, select **GitHub Actions** as the Pages source. `next.config.ts` uses `output: "export"` and unoptimized images, so there is no server routing dependency.

For a new domain, update `CNAME`, configure the DNS records GitHub documents, then enable HTTPS in Pages settings. If a build fails locally while offline, Next's existing `next/font/google` setup needs temporary network access to obtain fonts.

## Performance and accessibility

The MVP adds no runtime dependency and uses procedural shapes rather than image/model payloads. Keyboard movement, landmark buttons, Escape-to-close, visible focus, tap controls, reduced-motion behavior, semantic Simple Portfolio content, and direct conventional routes are supported. Keep particle counts low and prefer compressed GLB assets if a future WebGL renderer is added.

Placeholder items: Knowledge Agent and Bootcamp detail links, event photography, architecture diagrams, social links, and final project outcomes.

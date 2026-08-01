# Application architecture

The repository remains a Next.js App Router static export. `/explore` owns the game-inspired experience; existing pages provide conventional information architecture and durable direct links.

`MagicalWorld` controls the intro/explore/simple modes and selected landmark. `WorldScene` owns keyboard/touch movement, bounds, proximity detection, and procedural presentation. `ContentPanel` owns readable dialog content and keyboard closing. `SimplePortfolio` renders the same professional story as semantic HTML. `content/world.ts` is the typed content boundary; visuals do not contain long project copy.

Movement uses `requestAnimationFrame`, normalized input, simple rectangular bounds, and Euclidean proximity. This avoids a physics dependency in the MVP. A future React Three Fiber scene can implement the same `onSelect(WorldLandmark)` contract without changing content or panels.

Static export is built to `out/` and deployed by the sole GitHub Actions workflow. Performance comes from zero model/texture payloads, CSS effects, bounded animation, and a first-class non-game mode. Future extensions include lazy-loaded WebGL zones, Markdown articles, search, and a knowledge graph.

# Yangyang Cai — Personal Brand Site

## Design Document v2.2

**Status:** Complete design pass, awaiting approval. No implementation until sign-off.
**v2.1 changes:** big-bang physics entrance + pre-hydration skeleton (§6.7), "lost node" 404 page (§13.2), Garden Atom feed (§11.2), analytics open question (§19.8).
**v2.2 changes:** pipeline boot-log intro (§6.7), discovery system — counter, milestone toasts, 100% payoff, Continue/New Game (§6.8), cursor gravity (§6.4), boot-log & toast copy (§15.4).
**Domain:** `yangyangcai.me` (CNAME already in repo root)
**Supersedes:** design.md v1.0 and `DESIGN-wise.md` (both historical once this is approved).
**Purpose:** This document is the single source of truth for an implementation agent. Every visual, structural, motion, content, and technical decision is specified with concrete values. If a decision is not in this document, it is listed in **§19 Assumptions & Open Questions** — nothing else should require creative judgment.

---

## 0. How to Read This Document

- §1–§3 explain **what the product is and why** (vision, brand, architecture).
- §4–§5 define the **design system and shared components** (tokens and reusable parts).
- §6–§13 specify **every page**, in the order a visitor encounters them.
- §14 is the **animation catalog** — one table, every motion in the product.
- §15 defines the **content model** (TypeScript schemas + real copy).
- §16–§17 cover **responsive/a11y/SEO/performance** and **technical architecture**.
- §18 is the **design-rationale index** — every major decision and its "why" in one table.
- §19–§20: assumptions, open questions, build phases, acceptance checklist.

The repo currently contains one live artifact: `index.html`/`style.css`, a single-page case study for *Green Certificate Shortfall Analytics*. **That content is good and is preserved** — it becomes the first entry in Projects, restyled into this system (§10). An early Next.js scaffold (`app/`, `components/ui/`, `content/`) also exists; it may be reused where it matches this spec, and rewritten where it doesn't. This document wins every conflict.

---

## 1. Product Vision

### 1.1 One-sentence brief

A site that feels like **opening a game, then reading a documentary**: an entry experience that makes a stranger curious about a person, followed by a body of work that proves the engineering is real.

### 1.2 Positioning

> Yangyang Cai is a Senior Data Engineer in Melbourne who believes AI should amplify engineers, not replace them. Mission: **Make AI Practical.** This site demonstrates that philosophy instead of claiming it — through real architecture, real learning notes, and a life that is bigger than a job title.

### 1.3 The experience arc — "Trailer → Documentary"

The single most important design idea in this product. Every page sits on a **register dial** between two poles:

```
PLAY ◄────────────────────────────────────────────► PROOF
Homepage      About      Garden      Technology      Projects
(universe)    (warm)     (alive)     (calm map)      (case study)
```

- The **homepage** is the trailer: interactive, surprising, RPG-inflected. It exists to create curiosity, and it hands off the moment intent turns professional.
- **Projects** are the documentary: fixed-structure engineering case studies a recruiter can scan in 90 seconds and an engineer can read for 15 minutes.
- Everything between transitions gradually — the game language never leaks into project pages, and corporate stiffness never leaks into life pages.

### 1.4 Design principles (priority order)

1. **Curiosity before credentials.** The homepage sells a person, not a stack. Credentials live one click deeper — and are immaculate when reached.
2. **Two registers, one voice.** The Life register is warm and editorial; the Engineering register is precise and technical. Both are premium. Neither apologizes for the other.
3. **Play is a doorway, not a decoration.** Game mechanics exist only on the homepage. Every playful element must route somewhere real — a node that goes nowhere is cut.
4. **Motion earns its keep.** Every animation orients, reveals hierarchy, or confirms an action. Anything else is cut.
5. **Static-hostable, forever.** GitHub Pages has no server. Every feature resolves to static assets + client-side JS. No feature may depend on a backend that doesn't exist.
6. **Alive by design, cheap to maintain.** "Feels alive" mechanisms (Currently widget, garden maturity, recently-tended strip) must cost one small file edit to update — otherwise they rot and the site reads as abandoned, the opposite of alive.

### 1.5 Audiences, in priority order

1. **Recruiters / hiring managers** (60s visit): need to reach a project's Overview + Business Impact within 2 clicks of anywhere. Served by the persistent nav, the `Enter Site` escape hatch, and the fixed case-study structure.
2. **Engineers / peers** (5–15 min): read architecture, pipeline, and lessons-learned depth; judge craft by the site itself. Served by §9's full template and the design system's precision.
3. **Community / students** (returning visitors): come back for the Garden and the Currently widget. Served by §11–§12.

---

## 2. Brand Identity

### 2.1 Name treatment

- **Wordmark:** `Yangyang Cai`, display serif (§4.2), sentence case, never all-caps.
- **Monogram:** `YC`, display serif italic, inside a circular glass chip — used in nav and favicon.
- **Tagline:** **"Make AI practical."** — sentence case, full stop included. Used in homepage core-node expansion, footer, and meta descriptions. Always paired with the name; never shouted as a standalone headline (it's a mission, not a slogan).

### 2.2 Voice

- First person, direct, specific. Short sentences. Zero corporate throat-clearing ("passionate about leveraging synergies" is banned).
- Confidence without hype: state what was built and what it achieved; let the diagrams do the bragging.
- Life pages: conversational, playful, concrete — "Baldur's Gate 3, again", not "I enjoy gaming."

### 2.3 The seven facets (identity nodes, used verbatim)

AI-Powered Engineer · Data Engineer · Community Builder · AI Educator · Builder · Lifelong Learner · Technology Explorer

### 2.4 The eight values

Curiosity · Continuous Learning · Building · Sharing · Creativity · Practical AI · Kindness · Growth
(Rendered once, on About — §12.3. Values are shown, not repeated as decoration.)

---

## 3. Information Architecture

### 3.1 Sitemap

```
/                                Homepage — Knowledge Universe (entry experience)
├── /technology                  Expertise map (calm, categorized)
├── /projects                    Projects index
│   └── /projects/[slug]         Case study template
│       └── /projects/green-certificate-shortfall-analytics   (first entry)
├── /garden                      Knowledge Garden index
│   ├── /garden?topic=[topic]    Client-side topic filter (no route change)
│   └── /garden/[slug]           Single note
├── /about                       "Beyond the Terminal" — life, values, community
└── /contact                     Direct channels
```

### 3.2 Navigation model — two states

| State | Where | Chrome |
|---|---|---|
| **Immersive** | `/` only | No persistent header. Floating bottom-center pill: `Explore ↓` → morphs to `Enter Site →` (§6.6). Skip-link for keyboard/SR users is the first focusable element. |
| **Professional** | Every other route | Persistent glass top nav (§5.7) + footer (§5.8) on every page. |

**Top nav, left→right:** `[YC monogram → /]` `[◆ Universe icon → / (explored state preserved)]` · `Technology` · `Projects` · `Garden` · `About` · `[Contact — button, right-aligned]`

The `◆` icon is the one deliberate bridge back from documentary to trailer. It never resets exploration progress (§6.8).

### 3.3 Primary journey (per brief)

```
Homepage (Knowledge Universe)
  → visitor hovers/drags/clicks nodes, gets curious
  → clicks "Enter Site" or the "Data Engineer" facet
Technology (calm expertise map)
  → clicks "Where this shows up in production"
Projects (index)
  → selects case study
Project Detail (Overview → Business Problem → Architecture → Data Pipeline →
                Tech Stack → Dashboard → Challenges & Solutions →
                Business Impact → Lessons Learned → Screenshots → Links)
```

**Every homepage node routes somewhere real** (full mapping in §6.5). Examples: `Data Engineer` → `/technology` · `AI Educator` → `/garden?topic=ai` · `Community Builder` → `/about#community` · `Pottery` → `/about#pottery`.

---

## 4. Design System

Dark-mode-first; **v1 ships dark only** (§19.1). Every token is semantic so a light theme is an additive follow-up, not a rewrite.

### 4.1 Color

Two accents, deliberately mapped to the two registers.

| Token | Value | Use |
|---|---|---|
| `--bg-void` | `#08090B` | Page background. Near-black with a cool undertone — reads as depth, not OLED-off. |
| `--bg-surface` | `#111318` | Base card/panel fill under glass. |
| `--bg-elevated` | `#181B22` | Raised surfaces: modals, popovers, active nav. |
| `--glass-fill` | `rgba(255,255,255,0.04)` | Glass panel fill, layered over `--bg-surface`. |
| `--glass-border` | `rgba(255,255,255,0.09)` | 1px hairline on all glass panels. |
| `--glass-highlight` | `rgba(255,255,255,0.14)` | 1px inset top-edge highlight — light catching an edge. |
| `--text-primary` | `#F2F3F5` | Headlines, primary body. |
| `--text-secondary` | `#9CA1AB` | Supporting text. |
| `--text-muted` | `#5C616B` | Captions, timestamps, disabled. |
| `--accent-signal` | `#6E6BFF` | **Signal Violet** — the Technology/AI register. CTAs, links, active nav, hub nodes, chart hero series. |
| `--accent-signal-text` | `#8B89FF` | Lightened variant for inline text links on dark (AA contrast — §16.2). |
| `--accent-signal-soft` | `#6E6BFF` @ 12% | Signal-tinted fills, badges. |
| `--accent-clay` | `#E0895B` | **Clay** — the Life/human register. About page, homepage life nodes, Garden `career`/`books` topics only. Never on a button. |
| `--accent-clay-soft` | `#E0895B` @ 12% | Clay-tinted fills. |
| `--gradient-bridge` | `linear-gradient(135deg, #6E6BFF 0%, #9B6BFF 45%, #E0895B 100%)` | **Two sanctioned uses, both on the homepage core node:** its resting glow, and the earned completion ring at 17/17 discovered (§6.8). This gradient is the visual metaphor for "AI amplifying a human" — rarity keeps the meaning. |
| `--success` | `#3DD68C` | Positive deltas, "shipped"/Evergreen badges. |
| `--warning` | `#E8B84B` | Caution states, Growing badges. |
| `--danger` | `#E85D5D` | Errors, shortfall/negative values. |
| `--series-1…5` | `#6E6BFF · #5EC8E8 · #3DD68C · #E8B84B · #E0895B` | Chart series palette, fixed order across all dashboards. |

**Hard rules:**
- Signal Violet is the only color on interactive elements outside `/about`.
- Clay never appears on a button anywhere.
- `--gradient-bridge` appears on exactly one component — the homepage core node (glow + earned completion ring, §6.8). Reusing it anywhere else as a "pretty gradient" is a defect.

### 4.2 Typography

Two families = the typographic expression of the two registers.

| Role | Family | Use |
|---|---|---|
| **Display / Editorial** | **Fraunces** (variable; opsz + SOFT axes) | Homepage hero copy, section-opening headlines, About headings, Garden note titles. Weight 500–600; italics for emphasis words (a Fraunces signature). |
| **UI / Technical** | **Inter** (variable) | Nav, buttons, all Technology/Projects copy, dashboards, default body. |
| **Monospace** | **JetBrains Mono** | Tech chips, code, data-model field names, AI Assistant chat, footer build number. |

Self-hosted woff2, `font-display: swap`, Latin subset. Fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` (+ `serif` for Fraunces).

**Type scale (16px base):**

| Token | Size / LH | Family & weight | Use |
|---|---|---|---|
| `display-hero` | `clamp(2.75rem, 6vw, 5.5rem)` / 1.05, tracking −0.02em | Fraunces 550 | Homepage core-node expansion headline only. |
| `display-lg` | 3rem / 1.1 | Fraunces 550 | H1 on About; Garden note titles. |
| `display-md` | 2rem / 1.2 | Fraunces 500 | Life sub-sections. |
| `heading-lg` | 2rem / 1.25 | Inter 700 | H1 on Technology / Projects / case studies. |
| `heading-md` | 1.5rem / 1.3 | Inter 600 | Card titles, case-study section headers. |
| `heading-sm` | 1.125rem / 1.4 | Inter 600 | Sub-headers, labels. |
| `body-lg` | 1.125rem / 1.6 | Inter 400 | Lead paragraphs. |
| `body-md` | 1rem / 1.6 | Inter 400 | Default body. |
| `body-sm` | 0.875rem / 1.5 | Inter 400 | Meta text. |
| `caption` | 0.75rem / 1.4, uppercase, +0.04em | Inter 600 | Eyebrows, badges, timestamps. |
| `mono-md` | 0.875rem / 1.6 | JetBrains Mono 400 | Code, chat, field names. |

### 4.3 Spacing, grid, width

- Base unit **4px**; scale `4 8 12 16 24 32 48 64 96 128`.
- 12-column grid, 24px gutter desktop / 16px mobile.
- Max widths: **1120px** reading content · **1440px** wide layouts (dashboards, graph) · **680px** Garden note prose (optimized for reading, not scanning).
- Vertical rhythm between major sections: 96px desktop / 56px mobile.

### 4.4 Glassmorphism spec (canonical card)

```css
background: var(--glass-fill);          /* over --bg-surface */
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid var(--glass-border);
box-shadow:
  inset 0 1px 0 var(--glass-highlight), /* top-edge catch-light */
  0 20px 40px -20px rgba(0,0,0,0.5);    /* ambient drop */
border-radius: 20px;
```

Elevation tiers vary **shadow only** (never a second accent):
- **L0** page background — no shadow. **L1** default card — as above. **L2** hover/modal — `0 30px 60px -20px rgba(0,0,0,0.6)` + `translateY(-2px)`.

### 4.5 Shape

Radius scale `8 / 12 / 16 / 20 / 28` px: 20 canonical cards, 12 buttons/inputs, 28 hero containers, 8 chips/code/tables (outer container only), `9999px` pills. No 0-radius rectangles anywhere.

### 4.6 Iconography

**Lucide only**, 1.5px stroke, `currentColor`. No filled icons, no mixed sets. Exception: homepage **life nodes** use the brief's emoji glyphs (🏺 ✈️ 🍜 ☕ 📚 🤝 🎮 🥊 ⚔️ 🌏) — emoji are the warmer, correct register there, and only there (plus the About interests grid, which reuses them). Brand logos on Technology chips use Simple Icons where a real logo exists.

### 4.7 Motion tokens

| Token | Value | Use |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default UI motion — fast start, gentle settle. |
| `ease-spring-soft` | spring `{stiffness: 220, damping: 26}` | Node/card hover lift. |
| `ease-spring-snappy` | spring `{stiffness: 380, damping: 30}` | Button press, toggles. |
| `duration-instant` | 100ms | Hover color/opacity. |
| `duration-fast` | 200ms | Button/link states. |
| `duration-base` | 350ms | Card reveals, nav transitions. |
| `duration-slow` | 600ms | Page transitions, hero reveals, chart draw-ins. |
| `duration-ambient` | 8–14s randomized per node | Homepage idle float. |

`prefers-reduced-motion: reduce` disables ambient float, starfield twinkle, parallax, and graph physics entirely; all state transitions collapse to `duration-instant` opacity crossfades. This is a hard requirement, not a nice-to-have.

---

## 5. Shared Components

### 5.1 Buttons
- **Primary:** `--accent-signal` fill, `--bg-void` text, radius 12, Inter 600, padding 12×24. Hover: brightness +8%, translateY(−1px). Press: scale 0.97 `ease-spring-snappy`.
- **Secondary:** transparent, 1px `--glass-border`, `--text-primary`. Hover: `--glass-fill` appears.
- **Ghost:** no fill/border, `--accent-signal-text`, underline on hover only.

### 5.2 GlassCard
§4.4. When the card is a link: hover lifts L1→L2 **plus** border tint shifts to `--accent-signal` @ 30% — the one premium micro-interaction every linked card shares.

### 5.3 Tag / TopicPill
Full-pill, `caption` type, `--glass-fill`, 4px colored dot prefix (topic/series color). Used for garden filters and tech-stack chips.

### 5.4 StatTile
Label (`caption`) / big value (`heading-lg` Inter 700, series color) / sub-caption (`body-sm` muted), in a GlassCard. Carried over from the existing Green Certificate page.

### 5.5 CodeBlock
`--bg-void` fill (darker than parent card), JetBrains Mono, radius 8, hover-revealed copy button top-right (icon → checkmark 1.6s). No traffic-light dots — decoration without function (§1.4-4).

### 5.6 Breadcrumb
Case studies and Garden notes only: `Projects / Green Certificate Shortfall Analytics`. `body-sm` muted; only the parent segment is a link.

### 5.7 TopNav
Fixed, 72px, `--bg-void` @ 70% + `blur(16px)`, hairline bottom border. Shrinks to 56px after 80px scroll. Active-route indicator: 2px `--accent-signal` pill underline that **slides** between items (Framer Motion `layoutId`), never fades. Mobile <768px: monogram + hamburger → full-screen glass overlay, links in `display-md` Fraunces, 60ms staggered fade-up.

### 5.8 Footer
Every professional page. Desktop 4 columns: brand blurb + tagline · sitemap · social icons (GitHub `DANancy`, LinkedIn, email) · **Currently** widget (§12.4). Bottom bar: `© 2026 Yangyang Cai · Built with Next.js on GitHub Pages` in `caption` muted.

### 5.9 SectionHeading
Eyebrow (`caption`, accent color) + heading + optional lead paragraph. Used by every professional-register section so page anatomy stays consistent.

---

## 6. Homepage — "The Knowledge Universe"

### 6.1 Concept

A dark canvas that reads as a small universe. One glowing **core node** (Yangyang Cai) at center; seven **facet nodes** orbiting at mid radius; ten smaller **life nodes** scattered further out. Edges connect core→facets and facets→related life nodes, so the graph *visually argues the brief's thesis: the engineer and the person are one connected system.*

**Rendering decision:** deliberately **2D SVG** (D3-force layout + React-rendered nodes), not a Three.js scene — every node stays a real, accessible, keyboard-focusable DOM element, the bundle stays small, and the game feeling comes from interaction quality, not polygon count (rationale §18, row 3). Depth is faked with three parallax planes (mouse-move parallax at 0 / 6 / 14px amplitude) and a lightweight canvas **starfield** (~250 static twinkling points, `aria-hidden`, pure atmosphere).

### 6.2 Layout

- `100dvh`, no scroll on first load.
- Core node at `50%, 46%` (room for the bottom CTA pill).
- Facets on an invisible ring at ~30% of the shorter viewport dimension, force-jittered so it reads organic, not a pie chart.
- Life nodes at ~55–80% radius, tethered to their most relevant facet (mapping §6.5); a synthetic invisible "Life" anchor keeps food/coffee/pottery clustered and tethered to the core so no node orbits as an orphan.

### 6.3 Node visual spec

| Node | Size | Fill | Label |
|---|---|---|---|
| **Core** | 96px | `--gradient-bridge` radial glow + 40px outer blur @ 30% — the "player character" glow | Name always visible below, `heading-md` Inter 700 |
| **Facet** ×7 | 56px | `--accent-signal-soft` fill, 1px `--accent-signal` border | Label on hover/focus, `body-sm`, fades up |
| **Life** ×10 | 28–36px (varied) | `--accent-clay-soft` fill, 1px `--accent-clay` border | Emoji glyph always visible; text label on hover |
| **Edge** | 1px, `--glass-border` | Hover on either endpoint: brightens to endpoint accent @ 50% + one 400ms dash-offset pulse | — |

### 6.4 Interaction model

- **Idle:** nodes drift ±6px on out-of-phase sine waves (8–14s each); core breathes scale 1.0↔1.03 over 6s. Never synchronized — synchronized motion reads robotic.
- **Cursor gravity (desktop pointer only):** the pointer exerts a weak repulsive force on nearby nodes (point force, strength −30, radius 120px, position lerp 0.08) — nodes drift away from an approaching cursor and spring back via the standing simulation forces, clamped to ≤12px displacement so layout never breaks. Idle mouse movement feels like touching water; the graph is playful before the first click. Disabled on touch devices and under reduced-motion.
- **Hover (desktop):** node scales 1.12 `ease-spring-soft`; label fades up; direct edges brighten; a small glass **info card** appears near the cursor — RPG "unit card" framing: icon, name, one-line description (copy in §15.2).
- **Click / tap / Enter:** the info card expands in place (Framer Motion `layoutId` grow — no route change yet) into a larger panel: 2–3 sentences + `→ Explore` link. This is the deepest the game metaphor goes. Second activation (or `→ Explore`) navigates to the mapped destination. Scrim dims background to 40% black behind the expanded card; `Esc`/scrim-click closes.
- **Core node click:** expands to a 2–3 sentence first-person intro + two buttons: `Enter Site →` (→ `/technology`, primary) and `View Résumé` (PDF, new tab — the one concession to traditional-portfolio expectations, kept out of the IA).
- **Drag / pan / zoom:** background drag pans within bounds (graph can't be lost off-screen); pinch/trackpad zoom clamped `[0.7, 1.6]`.
- **Keyboard:** every node is a real `<button>` — tab order: skip-link → core → facets clockwise from 12 → life nodes. Focus ring 2px `--accent-signal`, offset 4px. Enter/Space = click.
- **Screen readers:** the canvas region carries a summary `aria-label`; immediately after it in the DOM sits a visually-available plain list of the seven facets + destinations (it doubles as the `<noscript>` fallback). **The site's content is never gated behind the game.**

### 6.5 Node → destination map (complete)

| Node | Destination |
|---|---|
| Core | expansion → `Enter Site` → `/technology` |
| AI-Powered Engineer | `/technology#ai` |
| Data Engineer | `/technology` |
| Community Builder | `/about#community` |
| AI Educator | `/garden?topic=ai` |
| Builder | `/projects` |
| Lifelong Learner | `/garden` |
| Technology Explorer | `/technology#modern` |
| 🏺 Pottery · ✈️ Travelling · 🍜 Food · ☕ Coffee · 📚 Reading · 🤝 People · 🎮 RPG Games · 🥊 Fighting Games · ⚔️ Anime · 🌏 Ideas | `/about#<matching-anchor>` (📚 Reading → `/garden?topic=books`) |

Edge tethers: `🎮 🥊 ⚔️` → Technology Explorer · `📚` → Lifelong Learner · `🤝 🌏` → Community Builder · `🏺 ✈️ 🍜 ☕` → Life anchor → Core.

### 6.6 Entry CTA & discovery counter

Floating bottom-center glass pill: **`Explore ↓`** with a 2px/2s bounce. After ≥2 nodes explored **or** 12s idle, text crossfades (no layout shift) to **`Enter Site →`** → `/technology`. The trailer never traps anyone.

**Discovery counter:** after the first node is explored (never at 0/17 — gamification starts only once the visitor opts in by playing), a `mono-md` counter fades in above the pill: `3 / 17 discovered`. On mobile it merges into the pill text instead (`Explore ↓ · 3/17`). The counter is the quiet promise that exploring has a destination — it converts "neat graph" into "I want to find them all."

### 6.7 First-load choreography — "The Big Bang"

0. **Pre-hydration (0ms):** a static, CSS-only skeleton ships in the HTML — on a **first visit** this is the boot log's opening line (below); on return visits it's the core node's glow (pure CSS radial gradient) + the name, centered. Slow connections see personality instantly, never a black void; hydration takes over in place with zero layout shift.
0.5. **Pipeline boot log (first visit only):** before the universe appears, ~1.4s of terminal-style lines in `mono-md` JetBrains Mono on the void, typed at ~24ms/char with 120ms line pauses — a data pipeline run as the loading screen (copy verbatim in §15.4): ingest → bronze/silver/gold → spawn nodes → deploy. "ok" tokens in `--success`; final line in `--accent-signal`. Then the log dissolves (200ms fade) into the starfield. **Guards:** shown only when `yc.visited` is absent from localStorage; any click/keypress/tap skips it instantly; reduced-motion skips it entirely. Loading becomes storytelling — and the joke lands hardest with the engineers being courted.
1. 0–400ms (after the log, or immediately on return visits): starfield fades in from black; the skeleton crossfades into the live core node, glow blooms.
2. ~500ms: **the big bang** — every facet and life node spawns at the core's position with randomized outward velocity, and the live d3-force simulation (charge repulsion + link constraints + radial containment) takes over: nodes burst outward, overshoot slightly, and settle into their rings over ~1.2s. Edges fade in (opacity 0→0.15) as their endpoints separate. **No scripted keyframes — the physics engine is the animator**, so every load settles slightly differently and the graph reads as a live simulation before the visitor touches anything.
3. Settle (average node velocity below threshold, ~1.6s): labels reach full opacity, CTA pill fades up, and the simulation hands off to ambient idle (§6.4).

Total ≈ 1.8s (≈3.2s on a very first visit including the boot log — acceptable because one click skips straight to the settled universe). Reduced-motion: skip boot log and simulation playback entirely — render the converged layout (run the force layout to convergence synchronously, or precompute positions at build) with a single 200ms fade.

### 6.8 Persistence & the Discovery System

All state in `localStorage`, zero backend: `yc.visited` (boolean — gates the boot log), `yc.discovered` (array of node IDs), `yc.complete` (boolean).

- **Explored-state rendering:** previously-discovered nodes render at higher base brightness on return visits — the save-file touch.
- **Milestone toasts:** a small glass toast (top-center, `caption` type + Lucide icon, fades up, auto-dismisses after 2.4s, max one at a time — later milestones in the same session replace queued ones) fires at: first discovery → `Discovery started`; all 7 facets → `Region discovered: The Work`; all 10 life nodes → `Region discovered: The Life`; 17/17 → `Universe complete` (copy §15.4). Toasts are `aria-live="polite"`.
- **100% payoff:** at 17/17, the core node's bridge-gradient ring **ignites** (one-time 600ms bloom, then persists on all future visits — the second and final sanctioned use of `--gradient-bridge`, as an earned state of the same component), and a hidden 18th node `☄️` fades in at the outer rim, linking to a secret garden note (`/garden/you-found-this`) written for the people curious enough to finish the map. The reward is more of the person — on brand.
- **Continue / New Game:** returning visitors with ≥1 discovery see two understated `body-sm` ghost choices beneath the core name for the first 6s (then fade): `Continue — 3/17 discovered` (default; dismisses on any interaction) and `New Game` (confirm dialog, clears all `yc.*` keys, replays the boot log + big bang). The full RPG save-file moment, kept quiet enough to ignore.

### 6.9 Mobile (<768px)

Graph preserved (touch-first works). Facet ring shrinks proportionally; life nodes reduce to 8 if crowded (drop 🌏 and 🤝 first — both concepts survive via facets). Info cards render as bottom sheets (finger occlusion). CTA pill respects safe-area inset.

---

## 7. Technology (`/technology`)

### 7.1 Purpose
The calm landing after the universe — first page of the documentary register. No graph, no play; precision as the aesthetic.

### 7.2 Layout

- H1 `heading-lg`: **Technology** — lead: *"10+ years building enterprise data platforms — the tools I reach for, and how they fit together."*
- Category sections (each with a SectionHeading + chip grid, 2–4 col desktop / 2 col mobile). **Taxonomy verbatim from the brief:**

| Anchor | Section | Chips |
|---|---|---|
| `#cloud` | Cloud & Platforms | Microsoft Azure · Azure Synapse Analytics · Azure Data Factory · Azure Data Lake Storage · Microsoft Fabric · Databricks · Snowflake · AWS |
| `#aws` | AWS Services | S3 · Lambda · SQS · SNS · EventBridge · IAM · KMS · Secrets Manager |
| `#programming` | Programming | SQL · Python · PySpark · Spark |
| `#bi` | Business Intelligence | Power BI |
| `#enterprise` | Enterprise Systems | Salesforce · SAP · Oracle · SQL Server · PostgreSQL |
| `#architecture` | Architecture | Lakehouse · Medallion Architecture · ETL / ELT · Data Warehousing · Data Modelling · Kimball · Data Governance · Purview |
| `#modern` | Modern Engineering | REST APIs · GraphQL · GitHub · GitHub Actions · Azure DevOps · CI/CD |
| `#ai` | Artificial Intelligence | LLMs · Claude · OpenAI · Cursor · GitHub Copilot · AI Agents · MCP · RAG · GraphRAG · Prompt Engineering |
| `#system-design` | System Design | Distributed Systems · Scalability · Reliability · Architecture Design |

- Chip = glass pill + Simple Icons logo (Lucide generic where no logo exists) + name. Hover: lift + border→signal.
- Bottom: **"Where this shows up in production"** — up to 3 compact project cards, each captioned with the technologies it demonstrates. This strip is the connective tissue that makes Technology a *map* into Projects rather than a list.
- The `#ai` section gets one extra line under its heading: *"AI should amplify engineers, not replace them — these are the tools I use to move faster, not a replacement for judgment."* The mission stated exactly where skeptics look for it.

---

## 8. Projects (`/projects`)

- H1: **Projects** — lead: *"Case studies from real data platforms — problem, architecture, and outcome."*
- 2-col desktop / 1-col mobile grid of ProjectCards (GlassCard): cover graphic (architecture-diagram excerpt or series-color abstract gradient), `heading-md` title, one-line problem statement, 3–5 tech chips, status badge (`Live` / `Case Study` / `In Progress`). Whole card = one link (no nested interactives).
- v1 ships with one entry (§10) + one **"Next case study — in progress"** ghost card (dashed border, muted) so the grid doesn't read as finished-at-one. Filter chips are P2.

---

## 9. Project Detail Template (`/projects/[slug]`)

The documentary. Fixed section order **per the brief**; sections may be omitted per-project only if the content field is empty, never reordered.

**Page chrome:** breadcrumb · sticky on-page TOC (right rail ≥1024px, collapsible top disclosure below) listing the numbered sections with scroll-spy (active item in `--accent-signal`).

**Hero band:** title (`heading-lg`), one-paragraph summary (`body-lg`), meta row (role · timeframe · status), 3–4 StatTiles of headline numbers, tech-chip row, and **GitHub / Live Demo buttons top-right** (Primary = demo, Secondary = GitHub). Links repeat in §9.11 — a recruiter should never scroll to find them.

1. **Overview** — what it is, who it's for, the result — five sentences max. Written last, placed first.
2. **Business Problem** — prose + domain-context diagram if one exists + Scope block (in/out two-column checklist) + Functional & Non-Functional requirements lists.
3. **Architecture** — the SVG solution-architecture diagram is the hero, glass-framed at 1440px width, with numbered callouts that reveal captions on hover/tap. This is the one place the homepage's interaction language is deliberately echoed inside a project page — because it's explaining a system, not performing a game.
4. **Data Pipeline** — how data flows end-to-end: horizontal stage flow (Ingestion → Bronze → Silver → Gold → Serving) rendered as connected glass segments, each expandable (`<details>`-style glass accordion) to reveal what happens at that stage (tools, transforms, schedule/orchestration). **Data Model** lives here as a subsection: ER/UML SVG + expandable field-level detail.
5. **Technology Stack** — chip grid scoped to this project, grouped by pipeline role (Ingestion / Storage / Transform / Serving / Governance / AI) rather than the global taxonomy.
6. **Dashboard** — embedded/recreated Power BI views: StatTile row + SVG charts (bar/line, `--series-*` palette, animated draw-in on first scroll-into-view). Optional `Explore live report →` if a public link exists.
7. **Challenges & Solutions** — 3–5 paired rows, each a two-part glass card: left "Challenge" (plain statement, `--warning` 4px left border), right "Solution" (what was done, `--success` border). Honest engineering-retro framing — the section engineers trust most and portfolios omit most.
8. **Business Impact** — 2–4 StatTiles of outcome metrics + one short paragraph per metric explaining measurement honestly (estimates labeled as estimates).
9. **Lessons Learned** — numbered editorial list, 3–6 entries; titles in Fraunces italic (`display-md` scale-down) — the one intentional register-softening in the documentary, because lessons are personal reflection. Each: bold takeaway line + 2–3 supporting sentences.
10. **Screenshots** — 2–6 captioned images in a 2-col grid (1-col mobile), GlassCard-framed, lazy-loaded with explicit dimensions. Click → full-size lightbox (scrim + centered image, Esc/click closes). Omitted if the project has no visual surface.
11. **Links** — closing band: GitHub repo (Secondary button + `mono-md` repo path), Live Demo (Primary), plus optional related garden notes ("Notes from building this").

**Then:** *(optional module)* **AI Assistant** — the existing chat Q&A widget restyled as a glass panel (user bubbles right/signal-soft, answers left with `mono-md` for data-shaped responses; canned local Q&A set — §19.3). It demonstrates "AI-Powered Engineer" inside the flagship project. Finally a **prev/next project pager**.

---

## 10. First Case Study — Green Certificate Shortfall Analytics

Migrate the existing `index.html` content into the §9 template. Mapping:

| Existing block | Template destination |
|---|---|
| Hero summary + stat tiles (62 / 29 liable entities, 0.02M / 0.41M shortfall) | Hero band StatTiles |
| `#context` — Business Context + REC market diagram (`certificate_market.png` — recolor/re-export to match `--series-*`, compress <150KB) | §9.2 Business Problem |
| Project Scope + Functional/Non-Functional requirements | §9.2 Scope + requirements blocks |
| `#architecture` — ADF → Databricks medallion → Power BI → AI/MCP flow | §9.3 Architecture + §9.4 Data Pipeline (stage detail) |
| UML data model (`fact_certificate_shortfall` + dims) | §9.4 Data Model subsection |
| `#dashboard` — LGC/STC charts + top-entity lists | §9.6 Dashboard, recolored to `--series-*` |
| `#stack` chips | §9.5 Technology Stack, grouped by pipeline role |
| `#ai` chat widget | Post-§9.11 AI Assistant module |
| Sidebar "Core Skills / Certifications / Community & Teaching" | **Not project content** — migrate to `/about` (§12); never duplicated on project pages. |

**Net-new content required** (author before build completes; the template must never ship with lorem ipsum): Challenges & Solutions (3–5 pairs), Business Impact narrative, Lessons Learned (3–6), screenshots, GitHub repo URL, demo URL if public. Listed in §19.5.

---

## 11. Knowledge Garden (`/garden`)

### 11.1 Concept
Not a blog — learning notes with a **maturity** state: `🌱 Seedling` (just planted) · `🌿 Growing` (revised) · `🌳 Evergreen` (mature, periodically tended). A recognized digital-garden convention (Obsidian/Maggie Appleton lineage) that delivers "the garden should feel alive" honestly, and confines plant iconography to one small badge per note.

### 11.2 Index
- H1: **Knowledge Garden** — lead: *"Learning notes, growing in public. Some are seedlings, some are evergreen — all of them honest."*
- Topic filter pills (multi-select, client-side, URL-synced via `?topic=` so homepage deep-links work): **AI · System Design · Azure · Databricks · Power BI · Architecture · Career · Books · Learning Notes**.
- **"Recently tended"** strip: last 5 edited notes (maturity badge + title + relative date) — the primary alive-signal, powered by frontmatter, zero runtime cost.
- Main grid: compact note cards — maturity badge, `heading-sm` title, topic pill, one-line excerpt, updated date.
- **Feed:** Atom feed at `/garden/feed.xml`, generated at build from note frontmatter (title, excerpt, `tended` date), with `<link rel="alternate">` autodiscovery in the garden layout — the alive-signal developers actually subscribe to.

### 11.3 Note page (`/garden/[slug]`)
- Title `display-lg` Fraunces (notes get the editorial register — they're personal).
- Meta row: maturity badge · topic pill · planted date · last-tended date.
- MDX prose at 680px width. Code blocks per §5.5.
- **Connections** footer: a static mini node-link visual (3–6 nodes: this note + linked notes/topics, no physics, click = navigate). The graph motif recurring at its third and smallest scale — Universe → architecture callouts → garden backlinks — is what makes the site read as *one system* rather than three templates glued together.
- Launch requires **≥6 seed notes** covering ≥4 topics (§19.5) so the garden never looks abandoned on day one.

---

## 12. About (`/about`) — "Beyond the Terminal"

### 12.1 Register
The one page fully committed to Clay. Fraunces gets room; whitespace increases; first person throughout. This page answers "I want visitors to remember me as a curious person."

### 12.2 Structure
1. **Hero:** `display-lg` Fraunces with italic emphasis: *"Technology is only **one part** of my life."* + one short paragraph + optional portrait (`profile.jpg`, warm-graded, radius 28).
2. **Interests grid** (`#pottery` `#travel` `#food` `#coffee` `#reading` `#people` `#rpg` `#fighting-games` `#anime` `#ideas` — anchors match homepage nodes): 10 cards, each emoji + title + 1–2 sentences of *anecdote-level specificity* (copy §15.3). 2-col desktop / 1-col mobile; Clay accents.
3. **Values strip:** the eight values as a single understated pill row — not a third card grid (§2.4).
4. **Craft:** migrated certifications + core-skills content (§10) as a clean two-column list — no chips, no badges; visual weight stays on the person, per principle 1.
5. **Community & Teaching** (`#community`): vertical year-marked timeline — bootcamp instruction, AI workshops, Make AI Practical community organizing, awards. Factual: event, role, date, one line, optional link.
6. **Currently** widget (§12.4) before the footer.

### 12.3 Values are displayed once
Repeating values as decoration cheapens them. One row, one place, styled with restraint.

### 12.4 "Currently" widget
Three lines from `content/currently.ts`, rendered in About and the site footer:
```
Reading:  Designing Data-Intensive Applications — Martin Kleppmann (re-read)
Playing:  Baldur's Gate 3 (RPG, again)
Building: This site — a knowledge-graph homepage for yangyangcai.me
```
The cheapest, highest-leverage alive-mechanism on the site: one file edit per update, and it's what makes a returning visitor feel the site isn't frozen. (Fix the existing file's mojibake em-dashes — save as UTF-8.)

---

## 13. Contact (`/contact`) & System Pages

### 13.1 Contact

Deliberately small. H1 + one warm sentence (*"The fastest way to reach me is email — I read everything."*), then three large glass link-tiles: **Email** (`mailto:`) · **LinkedIn** · **GitHub (DANancy)**. **No contact form** — no backend on Pages; a silently-failing form is the fastest way to break the premium feel. Footer repeats the same channels site-wide, so Contact is SEO/directness surface, not a gate.

### 13.2 Not Found (404) — "Lost node"

`app/not-found.tsx` → static `404.html` in the export (GitHub Pages serves it for any unknown path automatically). The starfield backdrop (reused component, `aria-hidden`) with a single detached **clay node drifting slowly at center — no edges**: the visual pun of a node that lost its graph. Headline in `display-md` Fraunces: *"This node drifted off the map."* One body line (*"Whatever you were looking for isn't here — but the universe is."*), a Primary button `Return to the universe →` (`/`) and a Ghost link `Browse projects`. No nav chrome (immersive register); reduced-motion stops the drift.

---

## 14. Animation Catalog (complete implementation reference)

| # | Interaction | Trigger | Spec |
|---|---|---|---|
| 1 | First-load "Big Bang" | `/` initial mount | §6.7: CSS skeleton → starfield fade → nodes burst from core via live d3-force, settle ~1.2s; ≈1.8s total; reduced-motion → 200ms fade of converged layout. |
| 2 | Graph ambient idle | Continuous, `/` only | ±6px sine per node, 8–14s randomized phase; core breathes 1.0↔1.03/6s. Off under reduced-motion. |
| 3 | Node hover | Pointer enter | Scale 1→1.12 `ease-spring-soft`; edges 0.15→0.5 opacity + 400ms dash pulse; info card fades up 8px `duration-fast`. |
| 4 | Node expand | Click/tap/Enter | `layoutId` grow node→card, `duration-base` `ease-standard`; scrim 0→40%; Esc/scrim closes (reverse). |
| 5 | CTA pill morph | ≥2 nodes explored or 12s | Text crossfade `duration-base`, no layout shift. |
| 6 | Route transition | Any navigation | Out: fade + translateY(8px) `duration-base`; in: fade + translateY(−8px) starting 80ms later (overlap, not a cut). |
| 7 | Scroll reveal | Section/card at threshold 0.2 | Fade-up 16px→0 `duration-base`, 60ms sibling stagger, fires once. |
| 8 | Card hover | Enter linked GlassCard | translateY(−4px), L1→L2 shadow, border→signal 30%, `ease-spring-soft`. |
| 9 | Button press | Pointer down | scale 0.97 `ease-spring-snappy`, release on up. |
| 10 | Nav indicator | Route change | `layoutId` underline slide `duration-fast`. |
| 11 | Nav shrink | Scroll past 80px | 72→56px height + opacity/blur increase, `duration-fast`. |
| 12 | Chart draw-in | Chart enters viewport | Line: stroke-dashoffset full→0 `duration-slow`; bars/points fade+scale, 40ms stagger; once. |
| 13 | Accordion (pipeline/data model) | Toggle | Height auto-animate `duration-base` `ease-standard`; chevron rotates 180°. |
| 14 | Architecture callout | Hover/tap numbered marker | Caption card fades up 8px `duration-fast`; marker ring pulses once. |
| 15 | Lightbox | Screenshot click | Scrim fade + image scale 0.96→1 `duration-base`; Esc/click closes. |
| 16 | Copy button | Click | Icon→check crossfade `duration-fast`; reverts 1.6s. |
| 17 | Mobile menu | Hamburger | Overlay fade+scale 0.98→1 `duration-base`; links 60ms stagger fade-up. |
| 18 | TOC scroll-spy | Section crosses 40% viewport | Active item color crossfade `duration-instant`. |
| 19 | Garden filter | Pill toggle | Grid FLIP reflow (`AnimatePresence` + `layout`), `duration-base`. |
| 20 | Parallax planes | Mouse move, `/` only | 3 planes at 0/6/14px amplitude, lerp 0.08. Off under reduced-motion + touch. |
| 21 | Boot log | First visit, `/` pre-universe | Lines typed ~24ms/char, 120ms line pauses, ≈1.4s total; 200ms dissolve into starfield. Click/key/tap skips; return visits & reduced-motion skip. |
| 22 | Milestone toast | Discovery thresholds (§6.8) | Glass toast fades up 8px `duration-base`, auto-dismisses 2.4s; max one visible; `aria-live="polite"`. |
| 23 | Cursor gravity | Pointer move over graph, desktop | Repulsive point force (−30, r=120px, lerp 0.08), ≤12px displacement; nodes spring back via simulation. Off on touch + reduced-motion. |
| 24 | Universe complete | 17/17 discovered | Core bridge-gradient ring blooms once over 600ms, persists; hidden ☄️ node fades in `duration-slow`. |

**Global rule:** nothing autoplays on loop except #2; nothing moves more than 16px except #4/#15; nothing animates longer than 600ms except the one-time #1.

---

## 15. Content Model & Copy Deck

### 15.1 Schemas (TypeScript — implementation contract)

```ts
// content/graph.ts
type NodeKind = "core" | "facet" | "life";
interface GraphNode {
  id: string;            // kebab-case, stable (localStorage key)
  kind: NodeKind;
  label: string;
  emoji?: string;        // life nodes only
  blurb: string;         // hover card, one sentence
  detail?: string;       // expanded card, 2–3 sentences
  href: string;          // §6.5 destination — REQUIRED: no dead nodes
  hidden?: boolean;      // true only for the ☄️ 100%-completion node (§6.8);
                         // excluded from the discovery count
}
interface GraphEdge { source: string; target: string; }

// content/projects/[slug].ts
interface Project {
  slug: string; title: string; status: "live" | "case-study" | "in-progress";
  oneLiner: string; summary: string;
  role: string; timeframe: string;
  heroStats: Stat[];                    // {label, value, sub?, seriesColor}
  stack: StackGroup[];                  // {group: "Ingestion"|"Storage"|"Transform"|"Serving"|"Governance"|"AI", chips: Chip[]}
  businessProblem: { prose: string; contextImage?: Img; scopeIn: string[]; scopeOut: string[]; functional: string[]; nonFunctional: string[]; };
  architecture: { diagram: Img; callouts: { n: number; x: number; y: number; caption: string }[]; };
  pipeline: { stages: { name: string; tools: string[]; detail: string }[]; dataModel?: { diagram: Img; entities: { name: string; description: string; fields?: string[] }[] }; };
  dashboard?: { stats: Stat[]; charts: ChartSpec[]; liveUrl?: string };
  challenges: { challenge: string; solution: string }[];
  impact: { stats: Stat[]; narrative: string };
  lessons: { title: string; body: string }[];
  screenshots: Img[];                   // {src, alt, caption, w, h}
  links: { github?: string; demo?: string; notes?: string[] };  // notes = garden slugs
  aiAssistant?: { qa: { q: string; a: string }[] };
}

// content/garden/[slug].mdx frontmatter
interface NoteFrontmatter {
  title: string;
  topics: ("ai"|"system-design"|"azure"|"databricks"|"power-bi"|"architecture"|"career"|"books"|"learning-notes")[];
  maturity: "seedling" | "growing" | "evergreen";
  planted: string; tended: string;      // ISO dates; `tended` drives "Recently tended"
  excerpt: string;                      // one line, card + meta description
  related?: string[];                   // slugs → Connections footer
}

// content/currently.ts
interface Currently { reading: string; playing: string; building: string; }
```

### 15.2 Facet copy (hover blurbs, verbatim)

| Facet | Blurb |
|---|---|
| AI-Powered Engineer | Pairs 10+ years of engineering judgment with Claude, Copilot and Cursor — AI as amplifier, not autopilot. |
| Data Engineer | Builds enterprise data platforms on Azure, Databricks and AWS — lakehouse architecture, end to end. |
| Community Builder | Organizes and teaches at data & AI meetups and workshops across Melbourne. |
| AI Educator | Teaches practical AI to working engineers — bootcamps, workshops, and the Make AI Practical community. |
| Builder | Always has something mid-flight. This site is one of them. |
| Lifelong Learner | Learns in public — the Knowledge Garden is the receipts. |
| Technology Explorer | Tries the new thing early. Keeps what actually works. |

Core-node expansion: *"I'm Yangyang — a Senior Data Engineer in Melbourne. I've spent 10+ years building enterprise data platforms, and these days I spend just as much energy teaching engineers to make AI practical. This site is my world — explore it, or head straight to the work."*

### 15.3 Life-node / interests copy (one line each; About may extend to two)

🏺 *Wheel-throwing on weekends — patience training disguised as a hobby.* · ✈️ *Planning the next trip before the last one's photos are sorted.* · 🍜 *Will drive across Melbourne on a rumor of good noodles.* · ☕ *Melbourne coffee snob, unapologetically.* · 📚 *Currently re-reading Kleppmann — see “Currently”.* · 🤝 *Meetups, mentoring, and conversations with interesting strangers.* · 🎮 *RPGs with 100-hour save files. BG3, again.* · 🥊 *Fighting games — frame data is just another data model.* · ⚔️ *Fantasy & cultivation anime — cultivation arcs are just career growth with better visuals.* · 🌏 *New ideas are the best souvenir.*

### 15.4 Boot log & discovery copy (verbatim)

**Boot log** (first visit, §6.7 — six lines, monospace):

```
$ run yangyang.universe
ingesting 10+ years of experience ......... ok
transforming: bronze → silver → gold ...... ok
modelling identity: 7 facets, 10 interests  ok
spawning 17 nodes ......................... done
deploying universe ▓▓▓▓▓▓▓▓▓▓ 100%
```

**Milestone toasts** (§6.8): `✦ Discovery started` · `✦ Region discovered: The Work` · `✦ Region discovered: The Life` · `◆ Universe complete — something new appeared at the edge`.

**Hidden node** `☄️` blurb: *"You explored everything. This is for you."* → `/garden/you-found-this` — a short, personal easter-egg note about building this site (content authored by Yangyang; §19.5).

### 15.5 Page meta (titles / descriptions)

| Route | `<title>` | Meta description |
|---|---|---|
| `/` | Yangyang Cai — Make AI Practical | Senior Data Engineer in Melbourne. Explore the knowledge universe: data platforms, practical AI, and a life beyond the terminal. |
| `/technology` | Technology — Yangyang Cai | 10+ years of enterprise data platforms: Azure, Databricks, Snowflake, AWS, and practical AI engineering. |
| `/projects` | Projects — Yangyang Cai | Engineering case studies: problem, architecture, pipeline, and business impact. |
| `/projects/green-certificate…` | Green Certificate Shortfall Analytics — Yangyang Cai | End-to-end analytics platform for Australia's renewable energy certificate market — Azure, Databricks, Power BI, and AI-powered querying. |
| `/garden` | Knowledge Garden — Yangyang Cai | Learning notes on AI, system design, Azure, Databricks and more — growing in public. |
| `/about` | About — Yangyang Cai | Beyond the terminal: pottery, travel, RPGs, community building, and the values behind the work. |
| `/contact` | Contact — Yangyang Cai | Get in touch — email, LinkedIn, GitHub. |

---

## 16. Responsive, Accessibility, SEO, Performance

### 16.1 Breakpoints
`<768px` mobile · `768–1023` tablet · `≥1024` desktop · `≥1440` wide (max-widths engage).

### 16.2 Accessibility (hard requirements)
- WCAG AA contrast for all text tokens on all backgrounds; inline links use `--accent-signal-text` (#8B89FF) because raw `--accent-signal` on `--bg-void` fails AA for body-size text.
- Homepage graph fully keyboard-operable (§6.4) — this page fails a11y review first if neglected; treat it as release-blocking.
- `prefers-reduced-motion` per §4.7/§14. Decorative canvas/SVG `aria-hidden`. Real heading hierarchy everywhere — `/` carries a visually-hidden `<h1>Yangyang Cai — Senior Data Engineer</h1>`.
- Lightbox and node-expansion are focus-trapped dialogs with `Esc` close and focus return.

### 16.3 SEO
- Static export pre-renders full HTML per route. Per-page title/description per §15.5.
- OG images: one branded 1200×630 template (dark glass card, name + page title, bridge-gradient edge accent); per-route title swap generated at build (P2 — v1 may ship a single shared card).
- `sitemap.xml`, `robots.txt`, JSON-LD `Person` on `/` (+ `TechArticle` on notes P2), canonical URLs on `yangyangcai.me`.

### 16.4 Performance budgets
- Homepage JS beyond framework baseline (graph + starfield + motion): **≤150KB gzipped** — the quantified reason Three.js is rejected for the graph (§18).
- LCP ≤2.0s on Fast 3G emulation; CLS <0.1 (explicit dimensions on all imagery); starfield pauses when tab hidden (`visibilitychange`).
- Fonts: 3 variable woff2, subset, `swap`. Images pre-optimized (no next/image runtime on Pages): WebP, hero diagrams <150KB each, screenshots <200KB.

---

## 17. Technical Architecture

### 17.1 Stack
Next.js App Router + React + TypeScript + Tailwind CSS v4 + Framer Motion + **d3-force** (layout math only; React renders nodes). MDX for garden notes. **Static export** (`output: "export"`), `images.unoptimized: true`. No API routes, no server runtime. React Flow is not used — it ships editor features (minimap, handles, zoom UI) this design doesn't need; d3-force + custom SVG is smaller and fully controlled. Three.js is not used (§18).

### 17.2 Repo structure

```
/app
  layout.tsx                 ← fonts, theme tokens, metadata defaults
  page.tsx                   ← Knowledge Universe
  not-found.tsx              ← 404 "lost node" (immersive register, §13.2)
  (site)/layout.tsx          ← TopNav + Footer wrapper (professional register)
  (site)/technology/page.tsx
  (site)/projects/page.tsx
  (site)/projects/[slug]/page.tsx
  (site)/garden/page.tsx
  (site)/garden/[slug]/page.tsx
  (site)/about/page.tsx
  (site)/contact/page.tsx
/components
  /graph/    GraphCanvas, GraphNode, GraphEdge, NodeCard, Starfield, EntryPill
  /ui/       Button, GlassCard, Pill, StatTile, CodeBlock, Breadcrumb,
             TopNav, Footer, SectionHeading, Lightbox, Accordion
  /project/  ProjectHero, ScopeBlock, ArchitectureDiagram, PipelineFlow,
             DataModel, DashboardCharts, ChallengeSolution, ImpactBand,
             Lessons, ScreenshotGrid, LinksBand, AiAssistant, ProjectPager
  /garden/   NoteCard, TopicFilter, RecentlyTended, Connections, MaturityBadge
/content
  graph.ts · currently.ts · /projects/*.ts · /garden/*.mdx
/lib         force-layout, scroll-spy, storage, mdx pipeline
/public      CNAME · /fonts · /assets (diagrams, screenshots, og, resume.pdf)
design.md    ← this file, living reference
```

### 17.3 Deployment
GitHub Actions on push to `main`: `next build` → upload `/out` via `actions/upload-pages-artifact` + `actions/deploy-pages`. `public/CNAME` (`yangyangcai.me`) rides into `/out` automatically. User-root Pages repo → no `basePath` needed. Delete legacy `index.html`/`style.css`/`DESIGN-wise.md` in the same PR that ships the migrated case study — never serve two designs at once.

---

## 18. Design Rationale Index

| # | Decision | Why |
|---|---|---|
| 1 | Trailer→documentary arc as the organizing idea | The brief's core tension (playful entry, professional body) becomes a strength only if the transition is designed, not accidental. One dial, every page placed on it. |
| 2 | Two accents + two typefaces mapped to Life/Engineering registers | "Technology is only one chapter" must be visible in the system itself, not just stated in copy. The bridge gradient — used exactly once — is the thesis (AI amplifying a human) in pixel form. |
| 3 | 2D SVG graph, not Three.js | Real DOM nodes = keyboard/SR accessibility for free; ≤150KB budget holds; 3D personal sites read as tech demos, and the brief wants the game to *hand off* to a documentary, not be the product. Brief allows Three.js "only if it genuinely improves UX" — it doesn't here. |
| 4 | Every node routes to a real destination | Principle 3: play is a doorway. A graph that goes nowhere is decoration; this one is a router — the surprise converts into navigation. |
| 5 | Fixed case-study section order, hero-level GitHub/Demo | Recruiters scan; engineers audit. A fixed skeleton means the 90-second visitor and the 15-minute visitor both always know where they are. |
| 6 | Challenges/Solutions + Lessons Learned as first-class sections | These are the sections that make a case study credible to engineers — proof of judgment, not just output. |
| 7 | Garden maturity states + "Recently tended" | Delivers "feels alive" via honest metadata rather than fake activity; a seedling badge also lowers the bar to publish, which keeps the garden actually growing. |
| 8 | Currently widget in footer site-wide | Highest alive-signal per byte on the site; one file edit to update (principle 6). |
| 9 | Graph motif at three shrinking scales (universe → callouts → backlinks) | Makes the site one system instead of three templates; repetition-with-variation is what a "brand for 10 years" needs. |
| 10 | No contact form | On static hosting a form is either fake or fragile; premium means nothing is broken. |
| 11 | Emoji only on life surfaces; Lucide everywhere else | Warmth is scoped to the human register; mixing icon systems everywhere reads amateur. |
| 12 | Dark-only v1 with semantic tokens | Brief says dark-first; a light theme doubles QA surface for zero launch value. Tokens make it additive later. |
| 13 | Canned local AI Assistant | No server = no safe API key. A canned demo that works beats a live call that leaks or breaks (upgrade path §19.3). |
| 14 | Résumé PDF behind core node only | Traditional-portfolio expectation honored without letting a resume shape the IA the brief explicitly rejects. |
| 15 | Big-bang physics entrance | The force simulation is the animator: organic, slightly different on every load, and it proves the graph is a live system — the "game engine" feel — for zero extra dependency weight. |
| 16 | "Lost node" 404 | Error states are brand surface; a themed 404 costs one component reuse and turns a dead end back into the funnel. |
| 17 | Boot log as loading screen | First-visit loading time becomes storytelling: the pipeline-run joke states the profession before any copy does, weighs almost nothing, and is skippable/one-time so it never annoys. |
| 18 | Discovery counter + achievements + hidden node | Exploration needs a reason; a visible count and a real 100% payoff convert curiosity into completion. The reward (a personal note) is more of the person — the brief's goal, not a gimmick. |
| 19 | Cursor gravity | The graph responds before the first click, teaching "this is touchable" wordlessly; one extra force in an already-running simulation. |

---

## 19. Assumptions & Open Questions

Judgment calls made to keep this buildable. Everything else in the document is final; flag only these back.

1. **Dark-only v1** — assumed acceptable (§18.12).
2. **2D graph** — the biggest technical-direction call (§18.3). Confirm explicitly.
3. **AI Assistant is canned/local.** A live Claude-backed assistant needs a tiny serverless proxy (e.g. Cloudflare Worker) to hold the key — out of scope for v1, clean upgrade path later since the widget's UI is identical either way. Confirm if the live version is wanted sooner.
4. **Name presentation.** Brief says *Yangyang Cai*; existing site and photo caption say *Nancy Cai*, GitHub is `DANancy`. This doc uses **Yangyang Cai** everywhere; if the professional name is "Yangyang (Nancy) Cai", it changes the wordmark and metadata only — decide before build.
5. **Content to author before launch** (templates must never ship with placeholders): Green Certificate Challenges/Impact/Lessons/screenshots/GitHub-demo URLs (§10); ≥6 garden seed notes across ≥4 topics; the `/garden/you-found-this` easter-egg note (§6.8/§15.4); Community & Teaching timeline entries with dates; résumé PDF (or cut the button); confirmation of LinkedIn URL and public email for Contact.
6. **Ambient audio: cut from scope.** v1.0 listed it as optional; it's P3-at-best against its UX risk. Not designed, not built, unless explicitly requested.
7. **`profile.jpg`** (in `c:\Users\61451\projects\`) — assumed usable for About; move into `/public/assets` and re-grade warm to match Clay.
8. **Analytics: undecided.** Nothing is currently specified. If wanted, use a cookieless privacy-friendly script (Plausible or GoatCounter — no consent banner required); otherwise ship with none. Decide before build so the script tag and its `<head>` weight are planned, not bolted on.

## 20. Build Phases & Acceptance

**Phase 1 — the spine:** design tokens + shared components → professional layout (nav/footer) → Technology → Projects index + Green Certificate case study (content migrated + net-new sections authored) → About → Contact. *The documentary ships first: the site is useful to a recruiter before the trailer exists.*
**Phase 2 — the trailer:** Knowledge Universe (graph, choreography, persistence, mobile bottom sheets) replacing a temporary minimal hero; route transitions; OG images.
**Phase 3 — the garden:** Garden index + seed notes + Connections; Currently wired site-wide; JSON-LD; second-project ghost → real entry when ready.

**Acceptance checklist (release-blocking):**
- [ ] Every homepage node navigates somewhere; keyboard-only run reaches every destination.
- [ ] Reduced-motion pass: no ambient motion, no parallax, all content reachable.
- [ ] Lighthouse (mobile emulation): Performance ≥90, Accessibility ≥95, SEO ≥95 on `/`, `/projects/green-certificate-shortfall-analytics`, `/garden`.
- [ ] Homepage extra-JS budget ≤150KB gzipped (verified in CI via `next build` output).
- [ ] No placeholder copy anywhere; no legacy `index.html` served.
- [ ] Custom domain + HTTPS green after first Actions deploy.
- [ ] `404.html` serves the "lost node" page for an unknown URL on the deployed Pages site (not just `next dev`).

---

*End of design document v2.0. Awaiting approval — no code before sign-off.*

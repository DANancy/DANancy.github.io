export const wiseCss = `
/* ============================================================
   Design system: ported from DESIGN-wise.md (Wise-derived tokens)
   Primitives below are the literal DESIGN-wise.md values. Semantic
   aliases (--page, --surface-1, --card, --text-*, --series-*,
   --border, --good, etc.) are what the rest of this file and the
   inline styles/JS in index.html actually consume, and are the
   ONLY tokens that should appear in theme-aware rules : they swap
   under prefers-color-scheme: dark. Raw primitives (--ink,
   --canvas, --canvas-soft, ...) are reserved for elements that are
   intentionally fixed regardless of theme: the hero band, the
   footer band (both use the brand's polarity-flipped "dark"
   variant : ink bg + lime-green text), and self-contained badges/
   chips whose own bg+text pair doesn't need to invert.
   Wise Sans is proprietary and unavailable : per DESIGN-wise.md's
   own documented substitute, Inter at weight 900 stands in for the
   brand's heavy display voice; Inter is genuinely open-licensed
   (SIL OFL) so it's loaded for real via Google Fonts rather than
   just declared as a fallback name.
   ============================================================ */

:root {
  /* ---- DESIGN-wise.md primitives ---- */
  --primary: #9fe870;
  --on-primary: #0e0f0c;
  --primary-active: #cdffad;
  --primary-neutral: #c5edab;
  --primary-pale: #e2f6d5;
  --ink: #0e0f0c;
  --ink-deep: #163300;
  --body-ink: #454745;
  --mute: #868685;
  --canvas: #ffffff;
  --canvas-soft: #e8ebe6;
  --positive: #2ead4b;
  --positive-deep: #054d28;
  --warning: #ffd11a;
  --warning-deep: #b86700;
  --warning-content: #4a3b1c;
  --negative: #d03238;
  --negative-deep: #a72027;
  --negative-darkest: #a7000d;
  --negative-bg: #320707;
  --accent-orange: #ffc091;
  --accent-cyan: #38c8ff;

  /* ---- radius scale ---- */
  --r-none: 0px; --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --r-xl: 24px; --r-full: 9999px;

  /* ---- spacing scale ---- */
  --sp-xxs: 2px; --sp-xs: 4px; --sp-sm: 8px; --sp-md: 12px; --sp-lg: 16px; --sp-xl: 24px; --sp-2xl: 32px; --sp-3xl: 48px;

  /* ---- font stack: Wise Sans is proprietary/unavailable : Inter (loaded via Google Fonts
     above) is the brand's own documented substitute, real weight 900 for the hero voice ---- */
  --font-display: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-body: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-code: var(--font-jbmono), "JetBrains Mono", ui-monospace, monospace;

  /* ---- semantic aliases: theme-aware, used throughout the stylesheet + inline HTML/JS ---- */
  --page: var(--canvas-soft);
  --surface-1: var(--canvas);
  --card: var(--primary-pale);
  --text-primary: var(--ink);
  --text-secondary: var(--body-ink);
  --text-muted: var(--mute);
  --gridline: var(--canvas-soft);
  --baseline: var(--mute);
  --border: var(--canvas-soft);
  --series-blue: var(--accent-cyan);
  --series-aqua: var(--positive);
  --series-yellow: var(--warning-deep);
  --series-violet: var(--ink-deep);
  --series-orange: var(--accent-orange);
  --series-red: var(--negative);
  --good: var(--positive-deep);
  --radius: var(--r-xl);
  --max-w: 1200px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page: #14150f;
    --surface-1: #1e2018;
    --card: #262a1d;
    --text-primary: #f4f6f1;
    --text-secondary: #c3c7bc;
    --text-muted: #8d9186;
    --gridline: rgba(255,255,255,0.08);
    --baseline: rgba(255,255,255,0.24);
    --border: rgba(255,255,255,0.12);
    --series-blue: #6fd7ff;
    --series-aqua: #58c97f;
    --series-yellow: #e0a63f;
    --series-violet: #8fd67a;
    --series-orange: #ffc091;
    --series-red: #ef6b70;
    --good: #7fe0a0;
  }
}

* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--page);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
}
a { color: var(--good); }
.wrap { max-width: var(--max-w); margin: 0 auto; padding: 0 var(--sp-xl); }
svg { display: block; }

/* nav : stays solid white/canvas even against the sage page, per nav-bar spec */
header.site-nav {
  position: sticky; top: 0; z-index: 20;
  background: var(--surface-1);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-md) var(--sp-xl); max-width: var(--max-w); margin: 0 auto; gap: var(--sp-lg);
  min-height: 64px;
}
.brand-group { display: flex; align-items: center; gap: var(--sp-lg); flex-wrap: wrap; }
.brand { display: flex; align-items: center; gap: var(--sp-sm); font-weight: 600; font-size: 1.05rem; color: var(--text-primary); }
.brand .mark {
  width: 32px; height: 32px; border-radius: var(--r-md);
  background: linear-gradient(135deg, var(--accent-cyan), var(--ink-deep));
  display: flex; align-items: center; justify-content: center;
  color: var(--canvas); font-size: 0.8rem; font-weight: 700; flex-shrink: 0;
}
.brand-sub { font-size: 0.8125rem; font-weight: 600; color: var(--text-muted); }
nav.links { display: flex; gap: var(--sp-lg); flex-wrap: wrap; }
nav.links a {
  text-decoration: none; color: var(--text-secondary); font-size: 0.875rem; font-weight: 600;
  padding-bottom: 3px; border-bottom: 2px solid transparent; transition: color 150ms ease, border-color 150ms ease;
}
nav.links a:hover { color: var(--good); border-bottom-color: var(--good); }

/* hero : the polarity-flipped "hero-band-dark": ink bg + Wise-green headline, always dark */
section.hero { padding: var(--sp-xl) 0 var(--sp-md); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: var(--sp-xl); align-items: start; }
.hero-left-col { display: contents; }
.hero-main { grid-column: 1; grid-row: 1; min-width: 0; }
.hero-grid > .bio-panel { grid-column: 2; grid-row: 1; min-width: 0; }
.hero-grid > #context { grid-column: 1 / -1; grid-row: 2; min-width: 0; }
.hero-grid > #architecture { grid-column: 1 / -1; grid-row: 3; min-width: 0; }
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr); }
  .hero-main { grid-column: 1; grid-row: 1; }
  .hero-grid > .bio-panel { grid-column: 1; grid-row: 2; }
  .hero-grid > #context { grid-column: 1; grid-row: 3; }
  .hero-grid > #architecture { grid-column: 1; grid-row: 4; }
}
.hero-main {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #176b5b 0%, #23836d 58%, #2e9a78 100%);
  color: #ffffff;
  border-radius: var(--r-xl);
  padding: var(--sp-3xl) var(--sp-xl);
}
.hero-scene { position: absolute; left: 0; right: 0; bottom: 0; height: 130px; z-index: 0; opacity: 0.5; pointer-events: none; }
.hero-main > * { position: relative; z-index: 1; }
.eyebrow {
  display: inline-block; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
  color: #ffe09a; text-transform: uppercase; margin-bottom: var(--sp-sm);
}
h1.title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 500; line-height: 1.08; letter-spacing: -0.01em; margin: 0 0 var(--sp-md); color: #ffffff; text-shadow: 0 2px 10px rgba(4,45,36,0.22); }
h1.title .accent { color: #ffe09a; display: block; }
.lede { font-size: 1.25rem; font-weight: 400; line-height: 1.5; color: #f2fffa; opacity: 0.8; max-width: 62ch; margin: 0 0 var(--sp-xl); }
.public-data-note { max-width: 70ch; margin: 0; padding: var(--sp-md) var(--sp-lg); border: 1px solid rgba(255,255,255,.35); border-radius: var(--r-md); background: rgba(255,255,255,.1); color: #f6fffa; font-size: .8125rem; line-height: 1.5; }

/* stat tiles: theme-aware by default (used standalone in the Dashboard section) */
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-md); margin-bottom: var(--sp-xl); }
@media (max-width: 700px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
.stat-tile {
  background: var(--surface-1); border-radius: var(--r-lg);
  padding: var(--sp-lg);
}
.stat-tile .label { font-size: 0.8125rem; font-weight: 400; color: var(--text-secondary); margin-bottom: var(--sp-xs); }
.stat-tile .value { font-size: 1.5rem; font-weight: 700; line-height: 1.1; font-variant-numeric: proportional-nums; }
.stat-tile .value.blue { color: var(--series-blue); }
.stat-tile .value.aqua { color: var(--good); }
.stat-tile .sub { font-size: 0.75rem; color: var(--text-muted); margin-top: var(--sp-xs); }

/* hero stat tiles sit on the fixed-ink band : white cards floating on ink, not theme-aware */
.hero-main .stat-tile { background: var(--canvas); }
.hero-main .stat-tile .label { color: var(--body-ink); }
.hero-main .stat-tile .sub { color: var(--mute); }
.hero-main .stat-tile .value.blue { color: #1a7fb0; }
.hero-main .stat-tile .value.aqua { color: var(--positive-deep); }

/* self-contained pale-green badge : own bg+text pair, no theme swap needed */
.stack-row { display: flex; flex-wrap: wrap; gap: var(--sp-sm); margin-bottom: var(--sp-lg); }
.stack-chip {
  display: inline-flex; align-items: center; gap: var(--sp-xs);
  font-size: 0.8125rem; font-weight: 600; color: var(--ink);
  background: var(--primary-pale); border: none;
  padding: 4px 10px 4px 4px; border-radius: var(--r-full);
}
.stack-chip .ico {
  width: 24px; height: 24px; border-radius: var(--r-sm); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}

/* bio panel */
.bio-panel[id] { scroll-margin-top: 76px; }
.bio-panel {
  background: var(--surface-1); border-radius: var(--r-xl); padding: var(--sp-xl);
  height: fit-content; position: sticky; top: 76px;
}
@media (max-width: 900px) { .bio-panel { position: static; } }
.avatar-photo {
  width: 92px; height: 92px; border-radius: 50%; margin-bottom: var(--sp-md);
  background: linear-gradient(160deg, var(--accent-cyan), var(--ink-deep));
  display: flex; align-items: center; justify-content: center; color: var(--canvas);
  font-size: 1.7rem; font-weight: 700; letter-spacing: 0.02em;
}
.bio-panel h2 { font-family: var(--font-display); margin: 0 0 2px; font-size: 1.5rem; font-weight: 600; line-height: 1.2; color: var(--text-primary); }
.bio-panel .role { color: var(--good); font-weight: 600; font-size: 0.875rem; margin-bottom: var(--sp-md); }
.bio-panel p { font-size: 0.875rem; line-height: 1.5; color: var(--text-secondary); margin: 0 0 var(--sp-md); }
.icon-row { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-xl); }
.icon-row a {
  width: 34px; height: 34px; border-radius: var(--r-md); background: var(--card);
  border: none; display: flex; align-items: center; justify-content: center;
  text-decoration: none;
}
.bio-section { margin-bottom: var(--sp-lg); }
.bio-section h3 {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600;
  color: var(--text-muted); margin: 0 0 var(--sp-sm); display: flex; align-items: center; gap: var(--sp-xxs);
}
.bio-section ul { margin: 0; padding-left: 1.1rem; font-size: 0.875rem; line-height: 1.5; color: var(--text-secondary); }
.bio-section li { margin-bottom: var(--sp-xs); }
.skill-chips { display: flex; flex-wrap: wrap; gap: var(--sp-xs); }
.skill-chip {
  font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: var(--r-full);
  background: var(--primary-pale); border: none; color: var(--ink);
}

/* generic section */
section.block { padding: var(--sp-3xl) 0; }
.block-head { display: flex; align-items: baseline; gap: var(--sp-sm); margin-bottom: var(--sp-xs); }
.block-num {
  width: 28px; height: 28px; border-radius: 50%; background: var(--primary);
  color: var(--on-primary); font-size: 0.8125rem; font-weight: 700; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.block-head h2 { font-family: var(--font-display); font-size: 1.75rem; font-weight: 600; line-height: 1.2; letter-spacing: -0.01em; margin: 0; color: var(--text-primary); }
.block-desc { color: var(--text-secondary); font-size: 1rem; line-height: 1.5; margin: 0 0 var(--sp-lg); max-width: 74ch; }
.btn-link {
  display: inline-flex; align-items: center; gap: var(--sp-xs); font-size: 1rem; font-weight: 600;
  color: var(--text-primary); text-decoration: none; border: 1px solid var(--text-primary); border-radius: var(--r-xl);
  padding: var(--sp-md) var(--sp-xl); background: var(--surface-1); transition: background 150ms ease;
}
.btn-link:hover { background: var(--card); }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-xl); }
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; } }
.card { background: var(--surface-1); border-radius: var(--r-xl); padding: var(--sp-xl); }
.card h3 { font-family: var(--font-display); margin: 0 0 var(--sp-sm); font-size: 1.125rem; font-weight: 600; line-height: 1.3; color: var(--text-primary); }
.card .note { font-size: 0.8125rem; color: var(--text-muted); margin-top: var(--sp-sm); }

/* ===== Section 1: Business Context ===== */
.context-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--sp-xl); align-items: start; margin-bottom: var(--sp-xl); }
@media (max-width: 950px) { .context-layout { grid-template-columns: 1fr; } }
.req-heading { font-family: var(--font-display); font-size: 1.125rem; font-weight: 600; line-height: 1.3; margin: 0 0 var(--sp-sm); color: var(--text-primary); }
.rec-diagram-img {
  background: var(--surface-1); border-radius: var(--r-xl); padding: var(--sp-sm);
}
.rec-diagram-img img { display: block; width: 100%; height: auto; border-radius: var(--r-lg); }
.req-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-lg); }
@media (max-width: 950px) { .req-grid { grid-template-columns: 1fr; } }
.req-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin: var(--sp-md) 0 var(--sp-xs); }
.req-label:first-of-type { margin-top: 0; }
.req-label.good { color: var(--good); }
.req-label.muted { color: var(--text-muted); }
.req-list { margin: 0; padding-left: 1.1rem; font-size: 0.875rem; line-height: 1.5; color: var(--text-secondary); }
.req-list li { margin-bottom: var(--sp-xs); }
.req-list.numbered { list-style: none; padding-left: 0; }
.req-list.numbered li strong { color: var(--series-blue); font-weight: 700; margin-right: var(--sp-xs); }

/* ===== Section 2: architecture pipeline ===== */
.pipeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; margin-top: var(--sp-md); }
@media (max-width: 950px) { .pipeline { grid-template-columns: 1fr; } }
.pipe-stage { position: relative; padding: 0 var(--sp-sm); }
.pipe-card {
  background: var(--surface-1); border-radius: var(--r-lg); padding: var(--sp-md);
  font-size: 0.8125rem; min-height: 168px;
}
.pipe-card .pipe-icon { width: 30px; height: 30px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; margin-bottom: var(--sp-xs); }
.pipe-card strong { display: block; font-family: var(--font-display); font-size: 0.9375rem; font-weight: 600; margin-bottom: var(--sp-xs); color: var(--text-primary); }
.pipe-card ul { margin: 0; padding-left: 1rem; color: var(--text-secondary); }
.pipe-card li { margin-bottom: 3px; }
.pipe-connector { display: none; }
@media (min-width: 951px) {
  .pipe-connector {
    display: block; position: absolute; top: 30px; right: -8px; width: 16px; height: 12px; z-index: 2;
  }
}
.medallion-row { display: flex; gap: var(--sp-xxs); margin-bottom: var(--sp-xs); }
.medallion { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 0.625rem; color: var(--text-muted); }
.feedback-loop {
  margin-top: var(--sp-md); padding: var(--sp-sm) var(--sp-md); border: 1px dashed var(--baseline); border-radius: var(--r-md);
  font-size: 0.75rem; color: var(--text-muted); text-align: center;
}

/* data model */
.schema-table { width: 100%; border-collapse: collapse; font-size: 0.8125rem; }
.schema-table th, .schema-table td { text-align: left; padding: var(--sp-xs) var(--sp-sm); border-bottom: 1px solid var(--gridline); }
.schema-table th { color: var(--text-muted); font-weight: 600; font-size: 0.6875rem; text-transform: uppercase; }
.pk { color: var(--good); font-weight: 700; }
.card h3.with-icon { display: flex; align-items: center; gap: var(--sp-sm); }
.table-badge { width: 22px; height: 22px; border-radius: var(--r-sm); background: var(--series-blue); flex-shrink: 0; }
.uml-wrap { overflow-x: auto; }
.uml-svg { width: 100%; min-width: 640px; height: auto; display: block; }
code { font-family: var(--font-code); background: var(--card); border: none; border-radius: var(--r-sm); padding: 1px 6px; font-size: 0.85em; color: var(--text-primary); }

/* charts */
.chart-card { background: var(--surface-1); border-radius: var(--r-xl); padding: var(--sp-xl); }
.chart-card h3 { font-family: var(--font-display); margin: 0 0 2px; font-size: 1.125rem; font-weight: 600; line-height: 1.3; color: var(--text-primary); }
.chart-card .chart-note { font-size: 0.8125rem; color: var(--text-muted); margin: 3px 0 var(--sp-md); }
.bar-svg { width: 100%; height: auto; overflow: visible; }
.bar rect { transition: opacity 0.1s; cursor: pointer; }
.bar:hover rect { opacity: 0.75; }
.axis-label { fill: var(--text-muted); font-size: 9px; }
.gridline { stroke: var(--gridline); stroke-width: 1; }
.baseline { stroke: var(--baseline); stroke-width: 1; }
.chart-tooltip {
  position: absolute; pointer-events: none; background: var(--ink); color: var(--canvas);
  font-size: 0.75rem; padding: var(--sp-xs) var(--sp-sm); border-radius: var(--r-sm); white-space: nowrap;
  transform: translate(-50%, -115%); opacity: 0; transition: opacity 0.1s; z-index: 5;
  font-variant-numeric: tabular-nums;
}
.chart-wrap { position: relative; }
details.data-table { margin-top: var(--sp-sm); }
details.data-table summary { font-size: 0.8125rem; color: var(--good); cursor: pointer; font-weight: 600; }
details.data-table table { width: 100%; margin-top: var(--sp-sm); border-collapse: collapse; font-size: 0.75rem; }
details.data-table th, details.data-table td {
  text-align: right; padding: 3px var(--sp-xs); border-bottom: 1px solid var(--gridline); font-variant-numeric: tabular-nums;
}
details.data-table th:first-child, details.data-table td:first-child { text-align: left; }

.top-list { list-style: none; margin: 0; padding: 0; }
.top-list li { display: flex; align-items: center; gap: var(--sp-sm); padding: var(--sp-xs) 0; border-bottom: 1px solid var(--gridline); font-size: 0.875rem; }
.top-list li:last-child { border-bottom: none; }
.top-list .rank { width: 20px; color: var(--text-muted); font-size: 0.8125rem; flex-shrink: 0; }
.top-list .name { flex: 1; color: var(--text-secondary); }
.top-list .amount { font-weight: 700; font-variant-numeric: tabular-nums; }
.bar-bg { background: var(--gridline); border-radius: var(--r-sm); height: 6px; margin-top: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: var(--r-sm); }

.dash-recap { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-md); margin-bottom: var(--sp-xl); }
@media (max-width: 700px) { .dash-recap { grid-template-columns: repeat(2, 1fr); } }

/* AI mock */
.ai-layout { display: grid; grid-template-columns: 1fr 260px; gap: var(--sp-xl); align-items: start; }
@media (max-width: 950px) { .ai-layout { grid-template-columns: 1fr; } }
.chat-row { display: flex; gap: var(--sp-sm); margin-bottom: var(--sp-md); align-items: flex-start; }
.chat-avatar { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--canvas); font-size: 0.675rem; font-weight: 700; }
.chat-avatar.bot { background: var(--ink-deep); }
.chat-avatar.user { background: var(--accent-cyan); }
.chat-bubble { background: var(--surface-1); border-radius: var(--r-lg); padding: var(--sp-sm) var(--sp-md); font-size: 0.875rem; line-height: 1.5; flex: 1; }
.chat-bubble.q { color: var(--text-primary); font-weight: 600; }
.chat-bubble.a { color: var(--text-secondary); }
.chat-bubble .src { display: block; margin-top: var(--sp-xs); font-size: 0.75rem; color: var(--good); }
.chat-thread { max-height: 480px; overflow-y: auto; padding-right: var(--sp-xs); }
.example-q { display: block; width: 100%; text-align: left; background: var(--surface-1); border: none;
  border-radius: var(--r-lg); padding: var(--sp-sm) var(--sp-md); font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: var(--sp-xs);
  cursor: pointer; font-family: inherit; transition: background 150ms ease, color 150ms ease; }
.example-q:hover { background: var(--card); color: var(--good); }
.ask-row { display: flex; gap: var(--sp-sm); margin-top: var(--sp-md); }
.ask-row input {
  flex: 1; padding: var(--sp-md) var(--sp-lg); border-radius: var(--r-md); border: 1px solid var(--text-primary);
  background: var(--surface-1); color: var(--text-primary); font-size: 0.875rem; font-family: inherit; height: 44px;
}
.ask-row input:focus { outline: none; border: 2px solid var(--good); padding: 11px 15px; }
.ask-row button {
  background: var(--primary); color: var(--on-primary); border: none; border-radius: var(--r-xl); padding: 0 22px;
  font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; height: 44px;
}
.ask-row button:hover { background: var(--primary-active); }
.chat-bubble.a.unmatched { color: var(--text-muted); font-style: italic; }
.ai-orb { position: relative; width: 220px; height: 220px; margin: 0 auto var(--sp-md); }
.ai-orb-ring { position: absolute; inset: 0; border-radius: 50%; border: 1px dashed var(--baseline); }
.ai-orb-core {
  position: absolute; inset: 55px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, var(--ink-deep), #081a00);
  display: flex; align-items: center; justify-content: center; color: var(--primary);
}
.ai-orb-chip {
  position: absolute; width: 42px; height: 42px; border-radius: var(--r-md); background: var(--surface-1);
  border: none; display: flex; align-items: center; justify-content: center;
}

/* Light footer keeps the close of the project calm and consistent with the page. */
footer.site-footer { padding: 2.5rem 0 2rem; margin-top: var(--sp-md); border-top: 1px solid #d5dfd7; background: linear-gradient(145deg,#edf4ef 0%,#f8f5e9 100%); color: var(--ink); }
.stack-strip { display: flex; flex-wrap: wrap; gap: var(--sp-lg); margin-bottom: var(--sp-xl); }
.stack-item { display: flex; flex-direction: column; align-items: center; gap: var(--sp-xs); width: 84px; }
.stack-item .ico { width: 38px; height: 38px; border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; }
.stack-item span { font-size: 0.6875rem; text-align: center; color: var(--body-ink); font-weight: 600; }
.footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-xl); margin-bottom: var(--sp-xl); }
@media (max-width: 800px) { .footer-grid { grid-template-columns: 1fr; } }
.footer-grid h4 { font-family: var(--font-display); font-size: 0.875rem; font-weight: 600; margin: 0 0 var(--sp-sm); color: var(--ink); }
.footer-grid ul { margin: 0; padding: 0; list-style: none; font-size: 0.8125rem; color: var(--body-ink); }
.footer-grid li { margin-bottom: var(--sp-sm); display: flex; gap: var(--sp-xs); }
.footer-grid ul a { color: var(--primary); opacity: 1; }
/* footer sits on the fixed-dark ink band; the GitHub icon's fill defaults to the
   theme-toggling --text-secondary (dark gray in light mode), invisible on black */
.connect-row a[aria-label="GitHub"] svg { fill: var(--body-ink); }
.footer-grid .benefit-list li::before { content: ""; width: 14px; height: 14px; margin-top: 2px; flex-shrink: 0; border-radius: 50%;
  background: var(--primary); display: inline-block; }
.connect-row { display: flex; align-items: center; gap: var(--sp-sm); margin-top: var(--sp-md); }
.btn-solid {
  display: inline-flex; align-items: center; gap: var(--sp-xs); background: var(--primary); color: var(--on-primary);
  font-size: 0.875rem; font-weight: 600; padding: var(--sp-md) var(--sp-xl); border-radius: var(--r-xl); text-decoration: none;
}
.btn-solid:hover { background: var(--primary-active); }
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--sp-xs);
  font-size: 0.75rem; color: var(--body-ink); padding-top: var(--sp-md); border-top: 1px solid #cfdad1;
}

/* Mobile project layout */
@media (max-width: 700px) {
  html, body { max-width: 100%; overflow-x: hidden; }
  .wrap { width: 100%; padding-inline: 14px; }
  .nav-inner { display: block; min-height: 0; padding: 10px 14px 0; }
  .brand-group { gap: 4px 10px; }
  .brand { font-size: 0.95rem; }
  .brand .mark { width: 30px; height: 30px; }
  .brand-sub { width: 100%; padding-left: 40px; font-size: 0.7rem; }
  nav.links { width: calc(100% + 28px); margin: 9px -14px 0; padding: 0 14px 10px; gap: 18px; flex-wrap: nowrap; overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: thin; }
  nav.links a { flex: 0 0 auto; min-height: 36px; display: inline-flex; align-items: center; white-space: nowrap; }
  section[id], .bio-panel[id] { scroll-margin-top: 112px; }
  section.hero { padding: 16px 0 0; }
  .hero-grid { gap: 14px; }
  .hero-main { padding: 28px 18px 24px; border-radius: 18px; }
  .hero-scene { height: 92px; }
  .eyebrow { font-size: 0.65rem; line-height: 1.45; }
  h1.title { font-size: clamp(1.85rem, 10vw, 2.35rem); overflow-wrap: anywhere; }
  .lede { margin-bottom: 18px; font-size: 1rem; line-height: 1.55; }
  .stack-row { gap: 6px; margin-bottom: 16px; }
  .stack-chip { font-size: 0.72rem; }
  .stat-row, .dash-recap { gap: 8px; margin-bottom: 16px; }
  .stat-tile { min-width: 0; padding: 12px; }
  .stat-tile .label { min-height: 2.5em; font-size: 0.7rem; line-height: 1.25; }
  .stat-tile .value { font-size: 1.2rem; }
  .bio-panel { padding: 18px; border-radius: 18px; }
  section.block { padding: 32px 0; }
  .block-head { align-items: flex-start; }
  .block-head h2 { font-size: 1.45rem; overflow-wrap: anywhere; }
  .block-desc { font-size: 0.94rem; }
  .btn-link { width: 100%; min-height: 48px; justify-content: center; padding: 10px 14px; text-align: center; font-size: 0.9rem; }
  .two-col, .context-layout, .req-grid, .pipeline, .ai-layout { gap: 12px; }
  .card, .chart-card { min-width: 0; padding: 16px; border-radius: 16px; }
  .pipe-stage { padding: 0; }
  .pipe-card { min-height: 0; padding: 14px; }
  .schema-table { display: block; max-width: 100%; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; }
  .uml-wrap { margin-inline: -16px; padding: 0 16px 6px; overscroll-behavior-x: contain; -webkit-overflow-scrolling: touch; }
  .uml-svg { min-width: 560px; }
  .chart-wrap { margin-inline: -8px; padding: 0 8px 6px; overflow-x: auto; overscroll-behavior-x: contain; -webkit-overflow-scrolling: touch; }
  .bar-svg { min-width: 480px; }
  details.data-table { max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  details.data-table table { min-width: 430px; }
  .top-list li { display: grid; grid-template-columns: 20px minmax(0,1fr) auto; align-items: start; }
  .top-list .name { min-width: 0; overflow-wrap: anywhere; }
  .top-list .amount { padding-left: 4px; white-space: nowrap; }
  .chat-row { gap: 6px; }
  .chat-bubble { min-width: 0; padding: 10px; overflow-wrap: anywhere; }
  .ask-row { flex-direction: column; }
  .ask-row input { width: 100%; min-width: 0; }
  .ask-row button { width: 100%; min-height: 44px; }
  .ai-orb { width: min(220px, 76vw); height: min(220px, 76vw); }
  .stack-strip { justify-content: center; gap: 14px; }
  .footer-bottom { align-items: flex-start; flex-direction: column; }
}
@media (max-width: 380px) {
  .stat-row, .dash-recap { grid-template-columns: 1fr; }
  .stat-tile .label { min-height: 0; }
  .hero-main { padding-inline: 15px; }
  .card, .chart-card { padding: 14px; }
}
/* Show complete project information within the mobile viewport. */
@media (max-width: 700px) {
  html, body { width: 100%; max-width: 100%; overflow-x: clip; }
  .wrap, .nav-inner, .hero-grid, .hero-main, .hero-side, .card, .chart-card,
  .two-col, .context-layout, .req-grid, .pipeline, .ai-layout, .footer-grid {
    width: 100%; min-width: 0; max-width: 100%;
  }
  .schema-table {
    display: table; width: 100%; max-width: 100%; table-layout: fixed;
    overflow: visible; white-space: normal;
  }
  .schema-table th, .schema-table td {
    padding: 8px 6px; overflow-wrap: anywhere; word-break: break-word;
  }
  .uml-wrap, .chart-wrap {
    width: 100%; max-width: 100%; margin-inline: 0; padding-inline: 0;
    overflow: visible;
  }
  .uml-svg, .bar-svg {
    display: block; width: 100%; min-width: 0; max-width: 100%; height: auto;
  }
  details.data-table { width: 100%; max-width: 100%; overflow: visible; }
  details.data-table table { width: 100%; min-width: 0; table-layout: fixed; }
  details.data-table th, details.data-table td {
    padding: 7px 5px; overflow-wrap: anywhere; word-break: break-word;
  }
  .stack-strip { flex-wrap: wrap; }
  .stack-item { flex: 1 1 74px; width: auto; min-width: 0; }
}
.mobile-model-grid { display: none; }
@media (max-width: 700px) {
  nav.links {
    width: 100%; margin: 8px 0 0; padding: 0 0 10px;
    flex-wrap: wrap; gap: 6px 14px; overflow: visible;
  }
  nav.links a { min-height: 32px; white-space: normal; }
  .uml-svg { display: none; }
  .mobile-model-grid { display: grid; gap: 10px; }
  .mobile-model-grid article {
    display: grid; gap: 5px; min-width: 0; padding: 12px;
    border: 1px solid var(--border); border-radius: var(--r-md); background: var(--surface-1);
  }
  .mobile-model-grid strong {
    color: var(--primary); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: .78rem; overflow-wrap: anywhere;
  }
  .mobile-model-grid span { color: var(--text-secondary); font-size: .78rem; line-height: 1.45; }
  .chart-card { overflow: visible; }
  .chart-wrap { min-height: 150px; }
  details.data-table summary { padding-block: 10px; font-weight: 700; }
  .top-list li { grid-template-columns: 20px minmax(0,1fr); }
  .top-list .amount { grid-column: 2; padding: 4px 0 0; white-space: normal; }
}`;


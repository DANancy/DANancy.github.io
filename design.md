# Design: SEO Growth — Notes Section & Discoverability

Status: **Notes section on hold** (no new content for now) · Owner: Yangyang Cai · Last updated: 2026-11-02

## 0. Done: existing-content pass (2026-11-02, approved in chat)

No new content; only changes to how existing pages are built and described.

1. **Image weight**: 16 heavy images get web-sized WebP copies in `src/assets/optimized/` (`scripts/optimize-images.mjs`); the largest image on any page dropped from 4.5 MB to 282 KB. Originals untouched.
2. **Headings & name**: home h1 → `i’m Yangyang Cai` / `我是蔡阳阳`; Business offerings promoted h4 → h3 with anchors `#mentoring`, `#bootcamp`, `#workshops` (also listed in `llms.txt`); avatar alt text added.
3. **Titles**: Business → `Practical AI Workshops & Data Engineering Bootcamp in Melbourne`; Chinese About/Work/Business/Community titles made descriptive.

## 0b. Done: performance & security pass (2026-11-05, approved in chat)

1. **Mobile speed**: orchard backdrop no longer preloaded at high priority (`fetchPriority="low"`), phones get a 1024px copy (77 KB vs 234 KB); Google Analytics loads `lazyOnload`.
2. **Crawlable links**: all Links-page friend groups render in HTML (inactive tabs use `hidden`), so People and Tools entries are indexable.
3. **New tool links**: FAT Agent (spruikco/fat-agent-skill) and Agent Skills by mblode added to Fun → "Creative Systems I'm Exploring" (not "Made by friends": neither is by a friend).
4. **Security**: case-study chat renders visitor questions as text, not HTML; Next.js 16.2.10 → 16.4.5 (clears the critical advisory); `npm audit fix` leaves 8 moderate lint-tool-only findings.

5. **Follow-ups (2026-11-06)**: MAP Connect 03 (Yangyang as guest) featured first on Community with `PodcastEpisode` JSON-LD and an llms.txt entry; heading order fixed on Business and Fun (tags only, pixel-identical); EN/中文/Register-interest accessible names now include the visible text; desktop hash links no longer shift the window; CI on Node 22 with checkout/setup-node v5; README refreshed.

6. **Phone nav (2026-11-06, chosen by owner)**: the bottom bar is a swipeable row of icon + label links with the current page centred, replacing the 7-column dock whose cells were narrower than the links (labels overlapped); extra end space keeps Connect clear of the Register interest tab.

7. **Home event button (2026-11-08, owner's design)**: an orange pill next to "Leave me a note" (same style) linking straight to the Community event card (`/community/#next-map-event`). Labels follow `mapEvent.date` in `src/data/desktop.ts`: "Upcoming event / 近期活动" and "Next MAP event" until that day ends (Melbourne), then "Latest event / 最新活动" and "Latest MAP event". Static HTML uses the build time; browsers re-check with their own clock. For a new event, update the date with the poster and link; set `eventShortcut` to `null` to hide the button.

8. **Measurement & small fixes (2026-11-08, from a FAT Agent audit)**: Google Analytics now queues calls from first paint and sends the landing `page_view` explicitly (the deferred loader had been dropping it); later navigations are left to GA4 Enhanced Measurement's history-change page views, so they are not double-counted; new events `generate_lead` (interest form) and `guestbook_note`, sent via `trackEvent()` in `src/components/analytics/GoogleAnalytics.tsx`. Home and case-study descriptions shortened to under 155 characters; added `theme-color`, `referrer` and a 180px `apple-icon.png`.

Not done (needs owner or design decision): undeploy the unused `knowledge-agent-interest` Apps Script; self-host fonts (372 KB, also fixes the flaky build); privacy page for GA and form data; colour contrast of the orange home heading (#ed8b00, 2.53:1) and a Fun-page label (#b86632 on #f7eee8, 3.68:1); mobile podcast cards are wider than their shelf and clip on the right.

Sections below are the deferred Notes plan, kept for when writing becomes possible.


## 1. Problem → Cause → Solution

| | |
|---|---|
| **Problem** | People who don't already know "Yangyang Cai" can't find the site. Even the brand query is crowded by academics named Yang Cai. |
| **Cause** | The site has ~9 indexable pages, all about *who I am*. None answer a question anyone searches for, so there is nothing to rank for non-brand queries, and little for other sites to link to. |
| **Solution** | Add a **Notes** section: practical, original write-ups on topics I already teach and work on. Each note targets one validated search topic and links readers to the workshop/bootcamp/mentoring pages. |

Technical SEO (canonical, hreflang, structured data, OG images, sitemap, llms.txt) is already done (commit `c73e53b`). This design is about **content and discoverability**, not more metadata.

## 2. Goals & non-goals

**Goals**
1. Rank on page 1 in Google AU for the brand queries `Yangyang Cai` and `蔡阳阳`.
2. Earn impressions for 5+ non-brand queries within 3 months of the first note.
3. Every note gives readers a next step (workshop, bootcamp, or mentoring interest form).

**Non-goals**
- No CMS, no comments, no newsletter platform.
- No machine-translated Chinese pages: a Chinese note exists only when I've written or reviewed it.
- No change to the existing desktop/window experience beyond adding a Notes entry point.

## 3. Proposed changes

### 3.1 Notes section (core)

**URLs**
- `/notes/`: index of all notes, newest first
- `/notes/<slug>/`: one note, e.g. `/notes/lgc-stc-shortfall-explained/`
- `/zh-hans/notes/<slug>/`: only when a Chinese version exists

**Rendering: standalone static pages, not inside the desktop window.**
The desktop UI is a client component. Notes must be plain server-rendered HTML with their own `<h1>`, so crawlers and AI engines get the full text instantly. Visually they reuse the existing window chrome (traffic-light bar, title `notes/<slug>.md`) so they still feel like part of the site.

```
┌─ ● ● ●        notes/lgc-stc-shortfall-explained.md ─────────┐
│  ← Yangyang Cai / Notes                                     │
│                                                             │
│  How Australia's LGC & STC shortfall works                  │  ← h1
│  12 Nov 2026 · 8 min read · Data engineering, Energy        │
│                                                             │
│  [TL;DR box: 3 bullet answer]                               │  ← quotable by AI engines
│  ...article body (h2 / h3, code, images, tables)...         │
│                                                             │
│  ┌ Want to build this yourself? ──────────────────────────┐ │
│  │ AI-Data Engineering Bootcamp → [Register interest]     │ │  ← CTA to /business/
│  └────────────────────────────────────────────────────────┘ │
│  Related: case study · other notes                          │
└─────────────────────────────────────────────────────────────┘
```

**Authoring: one Markdown file per note** in `content/notes/<slug>.md` (and `<slug>.zh-hans.md` for a Chinese version):

```markdown
---
title: How Australia's LGC & STC shortfall works
description: A data walkthrough of Clean Energy Regulator shortfall data...
published: 2026-11-12
updated: 2026-11-12
tags: [Data engineering, Renewable energy]
tldr:
  - ...
cta: bootcamp        # bootcamp | workshop | mentoring
---
Body in Markdown.
```

- Parsing: `gray-matter` (frontmatter) + `marked` (Markdown → HTML) at build time. These are the only new dependencies, and nothing extra ships to the browser.
- Why Markdown rather than MDX: it's easier for me to write and needs no JSX knowledge. MDX can be added later if a note needs interactive charts.

**SEO/GEO built in (automatic per note)**
- `BlogPosting` JSON-LD: author = existing `#person` entity, `datePublished`, `dateModified`, `inLanguage`
- `BreadcrumbList`: Home → Notes → note
- Generated 1200×630 OG card per note (reuses `renderOgCard`)
- Sitemap entries with `lastmod` from `updated`
- `llms.txt` "Notes" list generated at build (moves from a static file to a route handler)
- RSS feed at `/notes/feed.xml`, for feed readers and AI crawlers

### 3.2 Entry points (internal links)

| Where | Change |
|---|---|
| Desktop navigation | Add a **Notes** item (links out to `/notes/`, like the case study link) |
| Home overview | "Latest notes" strip showing the 3 newest titles |
| Case study page | "Related notes" links at the bottom |
| Business page | Notes tagged to a service appear under that service |

### 3.3 Home "at a glance" facts (small, optional)

A one-line strip under the home intro, built only from facts already on the site:

`10+ yrs data engineering · Renewable energy · 2 bootcamp cohorts · 25 workshop participants · 4.45/5 rating`

This gives the home page (currently ~160 words) concrete, quotable facts. It's a visible design change, so it needs your yes/no.

### 3.4 Build reliability

Self-host the 4 Google fonts with `next/font/local`. This removes the intermittent Turbopack font failure that currently relies on the 3-attempt retry in CI. No visual change is intended. It needs a before/after screenshot check.

## 4. Content plan: first 3 notes (topics to validate in Google Trends first)

| # | Working title | Target topic | Why me | CTA |
|---|---|---|---|---|
| 1 | How Australia's LGC & STC shortfall works: a data walkthrough | `LGC shortfall`, `renewable energy certificates` | Builds on the existing case study; few competing write-ups | Bootcamp |
| 2 | Letting an AI agent query your Power BI model with MCP | `Power BI MCP`, `MCP server` | Taught in the bootcamp; topic is new, so results are thin | Bootcamp |
| 3 | Build a personal knowledge agent in an afternoon | `knowledge agent`, `AI workshop Melbourne` | Same outcome as the paid workshops | Workshop |

Cadence: one note every 2 weeks. I write the substance, and Claude can help with outline, editing, and SEO fields. Original experience is what ranks and what AI engines cite.

Trends checks to run before writing (AU, past 12 months unless noted):
1. `data engineer` vs `AI engineer` vs `analytics engineer` (5 years): which title to lead with
2. `Databricks` vs `Microsoft Fabric` vs `Snowflake` vs `dbt`
3. `Power BI MCP` vs `MCP server` vs `Databricks Genie` (worldwide)
4. `AI course` vs `AI workshop` vs `AI training` (Victoria)

Use **Related queries → Rising** to pick each note's exact title phrasing.

## 5. Off-site actions (no code, owner: Yangyang)

1. **Google Search Console**: verify the domain via DNS, submit `sitemap.xml`, request indexing of `/`. Then import into **Bing Webmaster Tools**.
2. **Backlinks I control**: LinkedIn website field + Featured; GitHub profile README; Make AI Practical bio; podcast show notes; Meetup/Eventbrite event pages.
3. **Consistent name** everywhere: "Yangyang Cai (蔡阳阳)".

## 6. Rollout (lean increments)

| Phase | Scope | Size |
|---|---|---|
| P0 | Search Console + Bing (you); self-hosted fonts (3.4) | ~1 hr |
| P1 | Notes MVP: index + note page + schema + sitemap + OG + nav link, published with note #1 | 1 session |
| P2 | Latest-notes strip, related notes, RSS, generated llms.txt, at-a-glance strip (if approved) | 1 session |
| P3 | Chinese notes as written; cadence continues | ongoing |

## 7. Success metrics (from Search Console, reviewed monthly)

- Brand: `Yangyang Cai` average position ≤ 3
- Non-brand: ≥ 5 queries with impressions, 3 months after note #1
- Conversion: interest-form submissions referred from `/notes/` (GA4 event)

## 8. Decisions needed

1. **Section name**: `Notes` (recommended; fits the desktop "files" metaphor) vs `Blog` vs `Articles`.
2. **Language**: English-first, adding a Chinese version only when written (recommended), vs always bilingual.
3. **At-a-glance strip (3.3)**: yes / no.
4. **Self-hosted fonts (3.4)**: include in P0: yes / no.
5. **First note**: #1 (recommended; reuses existing case study material) / #2 / #3.

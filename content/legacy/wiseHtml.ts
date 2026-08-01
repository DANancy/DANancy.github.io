/* eslint-disable */
export const wiseBodyHtml = `
<header class="site-nav">
  <div class="nav-inner">
    <div class="brand-group">
      <div class="brand"><span class="mark">YC</span> Yangyang Cai</div>
      <span class="brand-sub">2026 Winter Data Engineering Bootcamp</span>
    </div>
    <nav class="links">
      <a href="#overview">Overview</a>
      <a href="#context">Business Context</a>
      <a href="#architecture">Architecture</a>
      <a href="#data-model">Data Model</a>
      <a href="#dashboard">Dashboard</a>
      <a href="#ai">AI Assistant</a>
      <a href="#stack">Tech Stack</a>
    </nav>
  </div>
</header>

<div class="wrap">

<section class="hero" id="overview">
  <div class="hero-grid">
    <div class="hero-left-col">
    <div class="hero-main">
      <svg class="hero-scene" viewBox="0 0 800 130" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,90 C120,50 220,110 340,70 C460,35 560,95 680,60 C740,45 780,55 800,50 L800,130 L0,130 Z" fill="var(--series-aqua)" opacity="0.18"/>
        <path d="M0,110 C140,80 260,125 400,95 C540,68 640,120 800,90 L800,130 L0,130 Z" fill="var(--series-blue)" opacity="0.14"/>
        <g stroke="var(--text-muted)" stroke-width="1.4" opacity="0.5">
          <line x1="700" y1="118" x2="700" y2="55"/>
          <line x1="700" y1="55" x2="680" y2="40"/>
          <line x1="700" y1="55" x2="722" y2="42"/>
          <line x1="700" y1="55" x2="700" y2="30"/>
        </g>
      </svg>
      <span class="eyebrow">Portfolio Project · 2026 Winter Data Engineering Bootcamp</span>
      <h1 class="title">Green Certificate<span class="accent">Shortfall Analytics</span></h1>

      <div class="stack-row">
        <span class="stack-chip"><span class="ico" style="background:var(--series-blue)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 21V9l9-6 9 6v12H3z"/><path d="M9 21v-8h6v8"/></svg>
        </span>Azure Data Factory</span>
        <span class="stack-chip"><span class="ico" style="background:var(--series-red)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>
        </span>Databricks</span>
        <span class="stack-chip"><span class="ico" style="background:var(--series-yellow)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/></svg>
        </span>Power BI</span>
        <span class="stack-chip"><span class="ico" style="background:var(--series-violet)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
        </span>AI + MCP</span>
      </div>

      <p class="lede">An end-to-end data platform concept for monitoring Australia's Renewable Energy Certificate (LGC / STC) shortfalls, built on real public register data from the Clean Energy Regulator.</p>
    </div>

    <section class="block" id="context">
      <div class="block-head"><span class="block-num">1</span><h2>Business Context</h2></div>

      <div class="context-layout">
        <div>
          <h3 class="req-heading">Business Problem</h3>
          <p class="block-desc">Liable entities under Australia's Renewable Energy Target scheme — electricity retailers and large energy users — must surrender enough Large-scale Generation Certificates (LGCs) and Small-scale Technology Certificates (STCs) each year to cover their obligations. When they fall short, a shortfall charge applies and the shortfall is recorded on the Clean Energy Regulator's public register. That register is published as a flat, biannual spreadsheet with no easy way to see <em>who</em> is falling short, <em>how</em> shortfalls trend over time, or <em>which</em> entities carry the largest outstanding balances — so regulators, analysts, and the liable entities themselves have no single place to monitor this compliance risk.</p>
          <a class="btn-link" href="https://cer.gov.au/markets/reports-and-data/certificate-shortfall-register" target="_blank" rel="noopener">Learn More About REC Market →</a>
        </div>
        <div class="rec-diagram-img">
          <img src="/assets/certificate-market.webp" width="1400" height="815" alt="Diagram of the Renewable Energy Certificate market showing supply (small-scale and large-scale generators) flowing through the REC Registry to demand (liable entities and government purchases)" loading="lazy">
        </div>
      </div>

      <div class="req-grid">
        <div class="card">
          <h3 class="req-heading">Project Scope</h3>
          <p class="req-label good">In scope</p>
          <ul class="req-list">
            <li>Ingest and model the CER's published LGC and STC shortfall registers</li>
            <li>Compute entity-level and year-level shortfall trends from the real data</li>
            <li>Present the data as an interactive dashboard with drill-down to top offenders</li>
            <li>Provide a natural-language query interface over the dataset</li>
          </ul>
          <p class="req-label muted">Out of scope</p>
          <ul class="req-list">
            <li>Real-time register updates — CER publishes twice yearly; this reflects a point-in-time snapshot (2026-07-03)</li>
            <li>Forecasting or predicting future shortfalls</li>
            <li>Certificate types outside LGC/STC (e.g. ACCUs)</li>
          </ul>
        </div>

        <div class="card">
          <h3 class="req-heading">Functional Requirements</h3>
          <ul class="req-list numbered">
            <li><strong>FR1</strong> Ingest the published LGC and STC shortfall CSV registers</li>
            <li><strong>FR2</strong> Compute total and per-entity shortfall by assessment year</li>
            <li><strong>FR3</strong> Display year-over-year shortfall trends as charts</li>
            <li><strong>FR4</strong> Rank and display top liable entities by cumulative shortfall</li>
            <li><strong>FR5</strong> Let users ask natural-language questions and get an answer grounded in the data</li>
            <li><strong>FR6</strong> Visualize the underlying dimensional data model</li>
          </ul>
        </div>

        <div class="card">
          <h3 class="req-heading">Non-Functional Requirements</h3>
          <ul class="req-list numbered">
            <li><strong>NFR1</strong> Core browsing works entirely client-side on static hosting — no backend required</li>
            <li><strong>NFR2</strong> Usable on both desktop and mobile viewports</li>
            <li><strong>NFR3</strong> AI Query degrades gracefully to a local rule-based fallback if no AI backend is configured, so it never appears broken</li>
            <li><strong>NFR4</strong> No secret credentials exposed in client-side code (AI backend key stays server-side)</li>
            <li><strong>NFR5</strong> Meets basic accessibility practice — sufficient color contrast, non-color-only indicators, dark/light mode support</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="block" id="architecture">
      <div class="block-head"><span class="block-num">2</span><h2>Solutions Architecture</h2></div>
      <p class="block-desc">Conceptual pipeline for turning the CER's published registers into governed, queryable analytics — this project implements the source ingestion and dashboard layers below using the real register data; the orchestration/AI layers illustrate the intended target design.</p>

      <div class="pipeline">
        <div class="pipe-stage">
          <div class="pipe-card">
            <div class="pipe-icon" style="background:var(--text-muted)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 4v16"/></svg>
            </div>
            <strong>Source Systems</strong>
            <ul>
              <li>REC Registry</li>
              <li>Liable Entities</li>
              <li>Reference Data</li>
              <li>External Systems</li>
            </ul>
          </div>
          <svg class="pipe-connector" viewBox="0 0 16 12"><path d="M0 6h14M9 1l5 5-5 5" stroke="var(--text-muted)" stroke-width="1.6" fill="none"/></svg>
        </div>

        <div class="pipe-stage">
          <div class="pipe-card">
            <div class="pipe-icon" style="background:var(--series-blue)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 21V9l9-6 9 6v12H3z"/><path d="M9 21v-8h6v8"/></svg>
            </div>
            <strong>Azure Data Factory</strong>
            <ul>
              <li>Ingestion</li>
              <li>Orchestration</li>
              <li>Scheduling</li>
              <li>Monitoring</li>
            </ul>
          </div>
          <svg class="pipe-connector" viewBox="0 0 16 12"><path d="M0 6h14M9 1l5 5-5 5" stroke="var(--text-muted)" stroke-width="1.6" fill="none"/></svg>
        </div>

        <div class="pipe-stage">
          <div class="pipe-card">
            <div class="pipe-icon" style="background:var(--series-red)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>
            </div>
            <strong>Databricks <small style="font-weight:400;color:var(--text-muted)">(Medallion)</small></strong>
            <div class="medallion-row">
              <div class="medallion"><svg width="20" height="20" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#b06b3a"/><path d="M4 6v10c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="#c98a54"/></svg>Bronze</div>
              <div class="medallion"><svg width="20" height="20" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#9ba3ab"/><path d="M4 6v10c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="#c2c8cd"/></svg>Silver</div>
              <div class="medallion"><svg width="20" height="20" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#c98500"/><path d="M4 6v10c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="#eda100"/></svg>Gold</div>
            </div>
            <ul>
              <li>Raw ingestion</li>
              <li>Cleansed &amp; standardized</li>
              <li>Business model, aggregated</li>
            </ul>
          </div>
          <svg class="pipe-connector" viewBox="0 0 16 12"><path d="M0 6h14M9 1l5 5-5 5" stroke="var(--text-muted)" stroke-width="1.6" fill="none"/></svg>
        </div>

        <div class="pipe-stage">
          <div class="pipe-card">
            <div class="pipe-icon" style="background:var(--series-yellow)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/></svg>
            </div>
            <strong>Power BI</strong>
            <ul>
              <li>Semantic model</li>
              <li>Reports</li>
              <li>Dashboards</li>
              <li>Insights</li>
            </ul>
          </div>
          <svg class="pipe-connector" viewBox="0 0 16 12"><path d="M0 6h14M9 1l5 5-5 5" stroke="var(--text-muted)" stroke-width="1.6" fill="none"/></svg>
        </div>

        <div class="pipe-stage">
          <div class="pipe-card">
            <div class="pipe-icon" style="background:var(--series-violet)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
            </div>
            <strong>AI Layer (MCP)</strong>
            <ul>
              <li>MCP Server</li>
              <li>Query Bot</li>
              <li>Dashboard Assistant</li>
              <li>NLQ &amp; Insights</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="feedback-loop">↩ Metadata, Lineage, Monitoring &amp; Security — spans every stage of the pipeline</div>
    </section>
    </div>

    <aside class="bio-panel">
      <div class="avatar-photo">YC</div>
      <h2>Yangyang Cai</h2>
      <div class="role">Senior Data Engineer | Data &amp; AI Lecturer, Make AI Practical</div>
      <p>Senior Data Engineer in Australia's renewable energy industry with 10+ years of experience in data engineering, data platforms, and analytics. Passionate about building real-world data solutions and empowering learners with practical skills.</p>

      <div class="icon-row">
        <a href="https://www.linkedin.com/in/yangyangcai" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--series-blue)"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
        </a>
        <a href="https://github.com/DANancy" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-secondary)"><path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.21-3.37-1.21-.45-1.17-1.11-1.48-1.11-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"/></svg>
        </a>
      </div>

      <div class="bio-section">
        <h3>Core Skills</h3>
        <div class="skill-chips">
          <span class="skill-chip">SQL</span>
          <span class="skill-chip">Python</span>
          <span class="skill-chip">Databricks</span>
          <span class="skill-chip">Microsoft Fabric</span>
          <span class="skill-chip">Power BI</span>
          <span class="skill-chip">Data Modeling</span>
          <span class="skill-chip">Data Engineering</span>
          <span class="skill-chip">AI &amp; LLM</span>
        </div>
      </div>

      <div class="bio-section">
        <h3>Certifications &amp; Achievements</h3>
        <ul>
          <li>Microsoft Certified: Fabric Data Engineer Associate</li>
          <li>Databricks Certified Data Engineer Associate</li>
          <li>Shell Energy Australia — Best of 2024 Award</li>
          <li>AGL Data &amp; Analytics Academy — Top Learner</li>
          <li>Omdena Lead ML Engineer</li>
          <li>AI Hackathon Winner</li>
        </ul>
      </div>

      <div class="bio-section">
        <h3>Community &amp; Teaching</h3>
        <ul>
          <li>Data Engineering Bootcamp Instructor</li>
          <li>AI Workshop Instructor</li>
          <li>Make AI Practical (MAP) — Community Volunteer &amp; Organizer</li>
        </ul>
      </div>
    </aside>
  </div>
</section>

<section class="block" id="data-model">
  <div class="block-head"><span class="block-num">3</span><h2>Data Model</h2></div>
  <p class="block-desc">UML class diagram of the dimensional model, derived from the two source registers' actual published columns. Shared dimensions (<code>liable_entity</code>, <code>assessment_year</code>) link both fact classes.</p>
  <div class="card uml-wrap">
    <svg viewBox="0 0 900 470" class="uml-svg" role="img" aria-label="UML class diagram of the shortfall data model">
      <!-- connectors -->
      <g fill="none" stroke="var(--baseline)" stroke-width="1.4">
        <path d="M270,95 L420,95 L420,135 L580,135"/>
        <path d="M270,95 L440,95 L440,355 L580,355"/>
        <path d="M270,365 L460,365 L460,135 L580,135"/>
        <path d="M270,365 L500,365 L500,355 L580,355"/>
      </g>
      <g font-size="10.5" fill="var(--text-muted)" font-family="system-ui, sans-serif">
        <text x="278" y="90">1</text>
        <text x="278" y="360">1</text>
        <text x="572" y="130" text-anchor="end">0..*</text>
        <text x="572" y="350" text-anchor="end">0..*</text>
      </g>

      <!-- dim_liable_entity -->
      <g>
        <rect x="20" y="60" width="250" height="70" rx="6" fill="var(--card)" stroke="var(--border)"/>
        <rect x="20" y="60" width="250" height="30" rx="6" fill="var(--text-muted)" opacity="0.15"/>
        <line x1="20" y1="90" x2="270" y2="90" stroke="var(--border)"/>
        <text x="34" y="80" font-size="12.5" font-weight="700" fill="var(--text-primary)" font-family="system-ui, sans-serif">«dimension» dim_liable_entity</text>
        <text x="34" y="110" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">+ liable_entity : string {PK}</text>
      </g>

      <!-- dim_assessment_year -->
      <g>
        <rect x="20" y="330" width="250" height="70" rx="6" fill="var(--card)" stroke="var(--border)"/>
        <rect x="20" y="330" width="250" height="30" rx="6" fill="var(--text-muted)" opacity="0.15"/>
        <line x1="20" y1="360" x2="270" y2="360" stroke="var(--border)"/>
        <text x="34" y="350" font-size="12.5" font-weight="700" fill="var(--text-primary)" font-family="system-ui, sans-serif">«dimension» dim_assessment_year</text>
        <text x="34" y="380" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">+ assessment_year : int {PK}</text>
      </g>

      <!-- fact_lgc_shortfall -->
      <g>
        <rect x="580" y="10" width="300" height="250" rx="6" fill="var(--card)" stroke="var(--border)"/>
        <rect x="580" y="10" width="300" height="30" rx="6" fill="var(--series-blue)" opacity="0.15"/>
        <line x1="580" y1="40" x2="880" y2="40" stroke="var(--border)"/>
        <text x="594" y="30" font-size="12.5" font-weight="700" fill="var(--series-blue)" font-family="system-ui, sans-serif">«fact» fact_lgc_shortfall</text>
        <g font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
          <text x="594" y="58" font-weight="700" fill="var(--text-primary)">+ liable_entity : string {FK}</text>
          <text x="594" y="80" font-weight="700" fill="var(--text-primary)">+ assessment_year : int {FK}</text>
          <text x="594" y="102" fill="var(--text-secondary)">lgc_liability : int</text>
          <text x="594" y="124" fill="var(--text-secondary)">lgcs_accepted_for_surrender : int</text>
          <text x="594" y="146" fill="var(--text-secondary)">remaining_lgc_shortfall : int</text>
          <text x="594" y="168" fill="var(--text-secondary)">shortfall_pct_of_liability : decimal</text>
          <text x="594" y="190" fill="var(--text-secondary)">shortfall_charge_issued : bool</text>
          <text x="594" y="212" fill="var(--text-secondary)">value_of_shortfall_charge : decimal</text>
          <text x="594" y="234" fill="var(--text-secondary)">shortfall_status : string</text>
        </g>
      </g>

      <!-- fact_stc_shortfall -->
      <g>
        <rect x="580" y="290" width="300" height="140" rx="6" fill="var(--card)" stroke="var(--border)"/>
        <rect x="580" y="290" width="300" height="30" rx="6" fill="var(--series-aqua)" opacity="0.15"/>
        <line x1="580" y1="320" x2="880" y2="320" stroke="var(--border)"/>
        <text x="594" y="310" font-size="12.5" font-weight="700" fill="var(--series-aqua)" font-family="system-ui, sans-serif">«fact» fact_stc_shortfall</text>
        <g font-size="12" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace">
          <text x="594" y="338" font-weight="700" fill="var(--text-primary)">+ liable_entity : string {FK}</text>
          <text x="594" y="360" font-weight="700" fill="var(--text-primary)">+ assessment_year : int {FK}</text>
          <text x="594" y="382" fill="var(--text-secondary)">stc_shortfall : int</text>
          <text x="594" y="404" fill="var(--text-secondary)">value_of_shortfall_charge : decimal</text>
        </g>
      </g>
    </svg>
    <div class="note">Sources: LGC and STC certificate shortfall registers (CER). {PK} = dimension key, {FK} = foreign key into the dimension.</div>
  </div>
</section>

<section class="block" id="dashboard">
  <div class="block-head"><span class="block-num">4</span><h2>Dashboard</h2></div>
  <p class="block-desc">Live figures computed directly from the CER's published LGC and STC shortfall registers (downloaded 2026-07-03).</p>

  <div class="dash-recap">
    <div class="stat-tile"><div class="label">Liable Entities — LGC</div><div class="value blue">69</div></div>
    <div class="stat-tile"><div class="label">Liable Entities — STC</div><div class="value blue">55</div></div>
    <div class="stat-tile"><div class="label">Total Remaining Shortfall — LGC</div><div class="value aqua">10.25M</div></div>
    <div class="stat-tile"><div class="label">Total Shortfall — STC</div><div class="value aqua">293K</div></div>
  </div>

  <div class="two-col" style="margin-bottom:1.5rem;">
    <div class="chart-card">
      <h3>Remaining LGC Shortfall by Assessment Year</h3>
      <p class="chart-note">Certificates still outstanding, by the year they were assessed.</p>
      <div class="chart-wrap"><svg class="bar-svg" id="chart-lgc" viewBox="0 0 640 220"></svg><div class="chart-tooltip" id="tt-lgc"></div></div>
      <details class="data-table"><summary>View data table</summary><table id="table-lgc"></table></details>
    </div>
    <div class="chart-card">
      <h3>STC Shortfall by Assessment Year</h3>
      <p class="chart-note">Small-scale Technology Certificate shortfall since scheme start (2011).</p>
      <div class="chart-wrap"><svg class="bar-svg" id="chart-stc" viewBox="0 0 640 220"></svg><div class="chart-tooltip" id="tt-stc"></div></div>
      <details class="data-table"><summary>View data table</summary><table id="table-stc"></table></details>
    </div>
  </div>

  <div class="two-col" style="margin-bottom:1.5rem;">
    <div class="card">
      <h3>Top Liable Entities — Cumulative LGC Shortfall</h3>
      <ul class="top-list" id="top-lgc"></ul>
    </div>
    <div class="card">
      <h3>Top Liable Entities — Cumulative STC Shortfall</h3>
      <ul class="top-list" id="top-stc"></ul>
    </div>
  </div>

  <a class="btn-link" href="https://cer.gov.au/markets/reports-and-data/certificate-shortfall-register" target="_blank" rel="noopener">View Source Register →</a>
</section>

<section class="block" id="ai">
  <div class="block-head"><span class="block-num">5</span><h2>AI Query Assistant</h2></div>
  <p class="block-desc">Ask a question about the register data below — answered instantly by a rule-based engine running entirely in your browser against the real CER figures (no external AI call, so no API key or server involved).</p>
  <div class="ai-layout">
    <div>
      <div class="chat-thread" id="chat-thread">
        <div class="chat-row">
          <div class="chat-avatar user">YC</div>
          <div class="chat-bubble q">Which assessment year has the highest LGC shortfall?</div>
        </div>
        <div class="chat-row">
          <div class="chat-avatar bot">AI</div>
          <div class="chat-bubble a">2023, with approximately 4.07M certificates in remaining LGC shortfall — the largest of any year on record.<span class="src">Source: Gold layer — fact_lgc_shortfall</span></div>
        </div>
      </div>
      <form id="ask-form" class="ask-row">
        <input id="ask-input" type="text" placeholder="Ask about LGC/STC shortfalls, entities, or years…" autocomplete="off">
        <button type="submit">Ask</button>
      </form>
    </div>
    <div>
      <div class="ai-orb">
        <div class="ai-orb-ring"></div>
        <div class="ai-orb-core">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
        </div>
        <div class="ai-orb-chip" style="top:6px; left:50%; transform:translateX(-50%);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--series-yellow)" stroke-width="2"><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/></svg>
        </div>
        <div class="ai-orb-chip" style="bottom:20px; left:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--series-red)" stroke-width="2"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>
        </div>
        <div class="ai-orb-chip" style="bottom:20px; right:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--series-blue)" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M10 4v16"/></svg>
        </div>
      </div>
      <p style="text-align:center;" class="chart-note">Try one</p>
      <button type="button" class="example-q" data-q="How many liable entities have ever had an STC shortfall?">How many liable entities have ever had an STC shortfall?</button>
      <button type="button" class="example-q" data-q="Compare LGC and STC shortfall trends">Compare LGC and STC shortfall trends</button>
      <button type="button" class="example-q" data-q="Why did STC shortfall spike in 2022?">Why did STC shortfall spike in 2022?</button>
      <button type="button" class="example-q" data-q="What is the total LGC shortfall?">What is the total LGC shortfall?</button>
    </div>
  </div>
</section>

</div>

<footer class="site-footer" id="stack">
  <div class="wrap">
    <div class="stack-strip">
      <div class="stack-item">
        <div class="ico" style="background:var(--series-blue)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 21V9l9-6 9 6v12H3z"/><path d="M9 21v-8h6v8"/></svg></div>
        <span>Azure Data Factory</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-red)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg></div>
        <span>Databricks</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-aqua)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 3 5 19h14L12 3z"/></svg></div>
        <span>Delta Lake</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-yellow)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/></svg></div>
        <span>Power BI</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-blue)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6l-9-4z"/></svg></div>
        <span>Azure AD</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-violet)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg></div>
        <span>MCP</span>
      </div>
      <div class="stack-item">
        <div class="ico" style="background:var(--series-orange)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01"/></svg></div>
        <span>Python</span>
      </div>
    </div>

    <div class="footer-grid">
      <div>
        <h4>Key Benefits</h4>
        <ul class="benefit-list">
          <li>End-to-end automated data pipeline</li>
          <li>Reliable, scalable platform on Azure</li>
          <li>Medallion architecture for data quality &amp; governance</li>
          <li>Actionable insights via Power BI dashboards</li>
          <li>AI-powered natural language querying</li>
        </ul>
      </div>
      <div>
        <h4>About This Project</h4>
        <ul>
          <li>Portfolio project for the 2026 Winter Data Engineering Bootcamp</li>
          <li>Dashboard figures sourced live from the CER Certificate Shortfall Register</li>
          <li><a href="https://cer.gov.au/markets/reports-and-data/certificate-shortfall-register" target="_blank" rel="noopener">View source data →</a></li>
        </ul>
      </div>
      <div>
        <h4>Let's Connect</h4>
        <div class="connect-row">
          <a class="btn-solid" href="https://www.linkedin.com/in/yangyangcai" target="_blank" rel="noopener">Let's Connect</a>
          <a href="https://www.linkedin.com/in/yangyangcai" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--series-blue)"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
          <a href="https://github.com/DANancy" target="_blank" rel="noopener" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-secondary)"><path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.21-3.37-1.21-.45-1.17-1.11-1.48-1.11-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Yangyang Cai</span>
      <span>Data source: Clean Energy Regulator, Certificate Shortfall Register</span>
    </div>
  </div>
</footer>
`;

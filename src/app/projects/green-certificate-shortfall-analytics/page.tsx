"use client";

import { useEffect } from "react";
import { wiseBodyHtml } from "@/content/legacy/wiseHtml";
import { wiseCss } from "@/content/legacy/wiseCss";

const LGC_YEARS = ["2001", "2002", "2003", "2004", "2005", "2007", "2009", "2010", "2011", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
const LGC_VALUES = [372, 38, 13, 20, 18, 9, 15671, 1606, 2427, 120, 29, 10918, 233376, 16785, 54, 5235, 14804, 1967, 87744, 4073899, 3826115, 1963154];
const STC_YEARS = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
const STC_VALUES = [19772, 13304, 4342, 23623, 2847, 14801, 7039, 702, 4046, 58547, 19954, 106105, 16614, 1717];

const TOP_LGC: [string, number][] = [
  ["Red Energy Pty. Limited", 2550564],
  ["Alinta Energy Retail Sales Pty. Ltd.", 2090641],
  ["AGL Sales Pty Limited", 2071485],
  ["Alinta Sales Pty Ltd", 1130684],
  ["Aurora Energy Pty Ltd", 761161],
  ["IPOWER 2 PTY LIMITED / IPOWER PTY LIMITED TA ENGIE", 582164],
];
const TOP_STC: [string, number][] = [
  ["Qenergy Limited (Receivers & Managers Appointed)", 82786],
  ["Blue NRG Pty. Ltd.", 27689],
  ["MOJO POWER EAST PTY LTD", 25391],
  ["Mojo Power Pty Ltd (Receivers & Managers Appointed)", 21749],
  ["BHP Billiton Iron Ore Pty Limited", 20520],
  ["Qenergy Limited (In Liquidation)", 18703],
];

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace(/\.00$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function GreenCertificateLegacyPage() {
  useEffect(() => {
    const svgNS = "http://www.w3.org/2000/svg";
    function el(tag: string, attrs: Record<string, string | number>) {
      const e = document.createElementNS(svgNS, tag);
      for (const k in attrs) e.setAttribute(k, String(attrs[k]));
      return e;
    }

    function drawBarChart(svgId: string, ttId: string, years: string[], values: number[], color: string) {
      const svg = document.getElementById(svgId);
      const tt = document.getElementById(ttId);
      if (!svg || !tt) return;
      const W = 640, H = 220, padL = 34, padB = 26, padT = 14, padR = 6;
      const innerW = W - padL - padR, innerH = H - padT - padB;
      const max = Math.max(...values);
      const n = values.length;
      const gap = 4;
      const barW = (innerW - gap * (n - 1)) / n;

      for (let i = 0; i <= 4; i++) {
        const y = padT + innerH - (innerH * i) / 4;
        svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: y, y2: y, class: "gridline" }));
        const label = el("text", { x: padL - 6, y: y + 3, class: "axis-label", "text-anchor": "end" });
        label.textContent = fmt(Math.round((max * i) / 4));
        svg.appendChild(label);
      }
      svg.appendChild(el("line", { x1: padL, x2: W - padR, y1: padT + innerH, y2: padT + innerH, class: "baseline" }));

      const maxIdx = values.indexOf(max);

      values.forEach((v, i) => {
        const barH = max > 0 ? (v / max) * innerH : 0;
        const x = padL + i * (barW + gap);
        const y = padT + innerH - barH;
        const g = el("g", { class: "bar" });
        const rect = el("rect", { x, y, width: barW, height: Math.max(barH, 1), rx: Math.min(3, barW / 2), fill: color });
        g.appendChild(rect);
        svg.appendChild(g);

        g.addEventListener("mousemove", (e) => {
          const me = e as MouseEvent;
          const rectEl = svg.getBoundingClientRect();
          (tt as HTMLElement).style.left = me.clientX - rectEl.left + "px";
          (tt as HTMLElement).style.top = me.clientY - rectEl.top + "px";
          (tt as HTMLElement).style.opacity = "1";
          tt.textContent = years[i] + ": " + v.toLocaleString() + " certificates";
        });
        g.addEventListener("mouseleave", () => {
          (tt as HTMLElement).style.opacity = "0";
        });

        if (n <= 15 || i % 2 === 0 || i === n - 1) {
          const lab = el("text", { x: x + barW / 2, y: H - 6, class: "axis-label", "text-anchor": "middle" });
          lab.textContent = years[i].slice(2);
          svg.appendChild(lab);
        }

        if (i === maxIdx) {
          const val = el("text", { x: x + barW / 2, y: y - 5, class: "axis-label", "text-anchor": "middle", fill: color, "font-weight": 700 });
          val.textContent = fmt(v);
          svg.appendChild(val);
        }
      });
    }

    function fillTable(tableId: string, years: string[], values: number[]) {
      const t = document.getElementById(tableId);
      if (!t) return;
      let html = "<tr><th>Year</th><th>Value</th></tr>";
      years.forEach((y, i) => (html += `<tr><td>${y}</td><td>${values[i].toLocaleString()}</td></tr>`));
      t.innerHTML = html;
    }

    function fillTopList(id: string, data: [string, number][], color: string) {
      const ul = document.getElementById(id);
      if (!ul) return;
      const max = Math.max(...data.map((d) => d[1]));
      ul.innerHTML = data
        .map(
          (d, i) => `
    <li>
      <span class="rank">${i + 1}</span>
      <span class="name">${d[0]}<div class="bar-bg"><div class="bar-fill" style="width:${((d[1] / max) * 100).toFixed(0)}%;background:${color}"></div></div></span>
      <span class="amount" style="color:${color}">${fmt(d[1])}</span>
    </li>`
        )
        .join("");
    }

    const blueVar = getComputedStyle(document.documentElement).getPropertyValue("--series-blue").trim();
    const aquaVar = getComputedStyle(document.documentElement).getPropertyValue("--series-aqua").trim();

    drawBarChart("chart-lgc", "tt-lgc", LGC_YEARS, LGC_VALUES, blueVar);
    drawBarChart("chart-stc", "tt-stc", STC_YEARS, STC_VALUES, aquaVar);
    fillTable("table-lgc", LGC_YEARS, LGC_VALUES);
    fillTable("table-stc", STC_YEARS, STC_VALUES);
    fillTopList("top-lgc", TOP_LGC, blueVar);
    fillTopList("top-stc", TOP_STC, aquaVar);

    // ---- Rule-based Q&A engine ----
    // Runs entirely client-side against the real register data loaded above.
    // This is NOT a call to an external LLM: a static GitHub Pages site has no
    // backend to hold an API key, so any live AI call would have to expose that
    // key to every visitor. Instead this matches the question against known
    // intents and computes the answer directly from LGC_VALUES/STC_VALUES/etc.
    const LGC_TOTAL = LGC_VALUES.reduce((a, b) => a + b, 0);
    const STC_TOTAL = STC_VALUES.reduce((a, b) => a + b, 0);
    const LGC_ENTITY_COUNT = 69;
    const STC_ENTITY_COUNT = 55;

    function maxYear(years: string[], values: number[]) {
      const i = values.indexOf(Math.max(...values));
      return { year: years[i], value: values[i] };
    }
    function minYear(years: string[], values: number[]) {
      const i = values.indexOf(Math.min(...values));
      return { year: years[i], value: values[i] };
    }

    const QA_RULES: { test: (q: string) => boolean; answer: () => string }[] = [
      {
        test: (q) => /highest|largest|peak|max/.test(q) && /lgc/.test(q) && !/stc/.test(q),
        answer: () => {
          const m = maxYear(LGC_YEARS, LGC_VALUES);
          return `${m.year} had the highest remaining LGC shortfall, about ${fmt(m.value)} certificates (${m.value.toLocaleString()}).`;
        },
      },
      {
        test: (q) => /highest|largest|peak|max|spike/.test(q) && /stc/.test(q) && !/lgc/.test(q),
        answer: () => {
          const m = maxYear(STC_YEARS, STC_VALUES);
          return `${m.year} had the highest STC shortfall, about ${fmt(m.value)} certificates (${m.value.toLocaleString()}), roughly double the next-highest year.`;
        },
      },
      {
        test: (q) => /lowest|smallest|min/.test(q) && /lgc/.test(q),
        answer: () => {
          const m = minYear(LGC_YEARS, LGC_VALUES);
          return `${m.year} had the lowest recorded LGC shortfall, just ${m.value.toLocaleString()} certificates.`;
        },
      },
      {
        test: (q) => /how many|number of|count/.test(q) && /stc/.test(q) && /(compan|entit|liable)/.test(q),
        answer: () => `${STC_ENTITY_COUNT} unique liable entities have appeared in the STC shortfall register across 2011–2024.`,
      },
      {
        test: (q) => /how many|number of|count/.test(q) && /lgc/.test(q) && /(compan|entit|liable)/.test(q),
        answer: () => `${LGC_ENTITY_COUNT} unique liable entities have appeared in the LGC shortfall register across 2001–2025.`,
      },
      {
        test: (q) => /(top|largest|biggest|worst)/.test(q) && /stc/.test(q) && /(entit|compan|liable)/.test(q),
        answer: () => `${TOP_STC[0][0]} has the largest cumulative STC shortfall on record, at approximately ${fmt(TOP_STC[0][1])} certificates.`,
      },
      {
        test: (q) => /(top|largest|biggest|worst)/.test(q) && /lgc/.test(q) && /(entit|compan|liable)/.test(q),
        answer: () => `${TOP_LGC[0][0]} has the largest cumulative LGC shortfall on record, at approximately ${fmt(TOP_LGC[0][1])} certificates.`,
      },
      {
        test: (q) => /total|sum|overall/.test(q) && /lgc/.test(q) && !/stc/.test(q),
        answer: () => `Total remaining LGC shortfall across all assessment years (2001–2025) is ${LGC_TOTAL.toLocaleString()} certificates (~${fmt(LGC_TOTAL)}).`,
      },
      {
        test: (q) => /total|sum|overall/.test(q) && /stc/.test(q) && !/lgc/.test(q),
        answer: () => `Total STC shortfall across all assessment years (2011–2024) is ${STC_TOTAL.toLocaleString()} certificates (~${fmt(STC_TOTAL)}).`,
      },
      {
        test: (q) => /compare/.test(q) && /lgc/.test(q) && /stc/.test(q),
        answer: () => {
          const lm = maxYear(LGC_YEARS, LGC_VALUES);
          const sm = maxYear(STC_YEARS, STC_VALUES);
          return `LGC shortfall is far larger in absolute terms, ${fmt(LGC_TOTAL)} total vs ${fmt(STC_TOTAL)} for STC, and has spiked sharply since 2022, peaking in ${lm.year}. STC shortfall is smaller and steadier, peaking in ${sm.year} at ${fmt(sm.value)}.`;
        },
      },
      {
        test: (q) => /spike|jump|increase/.test(q) && /2022/.test(q),
        answer: () => `STC shortfall peaked in 2022 at ${STC_VALUES[STC_YEARS.indexOf("2022")].toLocaleString()} certificates, the highest of any year in the register, before falling back in 2023–2024.`,
      },
      {
        test: (q) => /2023|2024|2025/.test(q) && /lgc/.test(q),
        answer: () =>
          `LGC shortfall in 2023–2025: ${["2023", "2024", "2025"].map((y) => `${y}: ${LGC_VALUES[LGC_YEARS.indexOf(y)].toLocaleString()}`).join(", ")} certificates, by far the highest sustained period in the register.`,
      },
    ];

    function answerQuestion(raw: string) {
      const q = raw.toLowerCase();
      for (const rule of QA_RULES) {
        if (rule.test(q)) return { text: rule.answer(), matched: true };
      }
      return {
        text: `I can only answer from the loaded LGC/STC register data (entity counts, totals, top entities, year-by-year highs/lows). Try one of the example questions, or ask about "highest LGC shortfall year", "total STC shortfall", or "top liable entity".`,
        matched: false,
      };
    }

    function addChatRow(role: "user" | "bot", html: string, extraClass?: string) {
      const thread = document.getElementById("chat-thread");
      if (!thread) return;
      const row = document.createElement("div");
      row.className = "chat-row";
      const isUser = role === "user";
      row.innerHTML = `
    <div class="chat-avatar ${isUser ? "user" : "bot"}">${isUser ? "YC" : "AI"}</div>
    <div class="chat-bubble ${isUser ? "q" : "a"} ${extraClass || ""}">${html}</div>`;
      thread.appendChild(row);
      thread.scrollTop = thread.scrollHeight;
    }

    function askQuestion(text: string) {
      const trimmed = text.trim();
      if (!trimmed) return;
      addChatRow("user", trimmed);
      const result = answerQuestion(trimmed);
      const srcTag = result.matched ? '<span class="src">Source: computed from LGC/STC shortfall register data</span>' : "";
      addChatRow("bot", result.text + srcTag, result.matched ? "" : "unmatched");
    }

    const form = document.getElementById("ask-form") as HTMLFormElement | null;
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const input = document.getElementById("ask-input") as HTMLInputElement | null;
      if (!input) return;
      askQuestion(input.value);
      input.value = "";
    };
    form?.addEventListener("submit", onSubmit);

    const exampleButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".example-q"));
    const onExampleClick = (btn: HTMLButtonElement) => () => askQuestion(btn.dataset.q || "");
    const handlers = exampleButtons.map((btn) => {
      const handler = onExampleClick(btn);
      btn.addEventListener("click", handler);
      return { btn, handler };
    });

    return () => {
      form?.removeEventListener("submit", onSubmit);
      handlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: wiseCss }} />
      <div dangerouslySetInnerHTML={{ __html: wiseBodyHtml }} />
    </>
  );
}

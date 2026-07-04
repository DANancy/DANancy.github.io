"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { dashboard } from "@/content/projects/green-certificate";

const { lgcYears, lgcValues, stcYears, stcValues, topLgc, topStc } = dashboard;

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

const LGC_TOTAL = lgcValues.reduce((a, b) => a + b, 0);
const STC_TOTAL = stcValues.reduce((a, b) => a + b, 0);
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
      const m = maxYear(lgcYears, lgcValues);
      return `${m.year} had the highest remaining LGC shortfall — about ${fmt(m.value)} certificates (${m.value.toLocaleString()}).`;
    },
  },
  {
    test: (q) => /highest|largest|peak|max|spike/.test(q) && /stc/.test(q) && !/lgc/.test(q),
    answer: () => {
      const m = maxYear(stcYears, stcValues);
      return `${m.year} had the highest STC shortfall — about ${fmt(m.value)} certificates (${m.value.toLocaleString()}), roughly double the next-highest year.`;
    },
  },
  {
    test: (q) => /lowest|smallest|min/.test(q) && /lgc/.test(q),
    answer: () => {
      const m = minYear(lgcYears, lgcValues);
      return `${m.year} had the lowest recorded LGC shortfall — just ${m.value.toLocaleString()} certificates.`;
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
    answer: () => `${topStc[0][0]} has the largest cumulative STC shortfall on record, at approximately ${fmt(topStc[0][1])} certificates.`,
  },
  {
    test: (q) => /(top|largest|biggest|worst)/.test(q) && /lgc/.test(q) && /(entit|compan|liable)/.test(q),
    answer: () => `${topLgc[0][0]} has the largest cumulative LGC shortfall on record, at approximately ${fmt(topLgc[0][1])} certificates.`,
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
      const lm = maxYear(lgcYears, lgcValues);
      const sm = maxYear(stcYears, stcValues);
      return `LGC shortfall is far larger in absolute terms — ${fmt(LGC_TOTAL)} total vs ${fmt(STC_TOTAL)} for STC — and has spiked sharply since 2022, peaking in ${lm.year}. STC shortfall is smaller and steadier, peaking in ${sm.year} at ${fmt(sm.value)}.`;
    },
  },
  {
    test: (q) => /spike|jump|increase/.test(q) && /2022/.test(q),
    answer: () => `STC shortfall peaked in 2022 at ${stcValues[stcYears.indexOf("2022")].toLocaleString()} certificates — the highest of any year in the register — before falling back in 2023–2024.`,
  },
  {
    test: (q) => /2023|2024|2025/.test(q) && /lgc/.test(q),
    answer: () =>
      `LGC shortfall in 2023–2025: ${["2023", "2024", "2025"].map((y) => `${y}: ${lgcValues[lgcYears.indexOf(y)].toLocaleString()}`).join(", ")} certificates — by far the highest sustained period in the register.`,
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

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  sourced?: boolean;
}

const EXAMPLES = [
  "How many liable entities have ever had an STC shortfall?",
  "Compare LGC and STC shortfall trends",
  "Why did STC shortfall spike in 2022?",
  "What is the total LGC shortfall?",
];

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "user", text: "Which assessment year has the highest LGC shortfall?" },
    {
      role: "bot",
      text: "2023, with approximately 4.07M certificates in remaining LGC shortfall — the largest of any year on record.",
      sourced: true,
    },
  ]);
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages]);

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const result = answerQuestion(trimmed);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: result.text, sourced: result.matched },
    ]);
    setInput("");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6">
      <div className="glass p-5 flex flex-col h-[420px]">
        <div ref={threadRef} className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption normal-case tracking-normal " +
                  (m.role === "user" ? "bg-signal/20 text-signal-text" : "bg-clay/20 text-clay")
                }
              >
                {m.role === "user" ? "YC" : "AI"}
              </span>
              <div
                className={
                  "text-body-sm rounded-card px-4 py-2.5 " +
                  (m.role === "user"
                    ? "bg-[var(--glass-fill)] text-text-primary"
                    : "border border-[var(--glass-border)] text-text-secondary")
                }
              >
                {m.text}
                {m.sourced && (
                  <div className="text-caption text-text-muted normal-case tracking-normal mt-2">
                    Source: computed from LGC/STC shortfall register data
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex gap-2 mt-4 pt-4 border-t border-[var(--glass-border)]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about LGC/STC shortfalls, entities, or years…"
            className="flex-1 rounded-button bg-[var(--glass-fill)] border border-[var(--glass-border)] px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted outline-none focus:border-signal"
          />
          <button
            type="submit"
            className="rounded-button bg-signal px-5 py-2.5 text-body-sm font-semibold text-void hover:brightness-110 transition"
          >
            Ask
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative h-28 w-28 rounded-full bg-gradient-bridge flex items-center justify-center">
          <div className="absolute inset-0 rounded-full animate-pulse opacity-40" style={{ backgroundImage: "var(--gradient-bridge)", filter: "blur(16px)" }} />
          <Sparkles className="relative z-10 text-void" size={30} />
        </div>
        <p className="text-body-sm text-text-muted">Try one</p>
        <div className="flex flex-col gap-2 w-full">
          {EXAMPLES.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="text-left text-body-sm text-text-secondary border border-[var(--glass-border)] rounded-button px-3.5 py-2.5 hover:border-signal/40 hover:text-text-primary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

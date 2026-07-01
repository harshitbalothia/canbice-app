"use client";

import * as React from "react";

/* ── tool definitions ─────────────────────────────────────── */

type Tool = { name: string; category: string };

const TOOLS: Tool[] = [
  { name: "SimilarWeb",            category: "Analytics" },
  { name: "Ahrefs",                category: "SEO" },
  { name: "Google Analytics",      category: "Analytics" },
  { name: "SEMrush",               category: "SEO" },
  { name: "Google Ads",            category: "Advertising" },
  { name: "Google Trends",         category: "Analytics" },
  { name: "Google Search Console", category: "SEO" },
  { name: "Google Tag Manager",    category: "Analytics" },
  { name: "Screaming Frog",        category: "SEO" },
  { name: "Yoast SEO",             category: "SEO" },
  { name: "Rank Math SEO",         category: "SEO" },
  { name: "MOZ",                   category: "SEO" },
  { name: "SpyFu",                 category: "Analytics" },
  { name: "Hotjar",                category: "Analytics" },
  { name: "WordPress",             category: "CMS" },
  { name: "Wix",                   category: "CMS" },
  { name: "Shopify",               category: "E-commerce" },
  { name: "Buffer",                category: "Social" },
  { name: "Hootsuite",             category: "Social" },
  { name: "Sprout Social",         category: "Social" },
  { name: "ChatGPT",               category: "AI" },
  { name: "Claude",                category: "AI" },
  { name: "Gemini",                category: "AI" },
  { name: "Jasper",                category: "AI" },
  { name: "Mailchimp",             category: "Email" },
  { name: "Adobe",                 category: "Design" },
  { name: "Google Merchant Center",category: "Advertising" },
  { name: "Keyword Everywhere",    category: "SEO" },
  { name: "Google AdSense",        category: "Advertising" },
  { name: "Copy.ai",               category: "AI" },
  { name: "Hype Auditor",          category: "Social" },
  { name: "Canva",                 category: "Design" },
  { name: "PageSpeed Insights",    category: "SEO" },
  { name: "Zapier",                category: "Automation" },
  { name: "Surfer SEO",            category: "SEO" },
];

/* split tools into 3 rows */
function splitRows(tools: Tool[], rows: number): Tool[][] {
  const size = Math.ceil(tools.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    tools.slice(i * size, i * size + size)
  );
}

const ROWS = splitRows(TOOLS, 3);

/* very subtle category accent — all monochrome, just slightly different glows */
const GLOW: Record<string, string> = {
  SEO:         "rgba(255,255,255,0.05)",
  Analytics:   "rgba(255,255,255,0.04)",
  Advertising: "rgba(255,255,255,0.05)",
  AI:          "rgba(255,255,255,0.06)",
  Social:      "rgba(255,255,255,0.04)",
  Design:      "rgba(255,255,255,0.05)",
  CMS:         "rgba(255,255,255,0.04)",
  "E-commerce":"rgba(255,255,255,0.05)",
  Email:       "rgba(255,255,255,0.04)",
  Automation:  "rgba(255,255,255,0.04)",
};

/* ── single tool badge ────────────────────────────────────── */

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div
      className="group relative mx-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] px-5 py-2.5 transition-all duration-300 hover:border-white/25 hover:scale-105"
      style={{ background: GLOW[tool.category] ?? "rgba(255,255,255,0.04)" }}
    >
      {/* inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "0 0 18px 2px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      />
      {/* dot */}
      <span className="size-1.5 shrink-0 rounded-full bg-white/25 group-hover:bg-white/60 transition-colors duration-300" />
      {/* name */}
      <span className="relative text-xs sm:text-sm font-medium text-white/50 group-hover:text-white/90 transition-colors duration-300 whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
}

/* ── marquee row ──────────────────────────────────────────── */

function MarqueeRow({
  tools,
  direction,
  duration,
}: {
  tools: Tool[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...tools, ...tools];
  return (
    <div
      className="marquee-row relative w-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={
          direction === "left"
            ? "marquee-track-left flex w-max"
            : "marquee-track-right flex w-max"
        }
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((tool, i) => (
          <ToolBadge key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

/* ── stats strip ──────────────────────────────────────────── */

const STATS = [
  { value: "35+", label: "Tools in our stack" },
  { value: "8",   label: "Categories covered" },
  { value: "150+",label: "Projects powered" },
];

/* ── main export ──────────────────────────────────────────── */

export function ToolsSection() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#080808] overflow-hidden py-20 sm:py-28"
    >
      {/* ── Background atmosphere ─────────────────────── */}

      {/* center spotlight — sits behind the marquee rows only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[340px]"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ────────────────────────────────────── */}

      <div
        className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 text-center mb-14 sm:mb-18"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-4">
          Our Toolkit
        </p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight text-white mb-4">
          Tools We <span className="text-highlight">Use</span>
        </h2>
        <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Industry-leading platforms and software that power every campaign,
          insight, and creative we produce.
        </p>

        {/* stats */}
        <div className="mt-8 inline-flex items-center gap-6 sm:gap-10 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 sm:px-8 py-4 backdrop-blur-sm">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="w-px h-7 bg-white/10" />}
              <div className="text-center">
                <p className="font-display text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-white/35 mt-0.5">{s.label}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Marquee rows ──────────────────────────────── */}

      <div
        className="relative z-10 space-y-4"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
        }}
      >
        {/* left/right edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-48 z-20"
          style={{
            background:
              "linear-gradient(to right, #080808 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-48 z-20"
          style={{
            background:
              "linear-gradient(to left, #080808 0%, transparent 100%)",
          }}
        />

        <MarqueeRow tools={ROWS[0]} direction="left"  duration={38} />
        <MarqueeRow tools={ROWS[1]} direction="right" duration={32} />
        <MarqueeRow tools={ROWS[2]} direction="left"  duration={44} />
      </div>

      {/* ── Bottom label ──────────────────────────────── */}
      <div
        className="relative z-10 mt-12 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
        }}
      >
        <p className="text-xs text-white/20 tracking-wide">
          Hover over any row to pause · We continuously expand our toolkit
        </p>
      </div>
    </section>
  );
}

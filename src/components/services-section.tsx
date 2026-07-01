"use client";

import * as React from "react";
import { PreviewSwitchHero } from "@/components/ui/preview-switch-hero";
import {
  BarChart3,
  Globe,
  Hexagon,
  Network,
  Monitor,
  Palette,
  Search,
  Shield,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ── dark section tokens ──────────────────────────────────────
 * Override CSS variables so every child (tab rail, CTAs, logo
 * strip) picks up the dark palette without touching globals.css.
 * ─────────────────────────────────────────────────────────── */
const DARK_VARS = {
  "--background": "#080808",
  "--foreground": "#ffffff",
  "--muted": "#1a1a1a",
  "--muted-foreground": "#888888",
  "--border": "#2a2a2a",
  "--primary": "#ffffff",
  "--primary-foreground": "#000000",
  "--ring": "rgba(255,255,255,0.25)",
} as React.CSSProperties;

/* ── shared panel shell ──────────────────────────────────────
 * Panels sit on the #080808 background so they use an explicit
 * subtle white-tint card rather than CSS-var bg-background.
 * ─────────────────────────────────────────────────────────── */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
      <div className="flex h-full flex-col p-5">{children}</div>
    </div>
  );
}

function PanelLabel({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="size-3.5 text-white/40" />
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ── stat card helper ────────────────────────────────────────── */
function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.06] p-3">
      {children}
    </div>
  );
}

/* ── 1. Digital Marketing ────────────────────────────────────── */
function DigitalMarketingPanel() {
  return (
    <Panel>
      <PanelLabel icon={BarChart3} label="Campaign Dashboard" />
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Reach", value: "2.4M", delta: "+34%" },
          { label: "Clicks", value: "18.2k", delta: "+21%" },
          { label: "ROI", value: "4.8×", delta: "+67%" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.06] p-2.5 text-center"
          >
            <p className="text-[10px] text-white/40">{s.label}</p>
            <p className="mt-0.5 text-base font-bold text-white">{s.value}</p>
            <p className="text-[9px] font-semibold text-emerald-400">
              {s.delta}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2.5">
        {[
          { ch: "Organic Search", pct: 78 },
          { ch: "Paid Social", pct: 63 },
          { ch: "Display & Video", pct: 45 },
        ].map((c) => (
          <div key={c.ch}>
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-white/40">{c.ch}</span>
              <span className="font-semibold text-white">{c.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white/70"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ── 2. SEO ──────────────────────────────────────────────────── */
function SeoPanel() {
  return (
    <Panel>
      <PanelLabel icon={Search} label="Search Rankings" />
      <div className="space-y-1.5 rounded-xl border border-white/[0.07] bg-white/[0.04] p-3">
        {[
          { pos: 1, domain: "your-brand.com", yours: true },
          { pos: 2, domain: "competitor-one.com", yours: false },
          { pos: 3, domain: "competitor-two.com", yours: false },
        ].map((r) => (
          <div
            key={r.pos}
            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${r.yours ? "bg-white/[0.08] ring-1 ring-white/10" : ""}`}
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${r.yours ? "bg-white text-black" : "bg-white/10 text-white/40"}`}
            >
              {r.pos}
            </span>
            <span
              className={`text-[11px] ${r.yours ? "font-semibold text-white" : "text-white/40"}`}
            >
              {r.domain}
            </span>
            {r.yours && (
              <span className="ml-auto rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                #1
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StatCard>
          <p className="text-[10px] text-white/40">Organic Traffic</p>
          <p className="mt-0.5 text-sm font-bold text-white">+156%</p>
        </StatCard>
        <StatCard>
          <p className="text-[10px] text-white/40">Keywords Ranked</p>
          <p className="mt-0.5 text-sm font-bold text-white">2,847</p>
        </StatCard>
      </div>
    </Panel>
  );
}

/* ── 3. Paid Media ───────────────────────────────────────────── */
function PaidMediaPanel() {
  return (
    <Panel>
      <PanelLabel icon={Target} label="Ad Performance" />
      <div className="grid grid-cols-2 gap-2">
        {[
          { platform: "Google Ads", roas: "6.2×", ctr: "4.2%" },
          { platform: "Meta Ads", roas: "4.8×", ctr: "3.1%" },
        ].map((p) => (
          <div
            key={p.platform}
            className="rounded-xl border border-white/[0.07] bg-white/[0.06] p-3"
          >
            <p className="text-[10px] font-medium text-white/40">
              {p.platform}
            </p>
            <p className="mt-2 text-xl font-bold text-white">{p.roas}</p>
            <p className="text-[10px] text-white/40">ROAS</p>
            <div className="mt-2 border-t border-white/[0.07] pt-2">
              <p className="text-[11px] text-white">
                {p.ctr}{" "}
                <span className="text-white/40">click-through</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.06] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-white/40">Total Spend</p>
            <p className="text-sm font-bold text-white">$12,400</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40">Revenue Generated</p>
            <p className="text-sm font-bold text-emerald-400">$76,880</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ── 4. Web Design & Development ─────────────────────────────── */
function WebDevPanel() {
  return (
    <Panel>
      {/* Browser window */}
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.04] px-3 py-2">
          <div className="size-2 rounded-full bg-red-400/50" />
          <div className="size-2 rounded-full bg-yellow-400/50" />
          <div className="size-2 rounded-full bg-green-400/50" />
          <div className="mx-2 h-4 flex-1 rounded bg-white/10 text-center text-[8px] leading-4 text-white/30">
            your-brand.com
          </div>
        </div>
        <div className="space-y-2 p-3">
          <div className="h-10 rounded-lg bg-white/[0.06]" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded-lg bg-white/[0.04]" />
            <div className="h-12 rounded-lg bg-white/[0.04]" />
          </div>
          <div className="h-5 w-3/4 rounded-lg bg-white/[0.04]" />
        </div>
      </div>
      {/* Lighthouse scores */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Performance", score: "98" },
          { label: "SEO Score", score: "100" },
          { label: "Accessibility", score: "97" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.06] p-2 text-center"
          >
            <p className="text-sm font-bold text-white">{s.score}</p>
            <p className="text-[9px] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ── 5. Branding ─────────────────────────────────────────────── */
function BrandingPanel() {
  return (
    <Panel>
      <PanelLabel icon={Palette} label="Brand Identity" />
      {/* Color palette — includes light swatches so they pop on dark bg */}
      <div className="mb-3 flex gap-1.5">
        {["#ffffff", "#d4d4d8", "#71717a", "#3f3f46", "#1a1a1a"].map((c) => (
          <div
            key={c}
            className="h-10 flex-1 rounded-lg border border-white/[0.08]"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      {/* Typography */}
      <div className="mb-3 rounded-xl border border-white/[0.07] bg-white/[0.04] p-3">
        <p className="text-base font-bold tracking-tight text-white">
          Your Brand Name
        </p>
        <p className="text-[11px] text-white/40">
          Bold · Memorable · Built to Last
        </p>
      </div>
      {/* Logo concept */}
      <div className="flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] py-3">
        <div className="flex items-center gap-2 text-white">
          <Hexagon className="size-5" />
          <span className="text-sm font-bold tracking-tight">YourBrand.</span>
        </div>
      </div>
    </Panel>
  );
}

/* ── 6. White Label ──────────────────────────────────────────── */
function WhiteLabelPanel() {
  return (
    <Panel>
      <PanelLabel icon={Shield} label="White Label" />
      <div className="mb-4 flex items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.06] px-3.5 py-2">
          <Hexagon className="size-3.5 text-white" />
          <span className="text-xs font-semibold text-white">Your Brand</span>
        </div>
        <span className="text-sm text-white/30">+</span>
        <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2">
          <Sparkles className="size-3.5 text-black" />
          <span className="text-xs font-semibold text-black">Our Expertise</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          "Full brand control — your identity, always on top",
          "Zero extra overhead or hidden costs",
          "Seamless, client-facing service delivery",
          "Dedicated white-label support on call",
        ].map((f) => (
          <div key={f} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-[11px] font-bold text-emerald-400">
              ✓
            </span>
            <p className="text-[11px] leading-relaxed text-white/50">{f}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ── 7. Lead Generation ──────────────────────────────────────── */
function LeadGenPanel() {
  const stages = [
    { label: "Visitors", count: "10,000", pct: 100 },
    { label: "Engaged", count: "4,200", pct: 42 },
    { label: "Leads", count: "847", pct: 20 },
    { label: "Customers", count: "234", pct: 8 },
  ];

  return (
    <Panel>
      <PanelLabel icon={TrendingUp} label="Lead Funnel" />
      <div className="space-y-2.5">
        {stages.map((s) => (
          <div key={s.label}>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-white/40">{s.label}</span>
              <span className="font-semibold text-white">{s.count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white/70"
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StatCard>
          <p className="text-[10px] text-white/40">Conversion Rate</p>
          <p className="mt-0.5 text-sm font-bold text-white">2.34%</p>
        </StatCard>
        <StatCard>
          <p className="text-[10px] text-white/40">Cost per Lead</p>
          <p className="mt-0.5 text-sm font-bold text-white">$14.60</p>
        </StatCard>
      </div>
    </Panel>
  );
}

/* ── 8. Custom Plan ──────────────────────────────────────────── */
function CustomPlanPanel() {
  const steps = [
    { done: true, label: "Audit your current digital presence" },
    { done: true, label: "Identify growth opportunities & gaps" },
    { done: true, label: "Build a tailored strategy roadmap" },
    { done: false, label: "Launch, measure & scale results" },
  ];

  return (
    <Panel>
      <PanelLabel icon={Zap} label="Custom Strategy" />
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                s.done
                  ? "bg-white text-black"
                  : "border border-white/20 bg-white/[0.04] text-white/30"
              }`}
            >
              {s.done ? "✓" : i + 1}
            </div>
            <p
              className={`text-xs leading-5 ${s.done ? "text-white" : "text-white/30"}`}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-3 text-center">
          <p className="text-[11px] text-white/40">
            No templates, no guesswork — just strategies built for your
            business.
          </p>
        </div>
      </div>
    </Panel>
  );
}

/* ── platform logos ──────────────────────────────────────────── */

const LOGO_CLS =
  "inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white/30";

const PLATFORM_LOGOS = [
  { name: "Google", Icon: Globe },
  { name: "Meta", Icon: Monitor },
  { name: "LinkedIn", Icon: Network },
  { name: "Shopify", Icon: ShoppingBag },
  { name: "WordPress", Icon: Globe },
  { name: "HubSpot", Icon: BarChart3 },
].map(({ name, Icon }) => ({
  name,
  logo: (
    <span className={LOGO_CLS}>
      <Icon aria-hidden className="size-5" />
      {name}
    </span>
  ),
}));

/* ── tab data with per-tab title + description ───────────────── */

const TABS = [
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    title: "Reach More, Engage Better",
    description:
      "We use smart strategies to help you grow online. From SEO to social media, we ensure your brand connects with the right people, driving real results that matter.",
    media: <DigitalMarketingPanel />,
  },
  {
    id: "seo",
    label: "SEO",
    title: "Rank Higher, Drive More Traffic",
    description:
      "Our SEO strategies are designed to boost your website's visibility, driving more organic traffic and improving rankings on search engines. We optimize every aspect of your site to help you reach the top.",
    media: <SeoPanel />,
  },
  {
    id: "paid-media",
    label: "Paid Media",
    title: "Targeted Ads for Real Growth",
    description:
      "Get the most out of your advertising budget. We create high-impact paid media campaigns on platforms like Google, Meta, and more — to drive traffic and boost conversions.",
    media: <PaidMediaPanel />,
  },
  {
    id: "web-dev",
    label: "Web & Dev",
    title: "Build Something Beautiful",
    description:
      "Our custom websites and apps don't just look great — they work perfectly too. Whether you need an e-commerce store or a sleek mobile app, we design for performance and user experience.",
    media: <WebDevPanel />,
  },
  {
    id: "branding",
    label: "Branding",
    title: "Stand Out, Stay Memorable",
    description:
      "From logos to brand voice, we help you craft a unique identity that resonates with your audience. We create brands that are not just seen, but remembered.",
    media: <BrandingPanel />,
  },
  {
    id: "white-label",
    label: "White Label",
    title: "Your Brand, Our Expertise",
    description:
      "Need more services? We provide white-label solutions to help you expand your offerings without the extra overhead — seamlessly integrate top-notch services under your brand.",
    media: <WhiteLabelPanel />,
  },
  {
    id: "lead-gen",
    label: "Lead Gen",
    title: "Turn Clicks into Customers",
    description:
      "We drive B2B and B2C leads through targeted campaigns — including LinkedIn lead generation, PPC, and optimized landing pages — ensuring every click converts into a valuable customer.",
    media: <LeadGenPanel />,
  },
  {
    id: "custom-plan",
    label: "Custom Plan",
    title: "Let's Create Something Unique",
    description:
      "Tell us about your business and goals. We'll build a customized plan to help you succeed — no templates, just strategies that work specifically for you.",
    media: <CustomPlanPanel />,
  },
];

/* ── main export ─────────────────────────────────────────────── */

export function ServicesSection() {
  return (
    <div style={DARK_VARS} className="bg-[#080808]">
      <PreviewSwitchHero
        title="Our Services"
        description="Full-spectrum digital marketing that drives real, measurable growth."
        showEmail={false}
        primaryCta={{ label: "Book a free strategy call", href: "#contact" }}
        secondaryCta={{ label: "Explore all services", href: "#services" }}
        avatars={[
          { initials: "JM" },
          { initials: "SR" },
          { initials: "AK" },
          { initials: "LC" },
          { initials: "TP" },
          { initials: "BW" },
        ]}
        socialProof="trusted by 500+ growing businesses"
        tabs={TABS}
        logos={PLATFORM_LOGOS}
        scrollLength="560vh"
      />
    </div>
  );
}

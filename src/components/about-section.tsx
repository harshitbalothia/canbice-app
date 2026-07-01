"use client";

import * as React from "react";
import Image from "next/image";

const INITIAL_TEXT = (
  <>
    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
      At <strong className="text-white">CANBICE</strong>, we pride ourselves on being a creative, ROI-driven
      digital marketing agency committed to delivering results that truly matter.
      Our mission is simple: to bridge the gap between innovative marketing
      strategies and measurable business growth. With a global presence and
      experience working with businesses across various industries, we help
      brands achieve sustainable success through data-driven digital marketing.
    </p>
    <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-4">
      Having successfully completed{" "}
      <strong className="text-white">150+ projects</strong> across industries
      including hospitality, fashion, e-commerce, healthcare, real estate,
      education, and B2B, we understand that every business is unique. That&apos;s
      why we create customized marketing strategies tailored to your specific
      goals and target audience.
    </p>
  </>
);

const EXPANDED_TEXT = (
  <>
    <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-4">
      Our comprehensive digital marketing services include SEO, performance
      marketing, social media marketing, branding, content creation, website
      design and development, paid advertising, and lead generation. Every
      solution we deliver is designed to increase visibility, generate quality
      leads, improve conversions, and maximize your return on investment.
    </p>

    <h3 className="text-white font-display text-lg sm:text-xl font-bold mt-8 mb-3">
      Your Growth Partner in Digital Marketing
    </h3>
    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
      At <strong className="text-white">CANBICE</strong>, we believe in working{" "}
      <strong className="text-white">with</strong> our clients, not just{" "}
      <strong className="text-white">for</strong> them. Our collaborative
      approach allows us to understand your business objectives and create
      marketing strategies that align with your vision.
    </p>
    <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-4">
      We combine strategic thinking with creative execution. Our experienced
      team specialises in branding, graphic design, photography, videography,
      content marketing, performance advertising, and website development to
      create campaigns that are visually compelling and conversion-focused.
    </p>

    <h3 className="text-white font-display text-lg sm:text-xl font-bold mt-8 mb-4">
      Why Choose CANBICE?
    </h3>
    <ul className="space-y-3">
      {[
        ["150+ Successful Projects Delivered", "Trusted by businesses across multiple industries with proven results."],
        ["ROI-Focused Digital Marketing", "Every campaign is designed to maximise growth, leads, and revenue."],
        ["Creative & Data-Driven Strategies", "We blend innovative ideas with analytics to achieve measurable outcomes."],
        ["Transparent Communication", "Regular reporting, clear insights, and complete visibility into campaign performance."],
        ["Agile & Client-Centric Approach", "We continuously optimise strategies based on market trends and your evolving goals."],
        ["Complete Digital Solutions", "From branding and website development to SEO and paid advertising — all under one roof."],
      ].map(([title, desc]) => (
        <li key={title} className="flex items-start gap-3">
          <span className="mt-1 shrink-0 size-4 rounded-full border border-white/20 bg-white/10 flex items-center justify-center">
            <span className="block size-1.5 rounded-full bg-white/70" />
          </span>
          <span className="text-sm sm:text-base text-white/60 leading-relaxed">
            <strong className="text-white">{title}:</strong> {desc}
          </span>
        </li>
      ))}
    </ul>

    <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-6">
      At <strong className="text-white">CANBICE</strong>, we&apos;re more than
      just a digital marketing agency — we&apos;re your long-term growth partner.
      Our goal is to help your business build a powerful online presence, engage
      the right audience, generate high-quality leads, and achieve sustainable
      growth in an increasingly competitive digital world.
    </p>
  </>
);

export function AboutSection() {
  const [expanded, setExpanded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden py-20 sm:py-28 px-5 sm:px-8"
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #ffffff 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* ── Image column ──────────────────────────── */}
          <div
            className="relative flex flex-col min-h-[260px] sm:min-h-[380px] lg:min-h-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.96)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Glow ring behind image */}
            <div className="absolute -inset-3 rounded-[2.5rem] opacity-20 blur-2xl bg-white/20" />

            {/* Image wrapper — stretches to full column height */}
            <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/[0.07] shadow-2xl">
              <Image
                src="/about-team.jpg"
                alt="CANBICE team in lobby"
                fill
                className="object-cover"
                style={{
                  transform: visible ? "scale(1)" : "scale(1.06)",
                  transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.15s",
                }}
                priority
              />

              {/* Subtle dark vignette overlay at bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 45%)",
                }}
              />

              {/* Stat badge */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md px-4 py-3">
                <div>
                  <p className="text-white font-display text-2xl font-bold leading-none">150+</p>
                  <p className="text-white/50 text-xs mt-0.5">Projects Delivered</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="text-white font-display text-2xl font-bold leading-none">8+</p>
                  <p className="text-white/50 text-xs mt-0.5">Industries Served</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Text column ───────────────────────────── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            {/* Eyebrow label */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-4">
              About CANBICE
            </p>

            {/* Heading */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight text-white mb-6">
              We Are the Best Creative and{" "}
              <span className="text-highlight">ROI-Driven</span> Digital
              Marketing Agency
            </h2>

            {/* Always-visible text */}
            {INITIAL_TEXT}

            {/* Expandable text */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: expanded ? "1fr" : "0fr",
                transition: "grid-template-rows 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="overflow-hidden">
                {EXPANDED_TEXT}
              </div>
            </div>

            {/* Read More + CTA row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Read More toggle */}
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                {expanded ? "Show Less" : "Read More"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-3.5 transition-transform duration-300"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Primary CTA */}
              <button
                type="button"
                className="btn-shiny px-6 py-2.5 text-sm font-semibold uppercase tracking-widest"
              >
                <span className="mirror" aria-hidden="true" />
                <span className="relative z-10">Get a Free Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

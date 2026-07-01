import { ArcRevealHero } from "@/components/ui/arc-preloader-hero";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { ToolsSection } from "@/components/tools-section";
import { IndustriesSection } from "@/components/industries-section";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import { ClientCaseStudiesSection } from "@/components/client-case-studies";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
    <ArcRevealHero storageKey="canbice-hero">

      {/* bg-black ensures the hero is black while the video fades in */}
      <div className="relative min-h-[100dvh] overflow-hidden bg-black">

        {/* ── Video ─────────────────────────────────────────── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* ── Dark overlay ──────────────────────────────────── */}
        <div className="absolute inset-0 bg-black/58" />

        {/* ── Content ───────────────────────────────────────── */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
          <div className="max-w-3xl">

            <h1 className="font-display text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Digital Marketing Agency That Knows How to{" "}
              <span className="text-highlight">Grow Your Business</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-balance text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
              Your success starts with the right digital marketing company.
              Explore how Canbice&apos;s tailored digital marketing
              services can drive measurable results.
            </p>

            <div className="mt-9">
              <button
                type="button"
                className="btn-shiny px-5 py-3 text-xs font-semibold uppercase tracking-wider sm:px-8 sm:py-3.5 sm:text-sm sm:tracking-widest md:text-base"
              >
                <span className="mirror" aria-hidden="true" />
                <span className="relative z-10">
                  Request Your Free Consultation
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </ArcRevealHero>

    {/* ── Section 2: Services ─────────────────────────── */}
    <ServicesSection />

    {/* ── Section 3: About ────────────────────────────── */}
    <AboutSection />

    {/* ── Section 4: Tools We Use ─────────────────────── */}
    <ToolsSection />

    {/* ── Section 5: Industries We Serve ──────────────── */}
    <IndustriesSection />

    {/* ── Section 6: Testimonials ──────────────────────── */}
    <TestimonialsSection />

    {/* ── Section 7: Client Case Studies ───────────────── */}
    <ClientCaseStudiesSection />

    {/* ── Section 8: FAQ ────────────────────────────────── */}
    <FAQSection />

    {/* ── Footer ────────────────────────────────────────── */}
    <Footer />
</>
  );
}

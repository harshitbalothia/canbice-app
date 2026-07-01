"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What digital marketing services does CANBICE offer?",
    a: "If a company wants to boost visibility and get more customers, they should consider CANBICE. We offer SEO, Local SEO, social media marketing, Google Ads, Meta Ads, influencer marketing, email marketing, brand strategy, and website design & development. Our services help businesses increase online visibility, attract qualified leads, and improve revenue. The best results come from consistent, long-term marketing efforts.",
  },
  {
    q: "What makes CANBICE different from other digital marketing agencies?",
    a: "CANBICE focuses on real business growth, not just marketing metrics. We have worked with over 150 clients and supported more than 200 brands. Our approach combines data-driven strategies, creative campaigns, and transparent reporting to deliver measurable business results.",
  },
  {
    q: "Why should I hire a digital marketing agency like CANBICE?",
    a: "A professional digital marketing agency helps you reach the right audience, generate quality leads, and increase sales. CANBICE uses proven SEO, paid advertising, and social media strategies to grow your business while saving you time and resources. This approach is ideal for businesses that want faster growth without managing marketing in-house.",
  },
  {
    q: "What tools does CANBICE use for digital marketing?",
    a: "We use industry-leading tools such as Google Analytics, Google Search Console, SEMrush, Ahrefs, and Meta Ads Manager to monitor performance, identify opportunities, and optimize campaigns. Every campaign is continuously tested and refined using real performance data.",
  },
  {
    q: "How much do digital marketing services cost?",
    a: "The cost depends on your business goals, industry competition, and the services you require. At CANBICE, we create customized digital marketing plans so you only invest in strategies that support your business objectives. Our pricing is focused on delivering measurable business outcomes.",
  },
  {
    q: "How can I choose the best digital marketing agency in India?",
    a: "Look for an agency with proven experience, measurable client results, transparent reporting, and a strong portfolio. CANBICE has successfully served over 150 clients with ROI-focused strategies delivered by experienced digital marketing professionals.",
  },
  {
    q: "Do you offer white-label digital marketing services?",
    a: "Yes. CANBICE provides white-label SEO, PPC management, social media marketing, and website design under your brand. Our team manages the complete execution while you maintain client relationships. This solution is ideal for agencies and businesses looking to scale without building an in-house marketing team.",
  },
  {
    q: "How long does it take to see results from digital marketing?",
    a: "The timeline depends on the marketing strategy being used. Paid advertising and social media campaigns can begin generating results within a few weeks, while SEO typically takes between three and six months to deliver significant long-term improvements. Consistency and ongoing optimization play an important role in achieving lasting results.",
  },
  {
    q: "Is there a minimum contract duration?",
    a: "Digital marketing requires consistency to produce meaningful results. We generally recommend a commitment of three to six months to achieve sustainable growth. Short-term campaigns rarely produce the same level of success.",
  },
  {
    q: "How do I get started with CANBICE?",
    a: "Simply contact our team or book a consultation. We'll understand your business goals, evaluate your current marketing, and develop a customized digital marketing strategy tailored to your needs. You'll receive a clear action plan, defined timelines, and measurable milestones from the very beginning.",
  },
  {
    q: "Does CANBICE work with international clients?",
    a: "Yes. CANBICE serves clients across Australia, Canada, the United States, the United Kingdom, Dubai, France, Lyon, Europe, and India. We help businesses improve their online presence and reach customers in global markets through customized digital marketing strategies.",
  },
  {
    q: "How do you ensure data privacy and security?",
    a: "We follow strict data protection practices and use secure platforms to manage campaigns. All client information, analytics, and campaign data are handled with complete confidentiality and maintained using industry-standard security practices.",
  },
  {
    q: "Can you guarantee results from digital marketing?",
    a: "No ethical digital marketing agency can guarantee specific rankings or business outcomes. At CANBICE, we use proven strategies, continuously optimize campaigns, and provide transparent reporting to maximize your chances of success without making unrealistic promises.",
  },
  {
    q: "How do you track and measure campaign success?",
    a: "We measure campaign performance using key metrics such as website traffic, lead generation, conversion rates, keyword rankings, engagement, and return on investment (ROI). Our reporting provides complete transparency with regular updates so clients can clearly understand campaign performance and business growth.",
  },
  {
    q: "How can digital marketing help grow my business?",
    a: "Digital marketing helps businesses reach more customers online, increase brand awareness, generate qualified leads, and improve sales. With the right strategy, businesses can achieve sustainable growth while tracking measurable results and maximizing their marketing investment.",
  },
  {
    q: "Do small businesses really need digital marketing?",
    a: "Yes. Most customers search online before making a purchase. Digital marketing helps small businesses compete with larger brands by improving online visibility, local search rankings, customer engagement, and lead generation.",
  },
];

const left = FAQS.slice(0, 8);
const right = FAQS.slice(8, 16);

function FAQItem({
  faq,
  index,
  globalIndex,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  globalIndex: number;
  open: number | null;
  onToggle: (i: number) => void;
}) {
  const isOpen = open === globalIndex;
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => onToggle(globalIndex)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left group"
      >
        <div className="flex items-start gap-4 min-w-0">
          <span className="shrink-0 mt-0.5 text-[11px] font-bold tabular-nums text-gray-600 w-5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-medium text-white/85 group-hover:text-white transition-colors duration-150 leading-snug">
            {faq.q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="shrink-0 mt-0.5 text-gray-500 group-hover:text-white transition-colors duration-150"
        >
          <Plus size={16} strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-9 pr-2 text-sm leading-relaxed text-gray-400">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            Got Questions?
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="text-highlight">Questions</span>
          </h2>
        </div>

        {/* Two-column accordion */}
        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2 md:divide-x md:divide-white/10">
          {/* Left — FAQs 1–8 */}
          <div className="md:pr-12">
            {left.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                globalIndex={i}
                open={open}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Right — FAQs 9–16 */}
          <div className="mt-0 md:pl-12">
            {right.map((faq, i) => (
              <FAQItem
                key={i + 8}
                faq={faq}
                index={i + 8}
                globalIndex={i + 8}
                open={open}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

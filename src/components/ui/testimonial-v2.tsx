"use client";

import React from 'react';
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Canbice completely transformed our online presence. Within three months, our organic traffic doubled and lead quality improved dramatically. Their team genuinely understands digital growth.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Mitchell",
    role: "CEO, Evergreen Retail",
  },
  {
    text: "The SEO strategy Canbice built for us put us on page one for our most competitive keywords. The ROI has been exceptional — we saw results in the first 60 days.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Okafor",
    role: "Marketing Director, NovaBuild",
  },
  {
    text: "Their paid ads team is simply the best we've worked with. They cut our cost-per-acquisition in half while scaling our monthly revenue by 4x. Outstanding results.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Priya Sharma",
    role: "E-commerce Manager, LuxeHome",
  },
  {
    text: "Canbice's social media strategy turned our dormant accounts into active sales channels. Engagement went up 300% and we're seeing real conversions from social for the first time.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marcus Delgado",
    role: "Founder, Artisan Co.",
  },
  {
    text: "The content strategy Canbice created established us as thought leaders in our industry. Their writing team understood our niche immediately and delivered quality consistently.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aisha Rahman",
    role: "Head of Brand, PulseFintech",
  },
  {
    text: "Switching to Canbice was the best marketing decision we made. Transparent reporting, proactive communication, and results that actually moved our bottom line.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Lena Hoffmann",
    role: "Operations Lead, SwiftLogix",
  },
  {
    text: "Their email marketing campaigns consistently hit open rates above industry average. The automation sequences they built nurture leads on autopilot — it's been a game changer.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Daniel Yuen",
    role: "Sales Director, Apex SaaS",
  },
  {
    text: "Canbice redesigned our funnel from the ground up. Conversion rate improved by 78% in two months. They think like growth engineers, not just marketers.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Natalie Brooks",
    role: "CMO, TerraStack",
  },
  {
    text: "We've worked with three agencies before Canbice. None came close. Their strategic depth and execution speed are unmatched. Highly recommend them without hesitation.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Farouk",
    role: "CEO, Gridline Media",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.ul
      animate={{ translateY: "-50%" }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
    >
      {[...new Array(2).fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, image, name, role }, i) => (
            <motion.li
              key={`${index}-${i}`}
              aria-hidden={index === 1 ? "true" : "false"}
              tabIndex={index === 1 ? -1 : 0}
              whileHover={{
                scale: 1.03,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="p-8 rounded-3xl border border-white/10 shadow-lg max-w-xs w-full bg-white/5 backdrop-blur-sm cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <blockquote className="m-0 p-0">
                <p className="text-white/70 leading-relaxed font-normal m-0 text-sm">
                  {text}
                </p>
                <footer className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={`Avatar of ${name}`}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-300"
                  />
                  <div className="flex flex-col">
                    <cite className="font-semibold not-italic tracking-tight leading-5 text-white text-sm">
                      {name}
                    </cite>
                    <span className="text-xs leading-5 tracking-tight text-white/40 mt-0.5">
                      {role}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </motion.li>
          ))}
        </React.Fragment>
      ))]}
    </motion.ul>
  </div>
);

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-black py-24 relative overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="container px-4 z-10 mx-auto relative"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-white/15 py-1 px-4 rounded-full text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/5">
              Testimonials
            </div>
          </div>

          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-white"
          >
            What our clients say
          </h2>
          <p className="text-center mt-5 text-white/50 text-lg leading-relaxed max-w-sm">
            Brands that partnered with Canbice saw measurable growth — here&apos;s what they have to say.
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-6 mt-10 max-h-[740px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling client testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}

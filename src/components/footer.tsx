"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const LETTERS = "CANBICE".split("");

export function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wordmarkRef, { once: true, margin: "-5% 0px" });

  return (
    <footer className="bg-black overflow-hidden border-t border-white/10">

      {/* ── Contact strip ─────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">

          <div className="max-w-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
              Ready to grow?
            </p>
            <h3 className="font-display text-2xl font-bold leading-snug text-white md:text-3xl">
              Let&apos;s build something{" "}
              <span className="text-highlight">great together.</span>
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:contact@canbice.com"
              className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <Mail size={15} strokeWidth={1.5} className="text-gray-600 transition-colors group-hover:text-white" />
              contact@canbice.com
            </a>
            <a
              href="tel:+917587526597"
              className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <Phone size={15} strokeWidth={1.5} className="text-gray-600 transition-colors group-hover:text-white" />
              +91 75875 26597
            </a>
          </div>
        </div>
      </div>

      {/* ── Full-width rule ───────────────────────────────── */}
      <div className="h-px w-full bg-white/10" />

      {/* ── Animated wordmark ────────────────────────────── */}
      <div
        ref={wordmarkRef}
        className="flex items-end justify-center px-3 pt-8 pb-0"
        aria-label="CANBICE"
      >
        {LETTERS.map((letter, i) => (
          <div key={i} className="overflow-hidden leading-none">
            <motion.span
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : { y: "110%" }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 18,
                delay: i * 0.07,
              }}
              className="block select-none font-display font-black text-white/[0.08]"
              style={{ fontSize: "clamp(2.5rem, 20.5vw, 24rem)", lineHeight: 1 }}
            >
              {letter}
            </motion.span>
          </div>
        ))}
      </div>

      {/* ── Copyright ─────────────────────────────────────── */}
      <div className="px-6 py-5 text-center">
        <p className="text-[11px] tracking-wide text-gray-700">
          © 2026 CANBICE. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

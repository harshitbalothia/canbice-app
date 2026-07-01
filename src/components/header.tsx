"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about" },
  { label: "Work",     href: "#work" },
  { label: "Contact",  href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);
  const close  = () => setOpen(false);

  return (
    <>
      {/* ── Fixed header bar ──────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 md:px-10">

        {/* Logo — fades out when menu opens to avoid duplication */}
        <motion.div
          animate={{ opacity: open ? 0 : 1, pointerEvents: open ? "none" : "auto" }}
          transition={{ duration: 0.22 }}
        >
          <Link
            href="/"
            onClick={close}
            className="font-display text-base font-bold tracking-[0.25em] text-white select-none md:text-lg"
          >
            CANBICE
          </Link>
        </motion.div>

        {/* Hamburger / Close button */}
        <button
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-[65] flex h-11 w-11 flex-col items-center justify-center"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute block h-px w-6 bg-white origin-center"
          />
          <motion.span
            animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="absolute block h-px w-6 bg-white origin-center"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="absolute block h-px w-6 bg-white origin-center"
          />
        </button>
      </header>

      {/* ── Full-screen menu overlay ───────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(180% at calc(100% - 44px) 44px)" }}
            exit={{   clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-[#0d0d0d]"
          >

            {/* Logo inside the overlay (mirrors header position) */}
            <div className="flex items-center px-6 py-5 md:px-10" style={{ minHeight: "72px" }}>
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.38, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-base font-bold tracking-[0.25em] text-white select-none md:text-lg"
              >
                CANBICE
              </motion.span>
            </div>

            {/* Navigation links */}
            <nav
              aria-label="Site navigation"
              className="flex flex-1 flex-col justify-center px-8 pb-4 md:px-14"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{   opacity: 0, y: 20 }}
                  transition={{
                    delay:    0.22 + i * 0.075,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="group relative inline-flex py-3 font-display text-[2.2rem] font-bold leading-none tracking-tight text-white/70 transition-colors duration-200 hover:text-white sm:text-5xl md:text-6xl"
                  >
                    {link.label}
                    {/* Hover underline */}
                    <span className="absolute bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.58, duration: 0.35 }}
              className="flex items-center justify-between border-t border-white/10 px-8 py-6 md:px-14"
            >
              <p className="font-sans text-[11px] uppercase tracking-widest text-white/25">
                © 2025 Canbice
              </p>
              <p className="font-sans text-[11px] uppercase tracking-widest text-white/25">
                Digital Marketing Agency
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

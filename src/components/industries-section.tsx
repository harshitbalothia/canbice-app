"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  HeartPulse,
  Hotel,
  ShoppingBag,
  Building2,
  Cpu,
  GraduationCap,
  ShoppingCart,
  Landmark,
  Car,
  Users,
  Factory,
  Sparkles,
  Shirt,
  UtensilsCrossed,
  Tv,
} from "lucide-react";

const industries = [
  { name: "Healthcare & Pharma",   icon: HeartPulse   },
  { name: "Hospitality & Travel",  icon: Hotel        },
  { name: "Retail",                icon: ShoppingBag  },
  { name: "Real Estate",           icon: Building2    },
  { name: "IT & Tech",             icon: Cpu          },
  { name: "Education",             icon: GraduationCap},
  { name: "E-commerce",            icon: ShoppingCart },
  { name: "BFSI",                  icon: Landmark     },
  { name: "Automobile",            icon: Car          },
  { name: "B2B",                   icon: Users        },
  { name: "Manufacturing",         icon: Factory      },
  { name: "Lifestyle",             icon: Sparkles     },
  { name: "Fashion",               icon: Shirt        },
  { name: "Restaurant & Food",     icon: UtensilsCrossed },
  { name: "News & Entertainment",  icon: Tv           },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0 },
};

export function IndustriesSection() {
  return (
    <section className="bg-black py-14 sm:py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex border border-white/15 py-1 px-4 rounded-full text-xs font-semibold tracking-widest uppercase text-white/50 bg-white/5 mb-5">
            Who We Work With
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Industries We Serve
          </h2>
          <p className="mt-3 text-white/45 text-base leading-relaxed max-w-md">
            Sector-specific strategies across 15 industries — built on deep audience understanding.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {industries.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={item}
              whileHover={{
                scale: 1.04,
                transition: { type: "spring", stiffness: 380, damping: 20 },
              }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-5 text-center cursor-default select-none hover:border-white/20 hover:bg-white/[0.05] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-colors duration-200">
                <Icon size={18} className="text-white/60 group-hover:text-white transition-colors duration-200" />
              </div>
              <span className="text-xs font-medium text-white/50 group-hover:text-white/80 leading-tight transition-colors duration-200">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

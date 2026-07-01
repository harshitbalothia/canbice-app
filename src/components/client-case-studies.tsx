"use client";

import React from "react";
import { AnimatedFolder, type Project } from "@/components/ui/3d-folder";

const caseStudies: {
  title: string;
  gradient: string;
  projects: Project[];
}[] = [
  {
    title: "SEO & Content",
    gradient: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
    projects: [
      {
        id: "s1",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        title: "3× Organic Traffic Growth",
      },
      {
        id: "s2",
        image:
          "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
        title: "Local Business: #1 Google Rankings",
      },
      {
        id: "s3",
        image:
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
        title: "SaaS Organic Lead Gen",
      },
      {
        id: "s4",
        image:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        title: "500% Blog Traffic Increase",
      },
      {
        id: "s5",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        title: "Healthcare Content Strategy",
      },
    ],
  },
  {
    title: "Social Media",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    projects: [
      {
        id: "sm1",
        image:
          "https://images.unsplash.com/photo-1554446422-d05db23719d2?auto=format&fit=crop&q=80&w=800",
        title: "200K Followers in 6 Months",
      },
      {
        id: "sm2",
        image:
          "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
        title: "Retail Brand: 5× Engagement",
      },
      {
        id: "sm3",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        title: "Viral Reels Campaign",
      },
      {
        id: "sm4",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        title: "Influencer Collab Strategy",
      },
      {
        id: "sm5",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        title: "Community: 50K Members",
      },
    ],
  },
  {
    title: "Paid Advertising",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    projects: [
      {
        id: "pa1",
        image:
          "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        title: "D2C Brand: 4.8× ROAS on Meta",
      },
      {
        id: "pa2",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
        title: "Google Ads: 60% Lower CPA",
      },
      {
        id: "pa3",
        image:
          "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800",
        title: "E-Commerce: ₹1 Cr in 30 Days",
      },
      {
        id: "pa4",
        image:
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800",
        title: "SaaS PPC: 35% Conversion Rate",
      },
      {
        id: "pa5",
        image:
          "https://images.unsplash.com/photo-1541462608141-ad4d4f942177?auto=format&fit=crop&q=80&w=800",
        title: "Real Estate Lead Gen",
      },
    ],
  },
  {
    title: "Brand Strategy",
    gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    projects: [
      {
        id: "br1",
        image:
          "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800",
        title: "Fintech Brand Repositioning",
      },
      {
        id: "br2",
        image:
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800",
        title: "D2C Identity System",
      },
      {
        id: "br3",
        image:
          "https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&q=80&w=800",
        title: "Startup Visual Identity",
      },
      {
        id: "br4",
        image:
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
        title: "Lifestyle Brand Guidelines",
      },
    ],
  },
  {
    title: "Web Design",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    projects: [
      {
        id: "wd1",
        image:
          "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
        title: "SaaS Dashboard Redesign",
      },
      {
        id: "wd2",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        title: "E-Commerce UX Overhaul",
      },
      {
        id: "wd3",
        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
        title: "Healthcare Patient Portal",
      },
      {
        id: "wd4",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        title: "Agency Landing Page",
      },
    ],
  },
  {
    title: "Email Marketing",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    projects: [
      {
        id: "em1",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        title: "D2C: 42% Open Rate Campaign",
      },
      {
        id: "em2",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        title: "SaaS Drip: 35% Conversion",
      },
      {
        id: "em3",
        image:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800",
        title: "Newsletter: 10K Subscribers",
      },
      {
        id: "em4",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
        title: "Product Launch Email Funnel",
      },
    ],
  },
];

// Force dark CSS variables for this always-black section
const DARK_VARS: React.CSSProperties = {
  "--background": "#0a0a0a",
  "--foreground": "#ededed",
  "--card": "#1e1e22",
  "--card-foreground": "#ededed",
  "--muted": "#27272a",
  "--muted-foreground": "#a1a1aa",
  "--border": "#3f3f46",
  "--primary": "#ffffff",
  "--primary-foreground": "#0a0a0a",
  "--accent": "#4f8ef7",
  "--accent-foreground": "#ffffff",
} as React.CSSProperties;

export function ClientCaseStudiesSection() {
  return (
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6" style={DARK_VARS}>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            Our Work
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Client{" "}
            <span className="text-highlight">Case Studies</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-400">
            <span className="hidden sm:inline">Hover a folder to explore our campaigns. </span>
            <span className="sm:hidden">Tap a folder to explore our campaigns. </span>
            Click any card to see the full case study.
          </p>
        </div>

        {/* Folder grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 xl:grid-cols-6 justify-items-center">
          {caseStudies.map((folder) => (
            <AnimatedFolder
              key={folder.title}
              title={folder.title}
              gradient={folder.gradient}
              projects={folder.projects}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

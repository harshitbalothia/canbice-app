"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  animate,
  motionValue,
  type MotionValue,
} from "framer-motion";

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 20;

const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
  "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&q=80",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80",
  "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80",
  "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80",
];

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

type CardMV = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
};

function FlipCard({ src, index, mvs }: { src: string; index: number; mvs: CardMV }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        x: mvs.x,
        y: mvs.y,
        rotate: mvs.rotate,
        scale: mvs.scale,
        opacity: mvs.opacity,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={src} alt={`case-study-${index}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-4 border border-gray-700"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
          <p className="text-xs font-medium text-white">Case Study</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ScrollMorphHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSizeRef = useRef({ width: 0, height: 0 });
  // morphReadyRef: true once the arc animation has started
  const morphReadyRef = useRef(false);
  const [introPhase, setIntroPhase] = useState<"scatter" | "line" | "circle">("scatter");

  const scatterPositions = useMemo(
    () =>
      IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
      })),
    [],
  );

  // Per-card motion values — lazy init
  const cardMVsRef = useRef<CardMV[] | null>(null);
  if (cardMVsRef.current === null) {
    cardMVsRef.current = scatterPositions.map((pos) => ({
      x: motionValue(pos.x),
      y: motionValue(pos.y),
      rotate: motionValue(pos.rotation),
      scale: motionValue(0.6),
      opacity: motionValue(0),
    }));
  }
  const cardMVs = cardMVsRef.current;

  // Container resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const e of entries) {
        containerSizeRef.current = { width: e.contentRect.width, height: e.contentRect.height };
      }
    });
    observer.observe(el);
    containerSizeRef.current = { width: el.offsetWidth, height: el.offsetHeight };
    return () => observer.disconnect();
  }, []);

  // Mouse parallax — no scroll hijacking, just mouse
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((((e.clientX - rect.left) / rect.width) * 2 - 1) * 80);
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Auto-morph motion value: 0 (circle) → 1 (arc), driven by animate() not scroll
  const morphMV = useMotionValue(0);
  const smoothMorph = useSpring(morphMV, { stiffness: 30, damping: 22 });

  // Text overlays driven by morph value
  const introTextOpacity = useTransform(smoothMorph, [0, 0.35], [1, 0]);
  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.75, 1], [20, 0]);

  const SPRING_CFG = { type: "spring" as const, stiffness: 40, damping: 15 };

  // Full auto-play sequence — no scroll events at all
  useEffect(() => {
    const t1 = setTimeout(() => {
      setIntroPhase("line");
      cardMVs.forEach((mv, i) => {
        const lineX = i * 70 - (TOTAL_IMAGES * 70) / 2;
        animate(mv.x, lineX, SPRING_CFG);
        animate(mv.y, 0, SPRING_CFG);
        animate(mv.rotate, 0, SPRING_CFG);
        animate(mv.scale, 1, SPRING_CFG);
        animate(mv.opacity, 1, SPRING_CFG);
      });
    }, 500);

    const t2 = setTimeout(() => {
      setIntroPhase("circle");
      const { width, height } = containerSizeRef.current;
      const circleRadius = Math.min(Math.min(width, height) * 0.35, 350);
      cardMVs.forEach((mv, i) => {
        const angle = (i / TOTAL_IMAGES) * 360;
        const rad = (angle * Math.PI) / 180;
        animate(mv.x, Math.cos(rad) * circleRadius, SPRING_CFG);
        animate(mv.y, Math.sin(rad) * circleRadius, SPRING_CFG);
        animate(mv.rotate, angle + 90, SPRING_CFG);
        animate(mv.scale, 1, SPRING_CFG);
      });
    }, 2500);

    // After circle settles, auto-morph to arc
    const t3 = setTimeout(() => {
      morphReadyRef.current = true;
      animate(morphMV, 1, { duration: 2.8, ease: [0.16, 1, 0.3, 1] });
    }, 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive card positions every frame — no React re-renders
  useAnimationFrame(() => {
    if (!morphReadyRef.current) return;

    const morph = smoothMorph.get();
    const parallax = smoothMouseX.get();
    const { width, height } = containerSizeRef.current;
    if (!width || !height) return;

    const isMobile = width < 768;
    const minDim = Math.min(width, height);
    const circleRadius = Math.min(minDim * 0.35, 350);
    const arcRadius = Math.min(width, height * 1.5) * (isMobile ? 1.4 : 1.1);
    const arcCenterY = height * (isMobile ? 0.35 : 0.25) + arcRadius;
    const spreadAngle = isMobile ? 100 : 130;
    const startAngle = -90 - spreadAngle / 2;
    const step = spreadAngle / (TOTAL_IMAGES - 1);
    const arcScale = isMobile ? 1.4 : 1.8;

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      const circleAngle = (i / TOTAL_IMAGES) * 360;
      const cRad = (circleAngle * Math.PI) / 180;

      const arcAngle = startAngle + i * step;
      const aRad = (arcAngle * Math.PI) / 180;

      cardMVs[i].x.set(lerp(Math.cos(cRad) * circleRadius, Math.cos(aRad) * arcRadius + parallax, morph));
      cardMVs[i].y.set(lerp(Math.sin(cRad) * circleRadius, Math.sin(aRad) * arcRadius + arcCenterY, morph));
      cardMVs[i].rotate.set(lerp(circleAngle + 90, arcAngle + 90, morph));
      cardMVs[i].scale.set(lerp(1, arcScale, morph));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black overflow-hidden">
      <div className="flex h-full w-full flex-col items-center justify-center">

        {/* Intro text */}
        <motion.div
          style={{ opacity: introTextOpacity }}
          className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={introPhase !== "scatter"
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="text-2xl font-medium tracking-tight text-white md:text-4xl"
          >
            Results our clients believe in.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-400"
          >
            HOVER TO EXPLORE
          </motion.p>
        </motion.div>

        {/* Arc content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Client Case Studies
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed">
            Real campaigns. Measurable results.{" "}
            <br className="hidden md:block" />
            Hover a card to explore the case study.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => (
            <FlipCard key={i} src={src} index={i} mvs={cardMVs[i]} />
          ))}
        </div>

      </div>
    </div>
  );
}

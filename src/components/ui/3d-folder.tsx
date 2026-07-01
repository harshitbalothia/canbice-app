"use client";

import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useLayoutEffect,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";

export interface Project {
  id: string;
  image: string;
  title: string;
}

// ─────────────────────────────────────────────────────────────
// ProjectCard
// ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  isHovered: boolean;
  onClick: (project: Project) => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, total, isHovered, onClick }, ref) => {
    const [cardHovered, setCardHovered] = useState(false);
    const offset = index - Math.floor((total - 1) / 2);

    const popped = isHovered && cardHovered;

    const transform = isHovered
      ? popped
        ? `translateX(${offset * 42}px) translateY(-42px) rotate(${offset * 3}deg) scale(1.35)`
        : `translateX(${offset * 42}px) translateY(-24px) rotate(${offset * 6}deg)`
      : "translateX(0) translateY(0) rotate(0deg)";

    return (
      <div
        ref={ref}
        className="absolute cursor-pointer overflow-hidden rounded-xl border border-white/15"
        style={{
          width: 76,
          height: 92,
          bottom: 6,
          left: "50%",
          marginLeft: -38,
          backgroundImage: `url("${project.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: popped ? 20 : index + 1,
          transform,
          opacity: isHovered ? 1 : index === total - 1 ? 0.6 : 0,
          boxShadow: popped
            ? "0 24px 48px rgba(0,0,0,0.75), 0 0 0 1.5px rgba(255,255,255,0.25)"
            : "0 6px 18px rgba(0,0,0,0.55)",
          transition: [
            `transform 320ms cubic-bezier(0.34,1.56,0.64,1) ${!popped && isHovered ? index * 38 : 0}ms`,
            `opacity 300ms ease ${isHovered ? index * 28 : 0}ms`,
            "box-shadow 200ms ease",
            "z-index 0s",
          ].join(", "),
        }}
        onClick={() => onClick(project)}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
      >
        {/* title overlay — always shown on pop */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-2 transition-opacity duration-200"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
            opacity: popped ? 1 : 0,
          }}
        >
          <span className="text-[9px] font-bold text-white leading-tight line-clamp-2 tracking-wide">
            {project.title}
          </span>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

// ─────────────────────────────────────────────────────────────
// ImageLightbox
// ─────────────────────────────────────────────────────────────

interface LightboxProps {
  projects: Project[];
  initialIndex: number;
  onClose: () => void;
}

function ImageLightbox({ projects, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev" | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (slideDir === null) return;
    const img = imgRef.current;
    if (!img) return;
    img.style.transition = "none";
    img.style.opacity = "0";
    img.style.transform =
      slideDir === "next" ? "translateX(20px)" : "translateX(-20px)";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transition = "opacity 260ms ease, transform 260ms ease";
        img.style.opacity = "1";
        img.style.transform = "translateX(0)";
      });
    });
  }, [current, slideDir]);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setSlideDir(dir);
      setCurrent((c) =>
        dir === "next"
          ? (c + 1) % projects.length
          : (c - 1 + projects.length) % projects.length
      );
      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating, projects.length]
  );

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, navigate]);

  const project = projects[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{ width: "min(90vw,540px)", background: "#1c1c1c" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          onClick={onClose}
        >
          <X size={13} />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER;
            }}
          />
          {/* gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Info */}
        <div className="px-6 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 mb-1">
            Case Study
          </p>
          <h3 className="text-sm font-semibold text-white leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Nav bar */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-3">
          <button
            onClick={() => navigate("prev")}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} />
            Prev
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setSlideDir(i > current ? "next" : "prev"); }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === current ? 14 : 5,
                  height: 5,
                  background:
                    i === current
                      ? "#4f8ef7"
                      : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => navigate("next")}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AnimatedFolder
// ─────────────────────────────────────────────────────────────

interface AnimatedFolderProps {
  title: string;
  projects: Project[];
  gradient?: string;
  className?: string;
}

export function AnimatedFolder({
  title,
  projects,
  gradient,
  className,
}: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const preview = projects.slice(0, Math.min(5, projects.length));

  const backBg =
    gradient ??
    "linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
  const tabBg = gradient ?? "var(--folder-tab)";
  const frontBg =
    gradient ??
    "linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

  const EASE = "cubic-bezier(0.34,1.56,0.64,1)";

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col items-center gap-4 sm:gap-5 rounded-2xl border bg-card px-3 pt-5 pb-4 sm:px-6 sm:pt-7 sm:pb-5",
          "transition-all duration-500 cursor-pointer",
          "border-border hover:border-accent/30 hover:shadow-2xl",
          className
        )}
        style={{ perspective: "1200px" }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* ── 3D folder ── */}
        <div className="relative" style={{ width: 128, height: 96 }}>

          {/* Back plate */}
          <div
            className="absolute inset-0 rounded-xl border border-white/10 shadow-md"
            style={{
              background: backBg,
              zIndex: 1,
              transformOrigin: "50% 100%",
              transform: isHovered
                ? "rotateX(-20deg) scaleY(1.06)"
                : "rotateX(0deg) scaleY(1)",
              transition: `transform 460ms ${EASE}`,
            }}
          />

          {/* Tab */}
          <div
            className="absolute rounded-t-md border-t border-x border-white/10"
            style={{
              width: 44,
              height: 12,
              top: -10,
              left: 14,
              background: tabBg,
              zIndex: 2,
            }}
          />

          {/* Cards (revealed on hover) */}
          <div className="absolute inset-0" style={{ zIndex: 4, overflow: "visible" }}>
            {preview.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={preview.length}
                isHovered={isHovered}
                onClick={(p) => {
                  const idx = projects.findIndex((x) => x.id === p.id);
                  setLightbox(idx >= 0 ? idx : 0);
                }}
              />
            ))}
          </div>

          {/* Front plate */}
          <div
            className="absolute inset-0 rounded-xl border border-white/20 shadow-lg"
            style={{
              background: frontBg,
              zIndex: isHovered ? 3 : 8,
              transformOrigin: "50% 100%",
              transform: isHovered
                ? "rotateX(40deg) translateY(16px)"
                : "rotateX(0deg) translateY(0)",
              opacity: isHovered ? 0.65 : 1,
              transition: `transform 460ms ${EASE}, opacity 280ms ease`,
            }}
          />

          {/* Front shine */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.06) 50%, transparent 65%)",
              zIndex: isHovered ? 3 : 9,
              transformOrigin: "50% 100%",
              transform: isHovered
                ? "rotateX(40deg) translateY(16px)"
                : "rotateX(0deg) translateY(0)",
              opacity: isHovered ? 0 : 1,
              transition: `transform 460ms ${EASE}, opacity 200ms ease`,
            }}
          />
        </div>

        {/* Label */}
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground group-hover:text-white transition-colors duration-200">
            {title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {projects.length} Case {projects.length === 1 ? "Study" : "Studies"}
          </p>
        </div>
      </div>

      {lightbox !== null && (
        <ImageLightbox
          projects={projects}
          initialIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

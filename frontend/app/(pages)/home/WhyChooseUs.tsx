"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Gem,
  Smartphone,
  SlidersHorizontal,
  Headphones,
  Zap,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export interface WhyChooseFeatureItem {
  id: string;
  icon: "gem" | "smartphone" | "sliders" | "headphones" | "zap";
  tag: string;
  title: string;
  description: string;
  highlightMetric: string;
}

export interface WhyChooseUsData {
  eyebrowLabel: string;
  headingLine1: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  ctaLabel: string;
  ctaPath: string;
  features: WhyChooseFeatureItem[];
}

const DEFAULT_WHY_CHOOSE_DATA: WhyChooseUsData = {
  eyebrowLabel: "WHY CHOOSE US",
  headingLine1: "Why Choose",
  headingHighlight: "OUR",
  headingItalic: "WEBSITE?",
  subheading:
    "Your trusted studio partner for architectural, customizable, and high-converting business website solutions.",
  ctaLabel: "Explore Our Standards",
  ctaPath: "/about",
  features: [
    {
      id: "premium-designs",
      icon: "gem",
      tag: "01 • CRAFT",
      title: "Premium Designs",
      description:
        "Modern & high-converting storefronts engineered with 2026 studio aesthetics.",
      highlightMetric: "2026 Glass UI",
    },
    {
      id: "mobile-responsive",
      icon: "smartphone",
      tag: "02 • FLUIDITY",
      title: "Mobile Responsive",
      description:
        "Pixel-perfect layouts across every iPhone, Android, tablet, and desktop screen.",
      highlightMetric: "100% Adaptive",
    },
    {
      id: "fully-customizable",
      icon: "sliders",
      tag: "03 • CONTROL",
      title: "Fully Customizable",
      description:
        "Edit brand colors, typography, logos, and product catalogs effortlessly.",
      highlightMetric: "Zero Lock-In",
    },
    {
      id: "dedicated-support",
      icon: "headphones",
      tag: "04 • CARE",
      title: "Dedicated Support",
      description:
        "Direct full-stack developer assistance whenever you need updates or scaling.",
      highlightMetric: "24/7 Priority",
    },
    {
      id: "fast-delivery",
      icon: "zap",
      tag: "05 • SPEED",
      title: "Fast Delivery",
      description:
        "Take your complete business website live with SSL & domain in 48 hours.",
      highlightMetric: "48-Hr Launch",
    },
  ],
};

const CARD_GRADIENT_GLASS = [
  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(227,243,246,0.85) 50%, rgba(179,223,229,0.78) 100%)",
  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(239,248,247,0.85) 50%, rgba(193,235,227,0.78) 100%)",
  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(245,241,232,0.85) 50%, rgba(230,199,138,0.75) 100%)",
  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(242,246,252,0.85) 50%, rgba(196,218,247,0.78) 100%)",
  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(232,242,245,0.85) 50%, rgba(153,212,220,0.78) 100%)",
];

export default function WhyChooseUs() {
  const router = useRouter();
  const [data, setData] = useState<WhyChooseUsData>(DEFAULT_WHY_CHOOSE_DATA);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 120,
    y: 90,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedRef = useRef<boolean>(false);

  // Backend API Fetch
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/why-choose-us`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.features)) {
          setData({ ...DEFAULT_WHY_CHOOSE_DATA, ...fetched });
        }
      })
      .catch((err) => console.error("WhyChooseUs API error:", err));
  }, []);

  // Safe Entrance & Smooth Glass Animations (Zero Circular Motion)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const runEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.fromTo(
        ".why-glass-reveal",
        { y: 16, opacity: 0.95 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionEl);

    const ctx = gsap.context(() => {
      // Flowing Linear Light Beam
      gsap.fromTo(
        ".why-silk-beam",
        { strokeDashoffset: 800 },
        {
          strokeDashoffset: -800,
          duration: 7,
          repeat: -1,
          ease: "none",
        }
      );

      // Alternating Bento Levitation
      gsap.utils.toArray<HTMLElement>(".why-float-slot").forEach((slot, i) => {
        gsap.to(slot, {
          y: i % 2 === 0 ? -4 : 4,
          duration: 2.8 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Diagonal Light Sheen Sweep
      gsap.utils.toArray<HTMLElement>(".why-auto-sheen").forEach((beam, i) => {
        gsap.fromTo(
          beam,
          { xPercent: -160 },
          {
            xPercent: 350,
            duration: 2.2,
            repeat: -1,
            repeatDelay: 3.5 + i * 0.8,
            delay: i * 0.6,
            ease: "power2.inOut",
          }
        );
      });

      gsap.to(".why-studio-widget", {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionEl);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  // Hover Zoom-In / Zoom-Out Pulse
  const handleCardMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const el = cardRefs.current[idx];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap
      .timeline()
      .to(el, {
        scale: 1.03,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(el, {
        scale: 1.012,
        y: -3,
        duration: 0.4,
        ease: "sine.inOut",
      });
  };

  const handleCardMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    const el = cardRefs.current[idx];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      scale: 1,
      y: 0,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const renderFeatureIcon = (
    icon: WhyChooseFeatureItem["icon"],
    isHovered: boolean
  ) => {
    const cls = `w-5 h-5 transition-colors duration-300 ${
      isHovered ? "text-white" : "text-[#136D7E]"
    }`;
    if (icon === "gem") return <Gem className={cls} strokeWidth={2} />;
    if (icon === "smartphone")
      return <Smartphone className={cls} strokeWidth={2} />;
    if (icon === "sliders")
      return <SlidersHorizontal className={cls} strokeWidth={2} />;
    if (icon === "headphones")
      return <Headphones className={cls} strokeWidth={2} />;
    return <Zap className={cls} strokeWidth={2} />;
  };

  return (
    <section
      ref={sectionRef}
      className="why-choose-2026 relative overflow-hidden py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#EBF6F9] via-[#F4F9FA] to-[#E2F0F3] text-[#0F2C33]"
    >
      {/* 2026 Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .why-choose-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-why-italic {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* ===================================================================
          LINEAR GRADIENT GLASS & SILK WAVE BACKGROUND (ZERO CIRCLES)
         =================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="whyGlassSilk"
              x1="0"
              y1="80"
              x2="1440"
              y2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#CBE5EC" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8CC1CE" stopOpacity="0.32" />
            </linearGradient>

            <linearGradient
              id="whyLinearBeam"
              x1="0"
              y1="680"
              x2="1440"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#136D7E" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C8A45D" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#136D7E" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Clean Linear Silk Wave */}
          <path
            d="M-60 560 C300 440, 640 680, 980 490 C1220 370, 1380 240, 1500 260 L1500 790 L-60 790 Z"
            fill="url(#whyGlassSilk)"
          />

          {/* Linear Light Beam */}
          <path
            d="M-60 560 C300 440, 640 680, 980 490 C1220 370, 1380 240, 1500 260"
            stroke="url(#whyLinearBeam)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="180 620"
            className="why-silk-beam"
          />
        </svg>

        {/* Architectural Hairlines */}
        <div className="hidden xl:block absolute inset-y-0 left-8 w-[1px] bg-[#CBE4EA]" />
        <div className="hidden xl:block absolute inset-y-0 right-8 w-[1px] bg-[#CBE4EA]" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ===================================================================
              LEFT 4 COLS: EDITORIAL HEADING + GRADIENT GLASS BENCHMARK CARD
             =================================================================== */}
          <div className="lg:col-span-4 space-y-6 why-glass-reveal">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-[#CBE4EA] text-[#136D7E] text-[10.5px] font-extrabold tracking-[0.2em] uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{data.eyebrowLabel}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0F2C33]">
                {data.headingLine1}
                <span className="block mt-1">
                  <span className="bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#C8A45D] bg-clip-text text-transparent">
                    {data.headingHighlight}{" "}
                  </span>
                  <span className="font-why-italic italic font-normal text-[38px] sm:text-[46px] lg:text-[52px] text-[#136D7E] tracking-normal">
                    {data.headingItalic}
                  </span>
                </span>
              </h2>

              <p className="text-xs sm:text-[14px] text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                {data.subheading}
              </p>

              <div className="pt-1 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => router.push(data.ctaPath)}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#0E8394] hover:brightness-110 text-white font-bold text-xs sm:text-[13px] shadow-[0_12px_28px_rgba(19,109,126,0.24)] hover:-translate-y-0.5 transition-all"
                >
                  <span>{data.ctaLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Gradient Glass Studio Benchmark Card */}
            <div className="why-studio-widget relative overflow-hidden rounded-[26px] bg-gradient-to-br from-white/90 via-[#F2F9FA]/90 to-[#DCEEF2]/85 backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/20 p-5 shadow-[0_20px_50px_rgba(19,109,126,0.12)]">
              <div className="flex items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#DCEEF2]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F2C33]">
                    Studio Quality Index
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#136D7E] text-white text-[10px] font-extrabold shadow-xs">
                  2026 Edition
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F2C33] mb-1">
                    <span>Performance &amp; Core Web Vitals</span>
                    <span className="text-[#136D7E]">99.4%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white overflow-hidden border border-[#DCEEF2]">
                    <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-[#136D7E] via-[#2DD4BF] to-[#C8A45D]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F2C33] mb-1">
                    <span>Full-Stack Source Ownership</span>
                    <span className="text-[#136D7E]">100%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white overflow-hidden border border-[#DCEEF2]">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#C8A45D]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCEEF2] flex items-center justify-between text-[11px] font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#136D7E]" />
                  <span>SSL + Razorpay Ready</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[#0F2C33] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9384]" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 8 COLS: 3 + 2 GRADIENT GLASS BENTO GRID
             =================================================================== */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
              {data.features.map((feat, idx) => {
                const isHovered = hoveredIdx === idx;
                const desktopSpan =
                  idx < 3 ? "lg:col-span-2" : "lg:col-span-3";
                const isLastOddTablet =
                  data.features.length % 2 !== 0 &&
                  idx === data.features.length - 1;
                const cardFill =
                  CARD_GRADIENT_GLASS[idx % CARD_GRADIENT_GLASS.length];

                return (
                  <div
                    key={feat.id}
                    className={`${desktopSpan} ${
                      isLastOddTablet ? "sm:col-span-2 lg:col-span-3" : ""
                    } why-glass-reveal why-float-slot`}
                  >
                    <div
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onMouseEnter={() => handleCardMouseEnter(idx)}
                      onMouseLeave={() => handleCardMouseLeave(idx)}
                      onMouseMove={(e) => handleCardMouseMove(e, idx)}
                      style={{ backgroundImage: cardFill }}
                      className="group relative h-full rounded-[26px] backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 hover:ring-[#136D7E]/50 p-5 sm:p-6 shadow-[0_14px_38px_rgba(19,109,126,0.08)] hover:shadow-[0_26px_60px_rgba(19,109,126,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden will-change-transform"
                    >
                      {/* Interactive Cursor Spotlight */}
                      <div
                        style={{
                          opacity: isHovered ? 1 : 0,
                          background: `radial-gradient(210px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(200, 164, 93, 0.25), transparent 75%)`,
                        }}
                        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                      />

                      {/* Always-Running Automatic Glass Light Sheen */}
                      <div className="why-auto-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10 bg-gradient-to-r from-transparent via-white/85 to-transparent skew-x-[-20deg]" />

                      {/* TOP ROW: FROSTED ICON BADGE + METRIC TAG */}
                      <div className="relative z-10 flex items-center justify-between gap-2 mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-white/95 group-hover:bg-gradient-to-br group-hover:from-[#136D7E] group-hover:to-[#0E9384] border border-white group-hover:border-transparent flex items-center justify-center shadow-2xs transition-all duration-300 group-hover:scale-105">
                          {renderFeatureIcon(feat.icon, isHovered)}
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-white/90 border border-white text-[10px] font-extrabold text-[#136D7E] tracking-tight shadow-2xs">
                          {feat.highlightMetric}
                        </span>
                      </div>

                      {/* BOTTOM TEXT: STEP TAG + TITLE + DESCRIPTION */}
                      <div className="relative z-10 space-y-1.5">
                        <span className="block text-[9.5px] font-extrabold tracking-[0.18em] uppercase text-[#136D7E]/80">
                          {feat.tag}
                        </span>
                        <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0F2C33] group-hover:text-[#136D7E] transition-colors leading-snug">
                          {feat.title}
                        </h3>
                        <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
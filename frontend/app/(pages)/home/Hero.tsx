"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowRight,
  Play,
  Layers,
  LayoutGrid,
  Users,
  CheckCircle2,
  Sparkles,
  Eye,
  Zap,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export interface HeroShowcaseWebsite {
  websiteSlug: string;
  title: string;
  subtitle: string;
  category: string;
  badgeText: string;
  startingPrice: string;
  ctaText: string;
  image: string;
  fallbackImage?: string;
}

export interface HeroStatItem {
  icon: "layers" | "grid" | "users" | "check";
  value: string;
  label: string;
  sublabel: string;
  featured?: boolean;
}

export interface HeroSectionData {
  agencyBadge: string;
  headingLine1: string;
  headingHighlight: string;
  description: string;
  primaryBtn: { label: string; path: string };
  secondaryBtn: { label: string; path: string };
  showcaseWebsites: HeroShowcaseWebsite[];
  stats: HeroStatItem[];
}

const DEFAULT_HERO_DATA: HeroSectionData = {
  agencyBadge: "YOUR BUSINESS • OUR PRIORITY",
  headingLine1: "Buy, Customize & Launch",
  headingHighlight: "Your Business Website",
  description:
    "Discover ready-to-launch business websites, Admin Dashboards, and custom full-stack solutions — engineered with 2026 studio precision.",
  primaryBtn: { label: "Explore Websites", path: "/websites" },
  secondaryBtn: {
    label: "Custom Build",
    path: "/contact?service=fullstack-development",
  },
  showcaseWebsites: [
    {
      websiteSlug: "zarii-boutique",
      title: "Zarii Boutique",
      subtitle: "Bridal Couture & Custom Stitching Store",
      category: "Fashion & Luxury Couture",
      badgeText: "BESTSELLER",
      startingPrice: "₹9,999",
      ctaText: "3D Live Tour",
      image: "/home.jpeg",
      fallbackImage:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1100&q=85",
    },
    {
      websiteSlug: "the-purple-cafe",
      title: "The Purple Café",
      subtitle: "Artisan Dining & QR Table Ordering",
      category: "Dining & Hospitality",
      badgeText: "TRENDING",
      startingPrice: "₹12,999",
      ctaText: "3D Live Tour",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1100&q=85",
    },
    {
      websiteSlug: "healthcare-plus",
      title: "HealthCare Plus",
      subtitle: "Multi-Specialty Clinic & Slot Portal",
      category: "Healthcare & Medical",
      badgeText: "VERIFIED",
      startingPrice: "₹11,999",
      ctaText: "3D Live Tour",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1100&q=85",
    },
  ],
  stats: [
    {
      icon: "layers",
      value: "150+ Ready Websites",
      label: "100% Clean Source Code",
      sublabel: "Next.js, React & Laravel",
      featured: false,
    },
    {
      icon: "grid",
      value: "48-Hr Live Setup",
      label: "Express Deployment",
      sublabel: "Domain, Hosting & SSL",
      featured: true,
    },
    {
      icon: "users",
      value: "500+ Happy Clients",
      label: "Verified Businesses",
      sublabel: "Across 7+ Industries",
      featured: false,
    },
    {
      icon: "check",
      value: "Dedicated Support",
      label: "Razorpay & UPI Ready",
      sublabel: "We're always here",
      featured: false,
    },
  ],
};

const STAT_PASTEL_CARDS = [
  "from-white via-[#F1F8F7] to-[#E4F2EF] border-[#CBE3DE]",
  "from-white via-[#FAF5EA] to-[#F3E8D3] border-[#E6D5B6]",
  "from-white via-[#F4F8F7] to-[#E7F0EE] border-[#CFE0DD]",
  "from-white via-[#F9F6F0] to-[#F1EAE0] border-[#E3D7C5]",
];

export default function Hero() {
  const router = useRouter();
  const [heroData, setHeroData] = useState<HeroSectionData>(DEFAULT_HERO_DATA);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, active: false });

  const heroRef = useRef<HTMLElement | null>(null);
  const desktopImgRef = useRef<HTMLImageElement | null>(null);
  const mobileImgRef = useRef<HTMLImageElement | null>(null);
  const stageZoomRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/hero`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setHeroData({ ...DEFAULT_HERO_DATA, ...data });
      })
      .catch((err) => console.error("Hero API error:", err));
  }, []);

  // 1. Always-Running Crisp Architectural Light Streaks, Astrolabe Rings & Floating Prisms
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal-item",
        { y: 18, opacity: 0.95 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );

      // Flowing Luminous Light Beams along Silk Curves
      gsap.fromTo(
        ".hero-light-beam-gold",
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: -900,
          duration: 7.5,
          repeat: -1,
          ease: "none",
        }
      );

      gsap.fromTo(
        ".hero-light-beam-teal",
        { strokeDashoffset: -850 },
        {
          strokeDashoffset: 850,
          duration: 8.8,
          repeat: -1,
          ease: "none",
        }
      );

      // Crisp Rotating Studio Gyroscope / Astrolabe Rings
      gsap.to(".hero-orbit-ring-cw", {
        rotation: 360,
        duration: 38,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".hero-orbit-ring-ccw", {
        rotation: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      // Sharp Floating Glass-Prism Accents (No Blurry Mud)
      gsap.utils.toArray<HTMLElement>(".hero-crisp-prism").forEach((prism, i) => {
        gsap.to(prism, {
          y: i % 2 === 0 ? -16 : 16,
          x: i % 3 === 0 ? 12 : -12,
          rotation: i % 2 === 0 ? 52 : 38,
          duration: 4.5 + i * 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // iPhone & Floating Badges Levitation
      gsap.to(".hero-iphone-float", {
        y: -10,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-badge-float-1", {
        y: -6,
        x: 3,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-badge-float-2", {
        y: 6,
        x: -3,
        duration: 3.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".hero-glass-sheen",
        { xPercent: -160 },
        {
          xPercent: 340,
          duration: 2.3,
          repeat: -1,
          repeatDelay: 3.5,
          ease: "power2.inOut",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const totalSlides = heroData.showcaseWebsites.length;
  const activeSite =
    heroData.showcaseWebsites[activeIndex] || heroData.showcaseWebsites[0];

  // 2. Continuous Live Webpage Scroll & Zoom Choreography Inside Both Screens
  useEffect(() => {
    const dImg = desktopImgRef.current;
    const mImg = mobileImgRef.current;

    const tl = gsap.timeline({
      onUpdate: () => {
        setSlideProgress(tl.progress() * 100);
      },
      onComplete: () => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      },
    });

    if (dImg) {
      tl.fromTo(
        dImg,
        { opacity: 0.4, scale: 1.0, yPercent: 0 },
        { opacity: 1, scale: 1.06, yPercent: 0, duration: 1.8, ease: "power2.out" },
        0
      ).to(
        dImg,
        { scale: 1.0, yPercent: -35, duration: 4.4, ease: "sine.inOut" },
        1.8
      );
    }

    if (mImg) {
      tl.fromTo(
        mImg,
        { opacity: 0.4, scale: 1.04, yPercent: 0 },
        { opacity: 1, scale: 1.0, yPercent: -38, duration: 6.2, ease: "sine.inOut" },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeIndex, totalSlides]);

  // 3. Hover Zoom-In / Zoom-Out Focus Pulse on Stage
  const handleStageMouseEnter = () => {
    if (!stageZoomRef.current) return;
    gsap.killTweensOf(stageZoomRef.current);
    gsap
      .timeline()
      .to(stageZoomRef.current, {
        scale: 1.028,
        duration: 0.38,
        ease: "power2.out",
      })
      .to(stageZoomRef.current, {
        scale: 1.012,
        duration: 0.5,
        ease: "sine.inOut",
      });
  };

  const handleStageMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, active: false });
    if (!stageZoomRef.current) return;
    gsap.killTweensOf(stageZoomRef.current);
    gsap.to(stageZoomRef.current, {
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -(y * 4.5),
      rotateY: x * 5.5,
      active: true,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 36) {
      setActiveIndex((prev) =>
        deltaX < 0
          ? (prev + 1) % totalSlides
          : (prev - 1 + totalSlides) % totalSlides
      );
    }
    touchStartX.current = null;
  };

  const renderStatIcon = (icon: HeroStatItem["icon"]) => {
    const cls = "w-5 h-5 text-[#136D7E]";
    if (icon === "layers") return <Layers className={cls} />;
    if (icon === "grid") return <LayoutGrid className={cls} />;
    if (icon === "users") return <Users className={cls} />;
    return <CheckCircle2 className={cls} />;
  };

  return (
    <section
      ref={heroRef}
      className="hero-studio-2026 relative overflow-x-clip bg-gradient-to-b from-[#FAF7F2] via-[#F4F8F7] to-[#FFFFFF] text-[#0F3D3E]"
    >
      {/* 2026 Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .hero-studio-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-hero-serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* ===================================================================
          CRISP 2026 ARCHITECTURAL SILK RIBBONS, LUMINOUS BEAMS & ASTROLABE RINGS
          (Zero Foggy Blur — High-Contrast Studio Depth)
         =================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 820"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Sculpted Emerald-Teal Studio Ribbon */}
            <linearGradient
              id="crispStudioRibbon"
              x1="780"
              y1="0"
              x2="1440"
              y2="780"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D8ECE8" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#4393A3" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0F3D3E" stopOpacity="0.16" />
            </linearGradient>

            {/* Warm Champagne-Gold Silk Layer */}
            <linearGradient
              id="crispGoldRibbon"
              x1="620"
              y1="120"
              x2="1440"
              y2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#E6C78A" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#C8A45D" stopOpacity="0.14" />
            </linearGradient>

            {/* Luminous Flowing Gold Stroke */}
            <linearGradient
              id="flowingGoldBeam"
              x1="0"
              y1="0"
              x2="1440"
              y2="820"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#C8A45D" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#136D7E" stopOpacity="0.25" />
            </linearGradient>

            {/* Luminous Flowing Teal Stroke */}
            <linearGradient
              id="flowingTealBeam"
              x1="1440"
              y1="0"
              x2="0"
              y2="820"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#136D7E" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#0E9384" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C8A45D" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 1. Sculpted Right-Side Studio Arc (Crisp Edge, Zero Blur) */}
          <path
            d="M840 -20 C650 180, 620 440, 810 640 C950 785, 1210 810, 1460 760 L1460 -20 Z"
            fill="url(#crispStudioRibbon)"
          />

          {/* 2. Secondary Overlapping Champagne Silk Curve */}
          <path
            d="M960 -20 C760 150, 740 410, 930 590 C1070 725, 1270 750, 1460 700 L1460 -20 Z"
            fill="url(#crispGoldRibbon)"
          />

          {/* 3. Crisp Static Hairline Guide Curves */}
          <path
            d="M840 -20 C650 180, 620 440, 810 640 C950 785, 1210 810, 1460 760"
            stroke="#C8A45D"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          <path
            d="M-40 670 C280 560, 560 730, 890 560 C1140 430, 1290 210, 1480 230"
            stroke="#136D7E"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />

          {/* 4. Animated Flowing Light Beams Traveling Along Curves */}
          <path
            d="M840 -20 C650 180, 620 440, 810 640 C950 785, 1210 810, 1460 760"
            stroke="url(#flowingGoldBeam)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="180 720"
            className="hero-light-beam-gold"
          />
          <path
            d="M-40 670 C280 560, 560 730, 890 560 C1140 430, 1290 210, 1480 230"
            stroke="url(#flowingTealBeam)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="160 690"
            className="hero-light-beam-teal"
          />

          {/* 5. Crisp Rotating Astrolabe Rings Behind Hardware Showcase */}
          <g className="hero-orbit-ring-cw">
            <circle
              cx="1045"
              cy="375"
              r="285"
              stroke="#C8A45D"
              strokeOpacity="0.45"
              strokeWidth="1.3"
              strokeDasharray="14 8 3 8"
            />
            <circle cx="1045" cy="90" r="5" fill="#C8A45D" />
            <circle cx="1045" cy="660" r="4.5" fill="#0F3D3E" />
          </g>

          <g className="hero-orbit-ring-ccw">
            <circle
              cx="1045"
              cy="375"
              r="220"
              stroke="#136D7E"
              strokeOpacity="0.32"
              strokeWidth="1.1"
              strokeDasharray="6 6"
            />
            <circle cx="1265" cy="375" r="4.5" fill="#136D7E" />
            <circle cx="825" cy="375" r="4" fill="#D4AF37" />
          </g>
        </svg>

        {/* Sharp-Edged Floating Glass Prisms (Zero Blur Muddiness) */}
        <div className="hero-crisp-prism hidden md:block absolute top-24 left-[44%] w-7 h-7 rotate-45 rounded-lg bg-white/75 backdrop-blur-md border border-[#C8A45D]/45 shadow-xs" />
        <div className="hero-crisp-prism hidden md:block absolute bottom-40 left-[18%] w-5 h-5 rotate-45 rounded-md bg-[#E6F4F1]/80 backdrop-blur-md border border-[#136D7E]/35 shadow-xs" />
        <div className="hero-crisp-prism hidden lg:block absolute top-28 right-[8%] w-8 h-8 rotate-45 rounded-lg bg-white/70 backdrop-blur-md border border-white shadow-xs" />

        {/* Architectural Vertical Hairlines */}
        <div className="hidden xl:block absolute inset-y-0 left-8 w-[1px] bg-[#E5DEC9]/75" />
        <div className="hidden xl:block absolute inset-y-0 right-8 w-[1px] bg-[#E5DEC9]/75" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative max-w-7xl mx-auto pt-7 sm:pt-12 pb-8 sm:pb-14 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT 5 COLS: CLEAN EDITORIAL TYPOGRAPHY & LUXURY CTAS */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 z-20 text-left">
            <div className="hero-reveal-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2D9C5] text-[#0F3D3E] font-extrabold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{heroData.agencyBadge}</span>
            </div>

            <h1 className="hero-reveal-item text-[32px] sm:text-5xl xl:text-[54px] font-extrabold leading-[1.09] tracking-[-0.03em] text-[#0F3D3E]">
              {heroData.headingLine1}
              <span className="block mt-1">
                <span className="bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#8A6D3B] bg-clip-text text-transparent">
                  Your Business{" "}
                </span>
                <span className="font-hero-serif italic font-normal text-[40px] sm:text-[58px] xl:text-[66px] text-[#136D7E] tracking-normal">
                  Website
                </span>
              </span>
            </h1>

            <p className="hero-reveal-item text-slate-600 text-[14px] sm:text-[15.5px] leading-[1.65] max-w-md">
              {heroData.description}
            </p>

            {/* Primary & Secondary Luxury Pill Buttons */}
            <div className="hero-reveal-item flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => router.push(heroData.primaryBtn.path)}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#0F3D3E] text-[#FAF7F2] font-bold text-[13px] sm:text-sm shadow-[0_14px_30px_rgba(15,61,62,0.24)] hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all whitespace-nowrap"
              >
                <span>{heroData.primaryBtn.label}</span>
                <ArrowRight className="w-4 h-4 text-[#E6C78A] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => router.push(heroData.secondaryBtn.path)}
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white border border-[#DFD6C3] text-[#0F3D3E] font-bold text-[13px] sm:text-sm hover:border-[#0F3D3E] hover:-translate-y-0.5 active:scale-[0.98] transition-all whitespace-nowrap shadow-2xs"
              >
                <span className="w-4 h-4 rounded-full bg-[#FAF5EA] text-[#8A6D3B] flex items-center justify-center group-hover:bg-[#0F3D3E] group-hover:text-[#E6C78A] transition-colors">
                  <Play className="w-2 h-2 fill-current ml-0.5" />
                </span>
                <span>{heroData.secondaryBtn.label}</span>
              </button>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 7 COLS: 2026 FRAMELESS GLASS STUDIO CANVAS + BRUSHED-GOLD IPHONE
             =================================================================== */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handleStageMouseMove}
            onMouseEnter={handleStageMouseEnter}
            onMouseLeave={handleStageMouseLeave}
            className="lg:col-span-7 relative select-none hero-reveal-item [perspective:1600px]"
          >
            {/* Interactive Template Switcher Tabs with Live Progress Bar */}
            <div className="flex items-center justify-start sm:justify-end gap-2 mb-3.5 overflow-x-auto no-scrollbar pb-1">
              {heroData.showcaseWebsites.map((site, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={site.websiteSlug}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative overflow-hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-[#0F3D3E] text-[#FAF7F2] shadow-md scale-[1.03]"
                        : "bg-white text-slate-600 border border-[#E5DEC9] hover:border-[#0F3D3E] hover:text-[#0F3D3E]"
                    }`}
                  >
                    {isActive && (
                      <span
                        style={{ width: `${slideProgress}%` }}
                        className="pointer-events-none absolute inset-y-0 left-0 bg-white/15"
                      />
                    )}
                    <span
                      className={`relative z-10 text-[10px] font-extrabold ${
                        isActive ? "text-[#E6C78A]" : "text-[#8A6D3B]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="relative z-10">{site.title}</span>
                  </button>
                );
              })}
            </div>

            {/* 3D PERSPECTIVE HARDWARE STAGE */}
            <div
              ref={stageZoomRef}
              style={{
                transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: tilt.active
                  ? "transform 0.12s ease-out"
                  : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="relative mx-auto max-w-[650px] pb-5 sm:pb-7 pr-3 sm:pr-7 [transform-style:preserve-3d]"
            >
              {/* Floating Glass Micro-Pill (Top-Left) */}
              <div className="hero-badge-float-1 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-[#E5DEC9] shadow-[0_14px_30px_rgba(15,61,62,0.12)] absolute -top-4 -left-4 z-30 pointer-events-none">
                <div className="w-7 h-7 rounded-xl bg-[#0F3D3E] text-[#E6C78A] flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-[#0F3D3E] leading-none">
                    99% Speed Score
                  </p>
                  <p className="text-[9.5px] text-slate-500 mt-0.5">
                    Next.js + Tailwind UI
                  </p>
                </div>
              </div>

              {/* 1. FRAMELESS 2026 FROSTED-GLASS & CHAMPAGNE-PEARL DISPLAY WINDOW */}
              <div
                onClick={() =>
                  router.push(
                    `/websites/detail?website=${activeSite.websiteSlug}`
                  )
                }
                className="group relative cursor-pointer"
              >
                <div className="rounded-[24px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-gradient-to-br from-white via-[#E6C78A]/65 to-[#CBE5DF] ring-1 ring-white shadow-[0_28px_75px_rgba(15,61,62,0.16)]">
                  <div className="relative rounded-[20px] sm:rounded-[27px] overflow-hidden bg-white">
                    {/* Automatic Diagonal Glass Sheen */}
                    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
                      <div className="hero-glass-sheen w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
                    </div>

                    {/* Airy Arc / Safari-Style Translucent Top Bar */}
                    <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#FAF7F2] via-[#FFFFFF] to-[#F4F9F8] border-b border-[#EFE8DA]/90">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E8A5AC]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E6C78A]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8AB8A8]" />
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#FAF7F2] border border-[#EAE1D0] text-[9.5px] sm:text-[11px] font-medium text-slate-600 truncate max-w-[175px] sm:max-w-none shadow-2xs">
                        <Lock className="w-2.5 h-2.5 text-[#136D7E] shrink-0" />
                        <span className="truncate">
                          {activeSite.websiteSlug}.ourwebsite.app
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F3D3E] text-[8.5px] sm:text-[9.5px] font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>LIVE</span>
                      </span>
                    </div>

                    {/* Full-Width Live Scrolling & Zooming Webpage Canvas */}
                    <div className="relative h-[230px] sm:h-[325px] lg:h-[345px] overflow-hidden bg-white">
                      <img
                        ref={desktopImgRef}
                        key={`hero-desktop-${activeSite.websiteSlug}`}
                        src={activeSite.image}
                        onError={(e) => {
                          if (activeSite.fallbackImage) {
                            e.currentTarget.src = activeSite.fallbackImage;
                          }
                        }}
                        alt={activeSite.title}
                        className="w-full h-auto block will-change-transform"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B2D2E]/75 via-[#0B2D2E]/25 to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 left-3 right-28 sm:right-44 z-20 flex items-center justify-between gap-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-white px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_12px_30px_rgba(15,61,62,0.16)]">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-[#FAF5EA] text-[#8A6D3B] text-[8px] sm:text-[9px] font-extrabold uppercase">
                              {activeSite.badgeText}
                            </span>
                            <span className="hidden sm:inline text-[10px] font-semibold text-slate-500 truncate">
                              {activeSite.category}
                            </span>
                          </div>
                          <h3 className="text-xs sm:text-[15px] font-extrabold text-[#0F3D3E] truncate mt-0.5">
                            {activeSite.title}{" "}
                            <span className="text-[#136D7E] font-bold">
                              • {activeSite.startingPrice}
                            </span>
                          </h3>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#0F3D3E] group-hover:bg-[#136D7E] text-[#FAF7F2] text-[10px] sm:text-[11px] font-bold shrink-0 transition-colors">
                          <Eye className="w-3 h-3 text-[#E6C78A]" />
                          <span className="hidden sm:inline">
                            {activeSite.ctaText}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-[#E6C78A]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. OVERLAPPING FLOATING BRUSHED-GOLD IPHONE PRO */}
              <div
                onClick={() =>
                  router.push(
                    `/websites/detail?website=${activeSite.websiteSlug}`
                  )
                }
                className="hero-iphone-float cursor-pointer absolute right-0 bottom-0 z-30 w-[105px] sm:w-[156px] lg:w-[168px] rounded-[24px] sm:rounded-[34px] p-[4px] sm:p-[6px] bg-gradient-to-b from-[#E6C78A] via-[#C8A45D] to-[#8A6D3B] shadow-[0_24px_55px_rgba(15,61,62,0.28)]"
              >
                <div className="rounded-[20px] sm:rounded-[28px] overflow-hidden bg-white border border-white/80">
                  <div className="bg-[#FAF7F2] pt-1.5 sm:pt-2 pb-1 sm:pb-1.5 flex justify-center border-b border-[#EFE8DA]">
                    <span className="w-9 sm:w-14 h-2 sm:h-3 rounded-full bg-[#12191C]" />
                  </div>

                  <div className="relative h-[165px] sm:h-[245px] lg:h-[260px] overflow-hidden bg-white">
                    <img
                      ref={mobileImgRef}
                      key={`hero-mobile-${activeSite.websiteSlug}`}
                      src={activeSite.image}
                      onError={(e) => {
                        if (activeSite.fallbackImage) {
                          e.currentTarget.src = activeSite.fallbackImage;
                        }
                      }}
                      alt={`${activeSite.title} Mobile`}
                      className="w-full h-auto block will-change-transform"
                    />
                  </div>

                  <div className="bg-[#FAF7F2] py-1 sm:py-1.5 flex justify-center border-t border-[#EFE8DA]">
                    <span className="w-10 sm:w-14 h-0.5 sm:h-1 rounded-full bg-[#12191C]/25" />
                  </div>
                </div>
              </div>

              {/* Floating Glass Pill (Bottom-Left) */}
              <div className="hero-badge-float-2 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-[#D4E5E2] shadow-[0_14px_30px_rgba(15,61,62,0.12)] absolute -bottom-2 left-4 z-30 pointer-events-none">
                <Sparkles className="w-4 h-4 text-[#C8A45D]" />
                <span className="text-[11px] font-extrabold text-[#0F3D3E]">
                  Admin Panel + Razorpay Included
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE INTERACTIVE SLIDE DOTS */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-4">
          {heroData.showcaseWebsites.map((site, idx) => (
            <button
              key={site.websiteSlug}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Preview ${site.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-6 bg-[#0F3D3E]"
                  : "w-2 bg-[#D6CCB8] hover:bg-[#B68D40]"
              }`}
            />
          ))}
        </div>

        {/* DESKTOP BOTTOM 4-COLUMN ARCHITECTURAL GLASS DOCK */}
        <div className="hidden lg:block mt-12 rounded-[28px] bg-white border border-[#E7E1D3] shadow-[0_18px_45px_rgba(15,61,62,0.07)] p-3 hero-reveal-item">
          <div className="grid grid-cols-4 gap-3">
            {heroData.stats.map((stat, idx) => {
              const cardTint =
                STAT_PASTEL_CARDS[idx % STAT_PASTEL_CARDS.length];
              return (
                <div
                  key={stat.value}
                  className={`rounded-2xl bg-gradient-to-br ${cardTint} border p-4 flex items-center gap-3.5 group hover:-translate-y-0.5 transition-all duration-300 shadow-2xs`}
                >
                  <div className="w-11 h-11 rounded-2xl bg-white border border-white flex items-center justify-center shrink-0 group-hover:bg-[#0F3D3E] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                    <div className="group-hover:[&_svg]:text-[#E6C78A] transition-colors">
                      {renderStatIcon(stat.icon)}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[15px] font-extrabold text-[#0F3D3E] truncate">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-[#136D7E] truncate">
                      {stat.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Layers,
  LayoutGrid,
  Users,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Headphones,
  Store,
  ShoppingBag,
  Utensils,
  Stethoscope,
} from "lucide-react";

export interface HeroShowcaseWebsite {
  websiteSlug: string;
  title: string;
  subtitle: string;
  category: string;
  badgeText: string;
  ctaText: string;
  image: string;
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
  clientProof: {
    avatars: string[];
    text: string;
    rating: number;
  };
  showcaseWebsites: HeroShowcaseWebsite[];
  stats: HeroStatItem[];
}

const DEFAULT_HERO_DATA: HeroSectionData = {
  agencyBadge: "YOUR BUSINESS • OUR PRIORITY",
  headingLine1: "Buy, Customize & Launch",
  headingHighlight: "Your Business Website",
  description:
    "Discover ready-to-launch business websites, Admin Dashboards, and custom full-stack solutions — all in one place.",
  primaryBtn: { label: "Explore Websites", path: "/websites" },
  secondaryBtn: {
    label: "Custom Build",
    path: "/contact?service=fullstack-development",
  },
  clientProof: {
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    ],
    text: "500+ Happy Business Owners",
    rating: 5,
  },
  showcaseWebsites: [
    {
      websiteSlug: "zarii-boutique",
      title: "Zarii Boutique",
      subtitle: "Bridal Couture & Custom Stitching Store",
      category: "Fashion & Retail",
      badgeText: "BESTSELLER",
      ctaText: "Preview Live",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "the-purple-cafe",
      title: "The Purple Café",
      subtitle: "Artisan Dining & QR Table Ordering",
      category: "Dining & Cafe",
      badgeText: "TRENDING",
      ctaText: "Preview Live",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "healthcare-plus",
      title: "HealthCare Plus",
      subtitle: "Multi-Specialty Clinic & Slot Portal",
      category: "Medical & Clinic",
      badgeText: "VERIFIED",
      ctaText: "Preview Live",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
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

const SCREEN_CATS = [
  { label: "Retail", icon: Store },
  { label: "Fashion", icon: ShoppingBag },
  { label: "Dining", icon: Utensils },
  { label: "Clinic", icon: Stethoscope },
];

export default function Hero() {
  const router = useRouter();
  const [heroData, setHeroData] = useState<HeroSectionData>(DEFAULT_HERO_DATA);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/hero`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setHeroData(data);
      })
      .catch((err) => console.error("Hero API error:", err));
  }, []);

  const triggerSlideChange = (nextIdx: number) => {
    const total = heroData.showcaseWebsites.length;
    const normalized = (nextIdx + total) % total;
    setIsSwitching(true);
    setTimeout(() => {
      setActiveIndex(normalized);
      setIsSwitching(false);
    }, 180);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerSlideChange(activeIndex + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, heroData.showcaseWebsites.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 36) {
      triggerSlideChange(deltaX < 0 ? activeIndex + 1 : activeIndex - 1);
    }
    touchStartX.current = null;
  };

  const activeSite =
    heroData.showcaseWebsites[activeIndex] || heroData.showcaseWebsites[0];

  const renderStatIcon = (icon: HeroStatItem["icon"]) => {
    const cls = "w-5 h-5 text-[#136D7E]";
    if (icon === "layers") return <Layers className={cls} />;
    if (icon === "grid") return <LayoutGrid className={cls} />;
    if (icon === "users") return <Users className={cls} />;
    return <CheckCircle2 className={cls} />;
  };

  return (
    <section className="relative overflow-x-clip bg-white text-[#152B32]">
      {/* RIGHT-SIDE CURVED OCEAN-TEAL / BLUE BACKDROP SHAPE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full bg-[#F2F8FA] blur-[70px]" />

        <svg
          viewBox="0 0 600 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-4 right-0 h-[520px] sm:h-[660px] lg:h-[750px] w-[215px] sm:w-[440px] lg:w-[620px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="studioWaveMain"
              x1="90"
              y1="30"
              x2="580"
              y2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#9DCAD6" stopOpacity="0.68" />
              <stop offset="50%" stopColor="#4A8E9F" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#1D6778" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient
              id="studioWaveSub"
              x1="160"
              y1="0"
              x2="600"
              y2="650"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#BCE0E9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#287384" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M360 -20 C120 90, 40 320, 210 530 C320 665, 490 730, 620 760 L620 -20 Z"
            fill="url(#studioWaveMain)"
          />
          <path
            d="M440 -20 C230 110, 160 310, 310 500 C410 625, 530 680, 620 710 L620 -20 Z"
            fill="url(#studioWaveSub)"
          />
        </svg>

        <div className="absolute inset-x-0 bottom-24 sm:bottom-20 h-20 bg-gradient-to-b from-transparent via-[#EEF5F8]/75 to-white" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative max-w-7xl mx-auto pt-6 sm:pt-12 pb-6 sm:pb-12 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* LEFT 5 COLS: STAGGERED ENTRANCE TYPOGRAPHY & PILLS */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-6 z-20 text-left">
            <p className="anim-reveal-up anim-delay-1 text-[#16343C] font-extrabold text-[11px] sm:text-xs tracking-[0.22em] uppercase">
              {heroData.agencyBadge}
            </p>

            <h1 className="anim-reveal-up anim-delay-2 text-[30px] sm:text-5xl xl:text-[52px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#172B33]">
              {heroData.headingLine1}
              <span className="block mt-1 text-[#136D7E]">
                {heroData.headingHighlight}
              </span>
            </h1>

            <p className="anim-reveal-up anim-delay-3 text-slate-600 text-[13.5px] sm:text-[15.5px] leading-[1.58] max-w-md">
              {heroData.description}
            </p>

            {/* Side-by-Side Luxury Pill Buttons */}
            <div className="anim-reveal-up anim-delay-4 flex items-center gap-2.5 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => router.push(heroData.primaryBtn.path)}
                className="btn-ocean-luxury group inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-[12.5px] sm:text-sm whitespace-nowrap"
              >
                <span>{heroData.primaryBtn.label}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => router.push(heroData.secondaryBtn.path)}
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/95 border border-slate-300 text-[#172B33] font-bold text-[12.5px] sm:text-sm hover:border-[#12687A] hover:text-[#12687A] hover:-translate-y-0.5 active:scale-[0.98] transition-all whitespace-nowrap shadow-2xs"
              >
                <span className="w-4 h-4 rounded-full border border-[#172B33] group-hover:border-[#12687A] flex items-center justify-center transition-colors">
                  <Play className="w-2 h-2 fill-current ml-0.5" />
                </span>
                <span>{heroData.secondaryBtn.label}</span>
              </button>
            </div>

            {/* Desktop Inline 3-Feature Trust Strip */}
            <div className="hidden lg:grid grid-cols-3 gap-3 pt-4 max-w-lg anim-reveal-up anim-delay-5">
              <div className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-full bg-[#EAF4F7] group-hover:bg-[#136D7E] flex items-center justify-center shrink-0 transition-colors">
                  <Clock className="w-4 h-4 text-[#136D7E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#162C33]">
                    48-Hr Setup
                  </p>
                  <p className="text-[10px] text-slate-500">Live &amp; SSL Ready</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-full bg-[#EAF4F7] group-hover:bg-[#136D7E] flex items-center justify-center shrink-0 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-[#136D7E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#162C33]">
                    100% Ownership
                  </p>
                  <p className="text-[10px] text-slate-500">Clean Full Code</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-full bg-[#EAF4F7] group-hover:bg-[#136D7E] flex items-center justify-center shrink-0 transition-colors">
                  <Headphones className="w-4 h-4 text-[#136D7E] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-[#162C33]">
                    24/7 Support
                  </p>
                  <p className="text-[10px] text-slate-500">We&apos;re here to help</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: PROPORTIONAL STUDIO HARDWARE SCENE */}
          <div
            className="lg:col-span-7 relative touch-pan-y select-none anim-reveal-up anim-delay-3"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Template Switcher Pills */}
            <div className="hidden sm:flex items-center justify-end gap-2 mb-2">
              {heroData.showcaseWebsites.map((site, idx) => (
                <button
                  key={site.websiteSlug}
                  type="button"
                  onClick={() => triggerSlideChange(idx)}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-[#136D7E] text-white shadow-sm scale-105"
                      : "bg-white/85 text-slate-600 border border-slate-200 hover:text-[#136D7E] hover:border-[#136D7E]/30"
                  }`}
                >
                  {site.title}
                </button>
              ))}
            </div>

            {/* UNIFIED PROPORTIONAL STUDIO COMPOSITE (Global anim-float) */}
            <div className="relative w-full max-w-[335px] sm:max-w-[560px] lg:max-w-[640px] mx-auto aspect-[720/470] anim-float">
              <svg
                viewBox="0 0 720 470"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_14px_26px_rgba(14,49,58,0.14)]"
              >
                <defs>
                  <linearGradient id="macLid" x1="135" y1="28" x2="545" y2="296" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1D262B" />
                    <stop offset="100%" stopColor="#101619" />
                  </linearGradient>
                  <linearGradient id="macDeck" x1="340" y1="303" x2="340" y2="366" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#E6EDF0" />
                    <stop offset="55%" stopColor="#CFD9DF" />
                    <stop offset="100%" stopColor="#B1BEC6" />
                  </linearGradient>
                  <linearGradient id="macLip" x1="82" y1="366" x2="598" y2="366" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9EABB3" />
                    <stop offset="25%" stopColor="#EEF3F6" />
                    <stop offset="50%" stopColor="#DCE4E8" />
                    <stop offset="75%" stopColor="#EEF3F6" />
                    <stop offset="100%" stopColor="#9EABB3" />
                  </linearGradient>
                  <linearGradient id="mugGrad" x1="32" y1="240" x2="126" y2="364" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3B8796" />
                    <stop offset="52%" stopColor="#236573" />
                    <stop offset="100%" stopColor="#154752" />
                  </linearGradient>
                  <linearGradient id="bookCover" x1="-110" y1="-24" x2="104" y2="20" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#398594" />
                    <stop offset="60%" stopColor="#236472" />
                    <stop offset="100%" stopColor="#174954" />
                  </linearGradient>
                  <radialGradient id="deskShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0E3842" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#0E3842" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <ellipse cx="340" cy="376" rx="275" ry="18" fill="url(#deskShadow)" />
                <ellipse cx="575" cy="390" rx="75" ry="12" fill="url(#deskShadow)" />
                <ellipse cx="86" cy="368" rx="64" ry="12" fill="url(#deskShadow)" />
                <ellipse cx="195" cy="436" rx="125" ry="16" fill="url(#deskShadow)" />

                <g opacity="0.95">
                  <path d="M628 248 C612 215, 602 182, 616 155 C628 182, 636 215, 636 248 Z" fill="#3B7A57" />
                  <path d="M642 248 C638 205, 646 164, 666 142 C664 176, 656 212, 648 248 Z" fill="#4E916C" />
                  <path d="M652 248 C666 216, 686 190, 704 176 C688 204, 672 228, 658 248 Z" fill="#2F6648" />
                  <rect x="608" y="246" width="66" height="76" rx="10" fill="#F4F8FA" stroke="#DCE6EA" strokeWidth="1.5" />
                  <rect x="608" y="246" width="66" height="10" rx="4" fill="#E6EFF2" />
                </g>

                <rect x="135" y="28" width="410" height="268" rx="16" fill="url(#macLid)" stroke="#C7D3D8" strokeWidth="2" />
                <circle cx="340" cy="34" r="2" fill="#334148" />
                <rect x="147" y="40" width="386" height="242" rx="8" fill="#FFFFFF" />

                <rect x="156" y="296" width="368" height="7" fill="#1C2428" />
                <polygon points="135,303 545,303 598,366 82,366" fill="url(#macDeck)" />

                <polygon points="145,310 156,310 132,341 118,341" fill="#9AA7AF" opacity="0.55" />
                <polygon points="524,310 535,310 562,341 548,341" fill="#9AA7AF" opacity="0.55" />

                <polygon points="163,309 517,309 542,342 138,342" fill="#1D2529" />
                <line x1="158" y1="316" x2="522" y2="316" stroke="#364249" strokeWidth="1.5" />
                <line x1="153" y1="323" x2="527" y2="323" stroke="#364249" strokeWidth="1.5" />
                <line x1="148" y1="330" x2="532" y2="330" stroke="#364249" strokeWidth="1.5" />
                <line x1="143" y1="336" x2="537" y2="336" stroke="#364249" strokeWidth="1.5" />

                <polygon points="286,346 394,346 402,362 278,362" fill="#D7E1E6" stroke="#A8B5BC" strokeWidth="1" />

                <rect x="82" y="366" width="516" height="10" rx="5" fill="url(#macLip)" />
                <rect x="304" y="366" width="72" height="4" rx="2" fill="#95A3AB" />

                <rect x="515" y="165" width="120" height="223" rx="22" fill="#182126" stroke="#CBD6DC" strokeWidth="2" />
                <rect x="522" y="172" width="106" height="209" rx="16" fill="#FFFFFF" />

                <g>
                  <path d="M122 262 C152 262, 152 332, 122 332" stroke="#1D5B69" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <rect x="32" y="238" width="94" height="126" rx="14" fill="url(#mugGrad)" />
                  <ellipse cx="79" cy="240" rx="47" ry="7" fill="#519BA9" />
                  <ellipse cx="79" cy="240" rx="41" ry="4.5" fill="#143D47" />
                  <text x="79" y="282" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13.5" opacity="0.95">Good</text>
                  <text x="79" y="299" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13.5" opacity="0.95">Code</text>
                  <text x="79" y="316" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="13.5" opacity="0.95">Ahead</text>
                  <text x="79" y="333" textAnchor="middle" fill="#CDE8EE" fontSize="12">♡</text>
                </g>

                <g transform="translate(194, 412) rotate(-9)">
                  <rect x="-106" y="-16" width="212" height="44" rx="7" fill="#F2F7F9" stroke="#CBD7DC" strokeWidth="1.2" />
                  <line x1="-100" y1="21" x2="100" y2="21" stroke="#D5E1E6" strokeWidth="1" />
                  <line x1="-100" y1="25" x2="100" y2="25" stroke="#D5E1E6" strokeWidth="1" />
                  <rect x="-108" y="-22" width="210" height="41" rx="7" fill="url(#bookCover)" />
                  <rect x="72" y="-22" width="7" height="49" rx="2" fill="#14444F" />
                  <text x="-12" y="-3" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11.5" opacity="0.95">Big Dreams</text>
                  <text x="-12" y="12" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="11.5" opacity="0.95">Bigger Plans ♡</text>
                </g>
              </svg>

              {/* LIVE WEBSITE UI OVERLAY INSIDE MACBOOK SCREEN (Global anim-glint) */}
              {activeSite && (
                <div
                  onClick={() =>
                    router.push(
                      `/websites/detail?website=${activeSite.websiteSlug}`
                    )
                  }
                  className="cursor-pointer group absolute left-[20.42%] top-[8.51%] w-[53.61%] h-[51.49%] rounded-[4px] sm:rounded-[7px] overflow-hidden bg-white flex flex-col justify-between select-none"
                >
                  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                    <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent anim-glint" />
                  </div>

                  <div className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-[#136D7E] text-white font-black text-[6px] sm:text-[7.5px] flex items-center justify-center">
                        W
                      </span>
                      <span className="font-extrabold text-[#136D7E] text-[6.5px] sm:text-[9px] tracking-tight">
                        OUR WEBSITE
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2.5 text-[7.5px] font-semibold text-slate-400">
                      <span className="text-[#136D7E] font-bold">Home</span>
                      <span>Websites</span>
                      <span>Pricing</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded-full bg-[#EAF4F7] text-[#136D7E] font-extrabold text-[5.5px] sm:text-[7px]">
                      {activeSite.badgeText}
                    </span>
                  </div>

                  <div
                    className={`flex-1 bg-gradient-to-r from-[#F4FAFC] via-[#EAF5F8] to-[#D4E9EF] px-2 sm:px-3.5 py-1.5 sm:py-2.5 grid grid-cols-12 gap-1.5 items-center transition-all duration-300 ${
                      isSwitching
                        ? "opacity-35 scale-[0.98]"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <div className="col-span-7 text-left space-y-0.5 sm:space-y-1">
                      <p className="text-[5.5px] sm:text-[7.5px] font-extrabold uppercase tracking-wider text-[#136D7E] truncate">
                        {activeSite.category}
                      </p>
                      <h3 className="text-[9.5px] sm:text-[15px] font-extrabold text-[#162C33] leading-tight truncate">
                        {activeSite.title}
                      </h3>
                      <p className="hidden sm:block text-[8.5px] text-slate-600 line-clamp-1">
                        {activeSite.subtitle}
                      </p>
                      <div className="pt-0.5">
                        <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#136D7E] group-hover:bg-[#0D5260] text-white font-bold text-[6px] sm:text-[8px] transition-colors">
                          {activeSite.ctaText} →
                        </span>
                      </div>
                    </div>

                    <div className="col-span-5 h-full max-h-[54px] sm:max-h-[96px]">
                      <div className="w-full h-full rounded sm:rounded-lg overflow-hidden bg-white shadow-2xs border border-white">
                        <img
                          src={activeSite.image}
                          alt={activeSite.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="px-2 sm:px-4 py-1 sm:py-1.5 bg-white border-t border-slate-100 shrink-0">
                    <div className="grid grid-cols-4 gap-1">
                      {SCREEN_CATS.map((cat) => {
                        const IconComp = cat.icon;
                        return (
                          <div
                            key={cat.label}
                            className="flex flex-col items-center gap-0.5"
                          >
                            <div className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 rounded-full bg-[#EAF4F7] flex items-center justify-center">
                              <IconComp className="w-2 h-2 sm:w-3 sm:h-3 text-[#136D7E]" />
                            </div>
                            <span className="text-[5px] sm:text-[7px] font-bold text-slate-600">
                              {cat.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE MOBILE UI OVERLAY INSIDE IPHONE SCREEN */}
              {activeSite && (
                <div
                  onClick={() =>
                    router.push(
                      `/websites/detail?website=${activeSite.websiteSlug}`
                    )
                  }
                  className={`cursor-pointer group absolute left-[72.50%] top-[36.60%] w-[14.72%] h-[44.47%] rounded-[9px] sm:rounded-[15px] overflow-hidden bg-white flex flex-col justify-between transition-all duration-300 ${
                    isSwitching ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="pt-1 pb-0.5 flex justify-center bg-white shrink-0">
                    <div className="w-4 sm:w-7 h-1 sm:h-1.5 rounded-full bg-[#182126]" />
                  </div>

                  <div className="flex-1 bg-gradient-to-b from-[#EAF4F7] to-white px-1 sm:px-1.5 py-0.5 sm:py-1 flex flex-col justify-between text-left">
                    <p className="text-[5.5px] sm:text-[8.5px] font-extrabold text-[#162C33] leading-tight truncate">
                      {activeSite.title}
                    </p>

                    <div className="w-full h-9 sm:h-18 rounded sm:rounded-md overflow-hidden bg-white border border-white shadow-2xs">
                      <img
                        src={activeSite.image}
                        alt={`${activeSite.title} Mobile`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <span className="block w-full text-center py-0.5 sm:py-1 rounded-full bg-[#136D7E] group-hover:bg-[#0D5260] text-white font-bold text-[5px] sm:text-[7.5px] transition-colors">
                      Demo →
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE BOTTOM 3-COLUMN FEATURE STRIP + 3 INTERACTIVE DOTS */}
        <div className="lg:hidden mt-2 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 divide-x divide-slate-200 text-center">
            <div className="px-1.5 flex flex-col items-center gap-1.5">
              <Clock className="w-5 h-5 text-[#136D7E]" strokeWidth={1.8} />
              <p className="text-[11px] font-bold text-[#172B33] leading-tight">
                48-Hr Setup
                <span className="block font-normal text-slate-500 text-[10px]">
                  Live &amp; SSL Ready
                </span>
              </p>
            </div>

            <div className="px-1.5 flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#136D7E]" strokeWidth={1.8} />
              <p className="text-[11px] font-bold text-[#172B33] leading-tight">
                100% Ownership
                <span className="block font-normal text-slate-500 text-[10px]">
                  Full Source Code
                </span>
              </p>
            </div>

            <div className="px-1.5 flex flex-col items-center gap-1.5">
              <Headphones className="w-5 h-5 text-[#136D7E]" strokeWidth={1.8} />
              <p className="text-[11px] font-bold text-[#172B33] leading-tight">
                24/7 Support
                <span className="block font-normal text-slate-500 text-[10px]">
                  Always Available
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            {heroData.showcaseWebsites.map((site, idx) => (
              <button
                key={site.websiteSlug}
                type="button"
                onClick={() => triggerSlideChange(idx)}
                aria-label={`Preview ${site.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-5 bg-[#136D7E]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP BOTTOM 4-COLUMN CLEAN WHITE BAR */}
        <div className="hidden lg:block mt-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_14px_40px_rgba(15,61,70,0.07)] px-6 py-6 anim-reveal-up anim-delay-5">
          <div className="grid grid-cols-4 divide-x divide-slate-200/80">
            {heroData.stats.map((stat) => (
              <div
                key={stat.value}
                className="flex items-center gap-3.5 py-1 px-5 first:pl-1 last:pr-1 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EAF4F7] border border-[#136D7E]/15 flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:scale-105 transition-all duration-300">
                  <div className="group-hover:[&_svg]:text-white transition-colors">
                    {renderStatIcon(stat.icon)}
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-[15px] font-extrabold text-[#162C33] truncate">
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold text-[#136D7E] truncate">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Gem,
  Smartphone,
  SlidersHorizontal,
  Headset,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface WhyChooseFeature {
  icon: "gem" | "smartphone" | "sliders" | "headset" | "zap";
  title: string;
  description: string;
  actionPath: string;
}

export interface WhyChooseUsData {
  eyebrowLabel: string;
  headingPrefix: string;
  headingBrand: string;
  subheading?: string;
  ctaLabel: string;
  ctaPath: string;
  features: WhyChooseFeature[];
}

const DEFAULT_WHY_CHOOSE_DATA: WhyChooseUsData = {
  eyebrowLabel: "WHY CHOOSE US",
  headingPrefix: "Why Choose",
  headingBrand: "OUR WEBSITE?",
  subheading:
    "Your trusted partner for premium, customizable and business-ready website solutions.",
  ctaLabel: "Explore Our Standards",
  ctaPath: "/services",
  features: [
    {
      icon: "gem",
      title: "Premium Designs",
      description: "Modern & high-converting templates",
      actionPath: "/websites",
    },
    {
      icon: "smartphone",
      title: "Mobile Responsive",
      description: "Pixel-perfect on every screen size",
      actionPath: "/websites",
    },
    {
      icon: "sliders",
      title: "Fully Customizable",
      description: "Edit brand colors, logo & content easily",
      actionPath: "/services",
    },
    {
      icon: "headset",
      title: "Dedicated Support",
      description: "Direct developer assistance anytime",
      actionPath: "/contact",
    },
    {
      icon: "zap",
      title: "Fast Delivery",
      description: "Take your business live in 48 hours",
      actionPath: "/pricing",
    },
  ],
};

export default function WhyChooseUs() {
  const router = useRouter();
  const [data, setData] = useState<WhyChooseUsData>(DEFAULT_WHY_CHOOSE_DATA);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/why-choose-us`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("WhyChooseUs API error:", err));
  }, []);

  const renderFeatureIcon = (
    icon: WhyChooseFeature["icon"],
    isFeatured: boolean
  ) => {
    const iconClass = isFeatured
      ? "w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 group-hover:scale-110"
      : "w-5 h-5 sm:w-6 sm:h-6 text-[#136D7E] group-hover:text-white group-hover:scale-110 transition-all duration-300";

    switch (icon) {
      case "gem":
        return <Gem className={iconClass} strokeWidth={1.9} />;
      case "smartphone":
        return <Smartphone className={iconClass} strokeWidth={1.9} />;
      case "sliders":
        return <SlidersHorizontal className={iconClass} strokeWidth={1.9} />;
      case "headset":
        return <Headset className={iconClass} strokeWidth={1.9} />;
      case "zap":
        return <Zap className={iconClass} strokeWidth={1.9} />;
    }
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 bg-white text-[#162C33]">
      {/* RIGHT-SIDE SOFT AQUA WAVE & BOTTOM TRANSITION CURVE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-[210px] sm:w-[360px] lg:w-[480px] h-[240px] sm:h-[360px] lg:h-[440px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="whyTopAqua"
              x1="120"
              y1="20"
              x2="490"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D7ECF1" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#9ACBD7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5AA0B0" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M350 0 C180 70, 120 190, 230 295 C315 375, 425 390, 500 405 L500 0 Z"
            fill="url(#whyTopAqua)"
          />
        </svg>

        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 bottom-0 w-full h-[90px] sm:h-[135px] lg:h-[165px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="whyBottomWaveSoft"
              x1="0"
              y1="100"
              x2="1440"
              y2="60"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D5ECF1" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#94C8D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B8798" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient
              id="whyBottomWaveDeep"
              x1="780"
              y1="180"
              x2="1440"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#4893A4" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#1D6B7C" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#115463" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M0 155 C260 95, 480 95, 760 135 C1030 172, 1250 115, 1440 35 L1440 200 L0 200 Z"
            fill="url(#whyBottomWaveSoft)"
          />
          <path
            d="M720 200 C950 185, 1210 130, 1440 48 L1440 200 Z"
            fill="url(#whyBottomWaveDeep)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
          {/* LEFT 4 COLS: EDITORIAL HEADING + STUDIO MACBOOK & "W" MUG */}
          <ScrollReveal direction="left" className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="relative flex items-start justify-between gap-2 lg:block">
              <div className="space-y-2 max-w-[64%] sm:max-w-sm lg:max-w-none z-10">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{data.eyebrowLabel}</span>
                </div>

                <h2 className="leading-[1.12] tracking-[-0.02em]">
                  <span className="block font-serif text-[25px] sm:text-3xl lg:text-[34px] font-bold text-[#162C33]">
                    {data.headingPrefix}
                  </span>
                  <span className="block font-sans text-[23px] sm:text-3xl lg:text-[32px] font-extrabold text-[#136D7E] mt-0.5">
                    {data.headingBrand}
                  </span>
                </h2>

                <p className="text-[11.5px] sm:text-[13px] text-slate-600 leading-relaxed pt-0.5">
                  {data.subheading ||
                    "Your trusted partner for premium, customizable and business-ready website solutions."}
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => router.push(data.ctaPath)}
                    className="inline-flex items-center gap-1 text-[11.5px] sm:text-xs font-extrabold text-[#136D7E] hover:text-[#0D5260] transition-colors group"
                  >
                    <span>{data.ctaLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="lg:hidden w-[135px] sm:w-[190px] shrink-0 self-end -mr-2 mt-4 anim-float">
                <StudioLaptopAndMugSvg />
              </div>
            </div>

            <div className="hidden lg:block pt-2 w-full max-w-[330px] anim-float">
              <StudioLaptopAndMugSvg />
            </div>
          </ScrollReveal>

          {/* RIGHT 8 COLS: 3 + 2 BENTO GRID */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {data.features.map((feature, idx) => {
              const isFeatured = idx === 0;
              const desktopSpanClass =
                idx < 3 ? "lg:col-span-2" : "lg:col-span-3";

              return (
                <ScrollReveal
                  key={feature.title}
                  delayMs={idx * 70}
                  className={desktopSpanClass}
                >
                  <button
                    type="button"
                    onClick={() => router.push(feature.actionPath)}
                    className={`luxury-card group relative w-full h-full text-left lg:text-center rounded-2xl px-3.5 py-3 sm:px-5 sm:py-6 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3.5 lg:gap-0 ${
                      isFeatured
                        ? "bg-white border-[1.5px] border-[#136D7E]/75 shadow-[0_12px_28px_rgba(19,109,126,0.14)]"
                        : "bg-[#F7FBFC]/95 hover:bg-white border border-slate-200/80 shadow-[0_6px_18px_rgba(15,61,70,0.04)]"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 lg:mb-3.5 transition-all duration-300 ${
                        isFeatured
                          ? "bg-[#136D7E] shadow-[0_6px_16px_rgba(19,109,126,0.28)]"
                          : "bg-[#E5F2F6] group-hover:bg-[#136D7E]"
                      }`}
                    >
                      {renderFeatureIcon(feature.icon, isFeatured)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13.5px] sm:text-[15px] font-extrabold text-[#162C33] leading-snug group-hover:text-[#136D7E] transition-colors">
                        {feature.title}
                      </h3>

                      <p className="mt-0.5 sm:mt-1.5 text-[11px] sm:text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                        {feature.description}
                      </p>
                    </div>

                    <span className="lg:hidden w-7 h-7 rounded-full bg-[#EAF4F7] text-[#136D7E] flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioLaptopAndMugSvg() {
  return (
    <svg
      viewBox="0 0 360 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-[0_10px_20px_rgba(15,52,61,0.12)]"
    >
      <defs>
        <linearGradient id="whyLid" x1="78" y1="22" x2="262" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D272C" />
          <stop offset="100%" stopColor="#101619" />
        </linearGradient>
        <linearGradient id="whyBase" x1="48" y1="142" x2="285" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BCC7CE" />
          <stop offset="50%" stopColor="#EEF3F6" />
          <stop offset="100%" stopColor="#A9B6BE" />
        </linearGradient>
        <linearGradient id="whyMug" x1="252" y1="106" x2="306" y2="174" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A7C8E" />
          <stop offset="55%" stopColor="#165C6B" />
          <stop offset="100%" stopColor="#0E424E" />
        </linearGradient>
        <radialGradient id="whyShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E3842" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0E3842" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="170" cy="168" rx="135" ry="10" fill="url(#whyShadow)" />
      <ellipse cx="282" cy="175" rx="38" ry="7" fill="url(#whyShadow)" />

      <g>
        <path d="M40 96 C26 76, 22 54, 34 38 C42 56, 46 76, 45 96 Z" fill="#46855E" />
        <path d="M48 96 C48 68, 56 42, 70 30 C68 54, 60 76, 53 96 Z" fill="#5CA074" />
        <path d="M54 96 C66 76, 80 60, 92 52 C80 70, 68 84, 58 96 Z" fill="#37704D" />
        <rect x="28" y="95" width="42" height="48" rx="7" fill="#F2F7F9" stroke="#D6E2E7" strokeWidth="1.2" />
      </g>

      <g>
        <rect x="84" y="20" width="176" height="118" rx="10" fill="url(#whyLid)" stroke="#C9D4DA" strokeWidth="1.5" />
        <rect x="91" y="27" width="162" height="104" rx="5" fill="#FFFFFF" />
        <rect x="91" y="27" width="162" height="11" rx="4" fill="#F4FAFC" />
        <circle cx="98" cy="32.5" r="1.5" fill="#F87171" />
        <circle cx="103" cy="32.5" r="1.5" fill="#FBBF24" />
        <circle cx="108" cy="32.5" r="1.5" fill="#34D399" />

        <rect x="97" y="42" width="64" height="44" rx="4" fill="#136D7E" />
        <rect x="103" y="50" width="38" height="4" rx="2" fill="#FFFFFF" />
        <rect x="103" y="57" width="48" height="3" rx="1.5" fill="#BCE0E9" />
        <rect x="103" y="68" width="26" height="7" rx="3.5" fill="#FBBF24" />

        <rect x="166" y="42" width="81" height="44" rx="4" fill="#EAF4F7" />
        <circle cx="206" cy="64" r="14" fill="#9ACBD7" opacity="0.7" />

        <rect x="97" y="91" width="47" height="34" rx="4" fill="#F3F9FB" stroke="#DCE8EC" strokeWidth="0.8" />
        <rect x="148" y="91" width="48" height="34" rx="4" fill="#F3F9FB" stroke="#DCE8EC" strokeWidth="0.8" />
        <rect x="200" y="91" width="47" height="34" rx="4" fill="#F3F9FB" stroke="#DCE8EC" strokeWidth="0.8" />

        <polygon points="84,138 260,138 286,161 58,161" fill="url(#whyBase)" />
        <polygon points="96,141 248,141 262,152 82,152" fill="#232D32" opacity="0.85" />
        <rect x="58" y="161" width="228" height="5" rx="2.5" fill="#C2CDD4" />
      </g>

      <g>
        <path d="M302 119 C320 119, 320 156, 302 156" stroke="#145361" strokeWidth="6.5" strokeLinecap="round" fill="none" />
        <rect x="252" y="106" width="52" height="68" rx="8" fill="url(#whyMug)" />
        <ellipse cx="278" cy="107" rx="26" ry="4" fill="#4C98A8" />
        <ellipse cx="278" cy="107" rx="22" ry="2.5" fill="#103B45" />
        <text x="278" y="148" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="24">W</text>
      </g>

      <g stroke="#136D7E" strokeWidth="2.5" strokeLinecap="round">
        <line x1="322" y1="88" x2="330" y2="78" />
        <line x1="328" y1="96" x2="340" y2="92" />
        <line x1="329" y1="106" x2="339" y2="109" />
      </g>
    </svg>
  );
}
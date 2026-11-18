"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface WorkStepItem {
  stepNumber: string;
  icon: "search" | "pointer" | "edit" | "rocket";
  title: string;
  description: string;
  actionPath: string;
}

export interface HowItWorksData {
  eyebrowLabel: string;
  heading: string;
  subheading?: string;
  steps: WorkStepItem[];
}

const DEFAULT_HOW_IT_WORKS_DATA: HowItWorksData = {
  eyebrowLabel: "HOW IT WORKS",
  heading: "Get Your Website in 4 Simple Steps",
  subheading: "A quick and easy process to get your business website online.",
  steps: [
    {
      stepNumber: "01",
      icon: "search",
      title: "Explore",
      description: "Browse our industry website collections.",
      actionPath: "/categories",
    },
    {
      stepNumber: "02",
      icon: "pointer",
      title: "Choose",
      description: "Pick the design that fits your business.",
      actionPath: "/websites",
    },
    {
      stepNumber: "03",
      icon: "edit",
      title: "Customize",
      description: "Personalize with your brand, content & colors.",
      actionPath: "/services",
    },
    {
      stepNumber: "04",
      icon: "rocket",
      title: "Launch",
      description: "Go live and grow your business online.",
      actionPath: "/pricing",
    },
  ],
};

export default function HowItWorks() {
  const router = useRouter();
  const [data, setData] = useState<HowItWorksData>(DEFAULT_HOW_IT_WORKS_DATA);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/how-it-works`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("HowItWorks API error:", err));
  }, []);

  const renderTwoToneHeading = (headingText: string) => {
    const match = headingText.match(/^(.*?)(\d+\s+Simple\s+Steps.*)$/i);
    if (match) {
      return (
        <>
          <span className="text-[#162C33]">{match[1]}</span>
          <span className="text-[#136D7E]">{match[2]}</span>
        </>
      );
    }
    const words = headingText.trim().split(" ");
    const splitPoint = Math.ceil(words.length / 2);
    return (
      <>
        <span className="text-[#162C33]">
          {words.slice(0, splitPoint).join(" ")}{" "}
        </span>
        <span className="text-[#136D7E]">
          {words.slice(splitPoint).join(" ")}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden py-11 sm:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 bg-white text-[#162C33]">
      {/* TOP & BOTTOM SWEEPING AQUA-TEAL STUDIO WAVES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 top-0 w-full h-[75px] sm:h-[115px] lg:h-[140px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="howTopWave"
              x1="350"
              y1="0"
              x2="1440"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E6F4F7" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#94C8D4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#28798B" stopOpacity="0.82" />
            </linearGradient>
          </defs>
          <path
            d="M280 0 C540 55, 820 15, 1080 58 C1240 85, 1360 118, 1440 135 L1440 0 Z"
            fill="url(#howTopWave)"
          />
        </svg>

        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 bottom-0 w-full h-[80px] sm:h-[120px] lg:h-[150px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="howBottomWave"
              x1="0"
              y1="140"
              x2="1440"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D8EEF3" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#97CAD6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#358394" stopOpacity="0.82" />
            </linearGradient>
          </defs>
          <path
            d="M0 130 C240 75, 480 80, 760 120 C1040 160, 1260 105, 1440 30 L1440 180 L0 180 Z"
            fill="url(#howBottomWave)"
          />
        </svg>

        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:block absolute bottom-0 left-0 w-28 h-28 opacity-90"
        >
          <path d="M12 140 C8 102, 18 66, 44 44 C42 78, 34 110, 22 140 Z" fill="#48875E" />
          <path d="M28 140 C36 105, 56 76, 84 62 C68 92, 52 118, 38 140 Z" fill="#5EA175" />
          <path d="M4 140 C-2 114, 2 88, 16 70 C18 94, 16 118, 12 140 Z" fill="#366E4B" />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-7 sm:mb-10 space-y-1.5">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="font-serif text-[25px] sm:text-3xl lg:text-[35px] font-bold leading-[1.15] tracking-[-0.01em]">
            {renderTwoToneHeading(data.heading)}
          </h2>

          <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed pt-0.5">
            {data.subheading ||
              "A quick and easy process to get your business website online."}
          </p>
        </ScrollReveal>

        {/* 4 STEP CARDS WITH SEQUENTIAL SCROLL REVEAL & HOVER ILLUSTRATION MOTION */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2.5 sm:gap-3.5 lg:gap-2">
          {data.steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <ScrollReveal delayMs={index * 90} className="flex-1 flex">
                <button
                  type="button"
                  onClick={() => router.push(step.actionPath)}
                  className="luxury-card group relative w-full flex-1 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 px-3.5 py-3 sm:px-5 sm:py-6 shadow-[0_8px_24px_rgba(15,61,70,0.05)] flex flex-row lg:flex-col items-center justify-between lg:justify-center text-left lg:text-center gap-3.5 lg:gap-0"
                >
                  <span className="hidden lg:inline-flex items-center justify-center absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#136D7E] text-white font-extrabold text-[10px] tracking-wider shadow-2xs group-hover:scale-105 transition-transform">
                    {step.stepNumber}
                  </span>

                  <div className="w-14 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-20 flex items-center justify-center shrink-0 lg:mt-2 lg:mb-3 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    <StepIllustration icon={step.icon} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center lg:justify-center gap-2">
                      <span className="lg:hidden inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#136D7E] text-white font-extrabold text-[9.5px] leading-none shrink-0">
                        {step.stepNumber}
                      </span>

                      <h3 className="text-[14px] sm:text-[16px] font-extrabold text-[#162C33] group-hover:text-[#136D7E] transition-colors truncate">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-1 text-[11px] sm:text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </div>

                  <span className="lg:hidden w-7 h-7 rounded-full bg-[#EAF4F7] text-[#136D7E] flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </ScrollReveal>

              {index < data.steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-0.5 shrink-0">
                  <span className="w-7 h-7 rounded-full bg-[#EAF4F7] border border-[#136D7E]/15 text-[#136D7E] flex items-center justify-center shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-4">
          <span className="w-4 h-1.5 rounded-full bg-[#136D7E]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
      </div>
    </section>
  );
}

function StepIllustration({ icon }: { icon: WorkStepItem["icon"] }) {
  if (icon === "search") {
    return (
      <svg viewBox="0 0 110 88" fill="none" className="w-full h-full">
        <rect x="10" y="10" width="76" height="58" rx="10" fill="#E8F4F7" />
        <rect x="16" y="16" width="66" height="48" rx="7" fill="#FFFFFF" stroke="#BBDCE4" strokeWidth="1.5" />
        <path d="M16 23C16 19.134 19.134 16 23 16H75C78.866 16 82 19.134 82 23V27H16V23Z" fill="#136D7E" />
        <circle cx="22" cy="21.5" r="1.5" fill="#FBBF24" />
        <circle cx="27" cy="21.5" r="1.5" fill="#FFFFFF" />
        <rect x="22" y="33" width="24" height="24" rx="4" fill="#D5ECF1" />
        <rect x="51" y="34" width="24" height="5" rx="2.5" fill="#9ACBD7" />
        <rect x="51" y="43" width="18" height="4" rx="2" fill="#CBE5EC" />
        <rect x="51" y="51" width="21" height="5" rx="2.5" fill="#136D7E" />
        <circle cx="69" cy="49" r="15" fill="#FFFFFF" fillOpacity="0.88" stroke="#136D7E" strokeWidth="3.5" />
        <line x1="80" y1="60" x2="93" y2="73" stroke="#162C33" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "pointer") {
    return (
      <svg viewBox="0 0 110 88" fill="none" className="w-full h-full">
        <rect x="14" y="14" width="56" height="44" rx="7" fill="#DCEFF3" stroke="#B5D8E1" strokeWidth="1.2" />
        <rect x="22" y="20" width="58" height="45" rx="7" fill="#EDF7F9" stroke="#A8D1DC" strokeWidth="1.2" />
        <rect x="30" y="26" width="60" height="46" rx="7" fill="#FFFFFF" stroke="#136D7E" strokeWidth="1.5" />
        <path d="M30 33C30 29.134 33.134 26 37 26H83C86.866 26 90 29.134 90 33V36H30V33Z" fill="#136D7E" />
        <rect x="36" y="41" width="22" height="16" rx="3" fill="#89C2D0" />
        <path d="M39 54L45 47L50 52L53 49L56 54H39Z" fill="#136D7E" />
        <rect x="63" y="42" width="20" height="4" rx="2" fill="#9ACBD7" />
        <rect x="63" y="49" width="15" height="4" rx="2" fill="#CBE5EC" />
        <path d="M72 55L75 76L80 69L88 73L90 69L82 65L88 61L72 55Z" fill="#162C33" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "edit") {
    return (
      <svg viewBox="0 0 110 88" fill="none" className="w-full h-full">
        <rect x="14" y="15" width="70" height="52" rx="8" fill="#FFFFFF" stroke="#B5D8E1" strokeWidth="1.5" />
        <path d="M14 23C14 18.5817 17.5817 15 22 15H76C80.4183 15 84 18.5817 84 23V27H14V23Z" fill="#247B8C" />
        <circle cx="21" cy="21" r="1.5" fill="#FFFFFF" />
        <circle cx="26" cy="21" r="1.5" fill="#FBBF24" />
        <rect x="21" y="33" width="26" height="24" rx="4" fill="#8AC3D1" />
        <rect x="52" y="34" width="24" height="5" rx="2.5" fill="#CBE5EC" />
        <rect x="52" y="43" width="20" height="5" rx="2.5" fill="#CBE5EC" />
        <rect x="52" y="52" width="16" height="5" rx="2.5" fill="#136D7E" />
        <g transform="translate(83, 46) rotate(42)">
          <rect x="-5" y="-22" width="10" height="7" rx="2" fill="#136D7E" />
          <rect x="-5" y="-15" width="10" height="26" fill="#F6C453" />
          <polygon points="-5,11 5,11 0,21" fill="#F3E5D0" />
          <polygon points="-2,17 2,17 0,21" fill="#162C33" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 110 88" fill="none" className="w-full h-full">
      <rect x="20" y="30" width="54" height="36" rx="5" fill="#162C33" />
      <rect x="24" y="34" width="46" height="28" rx="3" fill="#E8F4F7" />
      <rect x="13" y="66" width="68" height="5" rx="2.5" fill="#B5C4CC" />
      <circle cx="48" cy="63" r="6" fill="#FFFFFF" />
      <circle cx="56" cy="61" r="8" fill="#FFFFFF" />
      <circle cx="65" cy="63" r="6" fill="#FFFFFF" />
      <g transform="translate(66, 36) rotate(38)">
        <path d="M-4 16L0 26L4 16H-4Z" fill="#F59E0B" />
        <path d="M-7 8L-13 15L-7 15V8Z" fill="#136D7E" />
        <path d="M7 8L13 15L7 15V8Z" fill="#136D7E" />
        <path d="M0 -20C-6 -12 -7 -2 -7 14H7C7 -2 6 -12 0 -20Z" fill="#247B8C" />
        <path d="M0 -20C-3 -14 -4 -8 -4 -4H4C4 -8 3 -14 0 -20Z" fill="#FBBF24" />
        <circle cx="0" cy="2" r="3" fill="#FFFFFF" />
      </g>
      <line x1="86" y1="22" x2="92" y2="18" stroke="#136D7E" strokeWidth="2" strokeLinecap="round" />
      <line x1="89" y1="30" x2="96" y2="29" stroke="#136D7E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
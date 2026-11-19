"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Compass,
  MousePointerClick,
  Wand2,
  Rocket,
  Sparkles,
} from "lucide-react";

export interface StepItem {
  stepNumber: string;
  title: string;
  description: string;
  icon: "explore" | "choose" | "customize" | "launch";
}

export interface HowItWorksData {
  eyebrowLabel: string;
  headingLine1: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  steps: StepItem[];
}

const DEFAULT_HOW_IT_WORKS_DATA: HowItWorksData = {
  eyebrowLabel: "HOW IT WORKS",
  headingLine1: "Get Your Website in",
  headingHighlight: "4 Simple",
  headingItalic: "Steps",
  subheading: "A quick and easy process to get your business website online.",
  steps: [
    {
      stepNumber: "01",
      title: "Explore",
      description: "Browse our industry website collections.",
      icon: "explore",
    },
    {
      stepNumber: "02",
      title: "Choose",
      description: "Pick the design that fits your business.",
      icon: "choose",
    },
    {
      stepNumber: "03",
      title: "Customize",
      description: "Personalize with your brand, content & colors.",
      icon: "customize",
    },
    {
      stepNumber: "04",
      title: "Launch",
      description: "Go live and grow your business online.",
      icon: "launch",
    },
  ],
};

const UNIQUE_CARD_TINTS = [
  "bg-[#F7F9FB] border-[#DCE4EE]",
  "bg-[#F4F8F6] border-[#D2E2D8]",
  "bg-[#FAF7F2] border-[#E8DFC8]",
  "bg-[#F5F2F8] border-[#E2D4EE]",
];

export default function HowItWorks() {
  const router = useRouter();
  const [data, setData] = useState<HowItWorksData>(DEFAULT_HOW_IT_WORKS_DATA);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Backend API Fetch
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/how-it-works`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.steps)) {
          setData({ ...DEFAULT_HOW_IT_WORKS_DATA, ...fetched });
        }
      })
      .catch((err) => console.error("HowItWorks API error:", err));
  }, []);

  // Simple Safe Entrance Reveal (Zero background or moving animations)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const runEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.fromTo(
        ".how-simple-reveal",
        { y: 14, opacity: 0.95 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
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

    return () => observer.disconnect();
  }, []);

  const renderStepIcon = (icon: StepItem["icon"], isHovered: boolean) => {
    const cls = `w-6 h-6 transition-colors duration-300 ${
      isHovered ? "text-white" : "text-[#136D7E]"
    }`;
    if (icon === "explore") return <Compass className={cls} strokeWidth={2} />;
    if (icon === "choose")
      return <MousePointerClick className={cls} strokeWidth={2} />;
    if (icon === "customize") return <Wand2 className={cls} strokeWidth={2} />;
    return <Rocket className={cls} strokeWidth={2} />;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] text-[#11242B]"
    >
      {/* 2026 Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .how-it-works-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-how-italic {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* EDITORIAL HEADER ROW */}
        <div className="max-w-xl mx-auto text-center space-y-3 mb-12 sm:mb-16 how-simple-reveal">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D5E1E6] text-[#136D7E] text-[10.5px] font-extrabold tracking-[0.2em] uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#11242B]">
            {data.headingLine1}{" "}
            <span className="bg-gradient-to-r from-[#136D7E] via-[#0E9384] to-[#0284C7] bg-clip-text text-transparent">
              {data.headingHighlight}{" "}
            </span>
            <span className="font-how-italic italic font-normal text-[38px] sm:text-[48px] lg:text-[54px] text-[#136D7E] tracking-normal">
              {data.headingItalic}
            </span>
          </h2>

          <p className="text-xs sm:text-[14.5px] text-slate-600 leading-relaxed max-w-md mx-auto">
            {data.subheading}
          </p>
        </div>

        {/* ===================================================================
            4-COLUMN CLEAN STATIC CARDS GRID (Distinct BG, Zero Animations)
           =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.steps.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            const tintClass = UNIQUE_CARD_TINTS[idx % UNIQUE_CARD_TINTS.length];

            return (
              <div key={step.stepNumber} className="how-simple-reveal">
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative h-full rounded-[24px] ${tintClass} border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                >
                  {/* TOP ROW: ICON BADGE + STEP NUMBER */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-2xs ${
                        isHovered
                          ? "bg-[#136D7E] text-white"
                          : "bg-white border border-[#D5E1E6] text-[#136D7E]"
                      }`}
                    >
                      {renderStepIcon(step.icon, isHovered)}
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white border border-[#D5E1E6] text-[#136D7E] text-[11px] font-extrabold flex items-center justify-center shadow-2xs">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* BOTTOM TEXT: TITLE + DESCRIPTION */}
                  <div className="space-y-2">
                    <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#11242B] group-hover:text-[#136D7E] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
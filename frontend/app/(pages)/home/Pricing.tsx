"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ArrowRight,
  Crown,
  Code2,
  Layers,
  Rocket,
  Calendar,
  Gem,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface PricingPlanItem {
  planSlug: string;
  badgeText: string;
  title: string;
  subtitle: string;
  codePrice: string;
  turnkeyPrice: string;
  billingLabel: string;
  isPopular: boolean;
  ctaLabel: string;
  features: string[];
}

export interface PricingSectionData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  modeLabels: {
    codeOnly: string;
    fullSetup: string;
    saveTag: string;
  };
  plans: PricingPlanItem[];
}

const DEFAULT_PRICING_DATA: PricingSectionData = {
  eyebrowLabel: "TRANSPARENT PRICING",
  heading: "Simple, One-Time Launch Plans",
  subheading:
    "No hidden monthly fees. Pick clean source code or let our team customize and launch your site.",
  modeLabels: {
    codeOnly: "Source Code Only",
    fullSetup: "Full Live Setup",
    saveTag: "Popular",
  },
  plans: [
    {
      planSlug: "starter-template",
      badgeText: "STARTER",
      title: "Template Code Pack",
      subtitle: "Best for developers & creators",
      codePrice: "₹6,999",
      turnkeyPrice: "₹9,499",
      billingLabel: "one-time",
      isPopular: false,
      ctaLabel: "Get Starter",
      features: [
        "Full Next.js + Tailwind Source Code",
        "100% Mobile & Tablet Responsive",
        "SEO-Ready & 99% Speed Score",
        "30 Days Technical Support",
      ],
    },
    {
      planSlug: "business-pro",
      badgeText: "MOST CHOSEN",
      title: "Business Launch Pro",
      subtitle: "Complete branding, admin & live hosting",
      codePrice: "₹9,999",
      turnkeyPrice: "₹12,999",
      billingLabel: "one-time",
      isPopular: true,
      ctaLabel: "Launch My Website",
      features: [
        "Brand Logo, Colors & Content Setup",
        "Admin Panel + MongoDB Database",
        "Razorpay & WhatsApp Order Checkout",
        "Free Domain Setup, SSL & 90d Support",
      ],
    },
    {
      planSlug: "custom-studio",
      badgeText: "BESPOKE",
      title: "Custom Web Studio",
      subtitle: "Tailored 3D UI & custom features",
      codePrice: "₹19,999",
      turnkeyPrice: "₹24,999",
      billingLabel: "starting",
      isPopular: false,
      ctaLabel: "Book Consultation",
      features: [
        "100% Custom 3D UI/UX Design",
        "Custom APIs & Role-Based Admin",
        "Booking, LMS or Multi-Vendor Logic",
        "6 Months Priority Engineering Support",
      ],
    },
  ],
};

export default function Pricing() {
  const router = useRouter();
  const [data, setData] = useState<PricingSectionData>(DEFAULT_PRICING_DATA);
  const [isTurnkey, setIsTurnkey] = useState<boolean>(true);

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/pricing`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Pricing API error:", err));
  }, []);

  const handlePlanSelect = (planSlug: string) => {
    const mode = isTurnkey ? "turnkey" : "code";
    router.push(`/register?plan=${planSlug}&mode=${mode}`);
  };

  const renderTwoToneSerifHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#162C33]">{headingText}</span>;
    }
    const splitPoint = Math.ceil(words.length / 2);
    return (
      <>
        <span className="text-[#162C33]">
          {words.slice(0, splitPoint).join(" ")}{" "}
        </span>
        <span className="text-[#136D7E] italic font-bold">
          {words.slice(splitPoint).join(" ")}
        </span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden py-11 sm:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F7FCFD] to-[#EEF8FA] text-[#162C33]">
      {/* TOP FLOWING AQUA-MINT RIBBON WAVES (Exact Match to image_fd1a42.jpg) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 top-0 w-full h-[105px] sm:h-[160px] lg:h-[190px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="priceLeftRibbon"
              x1="0"
              y1="25"
              x2="480"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#66C7BE" stopOpacity="0.62" />
              <stop offset="60%" stopColor="#9CE2DC" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#E4F7F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="priceRightRibbon"
              x1="960"
              y1="140"
              x2="1440"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E4F7F6" stopOpacity="0" />
              <stop offset="45%" stopColor="#8AD8D1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#46B3AA" stopOpacity="0.68" />
            </linearGradient>
          </defs>

          <path
            d="M0 30 C120 10, 230 68, 360 112 C430 135, 490 138, 540 132 C460 156, 365 154, 265 118 C155 78, 70 62, 0 85 Z"
            fill="url(#priceLeftRibbon)"
          />
          <path
            d="M1440 15 C1320 18, 1210 75, 1080 116 C1000 140, 935 142, 880 135 C965 160, 1065 156, 1170 118 C1280 78, 1365 60, 1440 82 Z"
            fill="url(#priceRightRibbon)"
          />
        </svg>

        {/* Subtle Soft Mist Behind Cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl h-72 rounded-full bg-[#136D7E]/[0.06] blur-[95px]" />
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* CENTERED HEADER */}
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10.5px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
            <Gem className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="font-serif text-[26px] sm:text-4xl lg:text-[40px] font-bold leading-[1.15] tracking-[-0.01em]">
            {renderTwoToneSerifHeading(data.heading)}
          </h2>

          <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-xl mx-auto">
            {data.subheading}
          </p>

          {/* Subtle Decorative Diamond Divider */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#136D7E]/30" />
            <span className="w-2 h-2 rotate-45 bg-[#136D7E]/75 rounded-[1px]" />
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#136D7E]/30" />
          </div>
        </ScrollReveal>

        {/* MODE SWITCHER PILL (Centered on Mobile, Right-Aligned on Desktop like image_fd1a42.jpg) */}
        <ScrollReveal
          delayMs={80}
          className="flex justify-center lg:justify-end mt-5 sm:mt-4 mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200/90 shadow-[0_8px_22px_rgba(15,61,70,0.06)]">
            <button
              type="button"
              onClick={() => setIsTurnkey(false)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11.5px] sm:text-xs font-bold transition-all duration-300 ${
                !isTurnkey
                  ? "bg-[#136D7E] text-white shadow-sm"
                  : "text-slate-600 hover:text-[#162C33]"
              }`}
            >
              {data.modeLabels.codeOnly}
            </button>

            <button
              type="button"
              onClick={() => setIsTurnkey(true)}
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11.5px] sm:text-xs font-bold transition-all duration-300 ${
                isTurnkey
                  ? "bg-[#136D7E] text-white shadow-[0_4px_14px_rgba(19,109,126,0.3)]"
                  : "text-slate-600 hover:text-[#162C33]"
              }`}
            >
              <span>{data.modeLabels.fullSetup}</span>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FDE68A] to-[#FBBF24] text-[#142930] text-[9px] font-extrabold uppercase tracking-wider">
                {data.modeLabels.saveTag}
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* 3 STUDIO PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {data.plans.map((plan, idx) => {
            const activePrice = isTurnkey ? plan.turnkeyPrice : plan.codePrice;

            return (
              <ScrollReveal
                key={plan.planSlug}
                delayMs={idx * 90}
                className="flex"
              >
                <div
                  className={`luxury-card group relative overflow-hidden w-full rounded-[24px] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-br from-[#073A42] via-[#0D5460] to-[#136D7E] text-white border-[1.5px] border-[#FBBF24]/50 shadow-[0_22px_50px_rgba(11,72,83,0.32)] lg:-translate-y-2.5"
                      : "bg-white text-[#162C33] border border-slate-200/85 shadow-[0_10px_28px_rgba(15,61,70,0.06)]"
                  }`}
                >
                  {/* DECORATIVE ACCENTS INSIDE CARDS */}
                  {plan.isPopular ? (
                    <>
                      {/* Top-Right Warm Gold Corner Ribbon with Crown (Exact Match to image_fd1a42.jpg) */}
                      <div className="pointer-events-none absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="w-24 h-24 -mt-10 ml-2 rounded-full bg-gradient-to-br from-[#FDE68A] via-[#FBBF24] to-[#E59A12] shadow-md flex items-end justify-start p-3.5">
                          <Crown className="w-4 h-4 text-[#142930] -rotate-12 mb-0.5 ml-0.5" />
                        </div>
                      </div>

                      {/* Ambient Inner Glow */}
                      <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#66C7BE]/15 blur-2xl" />

                      {/* Launching Rocket & Soft Clouds Illustration on Right (Exact Match to image_fd1a42.jpg) */}
                      <div className="pointer-events-none absolute right-1 top-[92px] sm:top-[100px] w-24 sm:w-28 h-28 sm:h-32 anim-float opacity-95">
                        <LaunchingRocketIllustration />
                      </div>
                    </>
                  ) : (
                    /* Subtle Soft Aqua Corner Tint on White Cards */
                    <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#EAF4F7]/80 blur-xl" />
                  )}

                  {/* TOP & MIDDLE CONTENT */}
                  <div className="relative z-10">
                    {/* Top Row: Pill Badge + Right Circular Icon (for Non-Popular Cards) */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                          plan.isPopular
                            ? "bg-gradient-to-r from-[#FDE68A] to-[#FBBF24] text-[#142930] shadow-xs"
                            : "bg-[#E5F4F6] text-[#136D7E]"
                        }`}
                      >
                        {plan.isPopular && <Crown className="w-3 h-3" />}
                        <span>{plan.badgeText}</span>
                      </span>

                      {!plan.isPopular && (
                        <span className="w-9 h-9 rounded-full bg-[#EAF4F7] border border-[#136D7E]/15 text-[#136D7E] flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:text-white transition-colors duration-300">
                          {idx === 0 ? (
                            <Code2 className="w-4 h-4" />
                          ) : (
                            <Layers className="w-4 h-4" />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Serif Plan Title & Subtitle */}
                    <h3
                      className={`font-serif text-[21px] sm:text-2xl font-bold leading-snug ${
                        plan.isPopular ? "text-white pr-10" : "text-[#162C33]"
                      }`}
                    >
                      {plan.title}
                    </h3>

                    <p
                      className={`text-xs mt-1 ${
                        plan.isPopular
                          ? "text-teal-100/85 pr-16"
                          : "text-slate-500"
                      }`}
                    >
                      {plan.subtitle}
                    </p>

                    {/* Price Display */}
                    <div
                      className={`my-4 pb-4 border-b flex items-baseline gap-1.5 ${
                        plan.isPopular
                          ? "border-white/15 pr-20"
                          : "border-slate-100"
                      }`}
                    >
                      <span
                        key={activePrice}
                        className={`text-3xl sm:text-[34px] font-extrabold tracking-tight transition-all duration-300 ${
                          plan.isPopular ? "text-white" : "text-[#162C33]"
                        }`}
                      >
                        {activePrice}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          plan.isPopular ? "text-teal-200/90" : "text-slate-400"
                        }`}
                      >
                        / {plan.billingLabel}
                      </span>
                    </div>

                    {/* 4-Point Feature List */}
                    <ul
                      className={`space-y-2.5 ${
                        plan.isPopular ? "pr-12 sm:pr-14" : ""
                      }`}
                    >
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs leading-snug"
                        >
                          <span
                            className={`w-4 h-4 mt-0.5 rounded-full flex items-center justify-center shrink-0 ${
                              plan.isPopular
                                ? "bg-[#FBBF24] text-[#142930]"
                                : "bg-[#E5F4F6] text-[#136D7E]"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span
                            className={
                              plan.isPopular
                                ? "text-teal-50/95 font-medium"
                                : "text-slate-600"
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BOTTOM CTA BUTTON */}
                  <div className="relative z-10 pt-6 mt-4">
                    <button
                      type="button"
                      onClick={() => handlePlanSelect(plan.planSlug)}
                      className={`group/btn w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-extrabold text-xs sm:text-[13px] transition-all duration-300 active:scale-[0.98] ${
                        plan.isPopular
                          ? "bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] text-[#142930] shadow-[0_10px_24px_rgba(251,191,36,0.38)] hover:brightness-105 hover:-translate-y-0.5"
                          : "bg-white text-[#162C33] border border-slate-300 hover:border-[#136D7E] hover:bg-[#136D7E] hover:text-white shadow-2xs"
                      }`}
                    >
                      {plan.isPopular && (
                        <Rocket className="w-3.5 h-3.5 text-[#142930]" />
                      )}
                      {!plan.isPopular && idx === 2 && (
                        <Calendar className="w-3.5 h-3.5 text-[#136D7E] group-hover/btn:text-white transition-colors" />
                      )}
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Custom Studio Illustration: Launching Rocket & Soft Clouds (Exact Match to image_fd1a42.jpg) */
function LaunchingRocketIllustration() {
  return (
    <svg
      viewBox="0 0 130 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_10px_18px_rgba(6,38,44,0.35)]"
    >
      <defs>
        <linearGradient id="rocketBody" x1="45" y1="20" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E6F7F9" />
          <stop offset="50%" stopColor="#89CDD8" />
          <stop offset="100%" stopColor="#2B8696" />
        </linearGradient>
        <linearGradient id="rocketNose" x1="65" y1="15" x2="98" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="45" y1="82" x2="25" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Tiny Golden Sparkles */}
      <path d="M35 28L37 33L42 35L37 37L35 42L33 37L28 35L33 33L35 28Z" fill="#FDE68A" />
      <circle cx="106" cy="56" r="2" fill="#FBBF24" />
      <circle cx="48" cy="18" r="1.5" fill="#FFFFFF" opacity="0.8" />

      {/* Angled Launching Rocket */}
      <g transform="translate(72, 58) rotate(36)">
        {/* Exhaust Flame */}
        <path d="M-6 26L0 46L6 26H-6Z" fill="url(#flameGrad)" />
        {/* Side Fins */}
        <path d="M-11 12L-20 25L-10 24V12Z" fill="#F59E0B" />
        <path d="M11 12L20 25L10 24V12Z" fill="#F59E0B" />
        {/* Main Fuselage */}
        <path
          d="M0 -34C-11 -20 -13 -2 -12 24H12C13 -2 11 -20 0 -34Z"
          fill="url(#rocketBody)"
        />
        {/* Golden Nose Cone */}
        <path
          d="M0 -34C-6 -25 -9 -17 -10 -10H10C9 -17 6 -25 0 -34Z"
          fill="url(#rocketNose)"
        />
        {/* Porthole Window */}
        <circle cx="0" cy="3" r="6" fill="#0B4752" stroke="#FDE68A" strokeWidth="2" />
        <circle cx="-1.5" cy="1.5" r="2" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Soft Layered White Studio Clouds at Base */}
      <g opacity="0.95">
        <circle cx="38" cy="108" r="16" fill="#D5EEF2" />
        <circle cx="58" cy="104" r="20" fill="#EBF8FA" />
        <circle cx="82" cy="106" r="18" fill="#FFFFFF" />
        <circle cx="102" cy="112" r="14" fill="#CBE7EC" />
        <rect x="24" y="106" width="90" height="22" rx="11" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
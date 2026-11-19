// frontend/app/(pages)/pricing/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Check,
  X,
  ArrowUpRight,
  Crown,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
} from "lucide-react";

export interface PricingTier {
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

export interface ComparisonRow {
  featureName: string;
  starterIncluded: string | boolean;
  businessIncluded: string | boolean;
  customIncluded: string | boolean;
}

export interface PricingPageData {
  eyebrowLabel: string;
  headingLine1: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  modeLabels: {
    codeOnly: string;
    fullSetup: string;
    saveTag: string;
  };
  plans: PricingTier[];
  comparisonHeading: string;
  comparisonRows: ComparisonRow[];
}

const DEFAULT_PRICING_PAGE_DATA: PricingPageData = {
  eyebrowLabel: "TRANSPARENT ONE-TIME PRICING • 2026",
  headingLine1: "Invest Once, Own Your",
  headingHighlight: "Website",
  headingItalic: "Forever",
  subheading:
    "No recurring monthly platform rent. Download ready source code or let our studio customize, connect payments, and launch it live.",
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
  comparisonHeading: "Compare Every Deliverable Side-by-Side",
  comparisonRows: [
    {
      featureName: "100% Clean Source Code Ownership",
      starterIncluded: true,
      businessIncluded: true,
      customIncluded: true,
    },
    {
      featureName: "Built-in Admin Dashboard & CMS",
      starterIncluded: "Basic",
      businessIncluded: "Full Access",
      customIncluded: "Custom Roles",
    },
    {
      featureName: "Brand Colors, Logo & Content Upload",
      starterIncluded: false,
      businessIncluded: true,
      customIncluded: true,
    },
    {
      featureName: "Razorpay / UPI & WhatsApp Checkout",
      starterIncluded: "Code Ready",
      businessIncluded: "Fully Configured",
      customIncluded: "Custom Flows",
    },
    {
      featureName: "Custom Domain, SSL & Live Deployment",
      starterIncluded: false,
      businessIncluded: true,
      customIncluded: true,
    },
    {
      featureName: "Dedicated Engineering Support",
      starterIncluded: "30 Days",
      businessIncluded: "90 Days",
      customIncluded: "6 Months",
    },
  ],
};

export default function PricingPage() {
  const router = useRouter();
  const [data, setData] = useState<PricingPageData>(DEFAULT_PRICING_PAGE_DATA);
  const [isTurnkey, setIsTurnkey] = useState<boolean>(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [heroSpot, setHeroSpot] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({
    x: 450,
    y: 160,
    active: false,
  });
  const [cardSpot, setCardSpot] = useState<{ x: number; y: number }>({
    x: 160,
    y: 140,
  });

  const pageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/pricing`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.plans)) {
          setData({ ...DEFAULT_PRICING_PAGE_DATA, ...fetched });
        }
      })
      .catch((err) => console.error("Pricing page API error:", err));
  }, []);

  // 2026 Luxury Glossy Entrance & Continuous Sheen Animations
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prc-hero-reveal",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );

      gsap.fromTo(
        ".prc-card-reveal",
        { y: 24, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.09,
          delay: 0.15,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );

      // Volumetric Glossy Auras in Hero
      gsap.to(".prc-aura-teal", {
        x: 40,
        y: -22,
        scale: 1.15,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".prc-aura-gold", {
        x: -40,
        y: 22,
        scale: 1.18,
        duration: 8.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Gentle Levitation for Flanking Glass Trust Badges
      gsap.to(".prc-trust-pill-1", {
        y: -6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".prc-trust-pill-2", {
        y: 6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous Luxury Glossy Light Sheen Sweep on Cards
      gsap.utils.toArray<HTMLElement>(".prc-gloss-sheen").forEach((beam, i) => {
        gsap.fromTo(
          beam,
          { xPercent: -160 },
          {
            xPercent: 360,
            duration: 2.3,
            repeat: -1,
            repeatDelay: 3.6 + i * 0.9,
            delay: i * 0.7,
            ease: "power2.inOut",
          }
        );
      });
    }, pageEl);

    return () => ctx.revert();
  }, []);

  // Smooth Price Counter Flip Animation when Toggling Mode
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prc-price-digit",
        { y: -8, opacity: 0.4, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "back.out(1.7)",
          clearProps: "opacity,transform",
        }
      );
    }, pageEl);

    return () => ctx.revert();
  }, [isTurnkey]);

  // Hover Zoom-In / Zoom-Out Pulse on Pricing Cards
  const handleCardMouseEnter = (idx: number, isPopular: boolean) => {
    setHoveredIdx(idx);
    const el = cardRefs.current[idx];
    if (!el) return;

    const baseLift = isPopular ? -10 : 0;
    gsap.killTweensOf(el);
    gsap
      .timeline()
      .to(el, {
        scale: 1.024,
        y: baseLift - 6,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(el, {
        scale: 1.012,
        y: baseLift - 4,
        duration: 0.38,
        ease: "sine.inOut",
      });
  };

  const handleCardMouseLeave = (idx: number, isPopular: boolean) => {
    setHoveredIdx(null);
    const el = cardRefs.current[idx];
    if (!el) return;

    const baseLift = isPopular ? -10 : 0;
    gsap.killTweensOf(el);
    gsap.to(el, {
      scale: 1,
      y: baseLift,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const renderCell = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex w-6 h-6 rounded-full bg-[#E3F3F5] text-[#136D7E] items-center justify-center shadow-2xs">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </span>
      ) : (
        <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
          <X className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="text-xs font-extrabold text-[#0B252C] bg-[#EAF5F7] border border-[#D4E9ED] px-3 py-1 rounded-full">
        {val}
      </span>
    );
  };

  return (
    <div
      ref={pageRef}
      className="pricing-luxury-2026 min-h-screen flex flex-col text-[#0B252C] overflow-x-clip bg-gradient-to-b from-[#E4EFF2] via-[#EEF5F7] to-[#E2ECEF] pb-20"
    >
      {/* 2026 2-Color Editorial Typography & Glossy Studio Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .pricing-luxury-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-prc-2color {
          font-family: 'Instrument Serif', Georgia, serif;
        }
        .prc-glass-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* ===================================================================
          1. 2026 LUXURY GLOSSY STUDIO HERO (Volumetric Light & Glass Switcher)
         =================================================================== */}
      <div
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroSpot((prev) => ({ ...prev, active: false }))}
        className="relative overflow-hidden bg-gradient-to-br from-[#07262B] via-[#0E4D59] to-[#137486] text-white pt-11 pb-20 sm:pt-14 sm:pb-24 px-4 sm:px-8 border-b border-white/15 shadow-[0_22px_55px_rgba(7,38,43,0.22)]"
      >
        {/* Subtle Micro-Dot Grid & Mouse-Tracking Glossy Spotlight */}
        <div className="prc-glass-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          style={{
            opacity: heroSpot.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(243, 213, 155, 0.16), rgba(45, 212, 191, 0.09) 45%, transparent 72%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />

        {/* Volumetric Breathing Auras */}
        <div className="prc-aura-teal pointer-events-none absolute -top-24 left-10 w-[360px] h-[360px] rounded-full bg-[#2DD4BF]/20 blur-[115px]" />
        <div className="prc-aura-gold pointer-events-none absolute -bottom-24 right-10 w-[380px] h-[380px] rounded-full bg-[#F3D59B]/24 blur-[115px]" />

        {/* Top Glossy Specular Reflection Edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

        {/* Flanking Frosted-Glass Trust Pills on Desktop */}
        <div className="prc-trust-pill-1 hidden xl:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/12 backdrop-blur-2xl border border-white/25 shadow-[0_14px_35px_rgba(0,0,0,0.2)] absolute top-11 left-12 pointer-events-none">
          <div className="w-8 h-8 rounded-xl bg-[#F3D59B]/20 border border-[#F3D59B]/40 flex items-center justify-center">
            <Code2 className="w-4 h-4 text-[#F3D59B]" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-extrabold text-white leading-none">
              100% Source Ownership
            </p>
            <p className="text-[9.5px] text-teal-100/80 mt-1">
              Zero Monthly Rent
            </p>
          </div>
        </div>

        <div className="prc-trust-pill-2 hidden xl:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/12 backdrop-blur-2xl border border-white/25 shadow-[0_14px_35px_rgba(0,0,0,0.2)] absolute bottom-16 right-12 pointer-events-none">
          <div className="w-8 h-8 rounded-xl bg-[#2DD4BF]/20 border border-[#2DD4BF]/40 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#F3D59B]" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-extrabold text-white leading-none">
              48-Hr Live Deployment
            </p>
            <p className="text-[9.5px] text-teal-100/80 mt-1">
              Domain, SSL &amp; Razorpay
            </p>
          </div>
        </div>

        {/* Centered Editorial Hero Content */}
        <div className="relative max-w-3xl mx-auto text-center space-y-3.5">
          <div className="prc-hero-reveal inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/12 backdrop-blur-2xl border border-white/25 text-[#F3D59B] text-[10px] font-extrabold tracking-[0.22em] uppercase shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#F3D59B]" />
            <span>{data.eyebrowLabel}</span>
          </div>

          {/* 2-Color Luxury Typography (Crisp White + Champagne Gold Italic) */}
          <h1 className="prc-hero-reveal text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white">
            {data.headingLine1}{" "}
            <span className="bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>{" "}
            <span className="font-prc-2color italic font-normal text-[38px] sm:text-[58px] lg:text-[64px] text-[#F3D59B] tracking-normal">
              {data.headingItalic}
            </span>
          </h1>

          <p className="prc-hero-reveal text-xs sm:text-[14.5px] text-teal-50/90 max-w-xl mx-auto leading-relaxed">
            {data.subheading}
          </p>

          {/* Luxury Glossy Toggle Switcher */}
          <div className="prc-hero-reveal pt-3 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-white/12 backdrop-blur-2xl border border-white/25 shadow-[0_14px_35px_rgba(0,0,0,0.24)]">
              <button
                type="button"
                onClick={() => setIsTurnkey(false)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                  !isTurnkey
                    ? "bg-white text-[#07262B] shadow-[0_6px_18px_rgba(255,255,255,0.28)]"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                {data.modeLabels.codeOnly}
              </button>

              <button
                type="button"
                onClick={() => setIsTurnkey(true)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                  isTurnkey
                    ? "bg-gradient-to-r from-[#FDE68A] via-[#F3D59B] to-[#E6C78A] text-[#07262B] shadow-[0_8px_22px_rgba(243,213,155,0.35)]"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                <span>{data.modeLabels.fullSetup}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#07262B] text-[#F3D59B] text-[9px] font-extrabold uppercase tracking-wider">
                  {data.modeLabels.saveTag}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. 3 ULTRA-GLOSSY LUXURY PRICING CARDS
             (Middle Card Keeps Beloved Rich Emerald-Teal Gradient!)
         =================================================================== */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {data.plans.map((plan, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div key={plan.planSlug} className="prc-card-reveal flex">
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleCardMouseEnter(idx, plan.isPopular)}
                  onMouseLeave={() => handleCardMouseLeave(idx, plan.isPopular)}
                  onMouseMove={handleCardMouseMove}
                  className={`group relative w-full rounded-[28px] p-6 sm:p-7 transition-shadow duration-300 flex flex-col justify-between overflow-hidden will-change-transform ${
                    plan.isPopular
                      ? "bg-gradient-to-br from-[#0B4A50] via-[#0F666D] to-[#137E86] text-white border border-white/40 ring-2 ring-[#F3D59B]/60 shadow-[0_26px_65px_rgba(13,116,134,0.34)] md:-translate-y-2.5"
                      : "bg-gradient-to-b from-white/95 via-white/90 to-[#F2F8FA]/90 backdrop-blur-2xl text-[#0B252C] border border-white ring-1 ring-[#136D7E]/15 hover:ring-[#136D7E]/45 shadow-[0_16px_40px_rgba(11,37,44,0.08)] hover:shadow-[0_26px_60px_rgba(19,109,126,0.18)]"
                  }`}
                >
                  {/* Top Glossy Specular Glass Rim */}
                  <div
                    className={`pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent ${
                      plan.isPopular ? "via-[#F3D59B]/80" : "via-white"
                    } to-transparent`}
                  />

                  {/* Interactive Cursor Spotlight */}
                  <div
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: plan.isPopular
                        ? `radial-gradient(240px circle at ${cardSpot.x}px ${cardSpot.y}px, rgba(243, 213, 155, 0.2), transparent 72%)`
                        : `radial-gradient(240px circle at ${cardSpot.x}px ${cardSpot.y}px, rgba(19, 109, 126, 0.14), rgba(200, 164, 93, 0.12) 45%, transparent 72%)`,
                    }}
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                  />

                  {/* Continuous Luxury Glossy Light Sheen Sweep */}
                  <div
                    className={`prc-gloss-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10 bg-gradient-to-r from-transparent ${
                      plan.isPopular ? "via-white/25" : "via-white/85"
                    } to-transparent skew-x-[-20deg]`}
                  />

                  {/* CARD TOP & FEATURES */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-[0.16em] uppercase shadow-2xs ${
                          plan.isPopular
                            ? "bg-gradient-to-r from-[#FDE68A] to-[#F3D59B] text-[#07262B]"
                            : "bg-[#EAF5F7] border border-[#D4E9ED] text-[#136D7E]"
                        }`}
                      >
                        {plan.isPopular && <Crown className="w-3 h-3" />}
                        <span>{plan.badgeText}</span>
                      </span>

                      {plan.isPopular && (
                        <span className="text-[10px] font-bold text-[#F3D59B] tracking-wide">
                          ✦ Best Value
                        </span>
                      )}
                    </div>

                    <h2
                      className={`text-xl sm:text-[22px] font-extrabold tracking-tight ${
                        plan.isPopular ? "text-white" : "text-[#0B252C]"
                      }`}
                    >
                      {plan.title}
                    </h2>
                    <p
                      className={`text-xs mt-1 ${
                        plan.isPopular ? "text-teal-100/85" : "text-slate-500"
                      }`}
                    >
                      {plan.subtitle}
                    </p>

                    {/* Glossy Price Showcase Box */}
                    <div
                      className={`my-5 p-4 rounded-2xl border flex items-baseline justify-between ${
                        plan.isPopular
                          ? "bg-white/10 backdrop-blur-md border-white/20"
                          : "bg-[#F4F9FA] border-[#E1EEF1]"
                      }`}
                    >
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`prc-price-digit text-3xl sm:text-[34px] font-extrabold tracking-tight ${
                            plan.isPopular ? "text-white" : "text-[#0B252C]"
                          }`}
                        >
                          {isTurnkey ? plan.turnkeyPrice : plan.codePrice}
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${
                            plan.isPopular
                              ? "text-teal-100/85"
                              : "text-slate-400"
                          }`}
                        >
                          / {plan.billingLabel}
                        </span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-[12.5px] font-medium"
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              plan.isPopular
                                ? "bg-[#F3D59B]/20 text-[#F3D59B]"
                                : "bg-[#E4F3F5] text-[#136D7E]"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span
                            className={
                              plan.isPopular ? "text-teal-50" : "text-slate-700"
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GLOSSY CTA BUTTON */}
                  <div className="relative z-10 pt-6 mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/register?plan=${plan.planSlug}&mode=${
                            isTurnkey ? "turnkey" : "code"
                          }`
                        )
                      }
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-extrabold text-xs transition-all duration-300 ${
                        plan.isPopular
                          ? "bg-gradient-to-r from-[#FDE68A] via-[#F3D59B] to-[#E6C78A] text-[#07262B] shadow-[0_10px_25px_rgba(243,213,155,0.35)] hover:brightness-105"
                          : "bg-[#F2F8FA] text-[#136D7E] border border-[#D4E9ED] hover:bg-gradient-to-r hover:from-[#07262B] hover:to-[#136D7E] hover:text-white hover:border-transparent"
                      }`}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            3. FROSTED-GLASS SIDE-BY-SIDE COMPARISON TABLE
           =================================================================== */}
        <div className="prc-card-reveal rounded-[28px] bg-white/88 backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 shadow-[0_16px_42px_rgba(11,37,44,0.06)] overflow-hidden">
          <div className="p-6 sm:p-7 border-b border-[#E5EFF2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B68938]">
                FULL TRANSPARENCY
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B252C] mt-0.5">
                {data.comparisonHeading}
              </h3>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAF5F7] border border-[#D4E9ED] text-xs font-extrabold text-[#136D7E]">
              <ShieldCheck className="w-4 h-4 text-[#B68938]" />
              <span>Zero Hidden Charges</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F2F8FA] text-[11px] font-extrabold uppercase tracking-wider text-[#0B252C]">
                  <th className="py-4 px-6">Deliverable</th>
                  <th className="py-4 px-6 text-center">Starter</th>
                  <th className="py-4 px-6 text-center text-[#136D7E] bg-[#E5F3F5]/70">
                    Business Pro ✦
                  </th>
                  <th className="py-4 px-6 text-center">Custom Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAF2F4] text-xs sm:text-[13px]">
                {data.comparisonRows.map((row) => (
                  <tr
                    key={row.featureName}
                    className="hover:bg-[#F7FBFC] transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-[#0B252C]">
                      {row.featureName}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.starterIncluded)}
                    </td>
                    <td className="py-4 px-6 text-center bg-[#EAF5F7]/45">
                      {renderCell(row.businessIncluded)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.customIncluded)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
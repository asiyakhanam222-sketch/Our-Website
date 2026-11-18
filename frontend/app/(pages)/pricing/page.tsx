// frontend/app/(pages)/pricing/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  ArrowRight,
  Crown,
  Sparkles,
  ShieldCheck,
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
  heading: string;
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
  eyebrowLabel: "TRANSPARENT ONE-TIME PRICING",
  heading: "Invest Once, Own Your Website Forever",
  subheading:
    "No recurring monthly platform rent. Download ready source code or let our team customize, connect payments, and launch it live.",
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

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/pricing`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Pricing page API error:", err));
  }, []);

  const renderCell = (val: string | boolean) => {
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex w-6 h-6 rounded-full bg-teal-50 text-[#0D9488] items-center justify-center">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </span>
      ) : (
        <span className="inline-flex w-6 h-6 rounded-full bg-slate-100 text-slate-400 items-center justify-center">
          <X className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="text-xs font-bold text-[#0F292A] bg-teal-50/70 px-2.5 py-1 rounded-full">
        {val}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HEADER BANNER */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-teal-300/35 text-teal-200 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {data.heading}
          </h1>

          <p className="text-teal-100/85 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subheading}
          </p>

          {/* Toggle Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1 rounded-full bg-white/10 backdrop-blur-md border border-teal-300/30">
              <button
                type="button"
                onClick={() => setIsTurnkey(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !isTurnkey
                    ? "bg-white text-[#062C30] shadow"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                {data.modeLabels.codeOnly}
              </button>

              <button
                type="button"
                onClick={() => setIsTurnkey(true)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isTurnkey
                    ? "bg-amber-300 text-[#0F292A] shadow"
                    : "text-teal-100 hover:text-white"
                }`}
              >
                <span>{data.modeLabels.fullSetup}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#062C30] text-amber-300 text-[9px] font-extrabold uppercase">
                  {data.modeLabels.saveTag}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 COMPACT PRICING CARDS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {data.plans.map((plan) => (
            <div
              key={plan.planSlug}
              className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                plan.isPopular
                  ? "bg-gradient-to-br from-[#0D4F4F] via-[#0F6666] to-[#0D9488] text-white border-2 border-teal-300/60 shadow-[0_20px_45px_rgba(13,148,136,0.28)] md:-translate-y-2"
                  : "bg-white text-[#0F292A] border border-teal-100 shadow-[0_12px_30px_rgba(15,41,42,0.07)] hover:border-teal-300"
              }`}
            >
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-2 ${
                    plan.isPopular
                      ? "bg-amber-300 text-[#0F292A]"
                      : "bg-teal-50 text-[#0D9488]"
                  }`}
                >
                  {plan.isPopular && <Crown className="w-3 h-3" />}
                  {plan.badgeText}
                </span>

                <h2
                  className={`font-serif text-xl font-bold ${
                    plan.isPopular ? "text-white" : "text-[#0F292A]"
                  }`}
                >
                  {plan.title}
                </h2>
                <p
                  className={`text-xs mt-0.5 ${
                    plan.isPopular ? "text-teal-100/85" : "text-slate-500"
                  }`}
                >
                  {plan.subtitle}
                </p>

                <div
                  className={`my-4 pb-4 border-b flex items-baseline gap-1.5 ${
                    plan.isPopular ? "border-white/15" : "border-teal-50"
                  }`}
                >
                  <span
                    className={`text-3xl font-extrabold ${
                      plan.isPopular ? "text-white" : "text-[#0F292A]"
                    }`}
                  >
                    {isTurnkey ? plan.turnkeyPrice : plan.codePrice}
                  </span>
                  <span
                    className={`text-[11px] ${
                      plan.isPopular ? "text-teal-200" : "text-slate-400"
                    }`}
                  >
                    / {plan.billingLabel}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          plan.isPopular
                            ? "bg-amber-300/20 text-amber-300"
                            : "bg-teal-50 text-[#0D9488]"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span
                        className={
                          plan.isPopular ? "text-teal-50" : "text-slate-600"
                        }
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-5">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/register?plan=${plan.planSlug}&mode=${
                        isTurnkey ? "turnkey" : "code"
                      }`
                    )
                  }
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-full font-bold text-xs transition-all ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-amber-300 to-amber-400 text-[#0F292A] shadow-md hover:brightness-105"
                      : "bg-teal-50 text-[#0D9488] border border-teal-200 hover:bg-[#0D9488] hover:text-white"
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="rounded-3xl bg-white border border-teal-100 shadow-[0_14px_35px_rgba(15,41,42,0.06)] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-teal-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-serif text-2xl font-bold text-[#0F292A]">
              {data.comparisonHeading}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9488]">
              <ShieldCheck className="w-4 h-4" /> Zero Hidden Charges
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-50/60 text-xs font-extrabold uppercase tracking-wider text-[#0F292A]">
                  <th className="py-4 px-6">Deliverable</th>
                  <th className="py-4 px-6 text-center">Starter</th>
                  <th className="py-4 px-6 text-center text-[#0D9488]">
                    Business Pro
                  </th>
                  <th className="py-4 px-6 text-center">Custom Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50 text-xs sm:text-sm">
                {data.comparisonRows.map((row) => (
                  <tr
                    key={row.featureName}
                    className="hover:bg-teal-50/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-[#0F292A]">
                      {row.featureName}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderCell(row.starterIncluded)}
                    </td>
                    <td className="py-4 px-6 text-center bg-teal-50/20">
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
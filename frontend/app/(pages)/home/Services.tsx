"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  Palette,
  Server,
  Rocket,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface ServiceItem {
  serviceSlug: string;
  icon: "code" | "palette" | "server" | "rocket";
  title: string;
  description: string;
  tag: string;
}

export interface ServicesSectionData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  services: ServiceItem[];
  customBanner: {
    heading: string;
    description: string;
    ctaLabel: string;
    ctaPath: string;
    laptopCodeSymbol: string;
    laptopImage: string;
  };
}

const DEFAULT_SERVICES_DATA: ServicesSectionData = {
  eyebrowLabel: "AGENCY & CUSTOMIZATION SERVICES",
  heading: "Beyond Templates: Full-Stack Web Engineering",
  subheading:
    "Need custom branding, Razorpay integration, or a bespoke web application built from scratch? Our engineers handle everything.",
  services: [
    {
      serviceSlug: "brand-customization",
      icon: "palette",
      title: "Brand & UI Personalization",
      description:
        "We tailor colors, fonts, logos, and layouts to match your exact brand identity.",
      tag: "24-Hour Turnaround",
    },
    {
      serviceSlug: "fullstack-development",
      icon: "code",
      title: "Custom Next.js & MERN Apps",
      description:
        "Bespoke web applications with custom dashboards, booking engines, and workflows.",
      tag: "Scalable Architecture",
    },
    {
      serviceSlug: "cloud-deployment",
      icon: "server",
      title: "Domain, Cloud & SSL Setup",
      description:
        "Zero-downtime deployment with custom domain, enterprise SSL, and MongoDB Atlas.",
      tag: "99.9% Uptime",
    },
    {
      serviceSlug: "seo-growth",
      icon: "rocket",
      title: "Speed & Google SEO Boost",
      description:
        "99+ Lighthouse performance optimization, schema markup, and WhatsApp lead capture.",
      tag: "High Conversion",
    },
  ],
  customBanner: {
    heading: "Need a Unique Website?",
    description:
      "Have a custom idea? We build fully tailored, high-performance websites designed exclusively for your business.",
    ctaLabel: "Discuss Your Project",
    ctaPath: "/contact?service=fullstack-development",
    laptopCodeSymbol: "</>",
    laptopImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=85",
  },
};

export default function Services() {
  const router = useRouter();
  const [data, setData] = useState<ServicesSectionData>(DEFAULT_SERVICES_DATA);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Services API error:", err));
  }, []);

  const renderServiceIcon = (icon: ServiceItem["icon"]) => {
    const cls =
      "w-5 h-5 sm:w-6 sm:h-6 text-[#136D7E] group-hover:scale-110 transition-transform duration-300";
    if (icon === "palette") return <Palette className={cls} strokeWidth={2} />;
    if (icon === "code") return <Code2 className={cls} strokeWidth={2} />;
    if (icon === "server") return <Server className={cls} strokeWidth={2} />;
    return <Rocket className={cls} strokeWidth={2} />;
  };

  const renderTagBadge = (tag: string, idx: number) => {
    const isWarm = idx % 2 === 0;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[9.5px] sm:text-[10px] shrink-0 ${
          isWarm
            ? "bg-[#FEF6E7] text-[#A86214] border border-[#F8E3BE]"
            : "bg-[#E6F6F5] text-[#136D7E] border border-[#CBECE9]"
        }`}
      >
        {idx === 0 && <Zap className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />}
        {idx === 1 && <Layers className="w-2.5 h-2.5 text-[#136D7E]" />}
        {idx === 2 && <ShieldCheck className="w-2.5 h-2.5 text-amber-600" />}
        {idx >= 3 && <TrendingUp className="w-2.5 h-2.5 text-[#136D7E]" />}
        <span>{tag}</span>
      </span>
    );
  };

  const renderTwoToneSerifHeading = (headingText: string) => {
    if (headingText.includes(":")) {
      const [prefix, rest] = headingText.split(":");
      const words = rest.trim().split(" ");
      const lastWord = words.length > 1 ? words.pop() : "";
      const tealPart = words.join(" ");

      return (
        <>
          <span className="text-[#162C33]">{prefix}: </span>
          <span className="text-[#136D7E]">{tealPart}</span>
          {lastWord && (
            <span className="block text-[#162C33] mt-0.5">{lastWord}</span>
          )}
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
    <section className="relative overflow-hidden py-11 sm:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F7FCFD] to-[#EEF8FA] text-[#162C33]">
      {/* TOP FLOWING AQUA-MINT RIBBON WAVES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 top-0 w-full h-[110px] sm:h-[165px] lg:h-[195px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="srvLeftRibbon"
              x1="0"
              y1="30"
              x2="480"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#66C7BE" stopOpacity="0.62" />
              <stop offset="60%" stopColor="#9CE2DC" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4F7F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="srvRightRibbon"
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
            d="M0 32 C120 12, 230 68, 360 112 C430 135, 490 138, 540 132 C460 156, 365 154, 265 118 C155 78, 70 62, 0 85 Z"
            fill="url(#srvLeftRibbon)"
          />
          <path
            d="M1440 15 C1320 18, 1210 75, 1080 116 C1000 140, 935 142, 880 135 C965 160, 1065 156, 1170 118 C1280 78, 1365 60, 1440 82 Z"
            fill="url(#srvRightRibbon)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto space-y-8 sm:space-y-11">
        <ScrollReveal className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/80 shadow-2xs text-[10px] sm:text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#136D7E]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="font-serif text-[25px] sm:text-3xl lg:text-[36px] font-bold leading-[1.15] tracking-[-0.01em] pt-0.5">
            {renderTwoToneSerifHeading(data.heading)}
          </h2>

          <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-xl mx-auto">
            {data.subheading}
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#136D7E]/30" />
            <span className="w-2 h-2 rotate-45 bg-[#136D7E]/70 rounded-[1px]" />
            <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#136D7E]/30" />
          </div>
        </ScrollReveal>

        {/* 4 STUDIO SERVICE CARDS WITH INTERNAL BOTTOM AQUA WAVES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {data.services.map((service, idx) => {
            const isHighlighted = idx === 0;
            return (
              <ScrollReveal key={service.serviceSlug} delayMs={idx * 80} className="flex">
                <button
                  type="button"
                  onClick={() => router.push("/services")}
                  className={`luxury-card group relative overflow-hidden w-full text-left rounded-[22px] bg-white p-5 sm:p-5 pb-9 sm:pb-10 flex flex-col justify-between ${
                    isHighlighted
                      ? "border-[1.5px] border-[#136D7E]/55 shadow-[0_14px_34px_rgba(19,109,126,0.12)]"
                      : "border border-slate-200/80 shadow-[0_8px_24px_rgba(15,61,70,0.05)]"
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E5F5F4] border border-[#CBECE9] flex items-center justify-center shrink-0 group-hover:bg-[#D5F0EE] transition-colors">
                        {renderServiceIcon(service.icon)}
                      </div>

                      {renderTagBadge(service.tag, idx)}
                    </div>

                    <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#162C33] leading-snug group-hover:text-[#136D7E] transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-[11.5px] sm:text-[12px] text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#12687A] group-hover:bg-[#0D5260] text-white font-bold text-[11px] sm:text-[11.5px] shadow-xs transition-all">
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 300 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-8 sm:h-9 opacity-90 group-hover:scale-x-105 transition-transform duration-500"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 32 C65 24, 130 36, 195 22 C240 12, 275 8, 300 12 L300 44 L0 44 Z"
                      fill="#BCEAE5"
                      fillOpacity="0.65"
                    />
                    <path
                      d="M0 38 C85 34, 155 40, 225 26 C260 19, 285 17, 300 19 L300 44 L0 44 Z"
                      fill="#78CFC6"
                      fillOpacity="0.65"
                    />
                  </svg>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* BOTTOM DEEP OCEAN-TEAL CTA BANNER */}
        <ScrollReveal delayMs={120}>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C4A56] via-[#115E6D] to-[#147486] border border-[#4FA8B8]/30 shadow-[0_18px_45px_rgba(12,74,86,0.22)]">
            <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#66C7BE]/15 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-5 sm:gap-6 p-5 sm:p-8 lg:p-9">
              <div className="lg:col-span-4 flex justify-center anim-float">
                <div className="relative w-full max-w-[250px] sm:max-w-[270px] rounded-2xl overflow-hidden border border-white/25 shadow-lg group">
                  <img
                    src={data.customBanner.laptopImage}
                    alt={data.customBanner.heading}
                    className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#08343D]/90 via-[#0E4E5B]/60 to-transparent flex items-center justify-center">
                    <span className="px-4 py-1.5 rounded-xl bg-amber-300/20 border border-amber-300/50 backdrop-blur-md text-amber-300 font-mono font-extrabold text-xl sm:text-2xl">
                      {data.customBanner.laptopCodeSymbol}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 text-center lg:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-extrabold tracking-wider uppercase text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BESPOKE DEVELOPMENT</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {data.customBanner.heading}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-teal-50/90 leading-relaxed">
                  {data.customBanner.description}
                </p>
              </div>

              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={() => router.push(data.customBanner.ctaPath)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] text-[#142930] font-extrabold text-xs sm:text-sm shadow-[0_8px_24px_rgba(251,191,36,0.35)] hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  <span>{data.customBanner.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
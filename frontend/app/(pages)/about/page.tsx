// frontend/app/(pages)/about/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  Code2,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface AboutMetricItem {
  value: string;
  label: string;
}

export interface AboutValueItem {
  icon: "code" | "rocket" | "shield" | "users";
  title: string;
  description: string;
}

export interface AboutPageData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  storyBadge: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  highlights: string[];
  metrics: AboutMetricItem[];
  valuesHeading: string;
  values: AboutValueItem[];
  ctaBanner: {
    heading: string;
    description: string;
    primaryLabel: string;
    primaryPath: string;
    secondaryLabel: string;
    secondaryPath: string;
  };
}

const DEFAULT_ABOUT_DATA: AboutPageData = {
  eyebrowLabel: "ABOUT OUR WEBSITE STUDIO",
  heading: "Making World-Class Web Design Accessible to Every Business",
  subheading:
    "We bridge the gap between expensive custom agencies and generic templates—giving founders ready-to-launch, 3D interactive websites with full code ownership.",
  storyBadge: "OUR MISSION",
  storyTitle: "Built by Full-Stack Engineers & Product Designers",
  storyParagraphs: [
    "Small businesses, boutiques, cafes, clinics, and educators often struggle between slow, overpriced agencies and rigid drag-and-drop builders that never look truly premium.",
    "At OUR WEBSITE, every template is engineered from the ground up with Next.js, Tailwind CSS, clean backend APIs, and built-in Admin Panels—so you can launch in 48 hours and scale effortlessly.",
  ],
  storyImage:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  highlights: [
    "100% Clean, Production-Tested Codebase",
    "Industry-Specific Booking, Store & LMS Flows",
    "Dedicated Launch & Customization Support",
  ],
  metrics: [
    { value: "150+", label: "Ready Website Designs" },
    { value: "7", label: "Business Categories" },
    { value: "500+", label: "Businesses Launched" },
    { value: "99%", label: "Google Speed Score" },
  ],
  valuesHeading: "Why Founders Trust Our Craft",
  values: [
    {
      icon: "code",
      title: "Zero Vendor Lock-In",
      description:
        "You own your source code, database, and domain 100%—no forced monthly subscriptions.",
    },
    {
      icon: "rocket",
      title: "48-Hour Launch Speed",
      description:
        "Pick a design today, share your brand details, and go live with payments in two days.",
    },
    {
      icon: "shield",
      title: "Enterprise Security & SEO",
      description:
        "Built with SSL-ready hosting, fast Core Web Vitals, and clean semantic SEO structure.",
    },
    {
      icon: "users",
      title: "Human Engineering Support",
      description:
        "Real developers assist you with domain setup, custom features, and scaling.",
    },
  ],
  ctaBanner: {
    heading: "Ready to Launch Your Business Online?",
    description:
      "Explore our trending ready-made websites or tell our team about your custom project idea.",
    primaryLabel: "Explore Websites",
    primaryPath: "/websites",
    secondaryLabel: "Contact Us",
    secondaryPath: "/contact",
  },
};

export default function AboutPage() {
  const router = useRouter();
  const [data, setData] = useState<AboutPageData>(DEFAULT_ABOUT_DATA);

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/about`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("About page API error:", err));
  }, []);

  const renderValueIcon = (icon: AboutValueItem["icon"]) => {
    const cls = "w-6 h-6 text-[#0D9488] group-hover:text-white transition-colors";
    if (icon === "code") return <Code2 className={cls} />;
    if (icon === "rocket") return <Rocket className={cls} />;
    if (icon === "shield") return <ShieldCheck className={cls} />;
    return <Users className={cls} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HEADER BANNER */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-teal-300/35 text-teal-200 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            {data.heading}
          </h1>

          <p className="text-teal-100/85 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10 space-y-16">
        {/* 4 METRICS BAR */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-teal-100 shadow-[0_14px_35px_rgba(15,41,42,0.08)] grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0D9488]">
                {metric.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* STORY SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-teal-200/70 shadow-[0_20px_50px_rgba(6,44,48,0.15)]">
              <img
                src={data.storyImage}
                alt={data.storyTitle}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="inline-block text-xs font-extrabold tracking-[0.2em] uppercase text-[#0D9488]">
              {data.storyBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F292A]">
              {data.storyTitle}
            </h2>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {data.storyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <ul className="pt-2 space-y-2.5">
              {data.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0F292A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 CORE VALUES GRID */}
        <div className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-center text-[#0F292A]">
            {data.valuesHeading}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.values.map((val) => (
              <div
                key={val.title}
                className="group rounded-2xl bg-white p-6 border border-teal-100 shadow-[0_10px_28px_rgba(15,41,42,0.06)] hover:border-teal-400 hover:-translate-y-1.5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-4 group-hover:bg-[#0D9488] group-hover:border-transparent transition-all">
                  {renderValueIcon(val.icon)}
                </div>
                <h3 className="text-base font-extrabold text-[#0F292A]">
                  {val.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {data.ctaBanner.heading}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/85 max-w-xl">
              {data.ctaBanner.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => router.push(data.ctaBanner.primaryPath)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-300 text-[#0F292A] font-extrabold text-xs sm:text-sm hover:brightness-105 transition-all"
            >
              <span>{data.ctaBanner.primaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => router.push(data.ctaBanner.secondaryPath)}
              className="px-6 py-3 rounded-full bg-white/10 border border-teal-300/35 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition-all"
            >
              {data.ctaBanner.secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface CategoryCardItem {
  categorySlug: string;
  title: string;
  subtitle: string;
  websiteCount: string;
  image: string;
}

export interface CategoriesSectionData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  viewAllLabel: string;
  viewAllPath: string;
  categories: CategoryCardItem[];
}

const DEFAULT_CATEGORIES_DATA: CategoriesSectionData = {
  eyebrowLabel: "INDUSTRY COLLECTIONS",
  heading: "Explore Websites by Business Category",
  subheading:
    "Pick your industry to discover 3D-engineered websites with built-in booking, store, or portfolio workflows.",
  viewAllLabel: "View All Categories",
  viewAllPath: "/categories",
  categories: [
    {
      categorySlug: "ecommerce-retail",
      title: "E-Commerce & Retail",
      subtitle: "Online stores, cart & secure checkout.",
      websiteCount: "28 Sites",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "fashion-lifestyle",
      title: "Fashion & Lifestyle",
      subtitle: "Boutiques, bridal labels & custom orders.",
      websiteCount: "34 Sites",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "dining-hospitality",
      title: "Dining & Hospitality",
      subtitle: "Cafés, restaurants & QR table menus.",
      websiteCount: "19 Sites",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "beauty-wellness",
      title: "Beauty & Wellness",
      subtitle: "Salons, spa & beauty bookings.",
      websiteCount: "22 Sites",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "healthcare-medical",
      title: "Healthcare & Medical",
      subtitle: "Clinics, doctor slots & patient portals.",
      websiteCount: "16 Sites",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "education-learning",
      title: "Education & Learning",
      subtitle: "Coaching, institutes, LMS & mock tests.",
      websiteCount: "21 Sites",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=85",
    },
    {
      categorySlug: "creative-portfolio",
      title: "Creative Portfolio",
      subtitle: "Studios, photographers & personal brands.",
      websiteCount: "18 Sites",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=85",
    },
  ],
};

export default function CategoriesSection() {
  const router = useRouter();
  const [data, setData] = useState<CategoriesSectionData>(
    DEFAULT_CATEGORIES_DATA
  );

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/categories`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Categories section API error:", err));
  }, []);

  const renderTwoToneHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#162C33]">{headingText}</span>;
    }
    const splitPoint = Math.ceil(words.length * 0.55);
    const firstPart = words.slice(0, splitPoint).join(" ");
    const secondPart = words.slice(splitPoint).join(" ");

    return (
      <>
        <span className="block text-[#162C33]">{firstPart}</span>
        <span className="block text-[#136D7E]">{secondPart}</span>
      </>
    );
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-12 lg:py-14 px-3.5 sm:px-6 lg:px-8 bg-white text-[#162C33]">
      {/* RIGHT-EDGE S-CURVE & BOTTOM-RIGHT TEAL ACCENT */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 500 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-[190px] sm:w-[320px] lg:w-[440px] h-[260px] sm:h-[360px] lg:h-[430px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="topRightAquaWave"
              x1="120"
              y1="20"
              x2="490"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#CBE5EC" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#8CC1CE" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#4A90A1" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M340 0 C180 75, 110 190, 215 295 C295 375, 415 395, 500 410 L500 0 Z"
            fill="url(#topRightAquaWave)"
          />
        </svg>

        <svg
          viewBox="0 0 520 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 right-0 w-[220px] sm:w-[380px] lg:w-[500px] h-[110px] sm:h-[170px] lg:h-[210px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="bottomRightTealCorner"
              x1="140"
              y1="220"
              x2="510"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6BAAB9" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#2A7A8C" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#145B6B" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M40 260 C175 235, 315 165, 410 75 C450 38, 485 15, 520 0 L520 260 Z"
            fill="url(#bottomRightTealCorner)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-3.5 sm:gap-5 mb-6 sm:mb-8">
          <div className="space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#136D7E]" />
              <span>{data.eyebrowLabel}</span>
            </div>

            <h2 className="text-[24px] sm:text-3xl lg:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {renderTwoToneHeading(data.heading)}
            </h2>

            <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed pt-0.5">
              {data.subheading}
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(data.viewAllPath)}
            className="btn-ocean-luxury group self-start lg:self-end inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] shrink-0"
          >
            <span>{data.viewAllLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>

        {/* 4 + 3 ASYMMETRICAL DESKTOP GRID & 2-COLUMN MOBILE GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-4">
          {data.categories.map((cat, idx) => {
            const desktopSpanClass =
              idx < 4 ? "lg:col-span-3" : "lg:col-span-4";
            const isLastOddMobile =
              data.categories.length % 2 !== 0 &&
              idx === data.categories.length - 1;

            return (
              <ScrollReveal
                key={cat.categorySlug}
                delayMs={idx * 65}
                className={`${desktopSpanClass} ${
                  isLastOddMobile ? "col-span-2 sm:col-span-1" : "col-span-1"
                }`}
              >
                <div
                  onClick={() =>
                    router.push(
                      `/categories/detail?category=${cat.categorySlug}`
                    )
                  }
                  className="luxury-card group h-full cursor-pointer rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 p-2 sm:p-2.5 shadow-[0_6px_20px_rgba(15,61,70,0.05)] flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`relative rounded-xl overflow-hidden bg-[#EAF4F7] ${
                        isLastOddMobile
                          ? "h-28 sm:h-28 lg:h-[116px]"
                          : "h-20 sm:h-28 lg:h-[116px]"
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#136D7E] text-white font-bold text-[8.5px] sm:text-[10px] shadow-xs group-hover:scale-105 transition-transform">
                        <Layers className="w-2.5 h-2.5 text-teal-100" />
                        <span>{cat.websiteCount}</span>
                      </span>
                    </div>

                    <div className="px-1 pt-2.5 pb-1.5">
                      <h3 className="text-[12.5px] sm:text-[14.5px] font-extrabold text-[#162C33] group-hover:text-[#136D7E] transition-colors leading-snug line-clamp-1">
                        {cat.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 leading-snug mt-1 line-clamp-2">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="px-1 pt-1.5 pb-0.5 flex items-center justify-between gap-1 text-[#136D7E] group-hover:text-[#0D5260]">
                    <span className="text-[10.5px] sm:text-[11.5px] font-bold truncate">
                      <span className="sm:hidden">Browse Designs</span>
                      <span className="hidden sm:inline">Browse 3D Designs</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4">
          <span className="w-4 h-1.5 rounded-full bg-[#136D7E]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
      </div>
    </section>
  );
}
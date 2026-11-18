"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Check,
  Star,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface FeaturedWebsiteItem {
  websiteSlug: string;
  title: string;
  category: string;
  categorySlug: string;
  priceLabel: string;
  startingPrice: string;
  badgeText: string;
  techStackTag: string;
  image: string;
}

export interface FeaturedWebsitesData {
  eyebrowLabel: string;
  heading: string;
  subheading?: string;
  viewAllLabel: string;
  viewAllPath: string;
  websites: FeaturedWebsiteItem[];
}

const DEFAULT_FEATURED_DATA: FeaturedWebsitesData = {
  eyebrowLabel: "CURATED TEMPLATES",
  heading: "Explore Our Trending Website Designs",
  subheading:
    "Professional, modern and ready-to-use website templates for your business.",
  viewAllLabel: "View All Templates",
  viewAllPath: "/websites",
  websites: [
    {
      websiteSlug: "zarii-boutique",
      title: "Zarii Boutique",
      category: "Fashion & Lifestyle",
      categorySlug: "fashion-lifestyle",
      priceLabel: "Starting at",
      startingPrice: "₹9,999",
      badgeText: "BESTSELLER",
      techStackTag: "Next.js + Store",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "the-purple-cafe",
      title: "The Purple Café",
      category: "Dining & Hospitality",
      categorySlug: "dining-hospitality",
      priceLabel: "Starting at",
      startingPrice: "₹12,999",
      badgeText: "LIVE DEMO",
      techStackTag: "QR Menu + Booking",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "healthcare-plus",
      title: "HealthCare Plus",
      category: "Healthcare & Medical",
      categorySlug: "healthcare-medical",
      priceLabel: "Starting at",
      startingPrice: "₹11,999",
      badgeText: "VERIFIED",
      techStackTag: "Doctor Slot CRM",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "learnsphere",
      title: "LearnSphere",
      category: "Education & Learning",
      categorySlug: "education-learning",
      priceLabel: "Starting at",
      startingPrice: "₹14,999",
      badgeText: "TOP RATED",
      techStackTag: "LMS + Live Batch",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "aura-bridal-studio",
      title: "Aura Bridal Studio",
      category: "Beauty & Wellness",
      categorySlug: "beauty-wellness",
      priceLabel: "Starting at",
      startingPrice: "₹8,999",
      badgeText: "LIVE DEMO",
      techStackTag: "Artist Booking",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "urbankart-pro",
      title: "UrbanKart Pro",
      category: "E-Commerce & Retail",
      categorySlug: "ecommerce-retail",
      priceLabel: "Starting at",
      startingPrice: "₹13,499",
      badgeText: "NEW",
      techStackTag: "Multi-Vendor Shop",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85",
    },
  ],
};

export default function FeaturedWebsites() {
  const router = useRouter();
  const [data, setData] = useState<FeaturedWebsitesData>(DEFAULT_FEATURED_DATA);
  const [startIndex, setStartIndex] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/featured-websites`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("FeaturedWebsites API error:", err));
  }, []);

  const visibleCount = 4;
  const totalItems = data.websites.length;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const visibleWebsites = Array.from({
    length: Math.min(visibleCount, totalItems),
  }).map((_, offset) => data.websites[(startIndex + offset) % totalItems]);

  const renderTwoToneHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#162C33]">{headingText}</span>;
    }
    const splitPoint = Math.min(2, Math.floor(words.length / 2));
    const firstPart = words.slice(0, splitPoint).join(" ");
    const secondPart = words.slice(splitPoint).join(" ");

    return (
      <>
        <span className="text-[#162C33]">{firstPart} </span>
        <span className="text-[#136D7E]">{secondPart}</span>
      </>
    );
  };

  const renderBadgeIcon = (badge: string) => {
    const upper = badge.toUpperCase();
    if (upper.includes("VERIFIED"))
      return <Check className="w-2.5 h-2.5 stroke-[3]" />;
    if (upper.includes("TOP") || upper.includes("RATED"))
      return <Star className="w-2.5 h-2.5 fill-white" />;
    return null;
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / 2));
  const activeDot = startIndex % totalPages;

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14 px-3.5 sm:px-6 lg:px-8 bg-white text-[#162C33]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* RIGHT-EDGE & BOTTOM-RIGHT OCEAN-TEAL STUDIO WAVES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          viewBox="0 0 500 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0 w-[180px] sm:w-[320px] lg:w-[440px] h-[250px] sm:h-[360px] lg:h-[430px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="featTopWave"
              x1="120"
              y1="20"
              x2="490"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#CBE5EC" stopOpacity="0.52" />
              <stop offset="55%" stopColor="#8CC1CE" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#4A90A1" stopOpacity="0.48" />
            </linearGradient>
          </defs>
          <path
            d="M340 0 C180 75, 110 190, 215 295 C295 375, 415 395, 500 410 L500 0 Z"
            fill="url(#featTopWave)"
          />
        </svg>

        <svg
          viewBox="0 0 520 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden sm:block absolute bottom-0 right-0 w-[360px] lg:w-[480px] h-[150px] lg:h-[195px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="featBottomWave"
              x1="140"
              y1="220"
              x2="510"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#6BAAB9" stopOpacity="0.42" />
              <stop offset="50%" stopColor="#2A7A8C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#145B6B" stopOpacity="0.94" />
            </linearGradient>
          </defs>
          <path
            d="M40 260 C175 235, 315 165, 410 75 C450 38, 485 15, 520 0 L520 260 Z"
            fill="url(#featBottomWave)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#136D7E]" />
              <span>{data.eyebrowLabel}</span>
            </div>

            <h2 className="text-[25px] sm:text-3xl lg:text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {renderTwoToneHeading(data.heading)}
            </h2>

            <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed">
              {data.subheading ||
                "Professional, modern and ready-to-use website templates for your business."}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Websites"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#162C33] flex items-center justify-center hover:border-[#136D7E] hover:bg-[#136D7E] hover:text-white active:scale-95 transition-all shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Websites"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#162C33] flex items-center justify-center hover:border-[#136D7E] hover:bg-[#136D7E] hover:text-white active:scale-95 transition-all shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => router.push(data.viewAllPath)}
              className="group ml-1.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-slate-200 text-[#162C33] font-bold text-xs sm:text-[13px] shadow-2xs hover:border-[#136D7E] hover:text-[#136D7E] hover:-translate-y-0.5 transition-all"
            >
              <span>{data.viewAllLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#136D7E] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* CARDS GRID: Mobile Horizontal Split Cards + Desktop 4-Column MacBook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {visibleWebsites.map((item, idx) => (
            <ScrollReveal
              key={`${item.websiteSlug}-${idx}`}
              delayMs={idx * 75}
              className={idx === 3 ? "hidden sm:block" : "block"}
            >
              <div
                onClick={() =>
                  router.push(`/websites/detail?website=${item.websiteSlug}`)
                }
                className="luxury-card group h-full cursor-pointer rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(15,61,70,0.06)] flex flex-row sm:flex-col justify-between gap-3 sm:gap-0"
              >
                {/* TOP / LEFT SECTION: DUAL PILLS + SLEEK MACBOOK PRO */}
                <div className="w-[54%] sm:w-full shrink-0 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#162C33] text-white font-bold text-[8px] sm:text-[9px] truncate">
                      {item.techStackTag}
                    </span>

                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#D96B78] text-white font-extrabold text-[8px] sm:text-[9px] tracking-wide shrink-0">
                      {renderBadgeIcon(item.badgeText)}
                      <span>{item.badgeText}</span>
                    </span>
                  </div>

                  {/* Soft Studio Stage + Realistic MacBook Pro Mockup */}
                  <div className="relative rounded-xl bg-gradient-to-b from-[#F4FAFC] to-[#E8F2F6] pt-2.5 pb-2 px-2 sm:pt-3.5 sm:pb-2.5 sm:px-3 overflow-hidden">
                    <div className="relative mx-auto w-full transform group-hover:scale-[1.03] group-hover:-translate-y-0.5 transition-all duration-500">
                      <div className="rounded-t-[8px] sm:rounded-t-[10px] bg-[#141C20] p-[3px] sm:p-[4px] pb-[4px] sm:pb-[5px] shadow-md">
                        <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 sm:py-1 rounded-t-[5px] sm:rounded-t-[6px]">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-400" />
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400" />
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400" />
                        </div>

                        {/* Screen Viewport with Live Webpage Auto-Scroll on Hover */}
                        <div className="relative h-[74px] sm:h-[118px] overflow-hidden rounded-b-[4px] sm:rounded-b-[5px] bg-[#162C33]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-[145%] object-cover object-top laptop-scroll-preview"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B33]/90 via-[#0D2B33]/20 to-transparent" />

                          <div className="absolute bottom-1.5 left-2 right-2 flex items-end justify-between gap-1">
                            <div className="min-w-0">
                              <p className="text-[8px] sm:text-[10px] font-extrabold text-white leading-tight truncate">
                                {item.title}
                              </p>
                              <p className="text-[6.5px] sm:text-[8px] text-teal-100/90 truncate">
                                {item.category}
                              </p>
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#136D7E] text-white font-bold text-[7.5px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <Eye className="w-2 h-2" /> Live
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative mx-auto w-[108%] -left-[4%] h-[5px] sm:h-[7px] rounded-b-lg bg-gradient-to-r from-[#BDC9D0] via-[#F4F8FA] to-[#BDC9D0] shadow-sm flex items-center justify-center">
                        <div className="w-7 sm:w-10 h-[2px] rounded-full bg-[#9AA7B0]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM / RIGHT SECTION */}
                <div className="flex-1 sm:pt-3.5 px-0.5 flex flex-col justify-between">
                  <div className="min-w-0">
                    <h3 className="text-[14px] sm:text-[15.5px] font-extrabold text-[#162C33] truncate group-hover:text-[#136D7E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5">
                      {item.category}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 mt-1 border-t border-slate-100/90 flex items-end justify-between gap-2">
                    <div>
                      <span className="block text-[9.5px] sm:text-[10px] font-medium text-slate-400 leading-none">
                        {item.priceLabel}
                      </span>
                      <span className="block text-[14px] sm:text-[15.5px] font-extrabold text-[#136D7E] mt-1 leading-none">
                        {item.startingPrice}
                      </span>
                    </div>

                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF4F7] text-[#136D7E] flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CAROUSEL PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-7">
          {Array.from({ length: totalPages }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setStartIndex((dotIdx * 2) % totalItems)}
              aria-label={`Slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === dotIdx
                  ? "w-5 bg-[#136D7E]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* MOBILE FULL-WIDTH OCEAN-TEAL CTA BUTTON */}
        <div className="sm:hidden mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => router.push(data.viewAllPath)}
            className="btn-ocean-luxury inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs"
          >
            <span>{data.viewAllLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
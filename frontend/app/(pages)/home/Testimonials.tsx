"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  Quote,
  ArrowUpRight,
  ArrowRight,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export interface TestimonialItem {
  clientName: string;
  businessRole: string;
  websiteTitle: string;
  websiteSlug: string;
  avatar: string;
  rating: number;
  quote: string;
  resultMetric: string;
}

export interface TestimonialsSectionData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  reviews: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS_DATA: TestimonialsSectionData = {
  eyebrowLabel: "CLIENT SUCCESS STORIES",
  heading: "Trusted by 500+ Growing Businesses",
  subheading:
    "See how founders, boutique owners, cafes, and clinics launched online in days with OUR WEBSITE.",
  reviews: [
    {
      clientName: "Ayesha Siddiqui",
      businessRole: "Founder, Zarii Boutique",
      websiteTitle: "Zarii Boutique Store",
      websiteSlug: "zarii-boutique",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85",
      rating: 5,
      quote:
        "Our ethnic wear collection looks like a luxury designer label now. Customers love the custom stitching form and WhatsApp checkout—orders doubled in the first month!",
      resultMetric: "+185% Online Orders",
    },
    {
      clientName: "Rohan Malhotra",
      businessRole: "Owner, The Purple Café",
      websiteTitle: "The Purple Café",
      websiteSlug: "the-purple-cafe",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85",
      rating: 5,
      quote:
        "We went live in just 48 hours. The QR table ordering and weekend table reservation system saved us huge third-party commission fees.",
      resultMetric: "48-Hour Live Launch",
    },
    {
      clientName: "Dr. Meera Nair",
      businessRole: "Director, HealthCare Plus",
      websiteTitle: "HealthCare Plus",
      websiteSlug: "healthcare-plus",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=85",
      rating: 5,
      quote:
        "Patients easily book doctor slots from their phones and get instant reminders. The receptionist admin dashboard is clean, fast, and super easy to use.",
      resultMetric: "3x Daily Bookings",
    },
    {
      clientName: "Vikramaditya Roy",
      businessRole: "Co-Founder, LearnSphere",
      websiteTitle: "LearnSphere LMS",
      websiteSlug: "learnsphere",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85",
      rating: 5,
      quote:
        "Managing student batches, mock tests, and fee payments used to take three separate tools. LearnSphere combined everything into one lightning-fast portal.",
      resultMetric: "400+ Active Students",
    },
  ],
};

export default function Testimonials() {
  const router = useRouter();
  const [data, setData] = useState<TestimonialsSectionData>(
    DEFAULT_TESTIMONIALS_DATA
  );

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/testimonials`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Testimonials API error:", err));
  }, []);

  // Highlights "500+" (or numeric metric) in Ocean Teal to match image_fcffba.jpg
  const renderTwoToneSerifHeading = (headingText: string) => {
    const match = headingText.match(/^(.*?)(\d+\+?)(.*)$/);
    if (match) {
      return (
        <>
          <span className="text-[#162C33]">{match[1]}</span>
          <span className="text-[#136D7E]">{match[2]}</span>
          <span className="text-[#162C33]">{match[3]}</span>
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
      {/* TOP FLOWING AQUA RIBBONS & BOTTOM OCEAN-TEAL WAVE (Exact Match to image_fcffba.jpg) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left & Right Soft Aqua Ribbons */}
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 top-0 w-full h-[95px] sm:h-[145px] lg:h-[175px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="testiLeftRibbon"
              x1="0"
              y1="25"
              x2="460"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#66C7BE" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#9CE2DC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E4F7F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="testiRightRibbon"
              x1="960"
              y1="130"
              x2="1440"
              y2="15"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E4F7F6" stopOpacity="0" />
              <stop offset="45%" stopColor="#8AD8D1" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#46B3AA" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          <path
            d="M0 28 C115 10, 225 65, 350 105 C420 128, 480 130, 525 124 C445 148, 355 145, 255 110 C150 72, 65 58, 0 80 Z"
            fill="url(#testiLeftRibbon)"
          />
          <path
            d="M1440 12 C1320 16, 1210 70, 1080 110 C1000 134, 935 136, 880 128 C965 152, 1065 148, 1170 112 C1280 72, 1365 55, 1440 76 Z"
            fill="url(#testiRightRibbon)"
          />
        </svg>

        {/* Bottom Sweeping Aqua & Deep Ocean-Teal Wave */}
        <svg
          viewBox="0 0 1440 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 bottom-0 w-full h-[80px] sm:h-[125px] lg:h-[155px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="testiBottomSoft"
              x1="0"
              y1="105"
              x2="1440"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D5ECF1" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#94C8D4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3B8798" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient
              id="testiBottomDeep"
              x1="780"
              y1="175"
              x2="1440"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#4893A4" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#1D6B7C" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#115463" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M0 140 C260 85, 490 90, 770 126 C1040 162, 1255 108, 1440 30 L1440 185 L0 185 Z"
            fill="url(#testiBottomSoft)"
          />
          <path
            d="M740 185 C960 170, 1215 118, 1440 42 L1440 185 Z"
            fill="url(#testiBottomDeep)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* CENTERED EDITORIAL HEADER */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-7 sm:mb-10 space-y-2">
          <div className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="font-serif text-[25px] sm:text-3xl lg:text-[36px] font-bold leading-[1.15] tracking-[-0.01em]">
            {renderTwoToneSerifHeading(data.heading)}
          </h2>

          <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-xl mx-auto">
            {data.subheading}
          </p>
        </ScrollReveal>

        {/* 4 STUDIO TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {data.reviews.map((review, idx) => (
            <ScrollReveal
              key={review.clientName}
              delayMs={idx * 75}
              className="flex"
            >
              <div
                onClick={() =>
                  router.push(
                    `/websites/detail?website=${review.websiteSlug}`
                  )
                }
                className="luxury-card group cursor-pointer w-full rounded-[22px] bg-white/95 backdrop-blur-xs p-4 sm:p-5 border border-slate-200/85 shadow-[0_8px_24px_rgba(15,61,70,0.05)] flex flex-col justify-between"
              >
                {/* TOP: STARS + RESULT METRIC PILL + QUOTE */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5F4F6] text-[#136D7E] font-extrabold text-[9.5px] sm:text-[10px] tracking-tight shrink-0">
                      {review.resultMetric}
                    </span>
                  </div>

                  {/* Subtle Double Quote Mark (Hidden on tiny mobile for compact rhythm, visible on desktop like image_fcffba.jpg) */}
                  <Quote className="hidden sm:block w-5 h-5 text-[#136D7E]/30 mb-2 rotate-180" />

                  <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* BOTTOM: CLIENT AVATAR + VERIFIED BADGE + SITE LINK */}
                <div className="mt-4 sm:mt-5 pt-3.5 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={review.avatar}
                        alt={review.clientName}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#CBE5EC] group-hover:border-[#136D7E] transition-colors shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h3 className="text-[12.5px] sm:text-[13px] font-extrabold text-[#162C33] truncate">
                            {review.clientName}
                          </h3>
                          <BadgeCheck className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />
                        </div>
                        <p className="text-[10.5px] sm:text-[11px] text-slate-500 truncate">
                          {review.businessRole}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Circular Soft-Teal Right Arrow (Exact Match to Phone Screen in image_fcffba.jpg) */}
                    <span className="lg:hidden w-7 h-7 rounded-full bg-[#EAF4F7] text-[#136D7E] flex items-center justify-center shrink-0 group-hover:bg-[#136D7E] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Desktop Full-Width Site Link Pill (Exact Match to Laptop Screen in image_fcffba.jpg) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/websites/detail?website=${review.websiteSlug}`
                      );
                    }}
                    className="hidden lg:flex w-full items-center justify-between px-3.5 py-2 rounded-xl bg-[#F3F9FB] hover:bg-[#136D7E] text-[#162C33] hover:text-white text-[11px] font-bold transition-colors duration-300"
                  >
                    <span className="truncate">Site: {review.websiteTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
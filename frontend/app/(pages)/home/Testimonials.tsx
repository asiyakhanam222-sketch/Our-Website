"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Star,
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  metricBadge: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarUrl: string;
  siteLabel: string;
  websiteSlug: string;
  cardGradient?: string;
  borderTint?: string;
  pillBg?: string;
  pillText?: string;
  accentColor?: string;
  glowColor?: string;
}

export interface TestimonialsSectionData {
  eyebrowLabel: string;
  headingPrefix: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  items: TestimonialItem[];
}

const COMPACT_PASTEL_THEMES = [
  {
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #FFF6F2 55%, #FBECE6 100%)",
    borderTint: "#F2D7CE",
    pillBg: "#FFF0EB",
    pillText: "#9E4732",
    accentColor: "#C05A40",
    glowColor: "rgba(244, 180, 162, 0.35)",
  },
  {
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #F7F4FF 55%, #EEE8FC 100%)",
    borderTint: "#E0D6F8",
    pillBg: "#F1ECFD",
    pillText: "#5B3B9E",
    accentColor: "#6E49B8",
    glowColor: "rgba(196, 176, 248, 0.35)",
  },
  {
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #F2FBF8 55%, #E3F5EF 100%)",
    borderTint: "#C8EBE1",
    pillBg: "#E6F7F2",
    pillText: "#136B5E",
    accentColor: "#178272",
    glowColor: "rgba(153, 226, 208, 0.35)",
  },
  {
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #F3F8FF 55%, #E5EFFD 100%)",
    borderTint: "#CFE0FA",
    pillBg: "#E9F1FE",
    pillText: "#235396",
    accentColor: "#2C66B8",
    glowColor: "rgba(173, 204, 250, 0.35)",
  },
];

const DEFAULT_TESTIMONIALS_DATA: TestimonialsSectionData = {
  eyebrowLabel: "CLIENT LOVE • 4.98★ RATED",
  headingPrefix: "Trusted by",
  headingHighlight: "500+ Growing",
  headingItalic: "Businesses",
  subheading:
    "Real founders sharing how they launched high-converting websites in 48 hours.",
  items: [
    {
      id: "zarii",
      metricBadge: "+185% Orders",
      quote:
        "Our ethnic wear store looks like a luxury designer label now. Custom stitching form and WhatsApp checkout doubled our orders in month one!",
      authorName: "Ayesha Siddiqui",
      authorRole: "Founder, Zarii Boutique",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      siteLabel: "Zarii Boutique",
      websiteSlug: "zarii-boutique",
      ...COMPACT_PASTEL_THEMES[0],
    },
    {
      id: "cafe",
      metricBadge: "48-Hr Launch",
      quote:
        "Went live in 48 hours. The QR table ordering and weekend table booking system saved us huge third-party commission fees.",
      authorName: "Rohan Malhotra",
      authorRole: "Owner, The Purple Café",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      siteLabel: "The Purple Café",
      websiteSlug: "the-purple-cafe",
      ...COMPACT_PASTEL_THEMES[1],
    },
    {
      id: "healthcare",
      metricBadge: "3x Bookings",
      quote:
        "Patients book doctor slots right from their phones with instant reminders. The receptionist dashboard is clean and super fast.",
      authorName: "Dr. Meera Nair",
      authorRole: "Director, HealthCare Plus",
      avatarUrl:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80",
      siteLabel: "HealthCare Plus",
      websiteSlug: "healthcare-plus",
      ...COMPACT_PASTEL_THEMES[2],
    },
    {
      id: "learnsphere",
      metricBadge: "400+ Students",
      quote:
        "Student batches, mock tests, and fee payments used to take three tools. LearnSphere combined everything into one fast portal.",
      authorName: "Vikramaditya Roy",
      authorRole: "Co-Founder, LearnSphere",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      siteLabel: "LearnSphere",
      websiteSlug: "learnsphere",
      ...COMPACT_PASTEL_THEMES[3],
    },
  ],
};

export default function Testimonials() {
  const router = useRouter();
  const [data, setData] = useState<TestimonialsSectionData>(
    DEFAULT_TESTIMONIALS_DATA
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 120,
    y: 80,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Backend API Fetch with Safe Pastel Theme Merging
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/testimonials`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.items)) {
          const merged = fetched.items.map(
            (item: TestimonialItem, idx: number) => ({
              ...COMPACT_PASTEL_THEMES[idx % COMPACT_PASTEL_THEMES.length],
              ...item,
            })
          );
          setData({ ...DEFAULT_TESTIMONIALS_DATA, ...fetched, items: merged });
        }
      })
      .catch((err) => console.error("Testimonials API error:", err));
  }, []);

  // Safe GSAP Entrance + Subtle Floating Breath
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const runEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.fromTo(
        ".compact-2026-card",
        { y: 16, opacity: 0.96, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
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

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredIdx(idx);
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="compact-testimonials-2026 relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF8F6] via-[#F6FAFB] to-[#FFFFFF] text-[#11242B]"
    >
      {/* 2026 Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .compact-testimonials-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-editorial-2026 {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* Soft Pastel Studio Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-12 w-[380px] h-[380px] rounded-full bg-[#F9D8CE]/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 right-12 w-[380px] h-[380px] rounded-full bg-[#D8CCF8]/30 blur-[120px]" />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* COMPACT CENTERED HEADER */}
        <div className="max-w-xl mx-auto text-center space-y-2.5 mb-8 sm:mb-11">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-[#E6E0DA] text-[#136D7E] text-[10px] font-extrabold tracking-[0.2em] uppercase shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h2 className="text-[26px] sm:text-4xl lg:text-[42px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#11242B]">
            {data.headingPrefix}{" "}
            <span className="bg-gradient-to-r from-[#136D7E] via-[#1D8A9E] to-[#6E56CF] bg-clip-text text-transparent">
              {data.headingHighlight}
            </span>{" "}
            <span className="font-editorial-2026 italic font-normal text-[32px] sm:text-[44px] lg:text-[50px] text-[#136D7E] tracking-normal">
              {data.headingItalic}
            </span>
          </h2>

          <p className="text-xs sm:text-[14px] text-slate-500 leading-relaxed">
            {data.subheading}
          </p>
        </div>

        {/* ===================================================================
            COMPACT 2026 MICRO-GLASS CARDS GRID
            Mobile: 1 Col | Tablet: 2 Cols | Desktop: 4 Sleek Compact Cards
           =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {data.items.map((item, idx) => {
            const theme =
              COMPACT_PASTEL_THEMES[idx % COMPACT_PASTEL_THEMES.length];
            const isHovered = hoveredIdx === idx;

            return (
              <article
                key={item.id}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundImage: item.cardGradient || theme.cardGradient,
                  borderColor: item.borderTint || theme.borderTint,
                }}
                className="compact-2026-card group relative rounded-[22px] border ring-1 ring-inset ring-white/85 p-4 shadow-[0_8px_24px_rgba(17,36,43,0.04)] hover:shadow-[0_18px_40px_rgba(17,36,43,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-3.5 overflow-hidden"
              >
                {/* Interactive Cursor Pastel Spotlight */}
                <div
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(190px circle at ${cursorPos.x}px ${cursorPos.y}px, ${
                      item.glowColor || theme.glowColor
                    }, transparent 75%)`,
                  }}
                  className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                />

                {/* Diagonal Glass Light Sheen on Hover */}
                <div className="pointer-events-none absolute inset-y-0 -left-full w-1/2 z-10 bg-gradient-to-r from-transparent via-white/75 to-transparent skew-x-[-20deg] group-hover:left-[165%] transition-all duration-900 ease-out" />

                {/* TOP ROW: COMPACT FOUNDER HEADER + 5.0 RATING PILL */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      style={{
                        borderColor: item.accentColor || theme.accentColor,
                      }}
                      className="w-9 h-9 rounded-full p-[1.5px] border bg-white shrink-0 shadow-2xs"
                    >
                      <img
                        src={item.avatarUrl}
                        alt={item.authorName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-[12.5px] font-extrabold text-[#11242B] truncate leading-tight">
                          {item.authorName}
                        </h3>
                        <BadgeCheck
                          style={{
                            color: item.accentColor || theme.accentColor,
                          }}
                          className="w-3.5 h-3.5 shrink-0"
                        />
                      </div>
                      <p className="text-[10.5px] font-medium text-slate-500 truncate mt-0.5">
                        {item.authorRole}
                      </p>
                    </div>
                  </div>

                  {/* Compact 5.0 Star Pill */}
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white/90 border border-white text-[10px] font-extrabold text-[#11242B] shrink-0 shadow-2xs">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                  </span>
                </div>

                {/* MIDDLE: CRISP COMPACT QUOTE */}
                <p className="relative z-10 text-[12.5px] sm:text-[13px] font-medium text-[#1D353D] leading-[1.55] line-clamp-4">
                  “{item.quote}”
                </p>

                {/* BOTTOM ROW: SINGLE-LINE METRIC BADGE + LIVE SITE ACTION PILL */}
                <div className="relative z-10 pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-2">
                  <span
                    style={{
                      backgroundColor: item.pillBg || theme.pillBg,
                      color: item.pillText || theme.pillText,
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight border border-white/80 shrink-0"
                  >
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>{item.metricBadge}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        `/websites/detail?website=${item.websiteSlug}`
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 group-hover:bg-[#11242B] text-[#11242B] group-hover:text-white border border-white group-hover:border-[#11242B] text-[10.5px] font-bold transition-all duration-300 truncate shadow-2xs"
                  >
                    <span className="truncate">{item.siteLabel}</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
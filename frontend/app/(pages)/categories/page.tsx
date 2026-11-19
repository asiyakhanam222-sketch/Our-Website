"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowUpRight,
  Search,
  Sparkles,
  Layers,
  X,
  Tag,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface CategoryDirectoryItem {
  categorySlug: string;
  title: string;
  tagline: string;
  websiteCountText: string;
  startingPrice: string;
  image: string;
  group?: "commerce" | "services" | "creative";
}

export interface CategoriesDirectoryData {
  eyebrowLabel: string;
  headingLine1: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  searchPlaceholder: string;
  categories: CategoryDirectoryItem[];
  customBanner: {
    heading: string;
    highlight: string;
    description: string;
    ctaLabel: string;
    ctaPath: string;
  };
}

const DEFAULT_CATEGORIES_DIRECTORY: CategoriesDirectoryData = {
  eyebrowLabel: "CURATED INDUSTRY SHOWCASE • 2026",
  headingLine1: "Architect Your",
  headingHighlight: "Digital",
  headingItalic: "Storefront",
  subheading:
    "Explore bespoke, ready-to-launch websites tailored to your industry’s exact customer journey—live in 48 hours.",
  searchPlaceholder: "Search niche (Fashion, Cafe, Clinic, Coaching)...",
  categories: [
    {
      categorySlug: "ecommerce-retail",
      title: "E-Commerce & Retail",
      tagline:
        "Multi-product stores with smart cart, coupons & Razorpay checkout.",
      websiteCountText: "28 Sites",
      startingPrice: "₹9,999",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=850&q=85",
      group: "commerce",
    },
    {
      categorySlug: "fashion-lifestyle",
      title: "Fashion & Lifestyle",
      tagline:
        "Couture lookbooks, custom stitching forms & WhatsApp ordering.",
      websiteCountText: "34 Sites",
      startingPrice: "₹8,999",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=850&q=85",
      group: "commerce",
    },
    {
      categorySlug: "dining-hospitality",
      title: "Dining & Hospitality",
      tagline:
        "QR code table ordering, menu showcase & instant table reservations.",
      websiteCountText: "19 Sites",
      startingPrice: "₹10,499",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=850&q=85",
      group: "commerce",
    },
    {
      categorySlug: "beauty-wellness",
      title: "Beauty & Wellness",
      tagline:
        "Bridal artist portfolios, salon packages & appointment slot booking.",
      websiteCountText: "22 Sites",
      startingPrice: "₹7,999",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=850&q=85",
      group: "services",
    },
    {
      categorySlug: "healthcare-medical",
      title: "Healthcare & Medical",
      tagline:
        "Doctor appointment scheduling, patient portal & automated alerts.",
      websiteCountText: "16 Sites",
      startingPrice: "₹11,999",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=850&q=85",
      group: "services",
    },
    {
      categorySlug: "education-learning",
      title: "Education & Learning",
      tagline:
        "Coaching batch enrollment, video LMS & online mock test portals.",
      websiteCountText: "21 Sites",
      startingPrice: "₹12,999",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=850&q=85",
      group: "creative",
    },
    {
      categorySlug: "creative-portfolio",
      title: "Creative & Portfolio",
      tagline:
        "3D visual galleries & case-study showcases for studios & creators.",
      websiteCountText: "18 Sites",
      startingPrice: "₹6,999",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=850&q=85",
      group: "creative",
    },
    {
      categorySlug: "real-estate-property",
      title: "Real Estate & Interiors",
      tagline:
        "360° property tours, floor-plan galleries & instant site-visit booking.",
      websiteCountText: "15 Sites",
      startingPrice: "₹11,499",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=850&q=85",
      group: "services",
    },
  ],
  customBanner: {
    heading: "Don’t See Your",
    highlight: "Industry Listed?",
    description:
      "We architect custom websites for Travel, Logistics, SaaS & NGOs with full admin panels.",
    ctaLabel: "Discuss Custom Build",
    ctaPath: "/contact",
  },
};

const FILTER_TABS = [
  { id: "all", label: "All Niches" },
  { id: "commerce", label: "Retail & Dining" },
  { id: "services", label: "Clinics & Wellness" },
  { id: "creative", label: "Education & Studio" },
] as const;

const CARD_GLASS_SURFACES = [
  "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(235,247,250,0.85) 100%)",
  "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(251,246,236,0.85) 100%)",
  "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(236,249,246,0.85) 100%)",
  "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(244,242,251,0.85) 100%)",
];

export default function CategoriesPage() {
  const router = useRouter();
  const [data, setData] = useState<CategoriesDirectoryData>(
    DEFAULT_CATEGORIES_DIRECTORY
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [fanIndex, setFanIndex] = useState<number>(0);
  const [isFanPaused, setIsFanPaused] = useState<boolean>(false);
  const [heroSpot, setHeroSpot] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({
    x: 420,
    y: 180,
    active: false,
  });
  const [spotPos, setSpotPos] = useState<{ x: number; y: number }>({
    x: 120,
    y: 100,
  });

  const pageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Backend API Fetch
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/categories`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.categories)) {
          setData({ ...DEFAULT_CATEGORIES_DIRECTORY, ...fetched });
        }
      })
      .catch((err) => console.error("Categories page API error:", err));
  }, []);

  // Smooth Auto-Advance for the 3D Fanned Glass Lookbook in Hero
  useEffect(() => {
    if (isFanPaused || data.categories.length <= 1) return;
    const timer = setInterval(() => {
      setFanIndex((prev) => (prev + 1) % data.categories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isFanPaused, data.categories.length]);

  // 2026 Editorial Hero Entrance & Ambient Glow Animations
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-hero-reveal",
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

      gsap.to(".cat-aura-emerald", {
        x: 35,
        y: -25,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".cat-aura-champagne", {
        x: -35,
        y: 25,
        scale: 1.18,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".cat-fan-sheen",
        { xPercent: -160 },
        {
          xPercent: 340,
          duration: 2.3,
          repeat: -1,
          repeatDelay: 3.5,
          ease: "power2.inOut",
        }
      );
    }, pageEl);

    return () => ctx.revert();
  }, []);

  // Re-Stagger Bottom Cards on Filter/Search
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".compact-glass-card",
        { y: 16, opacity: 0.88, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );
    }, pageEl);

    return () => ctx.revert();
  }, [activeTab, searchQuery]);

  // Hover Zoom-In / Zoom-Out Pulse on 4-Column Cards
  const handleCardMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const cardEl = cardRefs.current[idx];
    const imgEl = imgRefs.current[idx];

    if (cardEl) {
      gsap.killTweensOf(cardEl);
      gsap
        .timeline()
        .to(cardEl, {
          scale: 1.028,
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(cardEl, {
          scale: 1.012,
          y: -3,
          duration: 0.38,
          ease: "sine.inOut",
        });
    }

    if (imgEl) {
      gsap.killTweensOf(imgEl);
      gsap
        .timeline()
        .to(imgEl, {
          scale: 1.12,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(imgEl, {
          scale: 1.06,
          duration: 0.5,
          ease: "sine.inOut",
        });
    }
  };

  const handleCardMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    const cardEl = cardRefs.current[idx];
    const imgEl = imgRefs.current[idx];

    if (cardEl) {
      gsap.killTweensOf(cardEl);
      gsap.to(cardEl, {
        scale: 1,
        y: 0,
        duration: 0.38,
        ease: "power3.out",
      });
    }

    if (imgEl) {
      gsap.killTweensOf(imgEl);
      gsap.to(imgEl, {
        scale: 1,
        duration: 0.42,
        ease: "power3.out",
      });
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotPos({
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

  const filteredCategories = data.categories.filter((cat, index) => {
    const inferredGroup =
      cat.group || (index < 3 ? "commerce" : index < 5 ? "services" : "creative");
    const matchesTab = activeTab === "all" || inferredGroup === activeTab;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesTab;
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.tagline.toLowerCase().includes(q)
    );
  });

  const totalCats = data.categories.length;
  const prevCat = data.categories[(fanIndex - 1 + totalCats) % totalCats];
  const centerCat = data.categories[fanIndex % totalCats];
  const nextCat = data.categories[(fanIndex + 1) % totalCats];

  return (
    <div
      ref={pageRef}
      className="categories-2026-studio min-h-screen flex flex-col text-[#0B252C] overflow-x-clip"
    >
      {/* 2026 2-Color Editorial Typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .categories-2026-studio {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-luxury-2color {
          font-family: 'Instrument Serif', Georgia, serif;
        }
        .studio-dot-grid {
          background-image: radial-gradient(rgba(255, 255, 255, 0.11) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* ===================================================================
          1. 2026 EDITORIAL GLASS LOOKBOOK HERO (High-Contrast Studio Canvas)
         =================================================================== */}
      <div
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroSpot((prev) => ({ ...prev, active: false }))}
        className="relative overflow-hidden bg-gradient-to-br from-[#061E23] via-[#0B3942] to-[#136D7E] text-white py-10 sm:py-14 px-4 sm:px-8 border-b border-white/15 shadow-[0_24px_60px_rgba(6,30,35,0.26)]"
      >
        {/* Architectural Micro-Dot Grid & Interactive Cursor Glow */}
        <div className="studio-dot-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          style={{
            opacity: heroSpot.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(243, 213, 155, 0.14), rgba(45, 212, 191, 0.08) 45%, transparent 72%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />

        {/* Volumetric Breathing Auras */}
        <div className="cat-aura-emerald pointer-events-none absolute -top-28 -left-20 w-[380px] h-[380px] rounded-full bg-[#2DD4BF]/18 blur-[120px]" />
        <div className="cat-aura-champagne pointer-events-none absolute -bottom-28 right-6 w-[400px] h-[400px] rounded-full bg-[#E6C78A]/22 blur-[120px]" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-8 items-center">
          {/* LEFT 6 COLS: 2-COLOR EDITORIAL HEADING + GLASS SEARCH & FILTER CHIPS */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left z-20">
            <div className="cat-hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-[#F3D59B] text-[10px] font-extrabold tracking-[0.22em] uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping" />
              <span>{data.eyebrowLabel}</span>
            </div>

            {/* 2-Color Luxury Typography (Crisp White/Aqua + Champagne Gold Italic) */}
            <h1 className="cat-hero-reveal text-3xl sm:text-5xl xl:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.07] text-white">
              {data.headingLine1}
              <span className="block mt-1">
                <span className="bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent">
                  {data.headingHighlight}{" "}
                </span>
                <span className="font-luxury-2color italic font-normal text-[40px] sm:text-[58px] xl:text-[66px] text-[#F3D59B] tracking-normal">
                  {data.headingItalic}
                </span>
              </span>
            </h1>

            <p className="cat-hero-reveal text-xs sm:text-[14.5px] text-teal-100/85 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {data.subheading}
            </p>

            {/* Frosted Glass Command Search Bar + Filter Chips */}
            <div className="cat-hero-reveal pt-1 space-y-3 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center bg-white/12 hover:bg-white/16 focus-within:bg-white/20 backdrop-blur-2xl rounded-full px-4 py-3 border border-white/25 focus-within:border-[#F3D59B] shadow-[0_16px_38px_rgba(0,0,0,0.22)] transition-all">
                <Search className="w-4 h-4 text-[#F3D59B] mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={data.searchPlaceholder}
                  className="w-full bg-transparent text-xs sm:text-[13px] text-white placeholder:text-teal-100/60 outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-teal-100/75 hover:text-white ml-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {FILTER_TABS.map((tab) => {
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
                        isSelected
                          ? "bg-[#F3D59B] text-[#061E23] shadow-[0_8px_22px_rgba(243,213,155,0.32)] scale-[1.03]"
                          : "bg-white/10 hover:bg-white/18 text-teal-50 border border-white/15 backdrop-blur-xl"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 6 COLS: INTERACTIVE 3D FANNED FROSTED-GLASS LOOKBOOK
             =================================================================== */}
          {centerCat && prevCat && nextCat && (
            <div
              onMouseEnter={() => setIsFanPaused(true)}
              onMouseLeave={() => setIsFanPaused(false)}
              className="lg:col-span-6 cat-hero-reveal relative flex flex-col items-center"
            >
              <div className="relative w-full max-w-[440px] h-[250px] sm:h-[280px] flex items-center justify-center">
                {/* LEFT FANNED GLASS CARD (Clickable to rotate left) */}
                <button
                  type="button"
                  aria-label={`Preview ${prevCat.title}`}
                  onClick={() =>
                    setFanIndex((prev) => (prev - 1 + totalCats) % totalCats)
                  }
                  className="group absolute left-0 sm:left-2 w-[175px] sm:w-[215px] h-[210px] sm:h-[235px] rounded-[24px] p-2 bg-white/12 hover:bg-white/20 backdrop-blur-xl border border-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.28)] -rotate-[11deg] -translate-x-2 sm:-translate-x-4 scale-[0.9] hover:scale-[0.94] opacity-75 hover:opacity-95 transition-all duration-500 ease-out overflow-hidden text-left z-10"
                >
                  <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                    <img
                      src={prevCat.image}
                      alt={prevCat.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061E23]/90 via-[#061E23]/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#F3D59B]">
                        {prevCat.websiteCountText}
                      </span>
                      <p className="text-xs font-extrabold text-white truncate">
                        {prevCat.title}
                      </p>
                    </div>
                  </div>
                </button>

                {/* RIGHT FANNED GLASS CARD (Clickable to rotate right) */}
                <button
                  type="button"
                  aria-label={`Preview ${nextCat.title}`}
                  onClick={() => setFanIndex((prev) => (prev + 1) % totalCats)}
                  className="group absolute right-0 sm:right-2 w-[175px] sm:w-[215px] h-[210px] sm:h-[235px] rounded-[24px] p-2 bg-white/12 hover:bg-white/20 backdrop-blur-xl border border-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.28)] rotate-[11deg] translate-x-2 sm:translate-x-4 scale-[0.9] hover:scale-[0.94] opacity-75 hover:opacity-95 transition-all duration-500 ease-out overflow-hidden text-left z-10"
                >
                  <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                    <img
                      src={nextCat.image}
                      alt={nextCat.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061E23]/90 via-[#061E23]/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#F3D59B]">
                        {nextCat.websiteCountText}
                      </span>
                      <p className="text-xs font-extrabold text-white truncate">
                        {nextCat.title}
                      </p>
                    </div>
                  </div>
                </button>

                {/* CENTER ACTIVE HERO FROSTED-GLASS SHOWCASE CARD */}
                <div
                  onClick={() =>
                    router.push(
                      `/categories/detail?category=${centerCat.categorySlug}`
                    )
                  }
                  className="group cursor-pointer relative z-30 w-[235px] sm:w-[275px] h-[245px] sm:h-[275px] rounded-[28px] p-2.5 bg-white/22 hover:bg-white/28 backdrop-blur-2xl border border-white/45 ring-1 ring-[#F3D59B]/40 shadow-[0_28px_70px_rgba(0,0,0,0.42)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  {/* Automatic Diagonal Glass Reflection Sheen */}
                  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                    <div className="cat-fan-sheen w-1/3 h-full bg-gradient-to-r from-transparent via-white/45 to-transparent skew-x-[-20deg]" />
                  </div>

                  <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#061E23]">
                    <img
                      key={centerCat.categorySlug}
                      src={centerCat.image}
                      alt={centerCat.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05181C]/92 via-[#061E23]/25 to-black/15" />

                    {/* Top Glass Badges */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/25 text-white text-[9.5px] font-bold">
                        <Sparkles className="w-2.5 h-2.5 text-[#F3D59B]" />
                        <span>{centerCat.websiteCountText}</span>
                      </span>

                      <span className="px-2.5 py-0.5 rounded-full bg-[#F3D59B] text-[#061E23] text-[9.5px] font-extrabold shadow-xs">
                        From {centerCat.startingPrice}
                      </span>
                    </div>

                    {/* Bottom Glass Info Dock Inside Center Card */}
                    <div className="absolute bottom-2.5 inset-x-2.5 rounded-[16px] bg-white/92 backdrop-blur-2xl border border-white p-3 shadow-lg">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="text-[14px] sm:text-[15px] font-extrabold text-[#0B252C] truncate">
                            {centerCat.title}
                          </h2>
                          <p className="text-[10.5px] text-slate-600 truncate mt-0.5">
                            {centerCat.tagline}
                          </p>
                        </div>

                        <span className="w-7 h-7 rounded-full bg-[#0B3942] group-hover:bg-[#136D7E] text-[#F3D59B] flex items-center justify-center shrink-0 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sleek Lookbook Controls & Progress Dots Below Fan */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous Niche"
                  onClick={() =>
                    setFanIndex((prev) => (prev - 1 + totalCats) % totalCats)
                  }
                  className="w-7 h-7 rounded-full bg-white/12 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {data.categories.map((item, idx) => (
                    <button
                      key={item.categorySlug}
                      type="button"
                      aria-label={`Show ${item.title}`}
                      onClick={() => setFanIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        fanIndex % totalCats === idx
                          ? "w-5 bg-[#F3D59B]"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Next Niche"
                  onClick={() => setFanIndex((prev) => (prev + 1) % totalCats)}
                  className="w-7 h-7 rounded-full bg-white/12 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================
          2. DISTINCT COOL MISTY-TEAL CANVAS + COMPACT 4-COLUMN GLASS CARDS
             (Unchanged — Kept Crisp & Compact)
         =================================================================== */}
      <div className="flex-1 bg-gradient-to-b from-[#DFECEF] via-[#E8F1F4] to-[#DCE9ED] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-11 space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="rounded-[26px] bg-white/85 backdrop-blur-2xl border border-white p-10 text-center space-y-3 shadow-sm">
              <Compass className="w-8 h-8 text-[#136D7E] mx-auto" />
              <h3 className="text-lg font-extrabold text-[#0B252C]">
                No matching industry found
              </h3>
              <p className="text-xs text-slate-600">
                Try clearing your search or explore all business categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="px-4 py-2 rounded-full bg-[#136D7E] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredCategories.map((cat, idx) => {
                const isHovered = hoveredIdx === idx;
                const glassSurface =
                  CARD_GLASS_SURFACES[idx % CARD_GLASS_SURFACES.length];

                return (
                  <div key={cat.categorySlug} className="compact-glass-card">
                    <div
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onMouseEnter={() => handleCardMouseEnter(idx)}
                      onMouseLeave={() => handleCardMouseLeave(idx)}
                      onMouseMove={handleCardMouseMove}
                      onClick={() =>
                        router.push(
                          `/categories/detail?category=${cat.categorySlug}`
                        )
                      }
                      style={{ backgroundImage: glassSurface }}
                      className="group relative h-full cursor-pointer rounded-[24px] backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 hover:ring-[#136D7E]/50 p-2.5 shadow-[0_12px_30px_rgba(11,37,44,0.06)] hover:shadow-[0_24px_55px_rgba(19,109,126,0.18)] transition-shadow duration-300 flex flex-col justify-between overflow-hidden will-change-transform"
                    >
                      {/* Interactive Cursor Champagne-Teal Spotlight */}
                      <div
                        style={{
                          opacity: isHovered ? 1 : 0,
                          background: `radial-gradient(180px circle at ${spotPos.x}px ${spotPos.y}px, rgba(19, 109, 126, 0.16), rgba(200, 164, 93, 0.14) 50%, transparent 75%)`,
                        }}
                        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                      />

                      {/* Hover Diagonal Glass Sheen */}
                      <div className="pointer-events-none absolute inset-y-0 -left-full w-1/2 z-10 bg-gradient-to-r from-transparent via-white/85 to-transparent skew-x-[-20deg] group-hover:left-[165%] transition-all duration-900 ease-out" />

                      {/* COMPACT IMAGE SHOWCASE */}
                      <div className="relative z-10">
                        <div className="relative h-36 overflow-hidden rounded-[18px] bg-white border border-white shadow-2xs">
                          <img
                            ref={(el) => {
                              imgRefs.current[idx] = el;
                            }}
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover will-change-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08262B]/65 via-transparent to-transparent" />

                          {/* Site Count Badge */}
                          <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/92 backdrop-blur-md text-[#136D7E] text-[9.5px] font-extrabold border border-white shadow-2xs">
                            <Layers className="w-2.5 h-2.5" />
                            <span>{cat.websiteCountText}</span>
                          </span>

                          {/* Champagne Gold Price Badge */}
                          <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FAF3E3]/95 backdrop-blur-md text-[#8F6824] text-[9.5px] font-extrabold border border-white shadow-2xs">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{cat.startingPrice}</span>
                          </span>
                        </div>

                        {/* CLEAN TITLE & TAGLINE */}
                        <div className="px-1.5 pt-3 pb-2 space-y-1.5">
                          <h2 className="text-[15.5px] font-extrabold text-[#0B252C] group-hover:text-[#136D7E] transition-colors leading-snug line-clamp-1">
                            {cat.title}
                          </h2>
                          <p className="text-[12px] text-slate-600 leading-relaxed line-clamp-2">
                            {cat.tagline}
                          </p>
                        </div>
                      </div>

                      {/* COMPACT GLASS ACTION FOOTER */}
                      <div className="relative z-10 mt-2 pt-2.5 border-t border-white/90 flex items-center justify-between px-1.5">
                        <span className="text-[11px] font-extrabold text-[#136D7E]">
                          Explore Niche
                        </span>

                        <span className="w-7 h-7 rounded-full bg-white group-hover:bg-gradient-to-r group-hover:from-[#08262B] group-hover:to-[#136D7E] text-[#136D7E] group-hover:text-[#F3D59B] border border-white flex items-center justify-center shadow-2xs transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ===================================================================
              3. COMPACT FROSTED-GLASS CUSTOM INDUSTRY BAR
             =================================================================== */}
          <div className="relative overflow-hidden rounded-[24px] bg-white/80 backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_14px_38px_rgba(11,37,44,0.07)]">
            <div className="space-y-1 text-center md:text-left max-w-xl">
              <h3 className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0B252C]">
                {data.customBanner.heading}{" "}
                <span className="font-luxury-2color italic font-normal text-2xl sm:text-3xl text-[#B68938]">
                  {data.customBanner.highlight}
                </span>
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                {data.customBanner.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push(data.customBanner.ctaPath)}
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#08262B] via-[#0F4954] to-[#136D7E] text-white font-bold text-xs sm:text-[13px] shadow-[0_10px_24px_rgba(19,109,126,0.22)] hover:-translate-y-0.5 transition-all"
            >
              <span>{data.customBanner.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-[#F3D59B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
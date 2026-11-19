"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowUpRight, Sparkles, Layers, Compass } from "lucide-react";

export interface CategoryMixedTheme {
  cardGradient: string;
  orbOne: string;
  orbTwo: string;
  borderTint: string;
  pillBg: string;
  pillText: string;
  spotlightGlow: string;
}

export interface CategoryCardItem {
  categorySlug: string;
  title: string;
  subtitle: string;
  websiteCount: string;
  image: string;
  mixedTheme?: CategoryMixedTheme;
}

export interface CategoriesSectionData {
  eyebrowLabel: string;
  headingPrefix: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  viewAllLabel: string;
  viewAllPath: string;
  categories: CategoryCardItem[];
}

// Core Emerald-Teal & Champagne Gold Theme Mixed with Soft Luxury Pastels
const THEME_MIXED_PASTELS: CategoryMixedTheme[] = [
  {
    // 01. Emerald Mint & Champagne Silk
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #EEF8F6 48%, #F8F1E3 100%)",
    orbOne: "#9ED9CE",
    orbTwo: "#E5CFA3",
    borderTint: "#CBE5DF",
    pillBg: "#E6F4F1",
    pillText: "#0F3D3E",
    spotlightGlow: "rgba(158, 217, 206, 0.34)",
  },
  {
    // 02. Blush Rose & Champagne Emerald
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #FDF2F4 48%, #EEF7F5 100%)",
    orbOne: "#EBBCC6",
    orbTwo: "#A8DDD3",
    borderTint: "#ECD4DA",
    pillBg: "#FCEEF1",
    pillText: "#8C3B52",
    spotlightGlow: "rgba(235, 188, 198, 0.34)",
  },
  {
    // 03. Warm Champagne & Sage Mist
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #FAF5E8 48%, #EAF5F2 100%)",
    orbOne: "#E6CC96",
    orbTwo: "#A4D8CE",
    borderTint: "#E7DAC0",
    pillBg: "#F8F0DF",
    pillText: "#7D5A22",
    spotlightGlow: "rgba(230, 204, 150, 0.35)",
  },
  {
    // 04. Misty Lavender & Teal Pearl
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #F4F0FA 48%, #EBF6F5 100%)",
    orbOne: "#CBBCE6",
    orbTwo: "#A3D9D2",
    borderTint: "#DDD3EE",
    pillBg: "#F1ECFA",
    pillText: "#5A428A",
    spotlightGlow: "rgba(203, 188, 230, 0.34)",
  },
  {
    // 05. Seafoam Aqua & Ivory Gold
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #EAF7F8 48%, #F7F2E7 100%)",
    orbOne: "#9AD5DC",
    orbTwo: "#E3CFA5",
    borderTint: "#C7E4E8",
    pillBg: "#E4F4F6",
    pillText: "#136D7E",
    spotlightGlow: "rgba(154, 213, 220, 0.35)",
  },
  {
    // 06. Peach Blossom & Mint Dew
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #FDF3EC 48%, #ECF7F3 100%)",
    orbOne: "#EBC3A8",
    orbTwo: "#A5DBD0",
    borderTint: "#ECD7C8",
    pillBg: "#FBF0E8",
    pillText: "#8F4E29",
    spotlightGlow: "rgba(235, 195, 168, 0.34)",
  },
  {
    // 07. Pistachio Sage & Champagne Pearl
    cardGradient:
      "linear-gradient(145deg, #FFFFFF 0%, #EFF7F0 48%, #F7F1E5 100%)",
    orbOne: "#ADD8B5",
    orbTwo: "#E3CE9E",
    borderTint: "#CFE3D2",
    pillBg: "#E8F4EA",
    pillText: "#235C3B",
    spotlightGlow: "rgba(173, 216, 181, 0.34)",
  },
];

const DEFAULT_CATEGORIES_DATA: CategoriesSectionData = {
  eyebrowLabel: "INDUSTRY COLLECTIONS",
  headingPrefix: "Explore Websites by",
  headingHighlight: "Business",
  headingItalic: "Category",
  subheading:
    "Pick your industry to discover 3D-engineered websites with built-in booking, store, or portfolio workflows.",
  viewAllLabel: "View All Categories",
  viewAllPath: "/categories",
  categories: [
    {
      categorySlug: "ecommerce-retail",
      title: "E-Commerce & Retail",
      subtitle: "Online stores, smart cart & secure checkout.",
      websiteCount: "28 Sites",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[0],
    },
    {
      categorySlug: "fashion-lifestyle",
      title: "Fashion & Lifestyle",
      subtitle: "Boutiques, bridal labels & custom orders.",
      websiteCount: "34 Sites",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[1],
    },
    {
      categorySlug: "dining-hospitality",
      title: "Dining & Hospitality",
      subtitle: "Cafés, restaurants & QR table menus.",
      websiteCount: "19 Sites",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[2],
    },
    {
      categorySlug: "beauty-wellness",
      title: "Beauty & Wellness",
      subtitle: "Salons, spas & instant slot bookings.",
      websiteCount: "22 Sites",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[3],
    },
    {
      categorySlug: "healthcare-medical",
      title: "Healthcare & Medical",
      subtitle: "Clinics, doctor slots & patient portals.",
      websiteCount: "16 Sites",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[4],
    },
    {
      categorySlug: "education-learning",
      title: "Education & Learning",
      subtitle: "Coaching institutes, LMS & mock tests.",
      websiteCount: "21 Sites",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[5],
    },
    {
      categorySlug: "creative-portfolio",
      title: "Creative Portfolio",
      subtitle: "Studios, photographers & personal brands.",
      websiteCount: "18 Sites",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=85",
      mixedTheme: THEME_MIXED_PASTELS[6],
    },
  ],
};

export default function CategoriesSection() {
  const router = useRouter();
  const [data, setData] = useState<CategoriesSectionData>(
    DEFAULT_CATEGORIES_DATA
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number }>({
    x: 120,
    y: 90,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const hasAnimatedRef = useRef<boolean>(false);

  // Backend API Fetch with Safe Theme-Mixed Pastel Merging
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/categories`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.categories)) {
          const merged = fetched.categories.map(
            (cat: CategoryCardItem, idx: number) => ({
              ...cat,
              mixedTheme:
                cat.mixedTheme ||
                THEME_MIXED_PASTELS[idx % THEME_MIXED_PASTELS.length],
            })
          );
          setData({
            ...DEFAULT_CATEGORIES_DATA,
            ...fetched,
            categories: merged,
          });
        }
      })
      .catch((err) => console.error("Categories section API error:", err));
  }, []);

  // ALWAYS-RUNNING GSAP ANIMATIONS (No Hover Required!)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // 1. Safe Entrance Reveal (Never locks opacity at 0)
    const runEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.fromTo(
        ".cat-entrance-item",
        { y: 18, opacity: 0.95 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
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

    // 2. Continuous Background & Card Motion Loops
    const ctx = gsap.context(() => {
      // Drifting Background Gradient Auroras
      gsap.to(".cat-bg-aurora-1", {
        x: 45,
        y: 30,
        scale: 1.15,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".cat-bg-aurora-2", {
        x: -40,
        y: -30,
        scale: 1.18,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous Multi-Stop Pastel Gradient Shift per Card
      gsap.utils
        .toArray<HTMLElement>(".cat-card-gradient-loop")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "100% 50%",
              duration: 5.5 + i * 0.7,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        });

      // Continuous Orbiting Pastel + Gold Orbs inside Cards
      gsap.utils.toArray<HTMLElement>(".cat-inner-orb").forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 22 : -22,
          y: i % 3 === 0 ? -18 : 18,
          scale: 1.2,
          duration: 4.2 + i * 0.45,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Subtle Continuous Vertical Levitation per Card (Alternating Rhythm)
      gsap.utils.toArray<HTMLElement>(".cat-float-wrapper").forEach((wrap, i) => {
        gsap.to(wrap, {
          y: i % 2 === 0 ? -5 : 5,
          duration: 2.8 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Automatic Diagonal Glass Sheen Sweep across Cards
      gsap.utils.toArray<HTMLElement>(".cat-auto-sheen").forEach((beam, i) => {
        gsap.fromTo(
          beam,
          { xPercent: -160 },
          {
            xPercent: 350,
            duration: 2.1,
            repeat: -1,
            repeatDelay: 3.8 + i * 0.85,
            delay: i * 0.65,
            ease: "power2.inOut",
          }
        );
      });
    }, sectionEl);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  // HOVER ZOOM-IN / ZOOM-OUT CINEMA PULSE
  const handleCardMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const cardEl = cardRefs.current[idx];
    const imgEl = imgRefs.current[idx];

    if (cardEl) {
      gsap.killTweensOf(cardEl);
      gsap
        .timeline()
        .to(cardEl, {
          scale: 1.035,
          y: -6,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(cardEl, {
          scale: 1.015,
          y: -4,
          duration: 0.45,
          ease: "sine.inOut",
        });
    }

    if (imgEl) {
      gsap.killTweensOf(imgEl);
      gsap
        .timeline()
        .to(imgEl, {
          scale: 1.18,
          duration: 0.45,
          ease: "power2.out",
        })
        .to(imgEl, {
          scale: 1.08,
          duration: 0.65,
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
        duration: 0.45,
        ease: "power3.out",
      });
    }

    if (imgEl) {
      gsap.killTweensOf(imgEl);
      gsap.to(imgEl, {
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    }
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="categories-theme-mixed relative overflow-hidden py-14 sm:py-18 lg:py-22 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#EDF7F6] via-[#FAF7F2] to-[#F3EDE2] text-[#0F3D3E]"
    >
      {/* Editorial Typography (Plus Jakarta Sans + Instrument Serif) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .categories-theme-mixed {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-category-italic {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      {/* MULTI-LAYERED EMERALD, MINT & CHAMPAGNE GRADIENT BACKGROUND */}
      <div
        style={{
          backgroundImage:
            "radial-gradient(rgba(19, 109, 126, 0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        className="pointer-events-none absolute inset-0 opacity-45"
      />
      <div className="cat-bg-aurora-1 pointer-events-none absolute -top-28 right-8 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#99E2D8]/35 to-[#E6C78A]/35 blur-[130px]" />
      <div className="cat-bg-aurora-2 pointer-events-none absolute -bottom-28 left-8 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E8D5B7]/40 to-[#7FD1C8]/30 blur-[130px]" />

      {/* Top & Bottom Hairline Emerald-Gold Dividers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#136D7E]/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A45D]/35 to-transparent" />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* EDITORIAL HEADER ROW (Matches Site Emerald & Champagne Theme) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-11">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-[#D4E5E2] text-[#136D7E] text-[10px] sm:text-[10.5px] font-extrabold tracking-[0.2em] uppercase shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#C8A45D]" />
              <span>{data.eyebrowLabel}</span>
            </div>

            <h2 className="text-[28px] sm:text-4xl lg:text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0F3D3E]">
              {data.headingPrefix}{" "}
              <span className="bg-gradient-to-r from-[#0F3D3E] via-[#136D7E] to-[#8A6D3B] bg-clip-text text-transparent">
                {data.headingHighlight}
              </span>{" "}
              <span className="font-category-italic italic font-normal text-[34px] sm:text-[46px] lg:text-[52px] text-[#136D7E] tracking-normal">
                {data.headingItalic}
              </span>
            </h2>

            <p className="text-xs sm:text-[14.5px] text-slate-600 leading-relaxed">
              {data.subheading}
            </p>
          </div>

          {/* Signature Emerald & Champagne Gold Pill Button */}
          <button
            type="button"
            onClick={() => router.push(data.viewAllPath)}
            className="group self-start lg:self-end inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0F3D3E] to-[#136D7E] hover:brightness-110 text-[#FAF7F2] font-bold text-xs sm:text-[13px] shadow-[0_10px_24px_rgba(15,61,62,0.18)] hover:-translate-y-0.5 transition-all shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-[#E6C78A]" />
            <span>{data.viewAllLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E6C78A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* ===================================================================
            4 + 3 ASYMMETRIC THEME-MIXED PASTEL BENTO GRID
            Always-Running Float + Gradient Loop + Hover Zoom-In/Zoom-Out
           =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
          {data.categories.map((cat, idx) => {
            const theme =
              cat.mixedTheme ||
              THEME_MIXED_PASTELS[idx % THEME_MIXED_PASTELS.length];
            const desktopSpanClass =
              idx < 4 ? "lg:col-span-3" : "lg:col-span-4";
            const isHovered = hoveredIdx === idx;
            const indexTag = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={cat.categorySlug}
                className={`${desktopSpanClass} cat-entrance-item cat-float-wrapper`}
              >
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => handleCardMouseEnter(idx)}
                  onMouseLeave={() => handleCardMouseLeave(idx)}
                  onMouseMove={(e) => handleCardMouseMove(e, idx)}
                  onClick={() =>
                    router.push(
                      `/categories/detail?category=${cat.categorySlug}`
                    )
                  }
                  style={{
                    backgroundImage: theme.cardGradient,
                    backgroundSize: "200% 200%",
                    borderColor: isHovered ? "#C8A45D" : theme.borderTint,
                  }}
                  className="cat-card-gradient-loop group relative h-full cursor-pointer rounded-[26px] border ring-1 ring-inset ring-white/90 p-3 sm:p-3.5 shadow-[0_12px_30px_rgba(15,61,62,0.06)] hover:shadow-[0_24px_55px_rgba(15,61,62,0.16)] transition-shadow duration-300 flex flex-col justify-between overflow-hidden will-change-transform"
                >
                  {/* Always-Running Orbiting Pastel + Gold Orbs Inside Card */}
                  <div
                    style={{ backgroundColor: theme.orbOne }}
                    className="cat-inner-orb pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-35"
                  />
                  <div
                    style={{ backgroundColor: theme.orbTwo }}
                    className="cat-inner-orb pointer-events-none absolute bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-30"
                  />

                  {/* Interactive Cursor Spotlight */}
                  <div
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: `radial-gradient(210px circle at ${spotlight.x}px ${spotlight.y}px, ${theme.spotlightGlow}, transparent 75%)`,
                    }}
                    className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                  />

                  {/* Always-Running Automatic Diagonal Glass Sheen Sweep */}
                  <div className="cat-auto-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 z-20 bg-gradient-to-r from-transparent via-white/75 to-transparent skew-x-[-20deg]" />

                  {/* TOP IMAGE SHOWCASE WITH ZOOM-IN / ZOOM-OUT TARGET */}
                  <div className="relative z-10">
                    <div className="relative h-36 sm:h-36 lg:h-[136px] rounded-[18px] overflow-hidden bg-[#EAF4F2] border border-white/90 shadow-2xs">
                      <img
                        ref={(el) => {
                          imgRefs.current[idx] = el;
                        }}
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover object-center will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D3E]/45 via-transparent to-transparent opacity-70" />

                      {/* Top-Left Emerald & Gold Number Pill */}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/92 backdrop-blur-md text-[#0F3D3E] font-extrabold text-[9.5px] tracking-wider shadow-2xs">
                        {indexTag}
                      </span>

                      {/* Top-Right Theme-Matched Site Count Pill */}
                      <span
                        style={{
                          backgroundColor: theme.pillBg,
                          color: theme.pillText,
                        }}
                        className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/90 font-extrabold text-[9.5px] shadow-2xs"
                      >
                        <Layers className="w-2.5 h-2.5" />
                        <span>{cat.websiteCount}</span>
                      </span>
                    </div>

                    {/* TITLE & SUBTITLE */}
                    <div className="px-1 pt-3.5 pb-2">
                      <h3 className="text-[15px] sm:text-[16px] font-extrabold text-[#0F3D3E] group-hover:text-[#136D7E] transition-colors leading-snug line-clamp-1">
                        {cat.title}
                      </h3>
                      <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed mt-1 line-clamp-2">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM GLASS ACTION DOCK */}
                  <div className="relative z-10 mt-2 pt-2.5 border-t border-[#0F3D3E]/[0.08] flex items-center justify-between gap-2 px-1">
                    <span className="text-[11px] font-extrabold text-[#136D7E] tracking-tight">
                      Explore 3D Designs
                    </span>

                    <span className="w-7 h-7 rounded-full bg-white/95 group-hover:bg-[#0F3D3E] text-[#0F3D3E] group-hover:text-[#E6C78A] border border-white group-hover:border-[#0F3D3E] flex items-center justify-center shadow-2xs transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
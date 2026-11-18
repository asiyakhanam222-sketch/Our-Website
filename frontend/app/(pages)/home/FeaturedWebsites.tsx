"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Sparkles,
  Check,
  Star,
  Wand2,
} from "lucide-react";

export interface PastelCardPalette {
  name: string;
  cardGradient: string;
  orbOne: string;
  orbTwo: string;
  dotColor: string;
  borderTint: string;
}

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
  pastelPalette?: PastelCardPalette;
}

export interface FeaturedWebsitesData {
  eyebrowLabel: string;
  heading: string;
  subheading?: string;
  viewAllLabel: string;
  viewAllPath: string;
  websites: FeaturedWebsiteItem[];
}

const LUXURY_PASTEL_PALETTES: PastelCardPalette[] = [
  {
    name: "Champagne Rose Silk",
    cardGradient:
      "linear-gradient(145deg, #FDF8F3 0%, #F8E8EC 48%, #F2E3CC 100%)",
    orbOne: "#E8B4BC",
    orbTwo: "#DFC394",
    dotColor: "#B76E79",
    borderTint: "#EED5D9",
  },
  {
    name: "Misty Wisteria Pearl",
    cardGradient:
      "linear-gradient(145deg, #FAF8FC 0%, #ECE6F6 48%, #F3E5EF 100%)",
    orbOne: "#C5B4E3",
    orbTwo: "#DFC0D8",
    dotColor: "#7E69AB",
    borderTint: "#E1D8F0",
  },
  {
    name: "Seafoam Sage Dew",
    cardGradient:
      "linear-gradient(145deg, #F5FAF9 0%, #DFEFEA 48%, #E5EFF6 100%)",
    orbOne: "#9CCAC1",
    orbTwo: "#A8CBE0",
    dotColor: "#2A7B76",
    borderTint: "#CFE5E0",
  },
  {
    name: "Powder Periwinkle Cream",
    cardGradient:
      "linear-gradient(145deg, #F7F9FC 0%, #E2E9F7 48%, #F3EEE4 100%)",
    orbOne: "#A9BCE2",
    orbTwo: "#DECFA8",
    dotColor: "#4F6D9A",
    borderTint: "#D6E0F2",
  },
  {
    name: "Blush Peony Sand",
    cardGradient:
      "linear-gradient(145deg, #FDF7F6 0%, #F6E2DE 48%, #F4E9D6 100%)",
    orbOne: "#E5B5AD",
    orbTwo: "#E2C89E",
    dotColor: "#B56B5E",
    borderTint: "#EDD3CE",
  },
  {
    name: "Celadon Mint Ivory",
    cardGradient:
      "linear-gradient(145deg, #F6FAF7 0%, #E0EFE6 48%, #F4EDE0 100%)",
    orbOne: "#A3CEB5",
    orbTwo: "#DFC99B",
    dotColor: "#2E7D5B",
    borderTint: "#D0E5D8",
  },
];

const DEFAULT_FEATURED_DATA: FeaturedWebsitesData = {
  eyebrowLabel: "CURATED STUDIO COLLECTION",
  heading: "Explore Our Trending Website Designs",
  subheading:
    "Architectural precision, fluid animations, and high-converting storefronts crafted for luxury brands.",
  viewAllLabel: "View All Templates",
  viewAllPath: "/websites",
  websites: [
    {
      websiteSlug: "zarii-boutique",
      title: "Zarii Boutique",
      category: "Fashion & Luxury Couture",
      categorySlug: "fashion-lifestyle",
      priceLabel: "Starting at",
      startingPrice: "₹9,999",
      badgeText: "BESTSELLER",
      techStackTag: "Next.js + Store",
      image: "/home.jpeg",
      pastelPalette: LUXURY_PASTEL_PALETTES[0],
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
      pastelPalette: LUXURY_PASTEL_PALETTES[1],
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
      pastelPalette: LUXURY_PASTEL_PALETTES[2],
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
      pastelPalette: LUXURY_PASTEL_PALETTES[3],
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
      pastelPalette: LUXURY_PASTEL_PALETTES[4],
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
      pastelPalette: LUXURY_PASTEL_PALETTES[5],
    },
  ],
};

export default function FeaturedWebsites() {
  const router = useRouter();
  const [data, setData] = useState<FeaturedWebsitesData>(DEFAULT_FEATURED_DATA);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({
    x: 150,
    y: 120,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/featured-websites`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.websites)) {
          const merged = fetched.websites.map(
            (w: FeaturedWebsiteItem, i: number) => ({
              ...w,
              pastelPalette:
                w.pastelPalette ||
                LUXURY_PASTEL_PALETTES[i % LUXURY_PASTEL_PALETTES.length],
            })
          );
          setData({ ...fetched, websites: merged });
        }
      })
      .catch((err) => console.error("FeaturedWebsites API error:", err));
  }, []);

  // Ambient floating golden dust & studio glow animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".studio-gold-mote").forEach((mote, i) => {
        gsap.to(mote, {
          y: i % 2 === 0 ? -24 : 24,
          x: i % 3 === 0 ? 18 : -18,
          opacity: 0.75,
          duration: 3.8 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(".studio-ambient-halo", {
        scale: 1.12,
        opacity: 0.55,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Directional smooth stagger + continuous pastel gradient & orb drift per card
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".luxury-showcase-card",
        {
          x: slideDirection * 36,
          y: 14,
          opacity: 0,
          scale: 0.96,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.075,
          ease: "expo.out",
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".pastel-surface-shift")
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "100% 50%",
              duration: 6 + i * 0.85,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        });

      gsap.utils.toArray<HTMLElement>(".pastel-orb-drift").forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 22 : -22,
          y: i % 3 === 0 ? -18 : 18,
          scale: 1.18,
          duration: 4.5 + i * 0.55,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [startIndex, slideDirection]);

  const visibleCount = 4;
  const totalItems = data.websites.length;

  const handlePrev = () => {
    setSlideDirection(-1);
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setSlideDirection(1);
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCard(idx);
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const visibleWebsites = Array.from({
    length: Math.min(visibleCount, totalItems),
  }).map((_, offset) => {
    const itemIndex = (startIndex + offset) % totalItems;
    const item = data.websites[itemIndex];
    return {
      ...item,
      pastelPalette:
        item.pastelPalette ||
        LUXURY_PASTEL_PALETTES[itemIndex % LUXURY_PASTEL_PALETTES.length],
    };
  });

  const renderTwoToneHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#0F3D3E]">{headingText}</span>;
    }
    const splitPoint = Math.min(2, Math.floor(words.length / 2));
    const firstPart = words.slice(0, splitPoint).join(" ");
    const secondPart = words.slice(splitPoint).join(" ");

    return (
      <>
        <span className="text-[#0F3D3E]">{firstPart} </span>
        <span className="text-[#8A6D3B]">{secondPart}</span>
      </>
    );
  };

  const renderBadgeIcon = (badge: string) => {
    const upper = badge.toUpperCase();
    if (upper.includes("VERIFIED"))
      return <Check className="w-2.5 h-2.5 stroke-[3]" />;
    if (upper.includes("TOP") || upper.includes("RATED"))
      return <Star className="w-2.5 h-2.5 fill-[#0F3D3E]" />;
    return <Sparkles className="w-2.5 h-2.5" />;
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / 2));
  const activeDot = startIndex % totalPages;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-18 lg:py-22 px-3.5 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F5F7F6] to-[#FFFFFF] text-[#112A2C]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* LUXURY STUDIO BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="studio-ambient-halo absolute -top-28 right-12 w-[460px] h-[460px] rounded-full bg-[#E6D3B3]/35 blur-[130px]" />
        <div className="studio-ambient-halo absolute -bottom-28 left-8 w-[440px] h-[440px] rounded-full bg-[#B8D8D4]/30 blur-[130px]" />

        <span className="studio-gold-mote absolute top-20 left-[14%] w-1.5 h-1.5 rounded-full bg-[#C8A45D]/45" />
        <span className="studio-gold-mote absolute top-44 right-[18%] w-2 h-2 rounded-full bg-[#0F3D3E]/25" />
        <span className="studio-gold-mote absolute bottom-28 left-[32%] w-1.5 h-1.5 rounded-full bg-[#C8A45D]/45" />
        <span className="studio-gold-mote absolute bottom-36 right-[26%] w-2 h-2 rounded-full bg-[#C8A45D]/35" />
      </div>

      <div className="pointer-events-none hidden xl:block absolute inset-y-0 left-8 w-[1px] bg-[#E5DEC9]/60" />
      <div className="pointer-events-none hidden xl:block absolute inset-y-0 right-8 w-[1px] bg-[#E5DEC9]/60" />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-9 sm:mb-11">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-[#E5DEC9] text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase text-[#8A6D3B] shadow-2xs">
              <Wand2 className="w-3 h-3 text-[#B68D40]" />
              <span>{data.eyebrowLabel}</span>
            </div>

            <h2 className="font-serif text-[28px] sm:text-4xl lg:text-[42px] font-bold leading-[1.12] tracking-tight">
              {renderTwoToneHeading(data.heading)}
            </h2>

            <p className="text-[12.5px] sm:text-[14.5px] text-slate-600 leading-relaxed">
              {data.subheading ||
                "Architectural precision, fluid animations, and high-converting storefronts crafted for luxury brands."}
            </p>
          </div>

          {/* CONTROLS & VIEW ALL */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Websites"
              className="w-10 h-10 rounded-full bg-white border border-[#DFD6C3] text-[#0F3D3E] flex items-center justify-center hover:border-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-[#FAF7F2] active:scale-95 transition-all shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Websites"
              className="w-10 h-10 rounded-full bg-white border border-[#DFD6C3] text-[#0F3D3E] flex items-center justify-center hover:border-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-[#FAF7F2] active:scale-95 transition-all shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => router.push(data.viewAllPath)}
              className="group ml-1.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F3D3E] hover:bg-[#165456] text-[#FAF7F2] font-bold text-xs sm:text-[13px] shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>{data.viewAllLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6C78A] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* REDESIGNED ARCHITECTURAL PASTEL SHOWCASE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1500px]">
          {visibleWebsites.map((item, idx) => {
            const isHovered = hoveredCard === idx;
            const palette = item.pastelPalette!;

            return (
              <div
                key={`${item.websiteSlug}-${idx}`}
                className={`luxury-showcase-card ${
                  idx === 3 ? "hidden sm:block" : "block"
                }`}
              >
                <div
                  onMouseMove={(e) => handleCardMouseMove(e, idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() =>
                    router.push(`/websites/detail?website=${item.websiteSlug}`)
                  }
                  style={{
                    backgroundImage: palette.cardGradient,
                    backgroundSize: "200% 200%",
                    borderColor: isHovered ? "#C8A45D" : palette.borderTint,
                    transform: isHovered
                      ? "translateY(-8px) rotateX(2.5deg) rotateY(-2deg)"
                      : "translateY(0px) rotateX(0deg) rotateY(0deg)",
                    transition:
                      "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.4s ease",
                  }}
                  className="pastel-surface-shift group relative h-full cursor-pointer rounded-[28px] border p-4 shadow-[0_14px_34px_rgba(15,61,62,0.07)] hover:shadow-[0_28px_65px_rgba(15,61,62,0.16)] flex flex-col justify-between overflow-hidden [transform-style:preserve-3d]"
                >
                  {/* Soft Breathing Pastel Orbs Inside Each Card */}
                  <div
                    style={{ backgroundColor: palette.orbOne }}
                    className="pastel-orb-drift pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-35"
                  />
                  <div
                    style={{ backgroundColor: palette.orbTwo }}
                    className="pastel-orb-drift pointer-events-none absolute bottom-12 -left-10 w-36 h-36 rounded-full blur-2xl opacity-35"
                  />

                  {/* Interactive Cursor-Tracking Champagne Spotlight */}
                  <div
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: `radial-gradient(240px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.65), transparent 75%)`,
                    }}
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                  />

                  {/* Diagonal Glass Sheen Sweep */}
                  <div className="pointer-events-none absolute inset-y-0 -left-full w-1/2 z-30 bg-gradient-to-r from-transparent via-white/65 to-transparent skew-x-[-22deg] group-hover:left-[160%] transition-all duration-1000 ease-out" />

                  {/* TOP FLOATING HEADER PILLS */}
                  <div className="relative z-20 flex items-center justify-between gap-2 mb-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white text-[#0F3D3E] font-bold text-[9.5px] truncate shadow-2xs">
                      <span
                        style={{ backgroundColor: palette.dotColor }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span className="truncate">{item.techStackTag}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E6C78A] to-[#D4AF37] text-[#0F3D3E] font-extrabold text-[9px] tracking-wide shrink-0 shadow-2xs">
                      {renderBadgeIcon(item.badgeText)}
                      <span>{item.badgeText}</span>
                    </span>
                  </div>

                  {/* REDESIGNED FRAMELESS ARCH-WINDOW BROWSER SHOWCASE */}
                  <div className="relative z-20 my-auto">
                    <div className="relative rounded-[20px] p-[3px] bg-gradient-to-b from-white via-[#E6C78A]/60 to-white/70 shadow-[0_14px_30px_rgba(15,61,62,0.12)] transform group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-500 ease-out">
                      <div className="rounded-[17px] overflow-hidden bg-white">
                        {/* Sleek Frosted Browser Header */}
                        <div className="flex items-center justify-between bg-[#FAF7F2]/95 px-3 py-1.5 border-b border-[#EFE8DA]">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D98A94]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFB977]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7FA898]" />
                          </div>
                          <span className="text-[8.5px] font-semibold tracking-wider uppercase text-slate-400">
                            Live Preview
                          </span>
                        </div>

                        {/* Tall Live-Scrolling Webpage Preview */}
                        <div className="relative h-[155px] sm:h-[168px] overflow-hidden bg-[#0F3D3E]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-auto min-h-[165%] object-cover object-top transition-transform duration-[4500ms] ease-in-out group-hover:-translate-y-[36%]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#09292A]/75 via-transparent to-transparent" />

                          {/* Floating Glass "3D Tour" Badge on Hover */}
                          <div className="absolute inset-x-0 bottom-2.5 flex justify-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0F3D3E] font-extrabold text-[9.5px] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                              <Eye className="w-3 h-3 text-[#8A6D3B]" />
                              <span>Explore 3D Tour</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EDITORIAL TITLE + FLOATING FROSTED GLASS DOCK */}
                  <div className="relative z-20 pt-4 space-y-3">
                    <div className="px-0.5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8A6D3B] truncate">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-[18px] font-bold text-[#0F3D3E] truncate mt-0.5 group-hover:text-[#165456] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Frosted Glass Price & Action Dock */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
                      <div>
                        <span className="block text-[9.5px] font-semibold uppercase tracking-wider text-slate-400 leading-none">
                          {item.priceLabel}
                        </span>
                        <span className="block text-[16px] font-extrabold text-[#0F3D3E] mt-1 leading-none">
                          {item.startingPrice}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F3D3E] text-[#FAF7F2] text-[11px] font-bold group-hover:bg-[#165456] group-hover:shadow-md transition-all duration-300">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 text-[#E6C78A] group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CAROUSEL PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-7 sm:mt-9">
          {Array.from({ length: totalPages }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                setSlideDirection(dotIdx >= activeDot ? 1 : -1);
                setStartIndex((dotIdx * 2) % totalItems);
              }}
              aria-label={`Slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === dotIdx
                  ? "w-6 bg-[#0F3D3E]"
                  : "w-2 bg-[#D6CCB8] hover:bg-[#B68D40]"
              }`}
            />
          ))}
        </div>

        {/* MOBILE FULL-WIDTH LUXURY CTA BUTTON */}
        <div className="sm:hidden mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => router.push(data.viewAllPath)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0F3D3E] text-[#FAF7F2] font-extrabold text-xs shadow-md"
          >
            <span>{data.viewAllLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E6C78A]" />
          </button>
        </div>
      </div>
    </section>
  );
}
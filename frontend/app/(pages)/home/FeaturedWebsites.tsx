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

  // Ambient Section Background Floating Motes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".studio-gold-mote").forEach((mote, i) => {
        gsap.to(mote, {
          y: i % 2 === 0 ? -24 : 24,
          x: i % 3 === 0 ? 18 : -18,
          opacity: 0.8,
          duration: 3.8 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ALWAYS-RUNNING UNIQUE PREMIUM ANIMATIONS FOR EACH CARD (NO HOVER REQUIRED!)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Directional Entrance Reveal
      gsap.fromTo(
        ".luxury-showcase-card",
        {
          x: slideDirection * 32,
          y: 16,
          opacity: 0,
          scale: 0.96,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "expo.out",
        }
      );

      // 2. Continuous Pastel Gradient Shift per Card
      gsap.utils
        .toArray<HTMLElement>(".pastel-surface-shift")
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "100% 50%",
              duration: 5.5 + i * 0.9,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        });

      // 3. Continuous Orbiting Pastel Orbs inside Cards
      gsap.utils.toArray<HTMLElement>(".pastel-orb-drift").forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 24 : -24,
          y: i % 3 === 0 ? -20 : 20,
          scale: 1.22,
          duration: 4.2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 4. Staggered Automatic Glass Sheen Sweep across Cards (Runs automatically!)
      gsap.utils.toArray<HTMLElement>(".auto-sheen-beam").forEach((beam, i) => {
        gsap.fromTo(
          beam,
          { xPercent: -160 },
          {
            xPercent: 340,
            duration: 2.2,
            repeat: -1,
            repeatDelay: 3.5 + i * 1.1,
            delay: i * 0.9,
            ease: "power2.inOut",
          }
        );
      });

      // 5. FOUR DISTINCT CONTINUOUS CHOREOGRAPHIES FOR EACH VISIBLE CARD:
      // Card 0: Smooth Vertical Levitation + Top-to-Bottom Webpage Glide
      gsap.to(".card-motion-0", {
        y: -8,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.fromTo(
        ".screen-motion-0",
        { yPercent: 0 },
        {
          yPercent: -34,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      // Card 1: 3D Spatial Perspective Breathing + Reverse Bottom-to-Top Webpage Glide
      gsap.fromTo(
        ".card-motion-1",
        { rotateY: -2.8, rotateX: 1.5, y: 3 },
        {
          rotateY: 2.8,
          rotateX: -1.5,
          y: -5,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
      gsap.fromTo(
        ".screen-motion-1",
        { yPercent: -34 },
        {
          yPercent: 0,
          duration: 7.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      // Card 2: Cinematic Ken Burns Zoom-In / Zoom-Out + Gentle Float
      gsap.to(".card-motion-2", {
        y: -7,
        duration: 3.2,
        delay: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.fromTo(
        ".screen-motion-2",
        { scale: 1.0, yPercent: 0 },
        {
          scale: 1.1,
          yPercent: -26,
          duration: 6.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      // Card 3: Subtle Luxury Pendulum Tilt-Wave + Staggered Webpage Glide
      gsap.fromTo(
        ".card-motion-3",
        { rotateZ: -0.8, y: -4 },
        {
          rotateZ: 0.8,
          y: 5,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
      gsap.fromTo(
        ".screen-motion-3",
        { yPercent: -8 },
        {
          yPercent: -36,
          duration: 6.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );
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

  const visibleWebsites = Array.from({
    length: Math.min(visibleCount, totalItems),
  }).map((_, offset) => {
    const itemIndex = (startIndex + offset) % totalItems;
    const item = data.websites[itemIndex];
    return {
      ...item,
      displayNumber: String(itemIndex + 1).padStart(2, "0"),
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
      className="relative overflow-hidden py-14 sm:py-18 lg:py-22 px-3.5 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F4F7F6] to-[#FFFFFF] text-[#112A2C]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* LUXURY STUDIO AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 right-12 w-[460px] h-[460px] rounded-full bg-[#E6D3B3]/35 blur-[130px]" />
        <div className="absolute -bottom-28 left-8 w-[440px] h-[440px] rounded-full bg-[#B8D8D4]/30 blur-[130px]" />

        <span className="studio-gold-mote absolute top-20 left-[14%] w-1.5 h-1.5 rounded-full bg-[#C8A45D]/50" />
        <span className="studio-gold-mote absolute top-44 right-[18%] w-2 h-2 rounded-full bg-[#0F3D3E]/25" />
        <span className="studio-gold-mote absolute bottom-28 left-[32%] w-1.5 h-1.5 rounded-full bg-[#C8A45D]/50" />
        <span className="studio-gold-mote absolute bottom-36 right-[26%] w-2 h-2 rounded-full bg-[#C8A45D]/40" />
      </div>

      {/* Hairline Studio Framing */}
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

        {/* PREMIUM ARCHITECTURAL CARDS WITH ALWAYS-RUNNING UNIQUE ANIMATIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1500px]">
          {visibleWebsites.map((item, idx) => {
            const palette = item.pastelPalette!;
            const motionSlot = idx % 4;

            return (
              <div
                key={`${item.websiteSlug}-${idx}`}
                className={`luxury-showcase-card ${
                  idx === 3 ? "hidden sm:block" : "block"
                }`}
              >
                <div
                  onClick={() =>
                    router.push(`/websites/detail?website=${item.websiteSlug}`)
                  }
                  style={{
                    backgroundImage: palette.cardGradient,
                    backgroundSize: "200% 200%",
                    borderColor: palette.borderTint,
                  }}
                  className={`pastel-surface-shift card-motion-${motionSlot} group relative h-full cursor-pointer rounded-[30px] border p-4 shadow-[0_16px_38px_rgba(15,61,62,0.08)] hover:shadow-[0_28px_65px_rgba(15,61,62,0.18)] hover:border-[#C8A45D] transition-shadow duration-500 flex flex-col justify-between overflow-hidden [transform-style:preserve-3d]`}
                >
                  {/* Soft Orbiting Pastel Aura Orbs */}
                  <div
                    style={{ backgroundColor: palette.orbOne }}
                    className="pastel-orb-drift pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-40"
                  />
                  <div
                    style={{ backgroundColor: palette.orbTwo }}
                    className="pastel-orb-drift pointer-events-none absolute bottom-12 -left-10 w-36 h-36 rounded-full blur-2xl opacity-35"
                  />

                  {/* Automatic Diagonal Glass Light Sheen (Runs Continuously Without Hover!) */}
                  <div className="auto-sheen-beam pointer-events-none absolute inset-y-0 left-0 w-1/3 z-30 bg-gradient-to-r from-transparent via-white/65 to-transparent skew-x-[-22deg]" />

                  {/* TOP EDITORIAL NUMBER & PILLS */}
                  <div className="relative z-20 flex items-center justify-between gap-2 mb-3.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white text-[#0F3D3E] font-bold text-[9.5px] truncate shadow-2xs">
                      <span className="font-serif font-extrabold text-[#8A6D3B]">
                        {item.displayNumber}
                      </span>
                      <span
                        style={{ backgroundColor: palette.dotColor }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span className="truncate">{item.techStackTag}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E6C78A] to-[#D4AF37] text-[#0F3D3E] font-extrabold text-[8.5px] tracking-wide shrink-0 shadow-2xs">
                      {renderBadgeIcon(item.badgeText)}
                      <span>{item.badgeText}</span>
                    </span>
                  </div>

                  {/* DOUBLE-BEZEL CHAMPAGNE GALLERY VIEWPORT (CONTINUOUS LIVE SCREEN MOTION) */}
                  <div className="relative z-20 my-auto">
                    <div className="relative rounded-[22px] p-[3.5px] bg-gradient-to-b from-white via-[#E6C78A]/75 to-white/80 shadow-[0_14px_32px_rgba(15,61,62,0.12)]">
                      <div className="rounded-[18.5px] overflow-hidden bg-white">
                        {/* Sleek Frosted Browser Top Bar */}
                        <div className="flex items-center justify-between bg-[#FAF7F2] px-3 py-1.5 border-b border-[#EFE8DA]">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D98A94]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFB977]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7FA898]" />
                          </div>
                          <span className="inline-flex items-center gap-1 text-[8px] font-extrabold tracking-widest uppercase text-[#0F3D3E]/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>Live Preview</span>
                          </span>
                        </div>

                        {/* Continuously Animated Webpage Screen */}
                        <div className="relative h-[162px] sm:h-[175px] overflow-hidden bg-[#0F3D3E]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`screen-motion-${motionSlot} w-full h-auto min-h-[168%] object-cover object-top will-change-transform block`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#09292A]/75 via-transparent to-transparent" />

                          {/* Always-Visible Subtle Floating Glass Pill */}
                          <div className="absolute inset-x-0 bottom-2.5 flex justify-center">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 group-hover:bg-[#E6C78A] backdrop-blur-md text-[#0F3D3E] font-extrabold text-[9.5px] transition-colors duration-300 shadow-md">
                              <Eye className="w-3 h-3 text-[#8A6D3B] group-hover:text-[#0F3D3E]" />
                              <span>3D Live Tour</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EDITORIAL TITLE + FROSTED GLASS DOCK */}
                  <div className="relative z-20 pt-4 space-y-3">
                    <div className="px-0.5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8A6D3B] truncate">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-[18.5px] font-bold text-[#0F3D3E] truncate mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    {/* Frosted Glass Price & Action Dock */}
                    <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-white px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
                      <div>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-none">
                          {item.priceLabel}
                        </span>
                        <span className="block text-[16px] font-extrabold text-[#0F3D3E] mt-1 leading-none">
                          {item.startingPrice}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F3D3E] group-hover:bg-[#165456] text-[#FAF7F2] text-[11px] font-bold shadow-xs transition-all duration-300">
                        <span>Explore</span>
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
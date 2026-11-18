"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ArrowRight,
  Sparkles,
  X,
  Heart,
  LayoutGrid,
  Shirt,
  Utensils,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Camera,
  Flame,
  Play,
  CheckCircle2,
  Star,
  Layers,
  ChevronDown,
  Flower2,
  Plus,
} from "lucide-react";

export interface WebsiteCatalogItem {
  websiteSlug: string;
  title: string;
  screenSubtitle?: string;
  screenTheme?: string;
  category: string;
  categorySlug: string;
  priceLabel: string;
  startingPrice: string;
  numericPrice: number;
  badgeText: string;
  techTag: string;
  image: string;
}

export interface CategoryFilterTab {
  categorySlug: string;
  label: string;
}

export interface WebsitesPageData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  searchPlaceholder: string;
  filterTabs: CategoryFilterTab[];
  websites: WebsiteCatalogItem[];
}

const DEFAULT_WEBSITES_PAGE_DATA: WebsitesPageData = {
  eyebrowLabel: "COMPLETE TEMPLATE MARKETPLACE",
  heading: "Explore All Ready-to-Launch Websites",
  subheading:
    "Browse 150+ high-converting, mobile-responsive websites with full source code and built-in Admin Panel.",
  searchPlaceholder: "Search by business, boutique, cafe, clinic...",
  filterTabs: [
    { categorySlug: "all", label: "All Websites" },
    { categorySlug: "fashion-lifestyle", label: "Fashion & Lifestyle" },
    { categorySlug: "dining-hospitality", label: "Dining & Hospitality" },
    { categorySlug: "healthcare-medical", label: "Healthcare & Medical" },
    { categorySlug: "education-learning", label: "Education & Learning" },
    { categorySlug: "beauty-wellness", label: "Beauty & Wellness" },
    { categorySlug: "ecommerce-retail", label: "E-Commerce & Retail" },
    { categorySlug: "creative-portfolio", label: "Creative Portfolio" },
  ],
  websites: [
    {
      websiteSlug: "zarii-boutique",
      title: "Zarii Boutique",
      screenSubtitle: "Ethnic & Designer Wear",
      screenTheme: "from-[#6E1A29] via-[#8C2436] to-[#4A101B]",
      category: "Fashion & Lifestyle",
      categorySlug: "fashion-lifestyle",
      priceLabel: "Starting at",
      startingPrice: "₹9,999",
      numericPrice: 9999,
      badgeText: "Bestseller",
      techTag: "Next.js + Store",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "the-purple-cafe",
      title: "The Purple Café",
      screenSubtitle: "Cafe & Dining Experience",
      screenTheme: "from-[#4A2E20] via-[#633E2C] to-[#331E14]",
      category: "Dining & Hospitality",
      categorySlug: "dining-hospitality",
      priceLabel: "Starting at",
      startingPrice: "₹12,999",
      numericPrice: 12999,
      badgeText: "Live Demo",
      techTag: "QR Menu + Booking",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "healthcare-plus",
      title: "HealthCare Plus",
      screenSubtitle: "Your Health, Our Priority",
      screenTheme: "from-[#0F5E63] via-[#16787E] to-[#0A4145]",
      category: "Healthcare & Medical",
      categorySlug: "healthcare-medical",
      priceLabel: "Starting at",
      startingPrice: "₹11,999",
      numericPrice: 11999,
      badgeText: "Verified",
      techTag: "Doctor Slot CRM",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "learnsphere",
      title: "LearnSphere",
      screenSubtitle: "Learn • Grow • Achieve",
      screenTheme: "from-[#1A3B5C] via-[#25507A] to-[#112840]",
      category: "Education & Learning",
      categorySlug: "education-learning",
      priceLabel: "Starting at",
      startingPrice: "₹14,999",
      numericPrice: 14999,
      badgeText: "Top Rated",
      techTag: "LMS + Live Batch",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "aura-bridal-studio",
      title: "Aura Bridal Studio",
      screenSubtitle: "Bridal • Makeup • Styling",
      screenTheme: "from-[#542232] via-[#702E43] to-[#381520]",
      category: "Beauty & Wellness",
      categorySlug: "beauty-wellness",
      priceLabel: "Starting at",
      startingPrice: "₹8,999",
      numericPrice: 8999,
      badgeText: "Live Demo",
      techTag: "Artist Booking",
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "urbankart-pro",
      title: "UrbanKart Pro",
      screenSubtitle: "Multi-Vendor E-Commerce",
      screenTheme: "from-[#144361] via-[#1D5B82] to-[#0D2E45]",
      category: "E-Commerce & Retail",
      categorySlug: "ecommerce-retail",
      priceLabel: "Starting at",
      startingPrice: "₹13,499",
      numericPrice: 13499,
      badgeText: "New",
      techTag: "Multi-Vendor Shop",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "lenscraft-studio",
      title: "LensCraft Portfolio",
      screenSubtitle: "Photography & Creative Work",
      screenTheme: "from-[#222830] via-[#323B46] to-[#161A20]",
      category: "Personal & Creative",
      categorySlug: "creative-portfolio",
      priceLabel: "Starting at",
      startingPrice: "₹6,999",
      numericPrice: 6999,
      badgeText: "3D Gallery",
      techTag: "3D Showcase",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    },
    {
      websiteSlug: "royal-saffron-kitchen",
      title: "Royal Saffron Kitchen",
      screenSubtitle: "Fine Dining & Catering",
      screenTheme: "from-[#4A2816] via-[#663820] to-[#30190D]",
      category: "Dining & Hospitality",
      categorySlug: "dining-hospitality",
      priceLabel: "Starting at",
      startingPrice: "₹10,499",
      numericPrice: 10499,
      badgeText: "Live Demo",
      techTag: "Cloud Kitchen",
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=85",
    },
  ],
};

function Catalog3DCard({
  item,
  index,
  isLiked,
  onToggleLike,
  onNavigate,
  renderCategoryIcon,
  renderBadgeIcon,
}: {
  item: WebsiteCatalogItem;
  index: number;
  isLiked: boolean;
  onToggleLike: (e: React.MouseEvent, slug: string) => void;
  onNavigate: (slug: string) => void;
  renderCategoryIcon: (slug: string) => React.ReactNode;
  renderBadgeIcon: (badgeText: string) => React.ReactNode;
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, hovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -(y * 11),
      rotateY: x * 13,
      hovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, hovered: false });
  };

  const stageGradient =
    index % 2 === 0
      ? "bg-gradient-to-b from-[#56ACA9] via-[#A3E0DC] to-[#F3FBF9]"
      : "bg-gradient-to-b from-[#5CA6B5] via-[#A8DCE6] to-[#F3FAFC]";

  const screenBg =
    item.screenTheme || "from-[#1A434E] via-[#265D6B] to-[#112E36]";

  return (
    <div
      className="[perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onNavigate(item.websiteSlug)}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
            tilt.hovered
              ? "translateY(-6px) scale(1.015)"
              : "translateY(0px) scale(1)"
          }`,
        }}
        className="group cursor-pointer rounded-[24px] bg-white p-[5px] border border-white shadow-[0_12px_30px_rgba(15,82,86,0.08)] hover:shadow-[0_24px_48px_rgba(19,109,126,0.18)] transition-all duration-300 ease-out [transform-style:preserve-3d] flex flex-col justify-between h-full"
      >
        <div
          className={`relative rounded-t-[20px] rounded-b-[12px] ${stageGradient} pt-3 pb-3.5 px-3 overflow-hidden [transform-style:preserve-3d]`}
        >
          <div className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full bg-white/35 blur-2xl" />

          <div
            style={{
              transform: tilt.hovered ? "translateZ(24px)" : "translateZ(0px)",
            }}
            className="relative z-20 flex items-center justify-between gap-2 mb-2.5 transition-transform duration-300"
          >
            <button
              type="button"
              onClick={(e) => onToggleLike(e, item.websiteSlug)}
              aria-label={`Wishlist ${item.title}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${
                isLiked
                  ? "bg-rose-500 border-rose-400 text-white scale-110 shadow-sm"
                  : "bg-white/30 hover:bg-white/50 border-white/60 text-white"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFFDF5] via-[#FFF3C4] to-[#FDE68A] border border-white/80 text-[#142930] font-extrabold text-[10px] tracking-tight shadow-[0_4px_10px_rgba(15,61,70,0.12)]">
              {renderBadgeIcon(item.badgeText)}
              <span>{item.badgeText}</span>
            </span>
          </div>

          <div
            style={{
              transform: tilt.hovered
                ? "translateZ(32px) scale(1.03)"
                : "translateZ(0px) scale(1)",
            }}
            className="relative mx-auto w-[94%] transition-transform duration-300 ease-out"
          >
            <div className="rounded-t-[11px] bg-[#182226] p-[4px] pb-[5px] border-t border-x border-white/50 shadow-[0_14px_26px_rgba(12,52,58,0.22)]">
              <div className="flex items-center justify-between px-2 py-[3px] bg-[#0F171A] rounded-t-[7px]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="w-8 h-1 rounded-full bg-white/20" />
              </div>

              <div
                className={`relative h-[108px] sm:h-[114px] overflow-hidden rounded-b-[6px] bg-gradient-to-r ${screenBg} grid grid-cols-12 items-center`}
              >
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent anim-glint" />
                </div>

                <div className="col-span-6 pl-3 pr-1 py-2 z-10 text-left space-y-1">
                  <h4 className="font-serif text-[12px] sm:text-[13px] font-bold text-white leading-[1.12]">
                    {item.title}
                  </h4>
                  <p className="text-[7.5px] sm:text-[8px] text-white/85 leading-tight line-clamp-1">
                    {item.screenSubtitle || item.techTag}
                  </p>
                  <div className="pt-1 flex items-center gap-1">
                    <span className="w-4 h-1.5 rounded-full bg-[#FBBF24]" />
                    <span className="w-2 h-1.5 rounded-full bg-white/45" />
                  </div>
                </div>

                <div className="col-span-6 h-full relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[135%] object-cover object-top laptop-scroll-preview"
                  />
                  <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-black/30 to-transparent" />
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-[108%] -left-[4%] h-[7px] rounded-b-xl bg-gradient-to-r from-[#9FB0B8] via-[#FFFFFF] to-[#9FB0B8] shadow-[0_6px_14px_rgba(15,61,70,0.2)] flex items-center justify-center">
              <div className="w-9 h-[2.5px] rounded-b bg-[#7E9099]" />
            </div>
          </div>
        </div>

        <div className="relative rounded-b-[19px] bg-gradient-to-r from-[#FFFFFF] via-[#F7FCFB] to-[#DDF5F0] px-3 py-3 overflow-hidden flex items-center justify-between gap-2">
          <div className="relative z-10 flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#EAF7F5] border border-[#CBE6EC] flex items-center justify-center shrink-0">
              {renderCategoryIcon(item.categorySlug)}
            </div>
            <div className="min-w-0">
              <h3 className="text-[13px] sm:text-[13.5px] font-extrabold text-[#102A30] truncate group-hover:text-[#0F6E66] transition-colors leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
                {item.category}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <div className="text-right">
              <span className="block text-[9px] font-semibold text-slate-400 leading-none">
                {item.priceLabel}
              </span>
              <span className="block text-[13.5px] sm:text-[14.5px] font-extrabold text-[#0F292A] mt-0.5 leading-none">
                {item.startingPrice}
              </span>
            </div>

            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1B8A7E] to-[#0E635A] text-white flex items-center justify-center shadow-[0_5px_12px_rgba(15,110,102,0.28)] group-hover:scale-110 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsitesCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [data, setData] = useState<WebsitesPageData>(DEFAULT_WEBSITES_PAGE_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<"popular" | "low" | "high">("popular");
  const [likedSlugs, setLikedSlugs] = useState<Record<string, boolean>>({});
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/websites`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Websites catalog API error:", err));
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: x * 18, y: y * 14 });
  };

  const toggleWishlist = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    setLikedSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const renderCategoryTabIcon = (slug: string, isActive = false) => {
    if (slug === "all")
      return <LayoutGrid className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-[#0F6E66]"}`} />;
    if (slug.includes("fashion"))
      return <Shirt className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-sky-600"}`} />;
    if (slug.includes("dining"))
      return <Utensils className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-700"}`} />;
    if (slug.includes("health"))
      return <Plus className={`w-3.5 h-3.5 stroke-[3] shrink-0 ${isActive ? "text-white" : "text-[#0F6E66]"}`} />;
    if (slug.includes("edu"))
      return <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-700"}`} />;
    if (slug.includes("beauty"))
      return <Flower2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-rose-500"}`} />;
    if (slug.includes("ecommerce"))
      return <ShoppingCart className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-[#0F6E66]"}`} />;
    return <Camera className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-700"}`} />;
  };

  const renderBadgeIcon = (badgeText: string) => {
    const upper = badgeText.toUpperCase();
    if (upper.includes("BEST")) return <Flame className="w-2.5 h-2.5 text-orange-600 fill-orange-500" />;
    if (upper.includes("LIVE") || upper.includes("DEMO")) return <Play className="w-2.5 h-2.5 text-[#142930] fill-[#142930]" />;
    if (upper.includes("VERIF")) return <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />;
    if (upper.includes("TOP") || upper.includes("RATED")) return <Star className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />;
    if (upper.includes("3D")) return <Layers className="w-2.5 h-2.5 text-[#0F6E66]" />;
    return <Sparkles className="w-2.5 h-2.5 text-amber-600" />;
  };

  const filteredWebsites = data.websites
    .filter((site) => {
      const matchesCat =
        selectedCategory === "all" || site.categorySlug === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        site.title.toLowerCase().includes(q) ||
        site.category.toLowerCase().includes(q) ||
        site.techTag.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.numericPrice - b.numericPrice;
      if (sortBy === "high") return b.numericPrice - a.numericPrice;
      return 0;
    });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#E6F4F2] via-[#F2FAF8] to-[#DFF0EC] pb-20 text-[#102A30] overflow-x-clip">
      <div
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
        className="relative bg-gradient-to-r from-[#05262A] via-[#0B464B] to-[#062C30] text-white pt-9 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-8 overflow-hidden"
      >
        <div className="relative max-w-6xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A3D40]/90 border border-[#34D399]/40 text-[#A7F3D0] text-[10px] sm:text-[11px] font-extrabold uppercase">
            <Layers className="w-3.5 h-3.5 text-[#34D399]" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h1 className="font-serif text-[27px] sm:text-4xl lg:text-[44px] font-bold text-white">
            Explore All <span className="text-[#34D399]">Ready-to-Launch</span> Websites
          </h1>

          <p className="text-teal-100/85 text-xs sm:text-[14.5px] max-w-xl mx-auto">
            {data.subheading}
          </p>

          <div className="pt-1.5 max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-xl">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={data.searchPlaceholder}
                className="w-full bg-transparent text-xs sm:text-[13.5px] text-[#102A30] outline-none"
              />
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#19877B] text-white flex items-center justify-center shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-6 relative z-30 space-y-5">
        <div className="rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-xl p-2 sm:px-3 sm:py-2 border border-white shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {data.filterTabs.map((tab) => {
              const active = selectedCategory === tab.categorySlug;
              return (
                <button
                  key={tab.categorySlug}
                  type="button"
                  onClick={() => setSelectedCategory(tab.categorySlug)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    active ? "bg-[#0F6E66] text-white shadow-sm" : "text-[#102A30] hover:bg-[#EAF6F4]"
                  }`}
                >
                  {renderCategoryTabIcon(tab.categorySlug, active)}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredWebsites.map((item, idx) => (
            <Catalog3DCard
              key={item.websiteSlug}
              item={item}
              index={idx}
              isLiked={Boolean(likedSlugs[item.websiteSlug])}
              onToggleLike={toggleWishlist}
              onNavigate={(slug) => router.push(`/websites/detail?website=${slug}`)}
              renderCategoryIcon={(slug) => renderCategoryTabIcon(slug, false)}
              renderBadgeIcon={renderBadgeIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AllWebsitesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E6F4F2]" />}>
      <WebsitesCatalogContent />
    </Suspense>
  );
}
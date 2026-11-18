// frontend/app/(pages)/categories/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Search,
  Sparkles,
  Layers,
  CheckCircle2,
  X,
} from "lucide-react";

export interface CategoryDirectoryItem {
  categorySlug: string;
  title: string;
  tagline: string;
  websiteCountText: string;
  startingPrice: string;
  popularTemplates: string[];
  image: string;
}

export interface CategoriesDirectoryData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  searchPlaceholder: string;
  categories: CategoryDirectoryItem[];
  customBanner: {
    heading: string;
    description: string;
    ctaLabel: string;
    ctaPath: string;
  };
}

const DEFAULT_CATEGORIES_DIRECTORY: CategoriesDirectoryData = {
  eyebrowLabel: "INDUSTRY COLLECTIONS",
  heading: "Browse Websites by Business Category",
  subheading:
    "Every industry has unique customer flows. Pick your business niche to explore tailored, ready-to-launch websites.",
  searchPlaceholder: "Search industry (e.g. Fashion, Cafe, Clinic, Coaching)...",
  categories: [
    {
      categorySlug: "ecommerce-retail",
      title: "E-Commerce & Retail",
      tagline: "Multi-product stores with cart, coupons & Razorpay checkout",
      websiteCountText: "28 Websites",
      startingPrice: "₹9,999",
      popularTemplates: ["UrbanKart Pro", "ElectroHub", "FreshMart"],
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "fashion-lifestyle",
      title: "Fashion & Lifestyle",
      tagline: "Boutique lookbooks, custom stitching forms & WhatsApp orders",
      websiteCountText: "34 Websites",
      startingPrice: "₹8,999",
      popularTemplates: ["Zarii Boutique", "VogueThread", "SilkRoute"],
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "dining-hospitality",
      title: "Dining & Hospitality",
      tagline: "QR code table ordering, menu showcase & table reservations",
      websiteCountText: "19 Websites",
      startingPrice: "₹10,499",
      popularTemplates: ["The Purple Café", "Royal Saffron", "BrewHouse"],
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "beauty-wellness",
      title: "Beauty & Wellness",
      tagline: "Bridal artist portfolios, salon packages & slot bookings",
      websiteCountText: "22 Websites",
      startingPrice: "₹7,999",
      popularTemplates: ["Aura Bridal Studio", "GlowSpa", "HennaEdit"],
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "healthcare-medical",
      title: "Healthcare & Medical",
      tagline: "Doctor appointment scheduling, patient portal & SMS alerts",
      websiteCountText: "16 Websites",
      startingPrice: "₹11,999",
      popularTemplates: ["HealthCare Plus", "DentalCare", "MedLab Pro"],
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "education-learning",
      title: "Education & Learning",
      tagline: "Coaching batch enrollment, video LMS & online mock tests",
      websiteCountText: "21 Websites",
      startingPrice: "₹12,999",
      popularTemplates: ["LearnSphere", "SkillForge", "CampusHub"],
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    },
    {
      categorySlug: "creative-portfolio",
      title: "Personal & Creative Portfolio",
      tagline: "3D visual galleries for studios, creators & agencies",
      websiteCountText: "18 Websites",
      startingPrice: "₹6,999",
      popularTemplates: ["LensCraft Studio", "DevFolio 3D", "ArtisanGrid"],
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    },
  ],
  customBanner: {
    heading: "Don’t See Your Industry Listed?",
    description:
      "We build custom websites for Real Estate, Travel, Logistics, SaaS, and NGOs with full admin panels.",
    ctaLabel: "Discuss Custom Category",
    ctaPath: "/contact",
  },
};

export default function CategoriesPage() {
  const router = useRouter();
  const [data, setData] = useState<CategoriesDirectoryData>(
    DEFAULT_CATEGORIES_DIRECTORY
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/categories`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Categories page API error:", err));
  }, []);

  const filteredCategories = data.categories.filter((cat) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      cat.title.toLowerCase().includes(q) ||
      cat.tagline.toLowerCase().includes(q) ||
      cat.popularTemplates.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HEADER BANNER */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-amber-300/10 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-teal-300/35 text-teal-200 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {data.heading}
          </h1>

          <p className="text-teal-100/85 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subheading}
          </p>

          {/* Search Input */}
          <div className="pt-3 max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-[0_14px_35px_rgba(6,44,48,0.3)] border border-teal-200">
              <Search className="w-4 h-4 text-[#0D9488] mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={data.searchPlaceholder}
                className="w-full bg-transparent text-xs sm:text-sm text-[#0F292A] placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-700 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 7 INDUSTRY CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCategories.map((cat) => (
            <div
              key={cat.categorySlug}
              onClick={() =>
                router.push(`/categories/detail?category=${cat.categorySlug}`)
              }
              className="group cursor-pointer rounded-3xl bg-white overflow-hidden border border-teal-100 shadow-[0_14px_35px_rgba(15,41,42,0.07)] hover:shadow-[0_26px_55px_rgba(13,148,136,0.22)] hover:-translate-y-2 hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-[#062C30]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062C30]/90 via-[#062C30]/30 to-transparent" />

                  <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#062C30]/85 backdrop-blur-md text-teal-200 text-xs font-bold border border-teal-400/30">
                    <Layers className="w-3 h-3 text-amber-300" />
                    {cat.websiteCountText}
                  </span>

                  <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-amber-300 text-[#0F292A] text-xs font-extrabold">
                    From {cat.startingPrice}
                  </span>

                  <h2 className="absolute bottom-3.5 left-5 right-5 font-serif text-2xl font-bold text-white">
                    {cat.title}
                  </h2>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-extrabold tracking-wider uppercase text-[#0D9488]">
                      Popular Designs Inside
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popularTemplates.map((tpl) => (
                        <span
                          key={tpl}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-[#0F292A] text-[11px] font-semibold"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#0D9488]" />
                          {tpl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-teal-50/80 group-hover:bg-[#0D9488] text-[#0F292A] group-hover:text-white font-bold text-xs transition-colors">
                  <span>Explore {cat.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Custom Industry Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] p-7 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-300/30 shadow-[0_20px_50px_rgba(6,44,48,0.25)]">
          <div className="space-y-1.5 text-center md:text-left max-w-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              {data.customBanner.heading}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/85">
              {data.customBanner.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push(data.customBanner.ctaPath)}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-[#0F292A] font-extrabold text-xs sm:text-sm shadow-[0_8px_25px_rgba(251,191,36,0.4)] hover:scale-[1.03] transition-all"
          >
            <span>{data.customBanner.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
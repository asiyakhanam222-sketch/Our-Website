// frontend/app/(pages)/categories/detail/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Sparkles,
  Layers,
} from "lucide-react";

export interface CategoryMetaItem {
  categorySlug: string;
  title: string;
  description: string;
  bannerImage: string;
}

export interface CategoryWebsiteItem {
  websiteSlug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  startingPrice: string;
  badgeText: string;
  techTag: string;
  image: string;
}

const DEFAULT_CATEGORIES_META: CategoryMetaItem[] = [
  {
    categorySlug: "ecommerce-retail",
    title: "E-Commerce & Retail",
    description:
      "High-converting online stores with cart, Razorpay checkout, coupon engine, and inventory admin panel.",
    bannerImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "fashion-lifestyle",
    title: "Fashion & Lifestyle",
    description:
      "Luxury boutique & ethnic wear storefronts with lookbook zoom, custom measurement forms, and WhatsApp orders.",
    bannerImage:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "dining-hospitality",
    title: "Dining & Hospitality",
    description:
      "Modern café, restaurant, and cloud kitchen websites with QR table ordering and instant table reservations.",
    bannerImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "beauty-wellness",
    title: "Beauty & Wellness",
    description:
      "Bridal makeup artist, salon, and spa booking portals with portfolio reels and package slot scheduling.",
    bannerImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "healthcare-medical",
    title: "Healthcare & Medical",
    description:
      "Clinic & hospital websites with doctor-wise appointment slots, patient records, and SMS reminders.",
    bannerImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "education-learning",
    title: "Education & Learning",
    description:
      "Coaching institute & ed-tech portals with batch enrollment, recorded video LMS, and online mock tests.",
    bannerImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    categorySlug: "creative-portfolio",
    title: "Personal & Creative Portfolio",
    description:
      "Interactive 3D showcase websites for photographers, designers, agencies, and independent creators.",
    bannerImage:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
  },
];

const DEFAULT_CATEGORY_WEBSITES: CategoryWebsiteItem[] = [
  {
    websiteSlug: "zarii-boutique",
    title: "Zarii Boutique",
    categorySlug: "fashion-lifestyle",
    categoryTitle: "Fashion & Lifestyle",
    startingPrice: "₹9,999",
    badgeText: "BESTSELLER",
    techTag: "Next.js + Store",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "the-purple-cafe",
    title: "The Purple Café",
    categorySlug: "dining-hospitality",
    categoryTitle: "Dining & Hospitality",
    startingPrice: "₹12,999",
    badgeText: "LIVE DEMO",
    techTag: "QR Menu + Booking",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "healthcare-plus",
    title: "HealthCare Plus",
    categorySlug: "healthcare-medical",
    categoryTitle: "Healthcare & Medical",
    startingPrice: "₹11,999",
    badgeText: "VERIFIED",
    techTag: "Doctor Slot CRM",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "learnsphere",
    title: "LearnSphere",
    categorySlug: "education-learning",
    categoryTitle: "Education & Learning",
    startingPrice: "₹14,999",
    badgeText: "TOP RATED",
    techTag: "LMS + Live Batch",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "aura-bridal-studio",
    title: "Aura Bridal Studio",
    categorySlug: "beauty-wellness",
    categoryTitle: "Beauty & Wellness",
    startingPrice: "₹8,999",
    badgeText: "LIVE DEMO",
    techTag: "Artist Booking",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "urbankart-pro",
    title: "UrbanKart Pro",
    categorySlug: "ecommerce-retail",
    categoryTitle: "E-Commerce & Retail",
    startingPrice: "₹13,499",
    badgeText: "NEW",
    techTag: "Multi-Vendor Shop",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
  {
    websiteSlug: "lenscraft-studio",
    title: "LensCraft Portfolio",
    categorySlug: "creative-portfolio",
    categoryTitle: "Personal & Creative Portfolio",
    startingPrice: "₹6,999",
    badgeText: "3D GALLERY",
    techTag: "3D Showcase",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
];

function CategoryDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") || "fashion-lifestyle";

  const [categoriesList, setCategoriesList] = useState<CategoryMetaItem[]>(
    DEFAULT_CATEGORIES_META
  );
  const [websites, setWebsites] = useState<CategoryWebsiteItem[]>(
    DEFAULT_CATEGORY_WEBSITES
  );

  // Backend API Fetch via ?category= query
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || !categorySlug) return;

    fetch(
      `${apiUrl}/categories/detail?category=${encodeURIComponent(categorySlug)}`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched?.category) {
          setCategoriesList((prev) => [
            fetched.category,
            ...prev.filter(
              (c) => c.categorySlug !== fetched.category.categorySlug
            ),
          ]);
        }
        if (fetched?.websites) {
          setWebsites(fetched.websites);
        }
      })
      .catch((err) => console.error("Category detail API error:", err));
  }, [categorySlug]);

  const currentCategory =
    categoriesList.find((c) => c.categorySlug === categorySlug) ||
    categoriesList[0];

  const matchingWebsites = websites.filter(
    (w) => w.categorySlug === currentCategory.categorySlug
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HERO BANNER FOR SELECTED CATEGORY */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-10 pb-14 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => router.push("/categories")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-teal-300/35 text-xs font-bold text-teal-100 hover:border-amber-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>All Categories</span>
            </button>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs font-bold">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>{matchingWebsites.length} Ready Templates</span>
            </span>
          </div>

          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDUSTRY COLLECTION</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              {currentCategory.title}
            </h1>
            <p className="text-teal-100/85 text-sm sm:text-base leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          {/* Quick Category Switcher Pills via ?category= */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1">
            {categoriesList.map((cat) => {
              const isCurrent =
                cat.categorySlug === currentCategory.categorySlug;
              return (
                <button
                  key={cat.categorySlug}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/categories/detail?category=${cat.categorySlug}`
                    )
                  }
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? "bg-amber-300 text-[#0F292A] shadow-md"
                      : "bg-white/10 text-teal-100 hover:bg-white/20"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FILTERED 3D WEBSITE CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {matchingWebsites.map((item) => (
            <div
              key={item.websiteSlug}
              onClick={() =>
                router.push(`/websites/detail?website=${item.websiteSlug}`)
              }
              className="group cursor-pointer rounded-3xl bg-white p-5 border border-teal-100 shadow-[0_14px_35px_rgba(15,41,42,0.07)] hover:shadow-[0_26px_55px_rgba(13,148,136,0.22)] hover:-translate-y-2 hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative rounded-2xl bg-gradient-to-b from-[#E6F7F7] via-[#F4FBFB] to-[#E2ECEC] pt-8 pb-6 px-5 overflow-hidden">
                <span className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-300 text-[#0F292A] font-extrabold text-[10px] tracking-wider">
                  {item.badgeText}
                </span>

                <span className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-md bg-[#062C30]/85 text-teal-200 font-semibold text-[10px]">
                  {item.techTag}
                </span>

                <div className="relative mx-auto w-full transform group-hover:scale-[1.04] group-hover:-translate-y-1 transition-all duration-500">
                  <div className="rounded-t-xl bg-[#072629] p-1.5 border border-slate-400/50 shadow-lg">
                    <div className="flex items-center gap-1 bg-[#04191B] px-2.5 py-1 rounded-t-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>

                    <div className="relative h-44 overflow-hidden rounded-b-md bg-[#062C30]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[145%] object-cover object-top group-hover:-translate-y-14 transition-transform duration-[3200ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#062C30]/85 via-transparent to-transparent" />

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                        <p className="font-serif text-sm font-bold text-white">
                          {item.title}
                        </p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-300 text-[#0F292A] font-bold text-[10px]">
                          <Eye className="w-3 h-3" /> Live Demo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mx-auto w-[108%] -left-[4%] relative h-2.5 rounded-b-xl bg-gradient-to-r from-slate-300 via-white to-slate-300 shadow-md" />
                </div>
              </div>

              <div className="pt-4 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#0F292A] group-hover:text-[#0D9488] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.categoryTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400">
                      Starting at
                    </span>
                    <span className="text-base font-extrabold text-[#0F292A]">
                      {item.startingPrice}
                    </span>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FAFA]" />}>
      <CategoryDetailContent />
    </Suspense>
  );
}
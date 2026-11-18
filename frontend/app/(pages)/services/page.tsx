// frontend/app/(pages)/services/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Palette,
  Code2,
  Server,
  Rocket,
  CreditCard,
  LayoutDashboard,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export interface AgencyServiceDetail {
  serviceSlug: string;
  icon: "palette" | "code" | "server" | "rocket" | "payment" | "admin";
  title: string;
  tagline: string;
  startingPrice: string;
  deliveryTime: string;
  deliverables: string[];
}

export interface ServicesPageData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  services: AgencyServiceDetail[];
}

const DEFAULT_SERVICES_PAGE_DATA: ServicesPageData = {
  eyebrowLabel: "WEB ENGINEERING & LAUNCH STUDIO",
  heading: "End-to-End Website Customization & Development",
  subheading:
    "Whether you buy a ready template or commission a bespoke 3D web platform, our engineers handle design, backend APIs, payments, and deployment.",
  services: [
    {
      serviceSlug: "brand-customization",
      icon: "palette",
      title: "Brand & UI Personalization",
      tagline:
        "Transform any marketplace template into your exclusive brand identity.",
      startingPrice: "₹2,999",
      deliveryTime: "24–48 Hours",
      deliverables: [
        "Custom Logo, Color Palette & Typography Match",
        "Product Catalog, Photos & Copywriting Upload",
        "Custom Domain & Social Links Configuration",
      ],
    },
    {
      serviceSlug: "fullstack-development",
      icon: "code",
      title: "Custom Next.js & MERN Apps",
      tagline:
        "Bespoke 3D interactive websites and scalable web applications from scratch.",
      startingPrice: "₹19,999",
      deliveryTime: "7–14 Days",
      deliverables: [
        "Custom 3D Interactive UI/UX Architecture",
        "REST / Next.js Backend APIs & MongoDB Schema",
        "100% Clean, Documented Source Code Ownership",
      ],
    },
    {
      serviceSlug: "payment-whatsapp",
      icon: "payment",
      title: "Razorpay & WhatsApp Checkout",
      tagline:
        "Accept instant UPI/Card payments and automated WhatsApp order alerts.",
      startingPrice: "₹2,499",
      deliveryTime: "24 Hours",
      deliverables: [
        "Razorpay / Stripe Live Gateway Integration",
        "One-Click WhatsApp Order Summary Formatting",
        "Automated Invoice & Order Confirmation",
      ],
    },
    {
      serviceSlug: "admin-cms",
      icon: "admin",
      title: "Custom Admin Panel & CRM",
      tagline:
        "Control products, bookings, users, and coupons without touching code.",
      startingPrice: "₹4,999",
      deliveryTime: "2–4 Days",
      deliverables: [
        "Role-Based Secure Admin Login Dashboard",
        "Real-Time Sales, Orders & Booking Analytics",
        "Dynamic Banner, Pricing & Inventory Manager",
      ],
    },
    {
      serviceSlug: "cloud-deployment",
      icon: "server",
      title: "Domain, Cloud & SSL Launch",
      tagline:
        "Zero-downtime production hosting with enterprise speed and security.",
      startingPrice: "₹1,999",
      deliveryTime: "Same Day",
      deliverables: [
        "Custom .com / .in Domain DNS Configuration",
        "Vercel / Render / Cloud Server + Free SSL",
        "MongoDB Atlas Automated Daily Backup Setup",
      ],
    },
    {
      serviceSlug: "seo-growth",
      icon: "rocket",
      title: "Speed & Google SEO Boost",
      tagline:
        "Rank higher on Google with 99+ Lighthouse performance optimization.",
      startingPrice: "₹3,499",
      deliveryTime: "2–3 Days",
      deliverables: [
        "Core Web Vitals & Image Compression Tuning",
        "Dynamic Sitemap, OpenGraph & JSON-LD Schema",
        "Google Search Console & Analytics Setup",
      ],
    },
  ],
};

export default function ServicesPage() {
  const router = useRouter();
  const [data, setData] = useState<ServicesPageData>(
    DEFAULT_SERVICES_PAGE_DATA
  );

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Services page API error:", err));
  }, []);

  const renderIcon = (icon: AgencyServiceDetail["icon"]) => {
    const cls = "w-6 h-6 text-[#0D9488] group-hover:text-white transition-colors";
    if (icon === "palette") return <Palette className={cls} />;
    if (icon === "code") return <Code2 className={cls} />;
    if (icon === "payment") return <CreditCard className={cls} />;
    if (icon === "admin") return <LayoutDashboard className={cls} />;
    if (icon === "server") return <Server className={cls} />;
    return <Rocket className={cls} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HEADER BANNER */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 w-96 h-96 rounded-full bg-teal-300/15 blur-[110px]" />

        <div className="relative max-w-7xl mx-auto text-center space-y-3">
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
        </div>
      </div>

      {/* 6 SERVICES CARDS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service) => (
            <div
              key={service.serviceSlug}
              className="group rounded-3xl p-6 sm:p-7 bg-white border border-teal-100 shadow-[0_12px_30px_rgba(15,41,42,0.06)] hover:shadow-[0_24px_48px_rgba(13,148,136,0.2)] hover:-translate-y-2 hover:border-teal-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center group-hover:bg-[#0D9488] group-hover:border-transparent transition-all">
                    {renderIcon(service.icon)}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                    ⏱ {service.deliveryTime}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#0F292A] group-hover:text-[#0D9488] transition-colors">
                  {service.title}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.tagline}
                </p>

                <div className="my-4 py-3 border-y border-teal-50 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Starting Package
                  </span>
                  <span className="text-xl font-extrabold text-[#0F292A]">
                    {service.startingPrice}
                  </span>
                </div>

                <ul className="space-y-2">
                  {service.deliverables.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <Check className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/contact?service=${service.serviceSlug}`)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-teal-50 text-[#0D9488] border border-teal-200 font-bold text-xs group-hover:bg-[#0D9488] group-hover:text-white group-hover:border-transparent transition-all"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// frontend/app/(pages)/services/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Palette,
  Code2,
  Server,
  Rocket,
  CreditCard,
  LayoutDashboard,
  Check,
  ArrowUpRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Gauge,
  Zap,
} from "lucide-react";

export interface AgencyServiceDetail {
  serviceSlug: string;
  icon: "palette" | "code" | "server" | "rocket" | "payment" | "admin";
  title: string;
  tagline: string;
  startingPrice: string;
  deliveryTime: string;
  deliverables: string[];
  group?: "design" | "engineering" | "growth";
}

export interface ServicesPageData {
  eyebrowLabel: string;
  headingLine1: string;
  headingHighlight: string;
  headingItalic: string;
  subheading: string;
  services: AgencyServiceDetail[];
}

const DEFAULT_SERVICES_PAGE_DATA: ServicesPageData = {
  eyebrowLabel: "WEB ENGINEERING STUDIO • 2026",
  headingLine1: "End-to-End Website",
  headingHighlight: "Customization &",
  headingItalic: "Development",
  subheading:
    "From exclusive brand styling to bespoke full-stack web platforms, Razorpay checkout, and high-speed cloud deployment.",
  services: [
    {
      serviceSlug: "brand-customization",
      icon: "palette",
      title: "Brand & UI Personalization",
      tagline:
        "Transform any marketplace template into your exclusive brand identity.",
      startingPrice: "₹2,999",
      deliveryTime: "24–48 Hrs",
      deliverables: [
        "Custom Logo, Color Palette & Typography Match",
        "Product Catalog, Photos & Copywriting Upload",
        "Custom Domain & Social Links Configuration",
      ],
      group: "design",
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
      group: "engineering",
    },
    {
      serviceSlug: "payment-whatsapp",
      icon: "payment",
      title: "Razorpay & WhatsApp Checkout",
      tagline:
        "Accept instant UPI/Card payments and automated WhatsApp order alerts.",
      startingPrice: "₹2,499",
      deliveryTime: "24 Hrs",
      deliverables: [
        "Razorpay / Stripe Live Gateway Integration",
        "One-Click WhatsApp Order Summary Formatting",
        "Automated Invoice & Order Confirmation",
      ],
      group: "growth",
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
      group: "engineering",
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
      group: "design",
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
      group: "growth",
    },
  ],
};

const FILTER_TABS = [
  { id: "all", label: "All Services" },
  { id: "design", label: "Design & Launch" },
  { id: "engineering", label: "Full-Stack & Admin" },
  { id: "growth", label: "Payments & SEO" },
] as const;

const LUXURY_GLASS_PALETTES = [
  {
    surface:
      "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(232,246,249,0.85) 55%, rgba(214,239,244,0.78) 100%)",
    glow: "rgba(19, 109, 126, 0.18)",
  },
  {
    surface:
      "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(251,246,236,0.85) 55%, rgba(243,230,205,0.78) 100%)",
    glow: "rgba(200, 164, 93, 0.22)",
  },
  {
    surface:
      "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(234,248,245,0.85) 55%, rgba(210,240,234,0.78) 100%)",
    glow: "rgba(14, 147, 132, 0.18)",
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [data, setData] = useState<ServicesPageData>(
    DEFAULT_SERVICES_PAGE_DATA
  );
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [consoleIdx, setConsoleIdx] = useState<number>(0);

  const [heroMouse, setHeroMouse] = useState<{
    x: number;
    y: number;
    active: boolean;
  }>({
    x: 420,
    y: 160,
    active: false,
  });

  const [cardTilt, setCardTilt] = useState<{
    idx: number | null;
    rotateX: number;
    rotateY: number;
    spotX: number;
    spotY: number;
  }>({
    idx: null,
    rotateX: 0,
    rotateY: 0,
    spotX: 150,
    spotY: 110,
  });

  const pageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const consoleCardRef = useRef<HTMLDivElement | null>(null);

  // Backend API Fetch
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/services`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.services)) {
          setData({ ...DEFAULT_SERVICES_PAGE_DATA, ...fetched });
        }
      })
      .catch((err) => console.error("Services page API error:", err));
  }, []);

  // Auto-cycle Hero Studio Console when user is not hovering a card
  useEffect(() => {
    if (hoveredIdx !== null || data.services.length <= 1) return;
    const timer = setInterval(() => {
      setConsoleIdx((prev) => (prev + 1) % data.services.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [hoveredIdx, data.services.length]);

  // Smooth transition inside Hero Studio Console when active service changes
  useEffect(() => {
    if (!consoleCardRef.current) return;
    gsap.fromTo(
      consoleCardRef.current,
      { y: 6, opacity: 0.85, scale: 0.985 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );
  }, [consoleIdx, hoveredIdx]);

  // 2026 Continuous Ambient & Glass Sheen Animations
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".srv-hero-reveal",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );

      // Volumetric Aura Drift in Hero
      gsap.to(".srv-aura-teal", {
        x: 38,
        y: -22,
        scale: 1.15,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".srv-aura-gold", {
        x: -38,
        y: 22,
        scale: 1.18,
        duration: 8.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Gentle 3D Levitation for Hero Studio Console
      gsap.to(".srv-console-levitate", {
        y: -6,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle Alternating Levitation for Cards
      gsap.utils.toArray<HTMLElement>(".srv-float-slot").forEach((slot, i) => {
        gsap.to(slot, {
          y: i % 2 === 0 ? -3.5 : 3.5,
          duration: 2.8 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Always-Running Diagonal Glass Sheen Sweep across Cards
      gsap.utils.toArray<HTMLElement>(".srv-auto-sheen").forEach((beam, i) => {
        gsap.fromTo(
          beam,
          { xPercent: -160 },
          {
            xPercent: 350,
            duration: 2.2,
            repeat: -1,
            repeatDelay: 3.8 + i * 0.85,
            delay: i * 0.6,
            ease: "power2.inOut",
          }
        );
      });
    }, pageEl);

    return () => ctx.revert();
  }, []);

  // Re-Stagger Cards on Filter Switch
  useEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".srv-luxury-card",
        { y: 16, opacity: 0.88, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      );
    }, pageEl);

    return () => ctx.revert();
  }, [activeTab]);

  // Hover Zoom-In / Zoom-Out Pulse on Card
  const handleCardMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
    const el = cardRefs.current[idx];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap
      .timeline()
      .to(el, {
        scale: 1.028,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(el, {
        scale: 1.012,
        y: -3,
        duration: 0.38,
        ease: "sine.inOut",
      });
  };

  const handleCardMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    setCardTilt({
      idx: null,
      rotateX: 0,
      rotateY: 0,
      spotX: 150,
      spotY: 110,
    });
    const el = cardRefs.current[idx];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      scale: 1,
      y: 0,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const normX = relX / rect.width - 0.5;
    const normY = relY / rect.height - 0.5;

    const enableTilt =
      typeof window !== "undefined" && window.innerWidth >= 1024;

    setCardTilt({
      idx,
      rotateX: enableTilt ? -(normY * 6) : 0,
      rotateY: enableTilt ? normX * 7 : 0,
      spotX: relX,
      spotY: relY,
    });
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const renderIcon = (
    icon: AgencyServiceDetail["icon"],
    isHighlighted: boolean,
    sizeClass: string = "w-4 h-4"
  ) => {
    const cls = `${sizeClass} transition-colors duration-300 ${
      isHighlighted ? "text-[#F3D59B]" : "text-[#136D7E]"
    }`;
    if (icon === "palette") return <Palette className={cls} />;
    if (icon === "code") return <Code2 className={cls} />;
    if (icon === "payment") return <CreditCard className={cls} />;
    if (icon === "admin") return <LayoutDashboard className={cls} />;
    if (icon === "server") return <Server className={cls} />;
    return <Rocket className={cls} />;
  };

  const filteredServices = data.services.filter((srv, index) => {
    const inferredGroup =
      srv.group ||
      (index === 0 || index === 4
        ? "design"
        : index === 1 || index === 3
        ? "engineering"
        : "growth");
    return activeTab === "all" || inferredGroup === activeTab;
  });

  const activeConsoleService =
    (hoveredIdx !== null && filteredServices[hoveredIdx]) ||
    data.services[consoleIdx % data.services.length] ||
    data.services[0];

  return (
    <div
      ref={pageRef}
      className="services-luxury-2026 min-h-screen flex flex-col text-[#0B252C] overflow-x-clip"
    >
      {/* 2026 2-Color Editorial Typography & Animated Glass Shimmer */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .services-luxury-2026 {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .font-srv-2color {
          font-family: 'Instrument Serif', Georgia, serif;
        }
        .srv-studio-mesh {
          background-image: radial-gradient(rgba(255, 255, 255, 0.13) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        @keyframes srvProgressSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        .srv-console-progress {
          animation: srvProgressSweep 3.8s ease-in-out infinite;
        }
      `}</style>

      {/* ===================================================================
          1. COMPACT 2026 SPATIAL GLASS STUDIO HERO
             (Solid Split-Stage: Left 2-Color Editorial + Right Live Studio Console)
         =================================================================== */}
      <div
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroMouse((prev) => ({ ...prev, active: false }))}
        className="relative overflow-hidden bg-gradient-to-br from-[#072328] via-[#0F4D59] to-[#147486] text-white py-9 sm:py-12 px-4 sm:px-8 border-b border-white/15 shadow-[0_20px_50px_rgba(7,35,40,0.24)]"
      >
        {/* Architectural Mesh & Mouse Spotlight */}
        <div className="srv-studio-mesh pointer-events-none absolute inset-0 opacity-60" />
        <div
          style={{
            opacity: heroMouse.active ? 1 : 0,
            background: `radial-gradient(400px circle at ${heroMouse.x}px ${heroMouse.y}px, rgba(243, 213, 155, 0.15), rgba(45, 212, 191, 0.08) 45%, transparent 72%)`,
          }}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        />

        {/* Volumetric Breathing Auras */}
        <div className="srv-aura-teal pointer-events-none absolute -top-24 -left-16 w-[350px] h-[350px] rounded-full bg-[#2DD4BF]/18 blur-[110px]" />
        <div className="srv-aura-gold pointer-events-none absolute -bottom-24 right-8 w-[370px] h-[370px] rounded-full bg-[#F3D59B]/22 blur-[110px]" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
          {/* LEFT 6 COLS: 2-COLOR LUXURY TYPOGRAPHY + GLASS FILTER PILLS */}
          <div className="lg:col-span-6 space-y-3.5 text-center lg:text-left">
            <div className="srv-hero-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 text-[#F3D59B] text-[10px] font-extrabold tracking-[0.22em] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-ping" />
              <span>{data.eyebrowLabel}</span>
            </div>

            {/* 2-Color Luxury Typography */}
            <h1 className="srv-hero-reveal text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.09] text-white">
              {data.headingLine1}{" "}
              <span className="bg-gradient-to-r from-white via-teal-100 to-teal-200 bg-clip-text text-transparent">
                {data.headingHighlight}
              </span>{" "}
              <span className="font-srv-2color italic font-normal text-[34px] sm:text-[48px] lg:text-[56px] text-[#F3D59B] tracking-normal">
                {data.headingItalic}
              </span>
            </h1>

            <p className="srv-hero-reveal text-xs sm:text-[14px] text-teal-100/85 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {data.subheading}
            </p>

            {/* Interactive Glass Filter Tabs */}
            <div className="srv-hero-reveal pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {FILTER_TABS.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-[#F3D59B] text-[#072328] shadow-[0_8px_20px_rgba(243,213,155,0.32)] scale-[1.03]"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xl"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================================================================
              RIGHT 6 COLS: LIVE ANIMATED 3D FROSTED-GLASS ENGINEERING CONSOLE
             =================================================================== */}
          {activeConsoleService && (
            <div className="lg:col-span-6 srv-hero-reveal">
              <div className="srv-console-levitate relative max-w-lg mx-auto lg:ml-auto">
                {/* Back Frosted Glass Layer for 3D Depth */}
                <div className="hidden sm:block absolute -inset-x-3 -bottom-2.5 h-full rounded-[26px] bg-white/8 backdrop-blur-xl border border-white/15 rotate-[1.8deg] scale-[0.97] pointer-events-none" />

                {/* Main Frosted Glass Studio Console */}
                <div
                  onClick={() =>
                    router.push(
                      `/contact?service=${activeConsoleService.serviceSlug}`
                    )
                  }
                  className="group cursor-pointer relative overflow-hidden rounded-[26px] p-4 sm:p-5 bg-white/14 hover:bg-white/18 backdrop-blur-2xl border border-white/30 ring-1 ring-[#F3D59B]/30 shadow-[0_24px_60px_rgba(4,20,24,0.38)] transition-colors"
                >
                  {/* Top Console Bar + Live Progress Line */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/15">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F3D59B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4BF]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/35" />
                      <span className="ml-1.5 text-[10px] font-extrabold tracking-[0.18em] uppercase text-teal-100/90">
                        LIVE SERVICE PREVIEW
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/30 border border-white/15 text-[10px] font-bold text-teal-100">
                        <Clock className="w-2.5 h-2.5 text-[#F3D59B]" />
                        <span>{activeConsoleService.deliveryTime}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F3D59B] text-[#072328] text-[10px] font-extrabold">
                        {activeConsoleService.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Sweep Bar */}
                  <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
                    <div className="srv-console-progress w-1/3 h-full bg-gradient-to-r from-transparent via-[#F3D59B] to-transparent" />
                  </div>

                  {/* Dynamic Service Preview Body */}
                  <div ref={consoleCardRef} className="pt-3.5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#072328] to-[#136D7E] border border-white/25 flex items-center justify-center shrink-0 shadow-md">
                          {renderIcon(
                            activeConsoleService.icon,
                            true,
                            "w-5 h-5"
                          )}
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-base sm:text-lg font-extrabold text-white truncate">
                            {activeConsoleService.title}
                          </h2>
                          <p className="text-[11.5px] text-teal-100/85 line-clamp-1">
                            {activeConsoleService.tagline}
                          </p>
                        </div>
                      </div>

                      <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#F3D59B] text-white group-hover:text-[#072328] flex items-center justify-center shrink-0 transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>

                    {/* Mini Glass Deliverable Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {activeConsoleService.deliverables.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl bg-black/20 border border-white/12 px-2.5 py-2 flex items-start gap-1.5"
                        >
                          <Zap className="w-3 h-3 text-[#F3D59B] shrink-0 mt-0.5" />
                          <span className="text-[10.5px] text-teal-50 leading-snug line-clamp-2 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================================
          2. HIGH-CONTRAST COOL PEARL CANVAS + 3D LUXURY FROSTED-GLASS CARDS
         =================================================================== */}
      <div className="flex-1 bg-gradient-to-b from-[#E4EFF2] via-[#EEF5F7] to-[#E1ECEF] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-11 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 [perspective:1400px]">
            {filteredServices.map((service, idx) => {
              const isHovered = hoveredIdx === idx;
              const isTilting = cardTilt.idx === idx;
              const palette =
                LUXURY_GLASS_PALETTES[idx % LUXURY_GLASS_PALETTES.length];
              const stepNumber = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={service.serviceSlug}
                  className="srv-luxury-card srv-float-slot"
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    onMouseEnter={() => handleCardMouseEnter(idx)}
                    onMouseLeave={() => handleCardMouseLeave(idx)}
                    onMouseMove={(e) => handleCardMouseMove(e, idx)}
                    onClick={() =>
                      router.push(`/contact?service=${service.serviceSlug}`)
                    }
                    style={{
                      backgroundImage: palette.surface,
                      transform: isTilting
                        ? `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`
                        : "rotateX(0deg) rotateY(0deg)",
                      transition: isTilting
                        ? "transform 0.12s ease-out, box-shadow 0.3s ease"
                        : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
                    }}
                    className="group relative h-full cursor-pointer rounded-[26px] backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 hover:ring-[#136D7E]/55 p-4 sm:p-5 shadow-[0_12px_32px_rgba(11,37,44,0.06)] hover:shadow-[0_26px_60px_rgba(19,109,126,0.2)] flex flex-col justify-between overflow-hidden will-change-transform"
                  >
                    {/* Interactive Cursor Champagne-Teal Spotlight */}
                    <div
                      style={{
                        opacity: isHovered ? 1 : 0,
                        background: `radial-gradient(210px circle at ${cardTilt.spotX}px ${cardTilt.spotY}px, ${palette.glow}, rgba(200, 164, 93, 0.14) 50%, transparent 75%)`,
                      }}
                      className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                    />

                    {/* Always-Running Diagonal Glass Sheen Sweep */}
                    <div className="srv-auto-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 z-10 bg-gradient-to-r from-transparent via-white/85 to-transparent skew-x-[-20deg]" />

                    {/* Subtle Editorial Number Watermark */}
                    <span className="pointer-events-none select-none absolute -bottom-3 right-3 font-srv-2color italic text-[68px] leading-none text-[#136D7E]/[0.06] group-hover:text-[#B68938]/[0.14] transition-colors">
                      {stepNumber}
                    </span>

                    {/* TOP LUXURY JEWEL HEADER */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/95">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-2xs ${
                              isHovered
                                ? "bg-gradient-to-br from-[#072328] to-[#136D7E] border-transparent scale-105"
                                : "bg-white border-white"
                            }`}
                          >
                            {renderIcon(service.icon, isHovered)}
                          </div>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-white text-slate-600 text-[10px] font-bold shadow-2xs">
                            <Clock className="w-2.5 h-2.5 text-[#136D7E]" />
                            <span>{service.deliveryTime}</span>
                          </span>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FAF3E3] to-[#F5E6C4] border border-white text-[#8F6824] text-xs font-extrabold shadow-2xs">
                          {service.startingPrice}
                        </span>
                      </div>

                      {/* TITLE & TAGLINE */}
                      <h2 className="text-[16px] sm:text-[17px] font-extrabold text-[#0B252C] group-hover:text-[#136D7E] transition-colors leading-snug">
                        {service.title}
                      </h2>
                      <p className="mt-1 text-[12px] text-slate-600 leading-relaxed line-clamp-2">
                        {service.tagline}
                      </p>

                      {/* INNER FROSTED DELIVERABLES PANEL */}
                      <div className="mt-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/95 p-3 space-y-1.5 shadow-2xs">
                        {service.deliverables.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-2 text-[11.5px] text-slate-700 font-medium"
                          >
                            <span className="w-4 h-4 rounded-full bg-[#E3F2F5] text-[#136D7E] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BOTTOM LUXURY ACTION BAR */}
                    <div className="relative z-10 mt-4 pt-2.5 border-t border-white/95 flex items-center justify-between">
                      <span className="text-[11.5px] font-extrabold text-[#136D7E]">
                        Book This Service
                      </span>

                      <span className="w-8 h-8 rounded-full bg-white group-hover:bg-gradient-to-r group-hover:from-[#072328] group-hover:to-[#136D7E] text-[#136D7E] group-hover:text-[#F3D59B] border border-white flex items-center justify-center shadow-2xs transition-all duration-300 group-hover:scale-105">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================
              3. COMPACT STUDIO ENGINEERING CTA BAR
             =================================================================== */}
          <div className="relative overflow-hidden rounded-[24px] bg-white/80 backdrop-blur-2xl border border-white ring-1 ring-[#136D7E]/15 px-5 py-4 sm:px-7 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_14px_36px_rgba(11,37,44,0.06)]">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-gradient-to-br from-[#072328] to-[#136D7E] text-[#F3D59B] items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-extrabold tracking-tight text-[#0B252C]">
                  Need a Bespoke{" "}
                  <span className="font-srv-2color italic font-normal text-xl sm:text-2xl text-[#B68938]">
                    Full-Stack Web Solution?
                  </span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Share your project goals and get a tailored architecture
                  roadmap from our engineers.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/contact?service=custom-engineering")}
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#072328] via-[#0F4D59] to-[#147486] text-white font-bold text-xs shadow-[0_10px_24px_rgba(19,109,126,0.22)] hover:-translate-y-0.5 transition-all"
            >
              <span>Talk to Our Engineers</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F3D59B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ChevronDown,
  ArrowRight,
  Headphones,
  Layers,
  Palette,
  CreditCard,
  CloudUpload,
  Code2,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export interface FaqItem {
  categoryTag: string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  supportCard: {
    badgeText: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaPath: string;
  };
  items: FaqItem[];
}

const DEFAULT_FAQ_DATA: FaqSectionData = {
  eyebrowLabel: "HELP & ARCHITECTURE",
  heading: "Everything You Need to Know",
  subheading:
    "Transparent answers about 100% source code ownership, rapid brand customization, payment gateways, and live cloud deployment.",
  supportCard: {
    badgeText: "ARCHITECTS ONLINE",
    title: "Talk Directly With Our Web Studio",
    description:
      "Not sure which template fits your business or want custom 3D animations? Book a free 15-minute strategy call with our engineers.",
    ctaLabel: "Book Free Consultation",
    ctaPath: "/contact",
  },
  items: [
    {
      categoryTag: "OWNERSHIP",
      question: "Do I get 100% ownership and full source code after purchase?",
      answer:
        "Yes. Every website comes with complete, clean Next.js & Tailwind CSS source code, backend APIs, and database schemas with zero recurring license lock-in.",
    },
    {
      categoryTag: "CUSTOMIZATION",
      question:
        "How fast can you customize a template with my brand name and colors?",
      answer:
        "With our Business Launch Pro package, our team personalizes your logo, brand palette, product catalog, and content within 24 to 48 hours.",
    },
    {
      categoryTag: "PAYMENTS & ADMIN",
      question:
        "Are Razorpay payments, WhatsApp orders, and Admin Panel included?",
      answer:
        "Yes! All e-commerce, café, clinic, and coaching templates include a working Admin Dashboard to manage orders and bookings, plus Razorpay and WhatsApp checkout.",
    },
    {
      categoryTag: "DEPLOYMENT",
      question:
        "I don't know coding. Will you host the website on my domain?",
      answer:
        "Absolutely. Choose the 'Full Live Setup' option and our engineers will configure your custom domain, free SSL certificate, cloud hosting, and database for you.",
    },
    {
      categoryTag: "CUSTOM BUILD",
      question:
        "Can I request a completely unique website built from scratch?",
      answer:
        "Yes. Our Custom Web Studio builds bespoke 3D interactive websites, multi-vendor marketplaces, and custom SaaS portals tailored to your exact workflow.",
    },
  ],
};

export default function FAQ() {
  const router = useRouter();
  const [data, setData] = useState<FaqSectionData>(DEFAULT_FAQ_DATA);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Backend API Fetch
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/faq`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched && Array.isArray(fetched.items)) {
          setData(fetched);
        }
      })
      .catch((err) => console.error("FAQ API error:", err));
  }, []);

  // Safe IntersectionObserver + GSAP Entrance & Ambient Gradient Aurora Motion
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const runEntrance = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      gsap.fromTo(
        ".faq-modern-item",
        { y: 18, opacity: 0.92 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
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

    const ctx = gsap.context(() => {
      gsap.to(".faq-float-badge", {
        y: -7,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".faq-aurora-orb-1", {
        x: 35,
        y: 25,
        scale: 1.12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".faq-aurora-orb-2", {
        x: -35,
        y: -25,
        scale: 1.15,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionEl);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const categories = [
    "ALL",
    ...Array.from(new Set(data.items.map((item) => item.categoryTag))),
  ];

  const filteredItems =
    activeFilter === "ALL"
      ? data.items
      : data.items.filter((item) => item.categoryTag === activeFilter);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderModernHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#0F2933]">{headingText}</span>;
    }
    const splitPoint = Math.min(2, Math.floor(words.length / 2));
    return (
      <>
        <span className="text-[#0F2933]">
          {words.slice(0, splitPoint).join(" ")}{" "}
        </span>
        <span className="bg-gradient-to-r from-[#136D7E] via-[#0E9384] to-[#0284C7] bg-clip-text text-transparent">
          {words.slice(splitPoint).join(" ")}
        </span>
      </>
    );
  };

  const renderCategoryIcon = (tag: string, idx: number, isOpen: boolean) => {
    const cls = `w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-300 ${
      isOpen ? "text-white" : "text-[#136D7E]"
    }`;
    const upper = tag.toUpperCase();
    if (upper.includes("OWNER") || idx === 0)
      return <Layers className={cls} strokeWidth={2.2} />;
    if (upper.includes("CUSTOMIZ") || idx === 1)
      return <Palette className={cls} strokeWidth={2.2} />;
    if (upper.includes("PAY") || upper.includes("ADMIN") || idx === 2)
      return <CreditCard className={cls} strokeWidth={2.2} />;
    if (upper.includes("DEPLOY") || idx === 3)
      return <CloudUpload className={cls} strokeWidth={2.2} />;
    return <Code2 className={cls} strokeWidth={2.2} />;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#E4F4F7] via-[#F6FBFC] to-[#E8F2FA] text-[#0F2933]"
    >
      {/* LAYERED MESH DOTS & ANIMATED GRADIENT AURORA ORBS */}
      <div
        style={{
          backgroundImage:
            "radial-gradient(rgba(19, 109, 126, 0.14) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        className="pointer-events-none absolute inset-0 opacity-45"
      />
      <div className="faq-aurora-orb-1 pointer-events-none absolute -top-24 right-6 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#2DD4BF]/25 to-[#38BDF8]/20 blur-[120px]" />
      <div className="faq-aurora-orb-2 pointer-events-none absolute -bottom-24 left-6 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#0EA5E9]/20 to-[#FDE68A]/30 blur-[120px]" />

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 5 COLS: GRADIENT HEADING + DEEP OCEAN-CYAN SUPPORT CARD */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#E0F2F6] to-[#D4F3EE] border border-[#B2E0E8] text-[#136D7E] text-[10.5px] font-extrabold tracking-[0.18em] uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0E9384]" />
                <span>{data.eyebrowLabel}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.12] tracking-[-0.025em]">
                {renderModernHeading(data.heading)}
              </h2>

              <p className="text-xs sm:text-[14.5px] text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                {data.subheading}
              </p>
            </div>

            {/* Rich Multi-Stop Ocean-Teal, Sapphire & Cyan Gradient Support Card */}
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#072B33] via-[#116475] to-[#0D8A9E] p-5 sm:p-7 text-white border border-white/25 shadow-[0_24px_55px_rgba(17,100,117,0.30)]">
              {/* Glowing Gradient Highlights */}
              <div className="pointer-events-none absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#2DD4BF]/30 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-12 w-44 h-44 rounded-full bg-[#FBBF24]/25 blur-2xl" />

              {/* Floating Modern Headset Graphic (Mobile-Safe Sizing) */}
              <div className="faq-float-badge pointer-events-none absolute right-2.5 bottom-2.5 sm:right-3 sm:bottom-3 w-20 h-20 sm:w-28 sm:h-28 opacity-95">
                <ModernStudioHeadsetSvg />
              </div>

              <div className="relative z-10 space-y-3.5 pr-20 sm:pr-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/25 text-white text-[10px] font-extrabold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{data.supportCard.badgeText}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
                  {data.supportCard.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-cyan-50/90 leading-relaxed">
                  {data.supportCard.description}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => router.push(data.supportCard.ctaPath)}
                    className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] text-[#0F2933] font-extrabold text-xs sm:text-[13px] shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{data.supportCard.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gradient Glass Trust Strip */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-white via-[#F3FAFC] to-[#E6F4F7] border border-[#CBE7ED] p-3.5 flex items-center gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#136D7E] shrink-0" />
                <span className="text-xs font-bold text-[#0F2933]">
                  24–48 Hr Launch
                </span>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-white via-[#F2FBF9] to-[#E3F5F1] border border-[#C6EAE3] p-3.5 flex items-center gap-2.5 shadow-2xs">
                <Headphones className="w-4 h-4 text-[#0E9384] shrink-0" />
                <span className="text-xs font-bold text-[#0F2933]">
                  Dedicated Support
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 7 COLS: GRADIENT FILTER TABS + GRADIENT ACCORDION CARDS */}
          <div className="lg:col-span-7 space-y-4">
            {/* Interactive Gradient Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => {
                const isSelected = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveFilter(cat);
                      setOpenIndex(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide uppercase whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-[#136D7E] via-[#0E9384] to-[#0284C7] text-white shadow-md"
                        : "bg-gradient-to-r from-white to-[#F2F9FB] text-slate-600 border border-[#CBE4EA] hover:border-[#136D7E] hover:text-[#136D7E]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Gradient Accordion Items */}
            <div className="space-y-3">
              {filteredItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                const stepNum = String(idx + 1).padStart(2, "0");

                return (
                  <div
                    key={item.question}
                    className={`faq-modern-item rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-gradient-to-br from-[#FFFFFF] via-[#E8F6F9] to-[#DDF1F6] border-[#136D7E] shadow-[0_18px_40px_rgba(19,109,126,0.16)]"
                        : "bg-gradient-to-r from-white/95 via-[#F5FAFC]/90 to-[#ECF6F9]/90 border-[#CBE4EA] hover:border-[#136D7E]/60 shadow-[0_6px_18px_rgba(15,41,51,0.05)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3.5 p-4 sm:p-5 text-left group"
                    >
                      {/* Left Gradient Icon Pill */}
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-br from-[#136D7E] via-[#0E9384] to-[#0284C7] shadow-md scale-105"
                            : "bg-gradient-to-br from-[#E2F3F7] to-[#D1ECEF] group-hover:from-[#D0ECF2] group-hover:to-[#BCE3E8]"
                        }`}
                      >
                        {renderCategoryIcon(item.categoryTag, idx, isOpen)}
                      </div>

                      {/* Tag + Question */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#136D7E]">
                          <span>{stepNum}</span>
                          <span className="w-1 h-1 rounded-full bg-[#0E9384]" />
                          <span>{item.categoryTag}</span>
                        </div>

                        <h3 className="text-[14px] sm:text-[15.5px] font-bold text-[#0F2933] group-hover:text-[#136D7E] transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>

                      {/* Right Gradient Chevron Button */}
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-r from-[#136D7E] to-[#0E9384] text-white rotate-180 shadow-sm"
                            : "bg-gradient-to-br from-[#E6F4F7] to-[#D7EEF2] text-[#136D7E] group-hover:from-[#136D7E] group-hover:to-[#0E9384] group-hover:text-white"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Smooth Expanding Drawer */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-5 pt-0 text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed border-t border-[#CBE4EA]/80 mx-4 sm:mx-5">
                          <p className="pt-3.5">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Sleek Cyan, Teal & Warm Amber Studio Headset Graphic */
function ModernStudioHeadsetSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_10px_18px_rgba(6,36,44,0.4)]"
    >
      <defs>
        <linearGradient
          id="modernHeadsetRing"
          x1="25"
          y1="20"
          x2="95"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient
          id="modernEarCup"
          x1="24"
          y1="54"
          x2="96"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0F4C5C" />
        </linearGradient>
      </defs>

      <circle
        cx="60"
        cy="62"
        r="44"
        stroke="url(#modernHeadsetRing)"
        strokeWidth="2.2"
        strokeDasharray="6 4"
        opacity="0.8"
      />
      <circle cx="60" cy="62" r="34" fill="#0B3B46" fillOpacity="0.65" />

      <path
        d="M32 62C32 43.2223 44.536 28 60 28C75.464 28 88 43.2223 88 62"
        stroke="#FFFFFF"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M42 32C47.5 29 53.5 27.5 60 27.5C66.5 27.5 72.5 29 78 32"
        stroke="#5EEAD4"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <rect
        x="23"
        y="53"
        width="14"
        height="26"
        rx="7"
        fill="url(#modernEarCup)"
        stroke="#5EEAD4"
        strokeWidth="1.8"
      />
      <rect
        x="83"
        y="53"
        width="14"
        height="26"
        rx="7"
        fill="url(#modernEarCup)"
        stroke="#5EEAD4"
        strokeWidth="1.8"
      />

      <path
        d="M88 76C86 88 76 93 63 93"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="54" y="89" width="11" height="7" rx="3.5" fill="#FFFFFF" />
    </svg>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Headphones,
  Layers,
  Palette,
  CreditCard,
  CloudUpload,
  Code2,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

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
  eyebrowLabel: "FREQUENTLY ASKED QUESTIONS",
  heading: "Everything You Need to Know",
  subheading:
    "Clear answers about website ownership, customization, payment gateways, and live deployment.",
  supportCard: {
    badgeText: "STILL HAVE QUESTIONS?",
    title: "Talk Directly With Our Web Architects",
    description:
      "Not sure which template fits your business or need custom features? Book a free 15-minute consultation with our team.",
    ctaLabel: "Contact Our Team",
    ctaPath: "/contact",
  },
  items: [
    {
      categoryTag: "OWNERSHIP",
      question: "Do I get 100% ownership and full source code after purchase?",
      answer:
        "Yes. Every website comes with complete, clean Next.js & Tailwind source code, backend APIs, and database schemas with zero recurring license lock-in.",
    },
    {
      categoryTag: "CUSTOMIZATION",
      question:
        "How fast can you customize a template with my brand name and colors?",
      answer:
        "With our Business Launch Pro package, our team personalizes your logo, brand colors, product catalog, and content within 24 to 48 hours.",
    },
    {
      categoryTag: "PAYMENTS & ADMIN",
      question:
        "Are Razorpay payments, WhatsApp orders, and Admin Panel included?",
      answer:
        "Yes! All e-commerce, café, clinic, and coaching templates include a working Admin Dashboard to manage orders/bookings, plus Razorpay and WhatsApp checkout integration.",
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
        "Yes. Our Custom Web Studio builds bespoke 3D interactive websites, multi-vendor marketplaces, and custom SaaS portals tailored specifically to your business workflow.",
    },
  ],
};

export default function FAQ() {
  const router = useRouter();
  const [data, setData] = useState<FaqSectionData>(DEFAULT_FAQ_DATA);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/home/faq`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("FAQ API error:", err));
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderTwoToneSerifHeading = (headingText: string) => {
    const words = headingText.trim().split(" ");
    if (words.length <= 2) {
      return <span className="text-[#162C33]">{headingText}</span>;
    }
    const splitPoint = Math.min(2, Math.floor(words.length / 2));
    return (
      <>
        <span className="block text-[#162C33]">
          {words.slice(0, splitPoint).join(" ")}
        </span>
        <span className="block text-[#136D7E] mt-0.5">
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
      return <Layers className={cls} strokeWidth={2} />;
    if (upper.includes("CUSTOMIZ") || idx === 1)
      return <Palette className={cls} strokeWidth={2} />;
    if (upper.includes("PAY") || upper.includes("ADMIN") || idx === 2)
      return <CreditCard className={cls} strokeWidth={2} />;
    if (upper.includes("DEPLOY") || idx === 3)
      return <CloudUpload className={cls} strokeWidth={2} />;
    return <Code2 className={cls} strokeWidth={2} />;
  };

  return (
    <section className="relative overflow-hidden py-11 sm:py-14 lg:py-16 px-3.5 sm:px-6 lg:px-8 bg-white text-[#162C33]">
      {/* TOP-RIGHT SOFT AQUA & BOTTOM OCEAN-TEAL WAVES (Exact Match to image_fd1206.jpg) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-Right Soft Aqua Wave */}
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 top-0 w-full h-[75px] sm:h-[115px] lg:h-[140px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="faqTopWave"
              x1="420"
              y1="0"
              x2="1440"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#E6F4F7" stopOpacity="0.15" />
              <stop offset="55%" stopColor="#94C8D4" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#28798B" stopOpacity="0.78" />
            </linearGradient>
          </defs>
          <path
            d="M340 0 C600 52, 860 14, 1110 56 C1260 82, 1365 115, 1440 132 L1440 0 Z"
            fill="url(#faqTopWave)"
          />
        </svg>

        {/* Bottom Sweeping Aqua & Ocean-Teal Wave */}
        <svg
          viewBox="0 0 1440 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-x-0 bottom-0 w-full h-[85px] sm:h-[130px] lg:h-[160px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="faqBottomWaveSoft"
              x1="0"
              y1="110"
              x2="1440"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#D5ECF1" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#94C8D4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#3B8798" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient
              id="faqBottomWaveDeep"
              x1="780"
              y1="180"
              x2="1440"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#4893A4" stopOpacity="0.35" />
              <stop offset="65%" stopColor="#1D6B7C" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#115463" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M0 145 C260 88, 490 92, 770 130 C1040 166, 1255 110, 1440 32 L1440 190 L0 190 Z"
            fill="url(#faqBottomWaveSoft)"
          />
          <path
            d="M740 190 C960 175, 1215 122, 1440 44 L1440 190 Z"
            fill="url(#faqBottomWaveDeep)"
          />
        </svg>
      </div>

      {/* COMPACT MAX-W-6XL CONTAINER */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT 5 COLS: HEADING + DEEP EMERALD-TEAL CONSULTATION CARD */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-5">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#136D7E]">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>{data.eyebrowLabel}</span>
              </div>

              <h2 className="font-serif text-[26px] sm:text-3xl lg:text-[36px] font-bold leading-[1.14] tracking-[-0.01em]">
                {renderTwoToneSerifHeading(data.heading)}
              </h2>

              <p className="text-[12px] sm:text-[13.5px] text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                {data.subheading}
              </p>
            </div>

            {/* Deep Emerald-Teal Consultation Card with Headset Graphic (Exact Match to image_fd1206.jpg) */}
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#06353D] via-[#0B4F5A] to-[#126977] p-5 sm:p-7 text-white border border-teal-300/25 shadow-[0_18px_45px_rgba(7,53,61,0.26)]">
              {/* Ambient Gold & Aqua Glow */}
              <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-amber-300/15 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 -top-10 w-36 h-36 rounded-full bg-[#66C7BE]/15 blur-2xl" />

              {/* Floating Studio Headset Illustration on Right */}
              <div className="pointer-events-none absolute right-2 sm:right-3 bottom-2 sm:bottom-3 w-24 sm:w-28 h-24 sm:h-28 anim-float opacity-95">
                <ArchitectHeadsetSvg />
              </div>

              <div className="relative z-10 space-y-3 pr-16 sm:pr-24">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-amber-300/40 text-amber-300 text-[9.5px] sm:text-[10px] font-extrabold tracking-wider uppercase">
                  <Headphones className="w-3 h-3" />
                  <span>{data.supportCard.badgeText}</span>
                </div>

                <h3 className="font-serif text-[19px] sm:text-2xl font-bold text-white leading-snug">
                  {data.supportCard.title}
                </h3>

                <p className="text-[11.5px] sm:text-[12.5px] text-teal-100/90 leading-relaxed">
                  {data.supportCard.description}
                </p>

                <div className="pt-1.5">
                  <button
                    type="button"
                    onClick={() => router.push(data.supportCard.ctaPath)}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] text-[#142930] font-extrabold text-xs sm:text-[13px] shadow-[0_8px_22px_rgba(251,191,36,0.35)] hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                  >
                    <span>{data.supportCard.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT 7 COLS: SMOOTH EXPANDING ACCORDION LIST */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
            {data.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <ScrollReveal key={item.question} delayMs={idx * 65}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-white border-[#136D7E]/65 shadow-[0_14px_34px_rgba(19,109,126,0.12)]"
                        : "bg-white/95 border-slate-200/80 hover:border-[#136D7E]/40 shadow-[0_6px_18px_rgba(15,61,70,0.04)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 text-left group"
                    >
                      {/* Left Category Icon Box */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#136D7E] shadow-xs"
                            : "bg-[#E6F4F7] group-hover:bg-[#D5ECF2]"
                        }`}
                      >
                        {renderCategoryIcon(item.categoryTag, idx, isOpen)}
                      </div>

                      {/* Category Tag + Question */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <span className="block text-[9.5px] sm:text-[10px] font-extrabold tracking-[0.16em] uppercase text-[#136D7E]">
                          {item.categoryTag}
                        </span>
                        <h3 className="text-[13px] sm:text-[15px] font-extrabold text-[#162C33] group-hover:text-[#136D7E] transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>

                      {/* Right Circular Chevron Button */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-[#136D7E] text-white rotate-180 shadow-xs"
                            : "bg-[#EAF4F7] text-[#136D7E] group-hover:bg-[#136D7E] group-hover:text-white"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </button>

                    {/* Buttery-Smooth CSS Grid Height Animation */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 sm:px-5 pb-4 pt-0 text-[12px] sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 mx-3.5 sm:mx-4">
                          <p className="pt-3">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Custom Studio Headset & Soundwave Graphic for Consultation Card (Matching image_fd1206.jpg) */
function ArchitectHeadsetSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_10px_18px_rgba(4,24,28,0.45)]"
    >
      <defs>
        <linearGradient id="headsetRing" x1="25" y1="20" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#66C7BE" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="earCupGrad" x1="24" y1="54" x2="96" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1D7A8A" />
          <stop offset="100%" stopColor="#093B44" />
        </linearGradient>
      </defs>

      {/* Soft Glowing Halo */}
      <circle
        cx="60"
        cy="62"
        r="44"
        stroke="url(#headsetRing)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        opacity="0.7"
      />
      <circle cx="60" cy="62" r="34" fill="#0B4C57" fillOpacity="0.65" />

      {/* Headband Arch */}
      <path
        d="M32 62C32 43.2223 44.536 28 60 28C75.464 28 88 43.2223 88 62"
        stroke="#E6F7F9"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M42 32C47.5 29 53.5 27.5 60 27.5C66.5 27.5 72.5 29 78 32"
        stroke="#FBBF24"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Left & Right Ear Cups */}
      <rect
        x="23"
        y="53"
        width="14"
        height="26"
        rx="7"
        fill="url(#earCupGrad)"
        stroke="#FDE68A"
        strokeWidth="1.8"
      />
      <rect
        x="83"
        y="53"
        width="14"
        height="26"
        rx="7"
        fill="url(#earCupGrad)"
        stroke="#FDE68A"
        strokeWidth="1.8"
      />

      {/* Boom Mic Arm */}
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
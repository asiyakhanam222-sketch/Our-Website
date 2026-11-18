"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as THREE from "three";
import Lenis from "lenis";
import gsap from "gsap";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Award,
} from "lucide-react";

export interface LuxuryPageSlide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  fallbackUrl: string;
}

export interface WebsiteDetailItem {
  websiteSlug: string;
  title: string;
  tagline: string;
  category: string;
  categorySlug: string;
  codePrice: number;
  turnkeyPrice: number;
  speedScore: string;
  badgeText: string;
  slides: LuxuryPageSlide[];
  techStack: string[];
  features: string[];
}

const DEFAULT_WEBSITE_CATALOG: WebsiteDetailItem[] = [
  {
    websiteSlug: "zarii-boutique",
    title: "Zarii Boutique",
    tagline: "Bespoke Bridal Couture, Ethnic Store & Custom Tailoring Experience",
    category: "Fashion & Luxury Retail",
    categorySlug: "fashion-lifestyle",
    codePrice: 9999,
    turnkeyPrice: 12999,
    speedScore: "99%",
    badgeText: "SIGNATURE EDITION",
    slides: [
      {
        id: "home",
        tag: "01 • LANDING EXPERIENCE",
        title: "Home Page — Editorial Hero & Categories",
        subtitle: "Luxury hero banner, curated category cards & bridal booking",
        imageUrl: "/home.jpeg",
        fallbackUrl: "/home.jpeg",
      },
      {
        id: "home2",
        tag: "02 • BRAND TRUST & SOCIAL PROOF",
        title: "Home Page — Bulk Orders & Testimonials",
        subtitle: "Wholesale inquiry section, verified customer reviews & footer",
        imageUrl: "/home2.jpeg",
        fallbackUrl: "/home2.jpeg",
      },
      {
        id: "shop",
        tag: "03 • E-COMMERCE STOREFRONT",
        title: "Shop Catalog — Complete Product Grid",
        subtitle: "Category filters, instant quick-add cart & bestseller badges",
        imageUrl: "/shop.jpeg",
        fallbackUrl: "/shop.jpeg",
      },
      {
        id: "shop2",
        tag: "04 • CONVERSION PRODUCT PAGE",
        title: "Product Detail — Multi-Angle Zoom & Reviews",
        subtitle: "High-res gallery switcher, specifications & related items",
        imageUrl: "/shop2.jpeg",
        fallbackUrl: "/shop2.jpeg",
      },
      {
        id: "gallery",
        tag: "05 • VISUAL LOOKBOOK",
        title: "Lookbook Gallery — Bridal & Festive Showcase",
        subtitle: "Interactive portfolio showcase with direct slot reservation",
        imageUrl: "/gallery.jpeg",
        fallbackUrl: "/gallery.jpeg",
      },
      {
        id: "aboutus",
        tag: "06 • BRAND HERITAGE",
        title: "About Us — Our Story & Milestones",
        subtitle: "Founder story, mission, vision & 1000+ orders track record",
        imageUrl: "/aboutus.jpeg",
        fallbackUrl: "/aboutus.jpeg",
      },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Razorpay"],
    features: [
      "Luxury Editorial Hero & Interactive Product Catalog",
      "Custom Measurement & Bridal Slot Booking Engine",
      "Direct WhatsApp Checkout + Razorpay Integration",
      "Complete Inventory, Order & Review Admin CRM",
    ],
  },
  {
    websiteSlug: "the-purple-cafe",
    title: "The Purple Café",
    tagline: "Artisan Coffee House, Fine Dining & QR Table Ordering System",
    category: "Dining & Hospitality",
    categorySlug: "dining-hospitality",
    codePrice: 12999,
    turnkeyPrice: 15999,
    speedScore: "98%",
    badgeText: "TRENDING",
    slides: [
      {
        id: "c-home",
        tag: "01 • DINING EXPERIENCE",
        title: "Home Page — Café & Reservations",
        subtitle: "Artisan menu, table booking & ambiance showcase",
        imageUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
        fallbackUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
      },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Express", "MongoDB", "QR Menu"],
    features: [
      "Contactless QR Code Table Menu & Ordering",
      "Live Table Reservation & Party Booking Calendar",
      "Kitchen Order Ticket (KOT) Live Admin Screen",
      "Direct Home Delivery Zone & UPI Checkout",
    ],
  },
];

function WebsiteDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const websiteSlug = searchParams.get("website") || "zarii-boutique";

  const [catalog] = useState<WebsiteDetailItem[]>(DEFAULT_WEBSITE_CATALOG);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [unfoldedSlide, setUnfoldedSlide] = useState<LuxuryPageSlide | null>(
    null
  );
  const [packageType, setPackageType] = useState<"turnkey" | "code">("turnkey");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const webglBgRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const shimmerRef = useRef<HTMLDivElement | null>(null);
  const unfoldModalRef = useRef<HTMLDivElement | null>(null);

  // 1. Lenis Silky Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 2. Three.js Ambient Luxury Gold & Aqua Particle Aurora in Stage Background
  useEffect(() => {
    const container = webglBgRef.current;
    if (!container) return;

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 680;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color("#FDE68A");
    const aquaColor = new THREE.Color("#5EEAD4");

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const c = i % 2 === 0 ? goldColor : aquaColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.05;
      points.rotation.x = Math.sin(t * 0.25) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeWebsite =
    catalog.find((item) => item.websiteSlug === websiteSlug) || catalog[0];

  const slides = activeWebsite.slides;
  const totalSlides = slides.length;
  const currentSlide = slides[activeIndex] || slides[0];
  const prevSlide = slides[(activeIndex - 1 + totalSlides) % totalSlides];
  const nextSlide = slides[(activeIndex + 1) % totalSlides];

  // 3. GSAP Luxury Entrance & Glass Light Sweep on Every Slide Transition
  useEffect(() => {
    if (centerCardRef.current) {
      gsap.fromTo(
        centerCardRef.current,
        { opacity: 0.35, scale: 0.94, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "expo.out",
        }
      );
    }

    if (shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { xPercent: -140 },
        { xPercent: 260, duration: 1.4, ease: "power2.inOut" }
      );
    }
  }, [activeIndex]);

  // 4. Smooth Automatic Stage Progression
  useEffect(() => {
    if (!autoPlay || unfoldedSlide) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4200);
    return () => clearInterval(timer);
  }, [autoPlay, unfoldedSlide, totalSlides]);

  // GSAP Full-Page Unfold Modal Animation
  useEffect(() => {
    if (unfoldedSlide && unfoldModalRef.current) {
      gsap.fromTo(
        unfoldModalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [unfoldedSlide]);

  const finalPrice =
    packageType === "turnkey"
      ? activeWebsite.turnkeyPrice
      : activeWebsite.codePrice;

  const handleProceedOrder = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            websiteSlug: activeWebsite.websiteSlug,
            packageType,
            amount: finalPrice,
          }),
        });
      } catch (err) {
        console.error("Order submit error:", err);
      }
    }
    setOrderSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#051F24] text-white pb-24 selection:bg-amber-300 selection:text-[#051F24]">
      {/* LUXURY DARK TEAL & GOLD STAGE SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#04191D] via-[#082E35] to-[#0D4650] pt-5 pb-16">
        {/* Three.js Ambient Gold & Aqua Particles */}
        <div
          ref={webglBgRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-85"
        />

        {/* Ambient Radial Spotlight */}
        <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 w-[680px] h-[420px] rounded-full bg-[#2DD4BF]/15 blur-[130px]" />

        {/* Top Luxury Header Bar */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/websites")}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-teal-50 hover:text-[#051F24] backdrop-blur-md border border-white/15 text-xs font-extrabold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-300 group-hover:text-[#136D7E] group-hover:-translate-x-0.5 transition-all" />
            <span>Back to Catalog</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-300/15 border border-amber-300/40 text-amber-200 text-[10.5px] font-extrabold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeWebsite.badgeText}</span>
            </span>
          </div>
        </div>

        {/* Title & Editorial Subtitle */}
        <div className="relative z-20 max-w-3xl mx-auto text-center px-4 mt-6 space-y-2.5">
          <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-teal-200/80">
            {activeWebsite.category} • GOOGLE SPEED {activeWebsite.speedScore}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {activeWebsite.title}
          </h1>
          <p className="text-xs sm:text-base text-teal-100/80 max-w-xl mx-auto leading-relaxed">
            {activeWebsite.tagline}
          </p>
        </div>

        {/* ===================================================================
            3D SPATIAL LUXURY CASCADE STAGE (Left Wing + Center Hero + Right Wing)
            All Pages Flow Smoothly with Depth, Reflection Sweep & One-Click Unfold
           =================================================================== */}
        <div className="relative z-20 max-w-7xl mx-auto mt-10 px-4 sm:px-8">
          <div className="relative flex items-center justify-center min-h-[430px] sm:min-h-[540px] [perspective:1800px]">
            {/* LEFT WING CARD (Previous Page in 3D Depth) */}
            {totalSlides > 1 && (
              <div
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex(
                    (prev) => (prev - 1 + totalSlides) % totalSlides
                  );
                }}
                style={{
                  transform:
                    "translateX(-58%) translateZ(-160px) rotateY(22deg) scale(0.84)",
                }}
                className="hidden lg:block absolute w-[480px] h-[420px] rounded-[24px] overflow-hidden border border-white/20 bg-[#04191D] opacity-45 hover:opacity-75 cursor-pointer shadow-2xl transition-all duration-700 ease-out"
              >
                <img
                  src={prevSlide.imageUrl}
                  onError={(e) => {
                    e.currentTarget.src = prevSlide.fallbackUrl;
                  }}
                  alt={prevSlide.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#04191D]/80 via-transparent to-[#04191D]/40" />
              </div>
            )}

            {/* CENTER HERO STAGE CARD (Active Page with Gold Rim & Shimmer) */}
            <div
              ref={centerCardRef}
              onClick={() => setUnfoldedSlide(currentSlide)}
              className="group relative z-30 w-full max-w-[660px] rounded-[28px] p-[2px] bg-gradient-to-b from-amber-200/80 via-teal-300/40 to-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.65)] cursor-pointer"
            >
              <div className="relative rounded-[26px] overflow-hidden bg-[#062227]">
                {/* Glass Light Sweep Shimmer */}
                <div
                  ref={shimmerRef}
                  className="pointer-events-none absolute inset-y-0 w-1/3 z-30 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]"
                />

                {/* Top Luxury Glass Info Strip */}
                <div className="bg-[#051B20]/90 backdrop-blur-xl px-5 py-3 border-b border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="block text-[9.5px] font-extrabold tracking-[0.2em] uppercase text-amber-300">
                      {currentSlide.tag}
                    </span>
                    <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                      {currentSlide.title}
                    </h2>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 group-hover:bg-amber-300 text-white group-hover:text-[#051F24] text-[10.5px] font-extrabold transition-all shrink-0">
                    <Maximize2 className="w-3 h-3" />
                    <span>Unfold Full Page</span>
                  </span>
                </div>

                {/* High-Res Full-Width Screenshot Viewport */}
                <div className="relative h-[370px] sm:h-[460px] w-full overflow-hidden bg-white">
                  <img
                    src={currentSlide.imageUrl}
                    onError={(e) => {
                      e.currentTarget.src = currentSlide.fallbackUrl;
                    }}
                    alt={currentSlide.title}
                    className="w-full h-auto min-h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                  />

                  {/* Subtle Bottom Caption Gradient */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04191D] via-[#04191D]/75 to-transparent pt-12 pb-4 px-5 flex items-end justify-between gap-3">
                    <p className="text-xs text-teal-50/90 max-w-md">
                      {currentSlide.subtitle}
                    </p>
                    <span className="text-[10.5px] font-extrabold text-amber-300 shrink-0">
                      Click to View Full Length →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT WING CARD (Next Page in 3D Depth) */}
            {totalSlides > 1 && (
              <div
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex((prev) => (prev + 1) % totalSlides);
                }}
                style={{
                  transform:
                    "translateX(58%) translateZ(-160px) rotateY(-22deg) scale(0.84)",
                }}
                className="hidden lg:block absolute w-[480px] h-[420px] rounded-[24px] overflow-hidden border border-white/20 bg-[#04191D] opacity-45 hover:opacity-75 cursor-pointer shadow-2xl transition-all duration-700 ease-out"
              >
                <img
                  src={nextSlide.imageUrl}
                  onError={(e) => {
                    e.currentTarget.src = nextSlide.fallbackUrl;
                  }}
                  alt={nextSlide.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#04191D]/80 via-transparent to-[#04191D]/40" />
              </div>
            )}
          </div>

          {/* LUXURY TIMELINE & CONTROLS BAR */}
          <div className="max-w-3xl mx-auto mt-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 p-2 flex items-center justify-between gap-2 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setAutoPlay(false);
                setActiveIndex(
                  (prev) => (prev - 1 + totalSlides) % totalSlides
                );
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#051F24] flex items-center justify-center transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-1">
              {slides.map((s, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setAutoPlay(false);
                      setActiveIndex(idx);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap transition-all ${
                      isCurrent
                        ? "bg-amber-300 text-[#051F24] shadow-md"
                        : "text-teal-100/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {s.title.split("—")[0].trim()}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setAutoPlay((p) => !p)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 flex items-center justify-center transition-colors"
                title={autoPlay ? "Pause Auto-Tour" : "Play Auto-Tour"}
              >
                {autoPlay ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex((prev) => (prev + 1) % totalSlides);
                }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#051F24] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER LUXURY PURCHASE & ARCHITECTURE SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-6 relative z-30">
        <div className="rounded-[32px] bg-white text-[#102A30] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.35)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4F7] text-[#136D7E] text-[10.5px] font-extrabold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>FULL SOURCE CODE + ADMIN DASHBOARD</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A252A]">
              Own {activeWebsite.title}
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {activeWebsite.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <ul className="space-y-2 pt-2">
              {activeWebsite.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-[#E5F4F6] text-[#136D7E] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-[#F4FAF9] p-5 sm:p-6 border border-teal-100 space-y-4">
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white border border-slate-200/80">
              <button
                type="button"
                onClick={() => setPackageType("code")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all ${
                  packageType === "code"
                    ? "bg-[#102A30] text-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Source Code
                <span className="block text-sm text-amber-400 mt-0.5">
                  ₹{activeWebsite.codePrice.toLocaleString("en-IN")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPackageType("turnkey")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all ${
                  packageType === "turnkey"
                    ? "bg-[#136D7E] text-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                Live Setup
                <span className="block text-sm text-amber-300 mt-0.5">
                  ₹{activeWebsite.turnkeyPrice.toLocaleString("en-IN")}
                </span>
              </button>
            </div>

            {orderSubmitted ? (
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/register?website=${activeWebsite.websiteSlug}&plan=${
                      packageType === "turnkey"
                        ? "business-pro"
                        : "starter-template"
                    }&mode=${packageType}`
                  )
                }
                className="btn-ocean-luxury w-full py-3.5 rounded-full text-xs sm:text-sm"
              >
                Continue to Setup →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleProceedOrder}
                className="btn-ocean-luxury w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full text-xs sm:text-sm"
              >
                <span>
                  Buy &amp; Launch — ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#136D7E]" />
              <span>100% Ownership • 48-Hour Live Deployment</span>
            </div>
          </div>
        </div>
      </div>

      {/* ONE-CLICK FULL-LENGTH PAGE UNFOLD LIGHTBOX (Clean, Zero Border, Full Vertical View) */}
      {unfoldedSlide && (
        <div
          ref={unfoldModalRef}
          onClick={() => setUnfoldedSlide(null)}
          className="fixed inset-0 z-50 bg-[#04181C]/90 backdrop-blur-xl overflow-y-auto p-3 sm:p-8 flex justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full my-auto space-y-3"
          >
            <div className="sticky top-2 z-30 flex items-center justify-between bg-[#062227]/90 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 text-white shadow-2xl">
              <div>
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest block">
                  {unfoldedSlide.tag}
                </span>
                <h3 className="text-xs sm:text-sm font-bold">
                  {unfoldedSlide.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setUnfoldedSlide(null)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-300 text-[#051F24] text-xs font-extrabold hover:bg-amber-200 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden bg-white shadow-2xl">
              <img
                src={unfoldedSlide.imageUrl}
                onError={(e) => {
                  e.currentTarget.src = unfoldedSlide.fallbackUrl;
                }}
                alt={unfoldedSlide.title}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WebsiteDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#051F24]" />}>
      <WebsiteDetailContent />
    </Suspense>
  );
}
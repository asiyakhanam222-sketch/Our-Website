"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Volume2,
  VolumeX,
  Maximize2,
  Smartphone,
  Monitor,
  Layers,
  Star,
} from "lucide-react";

export interface VideoReelItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
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
  desktopReels: VideoReelItem[];
  mobileVideoUrl: string;
  mobilePosterUrl: string;
  techStack: string[];
  features: string[];
}

const DEFAULT_WEBSITE_CATALOG: WebsiteDetailItem[] = [
  {
    websiteSlug: "zarii-boutique",
    title: "Zarii Boutique",
    tagline:
      "Bespoke Bridal Couture, Ethnic Store & Custom Tailoring Experience",
    category: "Fashion & Luxury Couture",
    categorySlug: "fashion-lifestyle",
    codePrice: 9999,
    turnkeyPrice: 12999,
    speedScore: "99%",
    badgeText: "SIGNATURE EDITION",
    // Aapke 5 videos yahan sequence mein automatic chalenge (bina kate!)
    desktopReels: [
      {
        id: "v1",
        stepNumber: "01",
        title: "Home Page & Hero",
        subtitle: "Editorial couture banner & category showcase",
        videoUrl: "/videos/zarii-1.mp4",
        posterUrl: "/home.jpeg",
      },
      {
        id: "v2",
        stepNumber: "02",
        title: "Shop & Collection",
        subtitle: "Complete product grid, filters & quick add",
        videoUrl: "/videos/zarii-2.mp4",
        posterUrl: "/shop.jpeg",
      },
      {
        id: "v3",
        stepNumber: "03",
        title: "Product Detail View",
        subtitle: "Multi-angle zoom, sizing & verified reviews",
        videoUrl: "/videos/zarii-3.mp4",
        posterUrl: "/shop2.jpeg",
      },
      {
        id: "v4",
        stepNumber: "04",
        title: "Bridal Lookbook Gallery",
        subtitle: "Interactive festive portfolio & slot booking",
        videoUrl: "/videos/zarii-4.mp4",
        posterUrl: "/gallery.jpeg",
      },
      {
        id: "v5",
        stepNumber: "05",
        title: "Brand Story & Contact",
        subtitle: "About us, milestones & direct order flow",
        videoUrl: "/videos/zarii-5.mp4",
        posterUrl: "/aboutus.jpeg",
      },
    ],
    // Side mein chalne wale Mobile frame ka video (aap chahein toh alag mobile video ya zarii-1.mp4 rakh sakti hain)
    mobileVideoUrl: "/videos/zarii-1.mp4",
    mobilePosterUrl: "/home.jpeg",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Razorpay"],
    features: [
      "Luxury Editorial Hero & Interactive Product Catalog",
      "Custom Blouse & Bridal Measurement Booking Form",
      "Direct WhatsApp Order + Razorpay Checkout",
      "Complete Inventory, Order & Review Admin Panel",
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
    desktopReels: [
      {
        id: "c1",
        stepNumber: "01",
        title: "Café & Dining Experience",
        subtitle: "QR table menu & live reservation system",
        videoUrl: "/videos/the-purple-cafe.mp4",
        posterUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1400&q=85",
      },
    ],
    mobileVideoUrl: "/videos/the-purple-cafe.mp4",
    mobilePosterUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=85",
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
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [packageType, setPackageType] = useState<"turnkey" | "code">("turnkey");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const desktopFrameRef = useRef<HTMLDivElement | null>(null);
  const mobileFrameRef = useRef<HTMLDivElement | null>(null);

  // 1. Lenis Silky Smooth Inertia Scroll
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

  // 2. GSAP Aesthetic Entrance & Floating Mobile Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".aesthetic-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      if (mobileFrameRef.current) {
        gsap.to(mobileFrameRef.current, {
          y: -10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [websiteSlug]);

  const activeWebsite =
    catalog.find((item) => item.websiteSlug === websiteSlug) || catalog[0];

  const reels = activeWebsite.desktopReels;
  const currentReel = reels[activeReelIndex] || reels[0];

  // 3. Smooth GSAP Transition When Switching Between the 5 Videos
  useEffect(() => {
    if (desktopFrameRef.current) {
      gsap.fromTo(
        desktopFrameRef.current,
        { opacity: 0.45, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" }
      );
    }
    if (desktopVideoRef.current && isPlaying) {
      desktopVideoRef.current.play().catch(() => {});
    }
  }, [activeReelIndex, isPlaying]);

  const handleTogglePlayAll = () => {
    const dVid = desktopVideoRef.current;
    const mVid = mobileVideoRef.current;
    if (isPlaying) {
      dVid?.pause();
      mVid?.pause();
      setIsPlaying(false);
    } else {
      dVid?.play().catch(() => {});
      mVid?.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFullScreen = () => {
    const dVid = desktopVideoRef.current;
    if (dVid && dVid.requestFullscreen) {
      dVid.requestFullscreen();
    }
  };

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
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#F3F8F7] to-[#FFFFFF] text-[#112A2C] pb-24 selection:bg-[#0F3D3E] selection:text-[#F5E6C4]"
    >
      {/* AMBIENT AESTHETIC BACKGROUND HALOS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 right-10 w-[460px] h-[460px] rounded-full bg-[#E8D5B7]/35 blur-[130px]" />
        <div className="absolute top-60 -left-24 w-[420px] h-[420px] rounded-full bg-[#A7E0DA]/30 blur-[130px]" />
      </div>

      {/* MINIMAL GLASS TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#E5DEC9]/70 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/websites")}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-[#0F3D3E] text-[#0F3D3E] hover:text-white border border-[#DFD6C3] text-xs font-bold shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Websites</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFE9DC] text-[#6E5631] text-[10.5px] font-extrabold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#B68D40]" />
              <span>{activeWebsite.badgeText}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E6F3F1] text-[#0F3D3E] text-[10.5px] font-extrabold">
              Speed {activeWebsite.speedScore}
            </span>
          </div>
        </div>
      </header>

      {/* EDITORIAL AESTHETIC TITLE SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-8 pt-8 sm:pt-11 space-y-3 aesthetic-reveal">
        <p className="text-[11px] font-extrabold tracking-[0.26em] uppercase text-[#8A6D3B]">
          {activeWebsite.category}
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F3D3E] leading-[1.08] tracking-tight">
          {activeWebsite.title}
        </h1>

        <p className="text-xs sm:text-[15px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {activeWebsite.tagline}
        </p>
      </section>

      {/* =====================================================================
          DUAL-DEVICE AESTHETIC VIDEO STAGE (DESKTOP FULL VIEW + FLOATING MOBILE)
          Zero Cropping (object-contain) • Smooth Auto-Playlist of All 5 Videos
         ===================================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 mt-8 sm:mt-10 aesthetic-reveal">
        <div className="rounded-[36px] bg-white/75 backdrop-blur-2xl border border-white shadow-[0_30px_80px_rgba(15,61,62,0.10)] p-4 sm:p-7 lg:p-9">
          {/* Top Playlist & Playback Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#ECE6DA]">
            {/* 5 Video Chapter Pills (Auto-Advances Smoothly) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              {reels.map((reel, idx) => {
                const isActive = idx === activeReelIndex;
                return (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => {
                      setActiveReelIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-[#0F3D3E] text-[#FAF7F2] shadow-md scale-[1.02]"
                        : "bg-[#F5F1E8] text-[#5B5346] hover:bg-[#EAE2D3]"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-extrabold ${
                        isActive ? "text-[#E6C78A]" : "text-[#8A6D3B]"
                      }`}
                    >
                      {reel.stepNumber}
                    </span>
                    <span>{reel.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Play/Pause, Sound & Fullscreen Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleTogglePlayAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F3D3E] hover:bg-[#165456] text-white text-xs font-bold transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>{isPlaying ? "Pause" : "Auto-Play"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="w-8 h-8 rounded-full bg-[#F5F1E8] hover:bg-[#EAE2D3] text-[#0F3D3E] flex items-center justify-center transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={handleFullScreen}
                className="w-8 h-8 rounded-full bg-[#F5F1E8] hover:bg-[#EAE2D3] text-[#0F3D3E] flex items-center justify-center transition-colors"
                title="Full Screen Desktop Video"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* DUAL STAGE GRID: LEFT = FULL DESKTOP VIDEO (NO CROP), RIGHT = FLOATING MOBILE VIDEO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
            {/* 1. DESKTOP STUDIO FRAME (9 Cols — Zero Cropping, Full Page Visible) */}
            <div className="lg:col-span-9 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0F3D3E]">
                  <Monitor className="w-3.5 h-3.5 text-[#8A6D3B]" />
                  <span>
                    Desktop View • {currentReel.stepNumber}. {currentReel.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {currentReel.subtitle}
                </span>
              </div>

              <div
                ref={desktopFrameRef}
                className="rounded-[24px] overflow-hidden bg-[#141D1E] border-[3px] border-[#E7DEC8] shadow-[0_24px_60px_rgba(15,61,62,0.16)]"
              >
                {/* Minimal Aesthetic Browser Bar */}
                <div className="bg-[#FAF7F2] px-4 py-2 flex items-center justify-between border-b border-[#ECE5D5]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5989B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E6C78A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#84A98C]" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://{activeWebsite.websiteSlug}.ourwebsite.app
                  </span>
                  <span className="text-[10px] font-extrabold text-[#8A6D3B]">
                    {activeReelIndex + 1} / {reels.length}
                  </span>
                </div>

                {/* Full Uncropped Video Container (object-contain ensures 0% cutting!) */}
                <div className="relative w-full aspect-[16/10] bg-[#0D1718] flex items-center justify-center overflow-hidden">
                  <video
                    ref={desktopVideoRef}
                    key={currentReel.videoUrl}
                    src={currentReel.videoUrl}
                    poster={currentReel.posterUrl}
                    autoPlay
                    muted={isMuted}
                    playsInline
                    loop={reels.length === 1}
                    onEnded={() => {
                      // Automatically moves to the next video when current video finishes!
                      setActiveReelIndex((prev) => (prev + 1) % reels.length);
                    }}
                    onClick={handleTogglePlayAll}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 2. FLOATING MOBILE DEVICE FRAME (3 Cols — Side-by-Side Responsive Preview) */}
            <div className="lg:col-span-3 flex flex-col items-center space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0F3D3E]">
                <Smartphone className="w-3.5 h-3.5 text-[#8A6D3B]" />
                <span>Mobile View</span>
              </div>

              <div
                ref={mobileFrameRef}
                className="w-full max-w-[255px] rounded-[36px] p-[6px] bg-gradient-to-b from-[#DFD3BC] via-[#C8B692] to-[#9E8B66] shadow-[0_26px_55px_rgba(15,61,62,0.22)]"
              >
                <div className="rounded-[30px] overflow-hidden bg-[#0D1718] border border-black/40">
                  {/* Sleek Phone Top Notch */}
                  <div className="bg-[#0D1718] pt-2 pb-1.5 flex justify-center">
                    <span className="w-16 h-3.5 rounded-full bg-black border border-white/10" />
                  </div>

                  {/* Mobile Aspect Ratio Video (Zero Cropping) */}
                  <div className="relative w-full aspect-[9/18] bg-[#0D1718] flex items-center justify-center overflow-hidden">
                    <video
                      ref={mobileVideoRef}
                      src={activeWebsite.mobileVideoUrl}
                      poster={activeWebsite.mobilePosterUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Phone Bottom Indicator */}
                  <div className="bg-[#0D1718] py-2 flex justify-center">
                    <span className="w-20 h-1 rounded-full bg-white/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          AESTHETIC EDITORIAL DETAILS & LAUNCH PACKAGE SECTION
         ===================================================================== */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 mt-10 aesthetic-reveal">
        <div className="rounded-[34px] bg-white border border-[#EAE2D3] p-6 sm:p-10 shadow-[0_20px_55px_rgba(15,61,62,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Highlights & Tech */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5F1E8] text-[#8A6D3B] text-[10.5px] font-extrabold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>COMPLETE SOURCE CODE + ADMIN DASHBOARD</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F3D3E]">
              Launch {activeWebsite.title} for Your Brand
            </h2>

            <div className="flex flex-wrap gap-2">
              {activeWebsite.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1 rounded-full bg-[#F4F8F7] border border-[#DCEAE8] text-[#0F3D3E] text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeWebsite.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EFE8DA] flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0F3D3E] text-[#F5E6C4] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Champagne & Emerald Package Card */}
          <div className="lg:col-span-5 rounded-[28px] bg-gradient-to-b from-[#0F3D3E] to-[#09292A] text-white p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-[#E6C78A]">
                INSTANT LAUNCH PACKAGE
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E6C78A]">
                <Star className="w-3.5 h-3.5 fill-[#E6C78A]" /> 4.9/5
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-white/10 border border-white/10">
              <button
                type="button"
                onClick={() => setPackageType("code")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all ${
                  packageType === "code"
                    ? "bg-white text-[#0F3D3E] shadow-md"
                    : "text-teal-100/80 hover:text-white"
                }`}
              >
                Source Code
                <span
                  className={`block text-sm mt-0.5 ${
                    packageType === "code"
                      ? "text-[#8A6D3B]"
                      : "text-[#E6C78A]"
                  }`}
                >
                  ₹{activeWebsite.codePrice.toLocaleString("en-IN")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPackageType("turnkey")}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all ${
                  packageType === "turnkey"
                    ? "bg-[#E6C78A] text-[#0F3D3E] shadow-md"
                    : "text-teal-100/80 hover:text-white"
                }`}
              >
                Full Live Setup
                <span className="block text-sm mt-0.5 text-[#0F3D3E]">
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
                className="w-full py-3.5 rounded-full bg-[#E6C78A] hover:bg-[#F0D7A3] text-[#0F3D3E] font-extrabold text-xs sm:text-sm transition-colors"
              >
                Continue to Brand Setup →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleProceedOrder}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-[#E6C78A] via-[#F3DCB0] to-[#D4AF37] hover:opacity-95 text-[#0F3D3E] font-extrabold text-xs sm:text-sm shadow-lg transition-all"
              >
                <span>
                  Buy &amp; Launch — ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-teal-100/75">
              <ShieldCheck className="w-4 h-4 text-[#E6C78A]" />
              <span>100% Ownership • 48-Hour Live Setup</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function WebsiteDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <WebsiteDetailContent />
    </Suspense>
  );
}
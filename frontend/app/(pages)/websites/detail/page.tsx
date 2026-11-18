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
  Maximize2,
  X,
  Smartphone,
  Monitor,
  Layers,
  Star,
  Wand2,
  Zap,
  Globe,
  Palette,
  ShoppingBag,
} from "lucide-react";

export interface AestheticPageSlide {
  id: string;
  step: string;
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
  slides: AestheticPageSlide[];
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
    slides: [
      {
        id: "home",
        step: "01",
        title: "Home & Editorial Hero",
        subtitle: "Luxury couture landing banner & curated category cards",
        imageUrl: "/home.jpeg",
        fallbackUrl: "/home.jpeg",
      },
      {
        id: "home2",
        step: "02",
        title: "Bulk Orders & Reviews",
        subtitle: "Wholesale inquiry showcase, verified testimonials & footer",
        imageUrl: "/home2.jpeg",
        fallbackUrl: "/home2.jpeg",
      },
      {
        id: "shop",
        step: "03",
        title: "Shop & Collection",
        subtitle: "Complete product catalog with filters & instant quick-add",
        imageUrl: "/shop.jpeg",
        fallbackUrl: "/shop.jpeg",
      },
      {
        id: "shop2",
        step: "04",
        title: "Product Detail View",
        subtitle: "Multi-angle zoom gallery, sizing & customer ratings",
        imageUrl: "/shop2.jpeg",
        fallbackUrl: "/shop2.jpeg",
      },
      {
        id: "gallery",
        step: "05",
        title: "Bridal Lookbook Gallery",
        subtitle: "Interactive festive lookbook with direct slot booking",
        imageUrl: "/gallery.jpeg",
        fallbackUrl: "/gallery.jpeg",
      },
      {
        id: "aboutus",
        step: "06",
        title: "About Us & Milestones",
        subtitle: "Brand story, mission, vision & 1000+ orders track record",
        imageUrl: "/aboutus.jpeg",
        fallbackUrl: "/aboutus.jpeg",
      },
    ],
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
    slides: [
      {
        id: "cafe-1",
        step: "01",
        title: "Café & Dining Experience",
        subtitle: "QR table menu & live reservation system",
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
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [imgLoadedTick, setImgLoadedTick] = useState<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, active: false });
  const [packageType, setPackageType] = useState<"turnkey" | "code">("turnkey");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const webglRef = useRef<HTMLDivElement | null>(null);
  const desktopViewportRef = useRef<HTMLDivElement | null>(null);
  const desktopImgRef = useRef<HTMLImageElement | null>(null);
  const mobileViewportRef = useRef<HTMLDivElement | null>(null);
  const mobileImgRef = useRef<HTMLImageElement | null>(null);
  const fullScreenViewportRef = useRef<HTMLDivElement | null>(null);
  const fullScreenImgRef = useRef<HTMLImageElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const mobilePhoneRef = useRef<HTMLDivElement | null>(null);

  // 1. Lenis Silky Smooth Inertia Page Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
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

  // 2. Three.js Luxury Background Animation (Floating Bokeh + Rotating Gold Rings)
  useEffect(() => {
    const container = webglRef.current;
    if (!container) return;

    const width = container.clientWidth || 1200;
    const height = container.clientHeight || 750;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Floating Champagne Gold & Emerald Particles
    const count = 85;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color("#C8A45D");
    const emerald = new THREE.Color("#2A9D8F");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const c = i % 2 === 0 ? gold : emerald;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Architectural Luxury Orbital Ring in Background
    const ringGeo = new THREE.TorusGeometry(4.4, 0.015, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc8a45d,
      transparent: true,
      opacity: 0.22,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.35;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(5.6, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x2a9d8f,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.28;
    scene.add(ring2);

    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.035;
      points.position.y = Math.sin(t * 0.4) * 0.25;
      ring.rotation.z = t * 0.08;
      ring.rotation.y = Math.sin(t * 0.3) * 0.2;
      ring2.rotation.z = -t * 0.06;
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
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 3. GSAP Background Auroras, Side Floating Cards & Light Beam Rails
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".aesthetic-stagger", {
        y: 28,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Ambient Background Aurora Breathing Motion
      gsap.to(".bg-aurora-orb-1", {
        x: 60,
        y: 40,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-aurora-orb-2", {
        x: -55,
        y: -35,
        scale: 1.18,
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Left & Right Side Floating Luxury Cards
      gsap.to(".side-float-left", {
        y: -14,
        x: 4,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      gsap.to(".side-float-right", {
        y: 14,
        x: -4,
        duration: 4.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      // Side Vertical Light Beams
      gsap.fromTo(
        ".side-beam-pulse",
        { yPercent: -100 },
        {
          yPercent: 250,
          duration: 4.5,
          repeat: -1,
          ease: "none",
          stagger: 1.5,
        }
      );

      // Gentle Mobile iPhone Levitation
      if (mobilePhoneRef.current) {
        gsap.to(mobilePhoneRef.current, {
          y: -10,
          duration: 3.6,
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

  const slides = activeWebsite.slides;
  const totalSlides = slides.length;
  const currentSlide = slides[activeIndex] || slides[0];
  const prevSlide = slides[(activeIndex - 1 + totalSlides) % totalSlides];
  const nextSlide = slides[(activeIndex + 1) % totalSlides];

  // 4. Slow, Luxurious 10-Second Zoom-In -> Full-Page Glide -> Zoom-Out Choreography
  // Uses exact uncropped image heights so Desktop & Mobile NEVER cut off!
  useEffect(() => {
    const dImg = desktopImgRef.current;
    const dBox = desktopViewportRef.current;
    const mImg = mobileImgRef.current;
    const mBox = mobileViewportRef.current;
    const fsImg = fullScreenImgRef.current;
    const fsBox = fullScreenViewportRef.current;
    const sheen = sheenRef.current;

    const getDesktopMaxY = () => {
      if (!dImg || !dBox) return -180;
      const diff = dBox.clientHeight - dImg.offsetHeight;
      return diff < -20 ? diff : -160;
    };

    const getMobileMaxY = () => {
      if (!mImg || !mBox) return -140;
      const diff = mBox.clientHeight - mImg.offsetHeight;
      return diff < -20 ? diff : -120;
    };

    const getFullScreenMaxY = () => {
      if (!fsImg || !fsBox) return -240;
      const diff = fsBox.clientHeight - fsImg.offsetHeight;
      return diff < -20 ? diff : -220;
    };

    const tl = gsap.timeline({
      paused: !isPlaying,
      onUpdate: () => {
        setProgress(tl.progress() * 100);
      },
      onComplete: () => {
        if (isPlaying) {
          setActiveIndex((prev) => (prev + 1) % totalSlides);
        }
      },
    });

    // Subtle glass sheen sweep across desktop frame
    if (sheen) {
      gsap.fromTo(
        sheen,
        { xPercent: -150 },
        { xPercent: 280, duration: 2.2, ease: "power2.inOut" }
      );
    }

    // DESKTOP CHOREOGRAPHY (10 Seconds Total — Slow, Smooth, Uncropped):
    // Phase 1 (0s -> 3.0s): Silky Fade-In + Gentle Zoom-In on Top Hero
    // Phase 2 (3.0s -> 7.8s): Slow Top-to-Bottom Glide across entire page
    // Phase 3 (7.8s -> 10.0s): Graceful Zoom-Out to reveal full section before next slide
    if (dImg) {
      tl.fromTo(
        dImg,
        { opacity: 0.2, scale: 1.0, y: 0, transformOrigin: "top center" },
        {
          opacity: 1,
          scale: 1.08,
          y: 0,
          duration: 3.0,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          dImg,
          {
            y: getDesktopMaxY,
            scale: 1.04,
            duration: 4.8,
            ease: "sine.inOut",
          },
          3.0
        )
        .to(
          dImg,
          {
            scale: 1.0,
            duration: 2.2,
            ease: "power2.out",
          },
          7.8
        );
    }

    // MOBILE CHOREOGRAPHY (10 Seconds Total — Zero Left/Right Cropping!):
    // Full width fits inside iPhone cleanly (w-full h-auto), gliding slowly top-to-bottom with gentle zoom
    if (mImg) {
      tl.fromTo(
        mImg,
        { opacity: 0.25, scale: 1.0, y: 0, transformOrigin: "top center" },
        {
          opacity: 1,
          scale: 1.04,
          y: 0,
          duration: 2.8,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          mImg,
          {
            y: getMobileMaxY,
            scale: 1.02,
            duration: 5.0,
            ease: "sine.inOut",
          },
          2.8
        )
        .to(
          mImg,
          {
            scale: 1.0,
            duration: 2.2,
            ease: "power2.out",
          },
          7.8
        );
    }

    // FULL-SCREEN THEATER CHOREOGRAPHY
    if (fsImg) {
      tl.fromTo(
        fsImg,
        { opacity: 0.25, scale: 1.0, y: 0, transformOrigin: "top center" },
        {
          opacity: 1,
          scale: 1.07,
          y: 0,
          duration: 3.0,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          fsImg,
          {
            y: getFullScreenMaxY,
            scale: 1.03,
            duration: 4.8,
            ease: "sine.inOut",
          },
          3.0
        )
        .to(
          fsImg,
          {
            scale: 1.0,
            duration: 2.2,
            ease: "power2.out",
          },
          7.8
        );
    }

    return () => {
      tl.kill();
    };
  }, [activeIndex, isPlaying, isFullScreen, totalSlides, imgLoadedTick]);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -(y * 4),
      rotateY: x * 5,
      active: true,
    });
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
      className="relative min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#F1F8F7] to-[#FFFFFF] text-[#112A2C] pb-24 overflow-x-clip selection:bg-[#0F3D3E] selection:text-[#F5E6C4]"
    >
      {/* =====================================================================
          MULTI-LAYERED BACKGROUND & SIDE MARGIN ANIMATIONS
         ===================================================================== */}
      {/* 1. Three.js WebGL Bokeh Particles & Orbital Rings */}
      <div
        ref={webglRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-90"
      />

      {/* 2. Drifting Ambient Aurora Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="bg-aurora-orb-1 absolute -top-28 right-6 w-[500px] h-[500px] rounded-full bg-[#E8D5B7]/45 blur-[130px]" />
        <div className="bg-aurora-orb-2 absolute top-64 -left-24 w-[480px] h-[480px] rounded-full bg-[#99E2D8]/40 blur-[130px]" />
      </div>

      {/* 3. Left & Right Vertical Architectural Light Rails */}
      <div className="pointer-events-none hidden xl:block fixed inset-y-0 left-7 w-[1px] bg-[#DFD6C3]/60 z-0 overflow-hidden">
        <div className="side-beam-pulse w-full h-32 bg-gradient-to-b from-transparent via-[#B68D40] to-transparent" />
      </div>
      <div className="pointer-events-none hidden xl:block fixed inset-y-0 right-7 w-[1px] bg-[#DFD6C3]/60 z-0 overflow-hidden">
        <div className="side-beam-pulse w-full h-32 bg-gradient-to-b from-transparent via-[#2A9D8F] to-transparent" />
      </div>

      {/* MINIMAL GLASS TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-xl border-b border-[#E5DEC9]/75 px-4 sm:px-8 py-3.5">
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

      {/* EDITORIAL AESTHETIC HERO HEADER */}
      <section className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-8 pt-8 sm:pt-11 space-y-3 aesthetic-stagger">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 border border-[#E5DEC9] text-[#8A6D3B] text-[10.5px] font-extrabold tracking-[0.22em] uppercase shadow-2xs">
          <Wand2 className="w-3 h-3 text-[#B68D40]" />
          <span>{activeWebsite.category}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0F3D3E] leading-[1.08] tracking-tight">
          {activeWebsite.title}
        </h1>

        <p className="text-xs sm:text-[15px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {activeWebsite.tagline}
        </p>
      </section>

      {/* =====================================================================
          DUAL-DEVICE LIVE ANIMATED STUDIO STAGE + SIDE FLOATING GLASS WIDGETS
         ===================================================================== */}
      <section className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 mt-8 sm:mt-10 aesthetic-stagger">
        {/* LEFT FLOATING SIDE BADGES (Visible on Wide Desktop) */}
        <div className="hidden 2xl:flex flex-col gap-5 absolute -left-2 top-28 z-30 pointer-events-none">
          <div className="side-float-left rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E5DEC9] p-3.5 shadow-[0_14px_35px_rgba(15,61,62,0.10)] flex items-center gap-3 w-52">
            <div className="w-9 h-9 rounded-xl bg-[#0F3D3E] text-[#E6C78A] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-[#0F3D3E]">
                {activeWebsite.speedScore} Speed Score
              </p>
              <p className="text-[10px] text-slate-500">Instant Page Load</p>
            </div>
          </div>

          <div className="side-float-left rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E5DEC9] p-3.5 shadow-[0_14px_35px_rgba(15,61,62,0.10)] flex items-center gap-3 w-52 ml-4">
            <div className="w-9 h-9 rounded-xl bg-[#EFE9DC] text-[#8A6D3B] flex items-center justify-center shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-[#0F3D3E]">
                Bespoke UI/UX
              </p>
              <p className="text-[10px] text-slate-500">Luxury Animations</p>
            </div>
          </div>
        </div>

        {/* RIGHT FLOATING SIDE BADGES (Visible on Wide Desktop) */}
        <div className="hidden 2xl:flex flex-col gap-5 absolute -right-2 top-36 z-30 pointer-events-none">
          <div className="side-float-right rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E5DEC9] p-3.5 shadow-[0_14px_35px_rgba(15,61,62,0.10)] flex items-center gap-3 w-52">
            <div className="w-9 h-9 rounded-xl bg-[#E6F3F1] text-[#0F3D3E] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-[#0F3D3E]">
                Full Store + CRM
              </p>
              <p className="text-[10px] text-slate-500">Orders &amp; Inventory</p>
            </div>
          </div>

          <div className="side-float-right rounded-2xl bg-white/90 backdrop-blur-xl border border-[#E5DEC9] p-3.5 shadow-[0_14px_35px_rgba(15,61,62,0.10)] flex items-center gap-3 w-52 -ml-4">
            <div className="w-9 h-9 rounded-xl bg-[#0F3D3E] text-[#E6C78A] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-[#0F3D3E]">
                100% Responsive
              </p>
              <p className="text-[10px] text-slate-500">Desktop &amp; Mobile</p>
            </div>
          </div>
        </div>

        {/* MAIN LUXURY GLASS SHOWCASE CONTAINER */}
        <div className="max-w-6xl mx-auto rounded-[36px] bg-white/85 backdrop-blur-2xl border border-white shadow-[0_32px_85px_rgba(15,61,62,0.11)] p-4 sm:p-7 lg:p-9">
          {/* Top Interactive Page Pills with Real-Time 10s Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#ECE6DA]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full py-1">
              {slides.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-[#0F3D3E] text-[#FAF7F2] shadow-md scale-[1.03]"
                        : "bg-[#F5F1E8] text-[#5B5346] hover:bg-[#EAE2D3]"
                    }`}
                  >
                    {isActive && (
                      <span
                        style={{ width: `${progress}%` }}
                        className="pointer-events-none absolute inset-y-0 left-0 bg-white/15"
                      />
                    )}
                    <span
                      className={`relative z-10 text-[10px] font-extrabold ${
                        isActive ? "text-[#E6C78A]" : "text-[#8A6D3B]"
                      }`}
                    >
                      {slide.step}
                    </span>
                    <span className="relative z-10">{slide.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Playback & Full Screen Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F3D3E] hover:bg-[#165456] text-white text-xs font-bold transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>{isPlaying ? "Pause Tour" : "Auto-Play"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullScreen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F1E8] hover:bg-[#EAE2D3] text-[#0F3D3E] text-xs font-bold transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full Screen</span>
              </button>
            </div>
          </div>

          {/* DUAL STAGE GRID: DESKTOP (8 Cols) + UNCROPPED LIVE MOBILE (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
            {/* 1. DESKTOP CINEMA ZOOM-IN / ZOOM-OUT STAGE */}
            <div
              onMouseMove={handleStageMouseMove}
              onMouseLeave={() =>
                setTilt({ rotateX: 0, rotateY: 0, active: false })
              }
              className="lg:col-span-8 space-y-2.5 [perspective:1600px]"
            >
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0F3D3E]">
                  <Monitor className="w-3.5 h-3.5 text-[#8A6D3B]" />
                  <span>
                    Desktop View • {currentSlide.step}. {currentSlide.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {currentSlide.subtitle}
                </span>
              </div>

              <div
                onClick={() => setIsFullScreen(true)}
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: tilt.active
                    ? "transform 0.12s ease-out"
                    : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="group relative rounded-[26px] overflow-hidden bg-white border-[3px] border-[#E7DEC8] shadow-[0_26px_65px_rgba(15,61,62,0.16)] cursor-pointer [transform-style:preserve-3d]"
              >
                {/* Glass Light Sweep Reflection */}
                <div
                  ref={sheenRef}
                  className="pointer-events-none absolute inset-y-0 w-1/3 z-30 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg]"
                />

                {/* Pearl Browser Top Bar */}
                <div className="bg-[#FAF7F2] px-4 py-2.5 flex items-center justify-between border-b border-[#ECE5D5]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5989B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E6C78A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#84A98C]" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    https://{activeWebsite.websiteSlug}.ourwebsite.app
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFE9DC] text-[#8A6D3B] text-[9.5px] font-extrabold">
                    PAGE {activeIndex + 1} / {totalSlides}
                  </span>
                </div>

                {/* Uncropped Full-Width Desktop Viewport */}
                <div
                  ref={desktopViewportRef}
                  className="relative w-full h-[380px] sm:h-[470px] overflow-hidden bg-[#FAF7F2]"
                >
                  <img
                    ref={desktopImgRef}
                    key={`desktop-${currentSlide.id}`}
                    src={currentSlide.imageUrl}
                    onLoad={() => setImgLoadedTick((t) => t + 1)}
                    onError={(e) => {
                      e.currentTarget.src = currentSlide.fallbackUrl;
                    }}
                    alt={currentSlide.title}
                    className="w-full h-auto block will-change-transform"
                  />

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-4 right-4 z-20 px-4 py-2 rounded-full bg-[#0F3D3E]/90 text-white text-xs font-extrabold backdrop-blur-md shadow-lg">
                    Click for Full-Screen Theater →
                  </div>
                </div>
              </div>
            </div>

            {/* 2. UNCROPPED LIVE MOBILE IPHONE STAGE (4 Cols — Zero Side Cutting!) */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0F3D3E]">
                <Smartphone className="w-3.5 h-3.5 text-[#8A6D3B]" />
                <span>Live Mobile Preview (Full Width)</span>
              </div>

              <div
                ref={mobilePhoneRef}
                className="w-full max-w-[275px] rounded-[42px] p-[7px] bg-gradient-to-b from-[#E5D7BC] via-[#C8B692] to-[#9E8B66] shadow-[0_28px_60px_rgba(15,61,62,0.22)]"
              >
                <div className="rounded-[35px] overflow-hidden bg-white border border-white/70">
                  {/* Sleek Dynamic Island Notch */}
                  <div className="bg-[#FAF7F2] pt-2.5 pb-2 flex justify-center border-b border-[#EFE8DA]">
                    <span className="w-16 h-3.5 rounded-full bg-[#1C2627]" />
                  </div>

                  {/* Uncropped Full-Width Mobile Viewport (w-full h-auto = 0% Horizontal Cut!) */}
                  <div
                    ref={mobileViewportRef}
                    className="relative w-full h-[385px] sm:h-[425px] overflow-hidden bg-white"
                  >
                    <img
                      ref={mobileImgRef}
                      key={`mobile-${currentSlide.id}`}
                      src={currentSlide.imageUrl}
                      onLoad={() => setImgLoadedTick((t) => t + 1)}
                      onError={(e) => {
                        e.currentTarget.src = currentSlide.fallbackUrl;
                      }}
                      alt={`${currentSlide.title} Mobile`}
                      className="w-full h-auto block will-change-transform"
                    />
                  </div>

                  {/* iPhone Bottom Gesture Bar */}
                  <div className="bg-[#FAF7F2] py-2 flex justify-center border-t border-[#EFE8DA]">
                    <span className="w-20 h-1 rounded-full bg-[#1C2627]/25" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MINI NEXT/PREVIOUS THUMBNAIL STRIP BELOW STAGE */}
          {totalSlides > 1 && (
            <div className="mt-6 pt-5 border-t border-[#ECE6DA] flex items-center justify-between gap-4 text-xs">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
                }
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0F3D3E] font-bold transition-colors"
              >
                <span>← Previous:</span>
                <span className="text-[#8A6D3B]">{prevSlide.title}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % totalSlides)}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0F3D3E] font-bold transition-colors"
              >
                <span>Next:</span>
                <span className="text-[#8A6D3B]">{nextSlide.title}</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          AESTHETIC EDITORIAL DETAILS & LAUNCH PACKAGE SECTION
         ===================================================================== */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 mt-10 aesthetic-stagger">
        <div className="rounded-[34px] bg-white border border-[#EAE2D3] p-6 sm:p-10 shadow-[0_20px_55px_rgba(15,61,62,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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

      {/* FULL-SCREEN EDGE-TO-EDGE CINEMA THEATER MODE (ZERO BLACK BORDERS) */}
      {isFullScreen && (
        <div
          ref={fullScreenViewportRef}
          className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white select-none"
        >
          <img
            ref={fullScreenImgRef}
            key={`fs-${currentSlide.id}`}
            src={currentSlide.imageUrl}
            onLoad={() => setImgLoadedTick((t) => t + 1)}
            onError={(e) => {
              e.currentTarget.src = currentSlide.fallbackUrl;
            }}
            alt={currentSlide.title}
            className="w-full h-auto block will-change-transform"
          />

          <button
            type="button"
            onClick={() => setIsFullScreen(false)}
            className="fixed top-4 right-4 z-50 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0F3D3E]/90 hover:bg-[#0F3D3E] text-white text-xs font-extrabold backdrop-blur-md shadow-xl transition-all"
          >
            <X className="w-4 h-4" />
            <span>Exit Full Screen</span>
          </button>

          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[92%] rounded-full bg-[#0F3D3E]/90 backdrop-blur-xl border border-white/15 px-4 py-2.5 text-white flex items-center justify-between gap-3 shadow-2xl">
            <span className="text-xs font-bold truncate">
              {currentSlide.step}. {currentSlide.title}
            </span>

            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIndex
                      ? "w-6 bg-[#E6C78A]"
                      : "w-2 bg-white/40 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
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
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Check,
  Clock,
  ShieldCheck,
  Search,
  ShoppingCart,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Layers,
  Home,
  Globe,
  LayoutGrid,
  Tag,
  Info,
  User,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export interface TopBarFeature {
  icon: "check" | "clock" | "shield";
  label: string;
}

export interface SubMenuItem {
  label: string;
  path: string;
}

export interface NavItem {
  label: string;
  path: string;
  subMenu?: SubMenuItem[];
}

export interface NavbarData {
  logoLetter: string;
  brandName: string;
  announcementText: string;
  topFeatures: TopBarFeature[];
  menuItems: NavItem[];
  loginLabel: string;
  loginPath: string;
  ctaLabel: string;
  ctaPath: string;
}

const DEFAULT_NAVBAR_DATA: NavbarData = {
  logoLetter: "W",
  brandName: "OUR WEBSITE",
  announcementText: "Build, Customize & Launch Websites with",
  topFeatures: [
    { icon: "check", label: "Premium UI" },
    { icon: "clock", label: "48-Hr Live Setup" },
    { icon: "shield", label: "100% Code Ownership" },
  ],
  menuItems: [
    { label: "Home", path: "/" },
    {
      label: "Websites",
      path: "/websites",
      subMenu: [
        { label: "All Ready Websites", path: "/websites" },
        {
          label: "Zarii Boutique Demo",
          path: "/websites/detail?website=zarii-boutique",
        },
        {
          label: "The Purple Café Demo",
          path: "/websites/detail?website=the-purple-cafe",
        },
        {
          label: "HealthCare Plus Demo",
          path: "/websites/detail?website=healthcare-plus",
        },
        {
          label: "LearnSphere Demo",
          path: "/websites/detail?website=learnsphere",
        },
      ],
    },
    {
      label: "Categories",
      path: "/categories",
      subMenu: [
        {
          label: "E-Commerce & Retail",
          path: "/categories/detail?category=ecommerce-retail",
        },
        {
          label: "Fashion & Lifestyle",
          path: "/categories/detail?category=fashion-lifestyle",
        },
        {
          label: "Dining & Hospitality",
          path: "/categories/detail?category=dining-hospitality",
        },
        {
          label: "Beauty & Wellness",
          path: "/categories/detail?category=beauty-wellness",
        },
        {
          label: "Healthcare & Medical",
          path: "/categories/detail?category=healthcare-medical",
        },
        {
          label: "Education & Learning",
          path: "/categories/detail?category=education-learning",
        },
        {
          label: "Personal & Creative Portfolio",
          path: "/categories/detail?category=creative-portfolio",
        },
      ],
    },
    { label: "Services", path: "/services" },
    { label: "Pricing", path: "/pricing" },
    { label: "About Us", path: "/about" },
  ],
  loginLabel: "Login",
  loginPath: "/login",
  ctaLabel: "Get Started",
  ctaPath: "/register?plan=business-pro&mode=turnkey",
};

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartCount } = useCart();

  const [navData, setNavData] = useState<NavbarData>(DEFAULT_NAVBAR_DATA);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("search") || "";
    setSearchQuery(q);
    if (q) setSearchOpen(true);
  }, [searchParams]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/navbar`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setNavData(data);
      })
      .catch((err) => console.error("Navbar API error:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigate = (path: string) => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
    setHoveredMenu(null);
    router.push(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setMobileSearchOpen(false);
    if (searchQuery.trim()) {
      router.push(
        `/websites?search=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/websites");
    }
  };

  const renderTopIcon = (icon: TopBarFeature["icon"]) => {
    if (icon === "check")
      return <Check className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />;
    if (icon === "clock")
      return <Clock className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />;
    return <ShieldCheck className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />;
  };

  const renderMobileMenuIcon = (label: string, active: boolean) => {
    const cls = `w-[18px] h-[18px] shrink-0 ${
      active ? "text-[#136D7E]" : "text-slate-600"
    }`;
    const lower = label.toLowerCase();
    if (lower.includes("home")) return <Home className={cls} />;
    if (lower.includes("website")) return <Globe className={cls} />;
    if (lower.includes("categor")) return <LayoutGrid className={cls} />;
    if (lower.includes("service")) return <Sparkles className={cls} />;
    if (lower.includes("pric")) return <Tag className={cls} />;
    return <Info className={cls} />;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* 1. DISMISSIBLE SOFT ICE-MIST ANNOUNCEMENT BAR (Matching Screen 1 & 2) */}
        {showAnnouncement && (
          <div className="bg-[#EAF4F7] border-b border-[#136D7E]/10 text-[#16363E] text-[11px] sm:text-xs py-2 px-3.5 sm:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
              <div className="flex items-center justify-center md:justify-start gap-2 font-medium truncate flex-1">
                <Sparkles className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />
                <span className="truncate text-slate-700">
                  {navData.announcementText}{" "}
                  <strong className="text-[#136D7E] font-extrabold">
                    {navData.brandName}
                  </strong>
                </span>
              </div>

              <div className="hidden md:flex items-center gap-4 text-[11px] font-semibold text-slate-600 shrink-0">
                {navData.topFeatures.map((feature, index) => (
                  <React.Fragment key={feature.label}>
                    <span className="flex items-center gap-1.5">
                      {renderTopIcon(feature.icon)}
                      <span>{feature.label}</span>
                    </span>
                    {index < navData.topFeatures.length - 1 && (
                      <span className="text-[#136D7E]/30">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                className="p-1 text-slate-500 hover:text-[#136D7E] transition-colors shrink-0"
                aria-label="Close Announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 2. MAIN CLEAN WHITE NAVBAR */}
        <nav
          className={`relative transition-all duration-300 px-3.5 sm:px-6 lg:px-8 ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgba(19,109,126,0.08)] py-3"
              : "bg-white/95 backdrop-blur-xl py-3.5 sm:py-4"
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-slate-100" />

          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-2.5 group shrink-0 text-left"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#198296] to-[#0E5260] flex items-center justify-center shadow-sm">
                <span className="text-base sm:text-lg font-black text-white">
                  {navData.logoLetter}
                </span>
              </div>
              <span className="text-[#136D7E] font-extrabold tracking-tight text-[17px] sm:text-xl leading-none">
                {navData.brandName}
              </span>
            </button>

            {/* Desktop Center Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              {navData.menuItems.map((item) => {
                const basePath = item.path.split("?")[0];
                const isActive =
                  basePath === "/"
                    ? pathname === "/"
                    : pathname.startsWith(basePath);

                return (
                  <div
                    key={item.path}
                    className="relative py-1"
                    onMouseEnter={() =>
                      item.subMenu && setHoveredMenu(item.label)
                    }
                    onMouseLeave={() => item.subMenu && setHoveredMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      className={`relative flex items-center gap-1 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-[#136D7E] font-bold"
                          : "text-slate-700 hover:text-[#136D7E]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.subMenu && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            hoveredMenu === item.label
                              ? "rotate-180 text-[#136D7E]"
                              : "text-slate-400"
                          }`}
                        />
                      )}

                      <span
                        className={`absolute left-0 right-0 -bottom-0.5 h-[2.5px] rounded-full bg-[#136D7E] transition-all duration-300 ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0"
                        }`}
                      />
                    </button>

                    {item.subMenu && hoveredMenu === item.label && (
                      <div className="absolute top-full left-0 pt-3 w-64 z-50">
                        <div className="bg-white/95 backdrop-blur-2xl border border-[#136D7E]/15 rounded-2xl p-2 shadow-[0_20px_50px_rgba(15,61,70,0.14)] space-y-1">
                          {item.subMenu.map((sub) => (
                            <button
                              key={sub.path}
                              type="button"
                              onClick={() => handleNavigate(sub.path)}
                              className="w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#EAF4F7] hover:text-[#136D7E] transition-all group/sub"
                            >
                              <span>{sub.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#136D7E] opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Action Icons (Exact 4-Icon Minimal Layout on Mobile like Screen 1) */}
            <div className="flex items-center gap-1 sm:gap-2.5">
              {/* Desktop Search */}
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="hidden md:flex items-center bg-[#F2F8FA] border border-[#136D7E]/25 rounded-full px-3.5 py-1.5 text-slate-800 text-xs w-44 xl:w-56"
                >
                  <Search className="w-3.5 h-3.5 text-[#136D7E] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search templates..."
                    className="bg-transparent outline-none w-full placeholder:text-slate-400 text-slate-800"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-[#136D7E] ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:inline-flex p-2 rounded-full text-slate-700 hover:text-[#136D7E] hover:bg-[#EAF4F7] transition-all"
                  aria-label="Search"
                >
                  <Search className="w-[19px] h-[19px]" strokeWidth={1.8} />
                </button>
              )}

              {/* Mobile Search Icon */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 rounded-full text-slate-700 hover:text-[#136D7E] active:scale-95 transition-all"
                aria-label="Search"
              >
                <Search className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </button>

              {/* Templates / Saved Icon (Matches 2nd icon in Mobile Mockup) */}
              <button
                type="button"
                onClick={() => handleNavigate("/websites")}
                className="p-2 rounded-full text-slate-700 hover:text-[#136D7E] hover:bg-[#EAF4F7] active:scale-95 transition-all"
                aria-label="Browse Templates"
              >
                <Layers className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </button>

              {/* Cart Icon with Ocean-Teal Badge (Matches 3rd icon in Mobile Mockup) */}
              <button
                type="button"
                onClick={() => handleNavigate("/cart")}
                className="relative p-2 rounded-full text-slate-700 hover:text-[#136D7E] hover:bg-[#EAF4F7] active:scale-95 transition-all"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-[19px] h-[19px]" strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#136D7E] text-white font-bold text-[9.5px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop Login & CTA */}
              <button
                type="button"
                onClick={() => handleNavigate(navData.loginPath)}
                className="hidden lg:inline-flex px-4 py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:border-[#136D7E] hover:text-[#136D7E] transition-all"
              >
                {navData.loginLabel}
              </button>

              <button
                type="button"
                onClick={() => handleNavigate(navData.ctaPath)}
                className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#177D90] to-[#0F5866] text-white font-bold text-xs shadow-[0_8px_22px_rgba(19,109,126,0.28)] hover:-translate-y-0.5 transition-all"
              >
                <span>{navData.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Clean Minimal Mobile Hamburger (Matches 4th icon in Mobile Mockup) */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-slate-800 hover:text-[#136D7E] active:scale-95 transition-all"
                aria-label="Open Menu"
              >
                <Menu className="w-[21px] h-[21px]" strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Expandable Mobile Search Bar */}
          {mobileSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="md:hidden mt-2.5 flex items-center bg-[#F4FAFC] border border-[#136D7E]/25 rounded-full px-3.5 py-2 text-slate-800 text-xs"
            >
              <Search className="w-4 h-4 text-[#136D7E] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boutique, cafe, clinic..."
                className="bg-transparent outline-none w-full placeholder:text-slate-400 text-slate-800"
                autoFocus
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 rounded-full bg-[#136D7E] text-white font-bold text-[11px]"
              >
                Search
              </button>
            </form>
          )}
        </nav>
      </header>

      {/* SCREEN 2 MATCH: CLEAN FULL-HEIGHT WHITE MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-white flex flex-col animate-in fade-in duration-200">
          {/* Announcement Bar inside Drawer Top (Matching Screen 2) */}
          {showAnnouncement && (
            <div className="bg-[#EAF4F7] border-b border-[#136D7E]/10 text-[#16363E] text-[11px] py-2 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-3.5 h-3.5 text-[#136D7E] shrink-0" />
                <span className="truncate text-slate-700">
                  {navData.announcementText}{" "}
                  <strong className="text-[#136D7E] font-extrabold">
                    {navData.brandName}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAnnouncement(false)}
                className="p-1 text-slate-500"
                aria-label="Close Announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Drawer Brand Header + Clean Close X */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button
              type="button"
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-2.5 text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#198296] to-[#0E5260] flex items-center justify-center">
                <span className="text-base font-black text-white">
                  {navData.logoLetter}
                </span>
              </div>
              <span className="text-[#136D7E] font-extrabold tracking-tight text-lg">
                {navData.brandName}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-700 hover:text-[#136D7E] active:scale-95 transition-all"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" strokeWidth={1.8} />
            </button>
          </div>

          {/* Drawer Menu Items with Icons & Soft Teal Active Pill (Matching Screen 2) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
            {navData.menuItems.map((item) => {
              const basePath = item.path.split("?")[0];
              const isActive =
                basePath === "/"
                  ? pathname === "/"
                  : pathname.startsWith(basePath);
              const isExpanded = mobileExpandedMenu === item.label;

              return (
                <div key={item.path}>
                  <div
                    className={`flex items-center justify-between rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#EAF4F7] text-[#136D7E]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.path)}
                      className="flex-1 flex items-center gap-3.5 px-4 py-3.5 text-left text-[15px] font-semibold"
                    >
                      {renderMobileMenuIcon(item.label, isActive)}
                      <span>{item.label}</span>
                    </button>

                    {item.subMenu && (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedMenu(isExpanded ? null : item.label)
                        }
                        className="px-4 py-3.5 text-slate-500 hover:text-[#136D7E]"
                        aria-label={`Expand ${item.label}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#136D7E]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Clean Submenu Accordion */}
                  {item.subMenu && isExpanded && (
                    <div className="ml-9 mr-2 mt-1 mb-2 pl-3 border-l-2 border-[#136D7E]/20 space-y-1">
                      {item.subMenu.map((sub) => (
                        <button
                          key={sub.path}
                          type="button"
                          onClick={() => handleNavigate(sub.path)}
                          className="w-full text-left block px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-600 hover:bg-[#EAF4F7] hover:text-[#136D7E]"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Divider + 3 Minimal Utility Icons Row (Exact Screen 2 Match) */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="flex items-center justify-center gap-10 py-3">
                <button
                  type="button"
                  onClick={() => handleNavigate("/websites")}
                  className="p-2.5 text-slate-700 hover:text-[#136D7E] transition-colors"
                  aria-label="Templates"
                >
                  <Layers className="w-5 h-5" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate(navData.loginPath)}
                  className="p-2.5 text-slate-700 hover:text-[#136D7E] transition-colors"
                  aria-label="Account Login"
                >
                  <User className="w-5 h-5" strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate("/cart")}
                  className="relative p-2.5 text-slate-700 hover:text-[#136D7E] transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#136D7E] text-white font-bold text-[10px] flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Full-Width Ocean-Teal CTA Pill */}
              <div className="pt-2 px-2">
                <button
                  type="button"
                  onClick={() => handleNavigate(navData.ctaPath)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#177D90] to-[#0F5866] text-white font-bold text-sm shadow-[0_10px_25px_rgba(19,109,126,0.28)]"
                >
                  <span>{navData.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white" />}>
      <NavbarContent />
    </Suspense>
  );
}
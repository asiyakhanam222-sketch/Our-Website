// frontend/app/(pages)/register/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  ShieldCheck,
} from "lucide-react";

export interface PlanOptionItem {
  planSlug: string;
  title: string;
  codePrice: string;
  turnkeyPrice: string;
}

export interface RegisterPageData {
  badgeText: string;
  heading: string;
  subheading: string;
  sidePanelTitle: string;
  sidePanelSubtitle: string;
  benefits: string[];
  availablePlans: PlanOptionItem[];
  submitLabel: string;
  loginPrompt: string;
  loginLinkLabel: string;
}

const DEFAULT_REGISTER_DATA: RegisterPageData = {
  badgeText: "INSTANT ONBOARDING",
  heading: "Create Your OUR WEBSITE Account",
  subheading:
    "Set up your client workspace to launch your selected website or manage custom development orders.",
  sidePanelTitle: "Launch Your Business Online in 48 Hours",
  sidePanelSubtitle:
    "Track branding progress, download full source code, and manage live domains from one dashboard.",
  benefits: [
    "100% Clean Next.js + Tailwind Source Code Ownership",
    "Built-in Admin Panel & Razorpay Payment Setup",
    "Dedicated Engineer Assigned After Onboarding",
  ],
  availablePlans: [
    {
      planSlug: "starter-template",
      title: "Template Code Pack",
      codePrice: "₹6,999",
      turnkeyPrice: "₹9,499",
    },
    {
      planSlug: "business-pro",
      title: "Business Launch Pro",
      codePrice: "₹9,999",
      turnkeyPrice: "₹12,999",
    },
    {
      planSlug: "custom-studio",
      title: "Custom Web Studio",
      codePrice: "₹19,999",
      turnkeyPrice: "₹24,999",
    },
  ],
  submitLabel: "Create Account & Continue",
  loginPrompt: "Already have an account?",
  loginLinkLabel: "Sign In Here",
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL Query Parameters via useSearchParams()
  const planFromUrl = searchParams.get("plan") || "business-pro";
  const modeFromUrl = searchParams.get("mode") || "turnkey";
  const websiteFromUrl = searchParams.get("website") || "";

  const [data, setData] = useState<RegisterPageData>(DEFAULT_REGISTER_DATA);

  const [selectedPlan, setSelectedPlan] = useState<string>(planFromUrl);
  const [selectedMode, setSelectedMode] = useState<string>(modeFromUrl);
  const [selectedWebsite, setSelectedWebsite] = useState<string>(websiteFromUrl);

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync state with URL searchParams
  useEffect(() => {
    const p = searchParams.get("plan");
    const m = searchParams.get("mode");
    const w = searchParams.get("website");
    if (p) setSelectedPlan(p);
    if (m) setSelectedMode(m);
    if (w !== null) setSelectedWebsite(w);
  }, [searchParams]);

  // Backend Config Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/auth/register-config`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Register config error:", err));
  }, []);

  // Update URL searchParams when user changes plan/mode inside the form
  const updateQueryParams = (newPlan: string, newMode: string) => {
    setSelectedPlan(newPlan);
    setSelectedMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("plan", newPlan);
    params.set("mode", newMode);
    router.replace(`/register?${params.toString()}`, { scroll: false });
  };

  const activePlanObj =
    data.availablePlans.find((p) => p.planSlug === selectedPlan) ||
    data.availablePlans[1];

  const activeDisplayPrice =
    selectedMode === "code"
      ? activePlanObj?.codePrice
      : activePlanObj?.turnkeyPrice;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            businessName,
            email,
            phone,
            password,
            selectedPlanSlug: selectedPlan,
            setupMode: selectedMode,
            selectedWebsiteSlug: selectedWebsite || null,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          setErrorMsg(
            errData?.message || "Registration failed. Please try again."
          );
          setLoading(false);
          return;
        }

        const authData = await res.json();
        if (authData?.token) {
          localStorage.setItem("ourwebsite_token", authData.token);
        }
      } catch (err) {
        console.error("Register API error:", err);
      }
    }

    setLoading(false);
    router.push(
      selectedWebsite
        ? `/websites/detail?website=${encodeURIComponent(selectedWebsite)}`
        : "/websites"
    );
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] flex items-center justify-center py-12 px-4 sm:px-8">
      <div className="max-w-5xl w-full rounded-3xl bg-white border border-teal-100 shadow-[0_24px_60px_rgba(15,41,42,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT 5 COLS: TEAL PANEL + LIVE SEARCHPARAMS SELECTION SUMMARY */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="space-y-5 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-teal-300/30 text-amber-300 text-[10px] font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              {data.badgeText}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              {data.sidePanelTitle}
            </h2>

            <p className="text-xs sm:text-sm text-teal-100/85 leading-relaxed">
              {data.sidePanelSubtitle}
            </p>

            {/* LIVE URL SEARCHPARAMS SUMMARY CARD */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-teal-300/30 space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                <span className="inline-flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Selected Package
                </span>
                <span>
                  {selectedMode === "code" ? "Source Code" : "Full Live Setup"}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <p className="font-serif text-lg font-bold text-white">
                  {activePlanObj?.title}
                </p>
                <p className="text-xl font-extrabold text-amber-300">
                  {activeDisplayPrice}
                </p>
              </div>

              {selectedWebsite && (
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-teal-200">Template:</span>
                  <span className="font-bold text-white uppercase tracking-wide">
                    {selectedWebsite.replace(/-/g, " ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <ul className="space-y-2.5 my-6 relative z-10">
            {data.benefits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs text-teal-50"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-[11px] text-teal-200/80 relative z-10">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>100% Ownership • Instant Onboarding</span>
          </div>
        </div>

        {/* RIGHT 7 COLS: CLEAN WHITE REGISTRATION FORM */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F292A]">
                {data.heading}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {data.subheading}
              </p>
            </div>

            {/* Plan & Mode Quick Selector */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-teal-50/60 border border-teal-100">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#0D9488] mb-1">
                  Package Plan
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) =>
                    updateQueryParams(e.target.value, selectedMode)
                  }
                  className="w-full bg-white border border-teal-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0F292A] outline-none"
                >
                  {data.availablePlans.map((p) => (
                    <option key={p.planSlug} value={p.planSlug}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-[#0D9488] mb-1">
                  Setup Mode
                </label>
                <select
                  value={selectedMode}
                  onChange={(e) =>
                    updateQueryParams(selectedPlan, e.target.value)
                  }
                  className="w-full bg-white border border-teal-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0F292A] outline-none"
                >
                  <option value="turnkey">Full Live Setup</option>
                  <option value="code">Source Code Only</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#0D9488] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Asiya Parween"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1">
                    Business / Brand Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#0D9488] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Zarii Boutique"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#0D9488] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@business.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1">
                    WhatsApp Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#0D9488] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F292A] mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#0D9488] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0F292A]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0D7A7A] to-[#0D9488] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_25px_rgba(13,148,136,0.35)] hover:brightness-105 transition-all disabled:opacity-60"
              >
                <span>{loading ? "Creating Account..." : data.submitLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-3 border-t border-teal-50 text-center text-xs text-slate-500">
              <span>{data.loginPrompt} </span>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-extrabold text-[#0D9488] hover:underline"
              >
                {data.loginLinkLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FAFA]" />}>
      <RegisterContent />
    </Suspense>
  );
}
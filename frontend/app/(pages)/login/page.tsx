// frontend/app/(pages)/login/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export interface LoginPageData {
  badgeText: string;
  heading: string;
  subheading: string;
  sidePanelTitle: string;
  sidePanelSubtitle: string;
  sideHighlights: string[];
  emailPlaceholder: string;
  passwordPlaceholder: string;
  submitLabel: string;
  registerPrompt: string;
  registerLinkLabel: string;
}

const DEFAULT_LOGIN_DATA: LoginPageData = {
  badgeText: "CLIENT & CREATOR PORTAL",
  heading: "Welcome Back to OUR WEBSITE",
  subheading:
    "Sign in to access your purchased website source codes, live deployments, and order tracking.",
  sidePanelTitle: "Manage All Your Launched Websites in One Place",
  sidePanelSubtitle:
    "Instant ZIP downloads, domain SSL status, and priority engineering tickets.",
  sideHighlights: [
    "1-Click Source Code & Documentation Download",
    "Real-Time Custom Website & Branding Progress",
    "24/7 Priority Developer Chat Access",
  ],
  emailPlaceholder: "you@business.com",
  passwordPlaceholder: "Enter your password",
  submitLabel: "Sign In to Dashboard",
  registerPrompt: "Don’t have an account yet?",
  registerLinkLabel: "Create Free Account",
};

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState<LoginPageData>(DEFAULT_LOGIN_DATA);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Backend Config Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/auth/login-config`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Login config error:", err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          setErrorMsg(errData?.message || "Invalid email or password.");
          setLoading(false);
          return;
        }

        const authData = await res.json();
        if (authData?.token) {
          localStorage.setItem("ourwebsite_token", authData.token);
        }
      } catch (err) {
        console.error("Login API error:", err);
      }
    }

    setLoading(false);
    router.push("/websites");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] flex items-center justify-center py-12 px-4 sm:px-8">
      <div className="max-w-5xl w-full rounded-3xl bg-white border border-teal-100 shadow-[0_24px_60px_rgba(15,41,42,0.1)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT 5 COLS: TEAL VALUE PANEL */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -bottom-12 w-56 h-56 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="space-y-4 relative z-10">
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
          </div>

          <ul className="space-y-3 my-8 relative z-10">
            {data.sideHighlights.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-xs text-teal-50"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-[11px] text-teal-200/80 relative z-10">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>256-Bit Encrypted Client Access</span>
          </div>
        </div>

        {/* RIGHT 7 COLS: CLEAN WHITE LOGIN FORM */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F292A]">
                {data.heading}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                {data.subheading}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#0D9488] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={data.emailPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0F292A]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/contact?service=account-help")}
                    className="text-[11px] font-bold text-[#0D9488] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-[#0D9488] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={data.passwordPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
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
                <span>{loading ? "Signing In..." : data.submitLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-teal-50 text-center text-xs text-slate-500">
              <span>{data.registerPrompt} </span>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="font-extrabold text-[#0D9488] hover:underline"
              >
                {data.registerLinkLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
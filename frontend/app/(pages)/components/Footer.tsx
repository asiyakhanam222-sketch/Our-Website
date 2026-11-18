// frontend/app/(pages)/components/Footer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Send,
  Globe,
} from "lucide-react";

export interface FooterLinkItem {
  label: string;
  path: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLinkItem[];
}

export interface FooterData {
  logoLetter: string;
  brandName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  locationText: string;
  columns: FooterColumn[];
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    successMessage: string;
  };
  trustBadges: string[];
  copyrightText: string;
}

const DEFAULT_FOOTER_DATA: FooterData = {
  logoLetter: "W",
  brandName: "OUR WEBSITE",
  tagline:
    "Discover, customize, and launch next-generation 3D business websites or commission a bespoke full-stack platform built exclusively for your brand.",
  contactEmail: "hello@ourwebsite.studio",
  contactPhone: "+91 98765 43210",
  locationText: "India • Serving Founders Worldwide",
  columns: [
    {
      heading: "Quick Links",
      links: [
        { label: "Home", path: "/" },
        { label: "Explore Websites", path: "/websites" },
        { label: "Business Categories", path: "/categories" },
        { label: "Agency Services", path: "/services" },
        { label: "Pricing Plans", path: "/pricing" },
        { label: "About Us", path: "/about" },
      ],
    },
    {
      heading: "Top Categories",
      links: [
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
          label: "Healthcare & Medical",
          path: "/categories/detail?category=healthcare-medical",
        },
        {
          label: "Education & Learning",
          path: "/categories/detail?category=education-learning",
        },
        {
          label: "Creative Portfolio",
          path: "/categories/detail?category=creative-portfolio",
        },
      ],
    },
  ],
  newsletter: {
    heading: "Get New 3D Drops First",
    description:
      "Join 2,500+ founders receiving weekly 3D UI drops, launch guides, and exclusive template discounts.",
    placeholder: "Enter your business email",
    buttonLabel: "Join",
    successMessage: "Subscribed! Check your inbox for new 3D template drops.",
  },
  trustBadges: [
    "100% Source Code Ownership",
    "Razorpay & UPI Ready",
    "24/7 Priority Support",
  ],
  copyrightText: "OUR WEBSITE Studio. All rights reserved.",
};

export default function Footer() {
  const router = useRouter();
  const [data, setData] = useState<FooterData>(DEFAULT_FOOTER_DATA);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/footer`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Footer API error:", err));
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/newsletter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch (err) {
        console.error("Newsletter error:", err);
      }
    }

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#06060E] via-[#090818] to-[#04040A] text-slate-300 overflow-hidden">
      {/* Holographic Top Divider Line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#00F5D4]/60 via-[#8B5CF6]/70 to-transparent" />

      <div className="relative max-w-7xl mx-auto pt-14 sm:pt-16 pb-10 px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00F5D4] via-[#8B5CF6] to-[#FB7185] p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <div className="w-full h-full bg-[#090818] rounded-[14.5px] flex items-center justify-center">
                  <span className="text-xl font-black text-gradient-luxury">
                    {data.logoLetter}
                  </span>
                </div>
              </div>
              <span className="text-white font-extrabold tracking-wider text-lg">
                {data.brandName}
              </span>
            </button>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {data.tagline}
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00F5D4] shrink-0" />
                <span>{data.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C084FC] shrink-0" />
                <span>{data.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <span>{data.locationText}</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {data.columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <button
                      type="button"
                      onClick={() => router.push(link.path)}
                      className="text-xs sm:text-sm text-slate-400 hover:text-[#00F5D4] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00F5D4]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              {data.newsletter.heading}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {data.newsletter.description}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-xs text-[#00F5D4] font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{data.newsletter.successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.newsletter.placeholder}
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#00F5D4]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full btn-luxury-primary text-xs shrink-0"
                >
                  <span>{data.newsletter.buttonLabel}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2 flex flex-wrap gap-2">
              {data.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {data.copyrightText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="hover:text-[#00F5D4] transition-colors"
            >
              Support
            </button>
            <button
              type="button"
              onClick={() => router.push("/pricing")}
              className="hover:text-[#00F5D4] transition-colors"
            >
              Terms & Licensing
            </button>
            <span className="inline-flex items-center gap-1.5 text-[#C084FC]">
              <Globe className="w-3.5 h-3.5" /> Global Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
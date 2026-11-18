// frontend/app/(pages)/contact/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export interface ContactChannelItem {
  icon: "mail" | "phone" | "map" | "clock";
  title: string;
  value: string;
  subtext: string;
}

export interface ContactPageData {
  eyebrowLabel: string;
  heading: string;
  subheading: string;
  channels: ContactChannelItem[];
  serviceOptions: { slug: string; label: string }[];
  budgetOptions: string[];
  formLabels: {
    title: string;
    subtitle: string;
    submitLabel: string;
    successTitle: string;
    successMessage: string;
  };
}

const DEFAULT_CONTACT_DATA: ContactPageData = {
  eyebrowLabel: "START A CONVERSATION",
  heading: "Let’s Build & Launch Your Dream Website",
  subheading:
    "Have questions about a ready template or want a custom 3D website built from scratch? Our web architects reply within 2 hours.",
  channels: [
    {
      icon: "mail",
      title: "Email Us",
      value: "hello@ourwebsite.studio",
      subtext: "For quotes, demos & technical queries",
    },
    {
      icon: "phone",
      title: "Call & WhatsApp",
      value: "+91 98765 43210",
      subtext: "Instant consultation & live walkthrough",
    },
    {
      icon: "map",
      title: "Studio Location",
      value: "India • Remote Worldwide",
      subtext: "Serving 500+ businesses globally",
    },
    {
      icon: "clock",
      title: "Support Hours",
      value: "Mon – Sat, 10 AM – 8 PM IST",
      subtext: "24/7 priority support for launched clients",
    },
  ],
  serviceOptions: [
    { slug: "ready-template", label: "Buy & Customize a Ready Template" },
    { slug: "fullstack-development", label: "Custom Website From Scratch" },
    { slug: "brand-customization", label: "Brand & UI Personalization" },
    { slug: "payment-whatsapp", label: "Razorpay & WhatsApp Integration" },
    { slug: "admin-cms", label: "Custom Admin Panel & CRM" },
    { slug: "cloud-deployment", label: "Domain, Cloud & SSL Launch" },
  ],
  budgetOptions: [
    "₹6,999 – ₹12,999 (Ready Template)",
    "₹13,000 – ₹24,999 (Turnkey + Custom)",
    "₹25,000+ (Full Custom Web Platform)",
  ],
  formLabels: {
    title: "Tell Us About Your Project",
    subtitle:
      "Share your business name and goals—we’ll suggest the best template or custom roadmap.",
    submitLabel: "Send Project Inquiry",
    successTitle: "Inquiry Received!",
    successMessage:
      "Thank you! Our lead web architect will reach out via WhatsApp and Email shortly.",
  },
};

function ContactContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "ready-template";

  const [data, setData] = useState<ContactPageData>(DEFAULT_CONTACT_DATA);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState(preselectedService);
  const [budget, setBudget] = useState(DEFAULT_CONTACT_DATA.budgetOptions[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync URL ?service= param
  useEffect(() => {
    const svc = searchParams.get("service");
    if (svc) setSelectedService(svc);
  }, [searchParams]);

  // Backend API Fetch (Zero Hardcoding)
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/contact`)
      .then((res) => (res.ok ? res.json() : null))
      .then((fetched) => {
        if (fetched) setData(fetched);
      })
      .catch((err) => console.error("Contact page API error:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            serviceSlug: selectedService,
            budget,
            message,
          }),
        });
      } catch (err) {
        console.error("Contact submit error:", err);
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const renderChannelIcon = (icon: ContactChannelItem["icon"]) => {
    const cls = "w-5 h-5 text-[#0D9488]";
    if (icon === "mail") return <Mail className={cls} />;
    if (icon === "phone") return <Phone className={cls} />;
    if (icon === "map") return <MapPin className={cls} />;
    return <Clock className={cls} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FAFA] via-[#FFFFFF] to-[#ECF8F8] pb-20">
      {/* TEAL HEADER BANNER */}
      <div className="relative bg-gradient-to-r from-[#062C30] via-[#0B4F54] to-[#0D7A7A] text-white pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-teal-300/35 text-teal-200 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{data.eyebrowLabel}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            {data.heading}
          </h1>

          <p className="text-teal-100/85 text-sm sm:text-base max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          {data.channels.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-5 border border-teal-100 shadow-[0_10px_28px_rgba(15,41,42,0.06)] flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                {renderChannelIcon(item.icon)}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                  {item.title}
                </p>
                <p className="text-sm sm:text-base font-extrabold text-[#0F292A] mt-0.5">
                  {item.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 border border-teal-100 shadow-[0_18px_45px_rgba(15,41,42,0.08)]">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F292A]">
                {data.formLabels.successTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {data.formLabels.successMessage}
              </p>
              <div className="pt-3 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/websites")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D9488] text-white font-bold text-xs"
                >
                  <span>Explore Ready Websites</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="px-5 py-3 rounded-full bg-teal-50 text-[#0F292A] font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0D9488] mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>FREE CONSULTATION</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0F292A]">
                  {data.formLabels.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {data.formLabels.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asiya Parween"
                    className="w-full px-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                    What Do You Need?
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                  >
                    {data.serviceOptions.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                  Estimated Budget
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {data.budgetOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBudget(item)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-bold border text-left transition-all ${
                        budget === item
                          ? "bg-[#0D9488] text-white border-[#0D9488]"
                          : "bg-teal-50/40 text-[#0F292A] border-teal-200 hover:border-teal-400"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F292A] mb-1.5">
                  Project Details / Preferred Template
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your business, preferred website style, or custom features..."
                  className="w-full px-4 py-2.5 rounded-xl bg-teal-50/40 border border-teal-200 text-xs sm:text-sm text-[#0F292A] outline-none focus:border-[#0D9488] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0D7A7A] to-[#0D9488] text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_25px_rgba(13,148,136,0.35)] hover:brightness-105 transition-all disabled:opacity-60"
              >
                <span>
                  {submitting ? "Sending..." : data.formLabels.submitLabel}
                </span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2FAFA]" />}>
      <ContactContent />
    </Suspense>
  );
}
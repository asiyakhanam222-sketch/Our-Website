// frontend/app/layout.tsx
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./(pages)/components/Navbar";
import Footer from "./(pages)/components/Footer";
import { CartProvider } from "./(pages)/context/CartContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OUR WEBSITE — 3D Web Marketplace & Custom Engineering Studio",
  description:
    "Discover, customize, and launch next-gen 3D business websites with full source code and Admin Panel, or commission a bespoke web platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#06060E] text-slate-100 antialiased min-h-screen flex flex-col overflow-x-hidden selection:bg-[#00F5D4] selection:text-[#06060E]">
        {/* Global Ambient 3D Aurora Lights */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full bg-[#7C3AED]/15 blur-[140px] animate-pulse-aura" />
          <div className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full bg-[#00F5D4]/10 blur-[140px] animate-pulse-aura" />
          <div className="absolute -bottom-40 left-1/3 w-[520px] h-[520px] rounded-full bg-[#FB7185]/10 blur-[150px]" />
        </div>

        <CartProvider>
          <div className="relative z-10 flex flex-col min-h-screen w-full">
            <Suspense fallback={<div className="h-20 bg-[#06060E]" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
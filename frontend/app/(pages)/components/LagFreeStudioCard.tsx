"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function LagFreeStudioCard() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, hovered: false });

  // GPU-Accelerated Mouse Move 3D Tilt (Zero Lag)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: -(y * 12),
      rotateY: x * 14,
      hovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, hovered: false });
  };

  return (
    <div className="py-12 px-4 flex items-center justify-center bg-[#F4FAFC]">
      {/* 3D Perspective Wrapper */}
      <div className="[perspective:1400px] w-full max-w-sm">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
              tilt.hovered ? "translateY(-8px) scale(1.02)" : "translateY(0px) scale(1)"
            }`,
            transition: tilt.hovered
              ? "transform 0.08s ease-out"
              : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="group relative rounded-[24px] bg-white p-6 border border-teal-100/80 shadow-[0_14px_38px_rgba(19,109,126,0.12)] [transform-style:preserve-3d] will-change-transform cursor-pointer"
        >
          {/* Glass Light-Sweep Shimmer (GPU Accelerated Animation) */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[24px]">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent anim-glint" />
          </div>

          {/* Top Row Badge */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4F7] text-[#136D7E] text-[10.5px] font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Studio Quality</span>
            </span>

            <span className="w-8 h-8 rounded-full bg-[#136D7E] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          {/* Card Title & Description */}
          <div className="relative z-10 space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#162C33] group-hover:text-[#136D7E] transition-colors">
              Buttery-Smooth Motion
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Yeh animation sirf <code className="text-[#136D7E] font-bold">transform</code> aur <code className="text-[#136D7E] font-bold">opacity</code> par chalti hai, isliye mobile ya low-end laptops par bhi bilkul lag nahi karti!
            </p>
          </div>

          {/* Action Link */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[#136D7E]">
            <span className="text-xs font-bold">Explore Performance</span>
            <span className="w-7 h-7 rounded-full bg-[#EAF4F7] group-hover:bg-[#136D7E] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
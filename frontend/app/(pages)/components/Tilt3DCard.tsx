// frontend/app/(pages)/components/Tilt3DCard.tsx
"use client";

import React, { useState, useRef } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glowVariant?: "violet" | "mint" | "gold" | "holo";
  maxTilt?: number;
  onClick?: () => void;
}

export default function Tilt3DCard({
  children,
  className = "",
  innerClassName = "",
  glowVariant = "holo",
  maxTilt = 9,
  onClick,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Disable heavy tilt on narrow mobile touch viewports
    if (typeof window !== "undefined" && window.innerWidth < 640) return;

    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - relY) * (maxTilt * 2);
    const rotateY = (relX - 0.5) * (maxTilt * 2);

    setTilt({ rotateX, rotateY });
    setGlare({
      x: Math.round(relX * 100),
      y: Math.round(relY * 100),
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const borderGradientMap: Record<NonNullable<Tilt3DCardProps["glowVariant"]>, string> = {
    holo: "from-[#00F5D4]/50 via-[#8B5CF6]/50 to-[#FB7185]/50",
    violet: "from-[#8B5CF6]/65 via-[#C084FC]/45 to-[#38BDF8]/50",
    mint: "from-[#00F5D4]/65 via-[#2DD4BF]/45 to-[#8B5CF6]/50",
    gold: "from-[#FBBF24]/70 via-[#FB7185]/50 to-[#C084FC]/50",
  };

  const spotlightColorMap: Record<NonNullable<Tilt3DCardProps["glowVariant"]>, string> = {
    holo: "rgba(0, 245, 212, 0.16)",
    violet: "rgba(139, 92, 246, 0.2)",
    mint: "rgba(0, 245, 212, 0.18)",
    gold: "rgba(251, 191, 36, 0.18)",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative [perspective:1200px] ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* 3D Animated Holographic Rim */}
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
        className={`relative h-full w-full rounded-3xl p-[1.5px] bg-gradient-to-br ${borderGradientMap[glowVariant]} animate-border-shimmer transition-transform duration-200 ease-out [transform-style:preserve-3d] shadow-[0_20px_50px_rgba(0,0,0,0.65)] group-hover:shadow-[0_30px_70px_rgba(139,92,246,0.28)]`}
      >
        {/* Inner Obsidian Glass Body */}
        <div
          className={`relative h-full w-full rounded-[22.5px] bg-gradient-to-b from-[#12102E]/95 via-[#0B0A1D]/95 to-[#070712]/98 backdrop-blur-2xl overflow-hidden ${innerClassName}`}
        >
          {/* Live Cursor 3D Glare Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 260px at ${glare.x}% ${glare.y}%, ${spotlightColorMap[glowVariant]}, transparent 75%)`,
            }}
          />

          {/* Top Subtle Glass Edge Reflection */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20" />

          {/* Card Content */}
          <div className="relative z-20 h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
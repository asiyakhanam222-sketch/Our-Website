"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

export default function ScrollReveal({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getHiddenTransform = () => {
    if (direction === "left") return "opacity-0 -translate-x-5";
    if (direction === "right") return "opacity-0 translate-x-5";
    if (direction === "scale") return "opacity-0 scale-95";
    return "opacity-0 translate-y-5";
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
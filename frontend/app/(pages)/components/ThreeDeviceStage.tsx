"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ThreeDeviceStageProps {
  deviceView: "desktop" | "tablet" | "mobile";
  accentColor: string;
  children: React.ReactNode;
}

export default function ThreeDeviceStage({
  deviceView,
  accentColor,
  children,
}: ThreeDeviceStageProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const deviceRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  // THREE.JS AMBIENT SCENE
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Ambient light
    scene.add(
      new THREE.AmbientLight(0xffffff, 1.5)
    );

    // Floating particles
    const particleCount = 100;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(
      particleCount * 3
    );

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(accentColor),
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(
      geometry,
      material
    );

    scene.add(particles);

    // Decorative orbital rings
    const ringGeometry = new THREE.TorusGeometry(
      3.4,
      0.008,
      8,
      120
    );

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      transparent: true,
      opacity: 0.18,
    });

    const ring = new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );

    ring.rotation.x = Math.PI / 2.7;
    ring.rotation.y = 0.3;

    scene.add(ring);

    let animationId = 0;

    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.025;
      particles.rotation.x = Math.sin(time * 0.15) * 0.08;

      ring.rotation.z = time * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Responsive resize
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);

      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [accentColor]);

  // CINEMATIC DEVICE ENTRANCE
  useEffect(() => {
    const device = deviceRef.current;
    if (!device) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.killTweensOf(device);

    gsap.set(device, {
      rotationX: reduceMotion ? 0 : -12,
      rotationY: reduceMotion ? 0 : -18,
      rotationZ: 0,
      scale: reduceMotion ? 1 : 0.86,
      transformPerspective: 1400,
      transformOrigin: "center center",
    });

    if (reduceMotion) return;

    const timeline = gsap.timeline();

    timeline.to(device, {
      rotationY: 342,
      rotationX: 5,
      scale: 1,
      duration: 2.2,
      ease: "power3.out",
    });

    timeline.to(device, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.9,
      ease: "power3.inOut",
    });

    return () => {
      timeline.kill();
      gsap.killTweensOf(device);
    };
  }, [deviceView]);

  // DEVICE SIZE AND SHAPE
  const deviceWidth =
    deviceView === "desktop"
      ? "w-full max-w-[650px]"
      : deviceView === "tablet"
      ? "w-full max-w-[440px]"
      : "w-full max-w-[285px]";

  const deviceShape =
    deviceView === "mobile"
      ? "rounded-[38px] border-[7px] border-[#111827]"
      : deviceView === "tablet"
      ? "rounded-[25px] border-[8px] border-[#111827]"
      : "rounded-[17px] border-[9px] border-[#111827]";

  // MOUSE PARALLAX
  const handlePointerMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    pointerRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };

    const device = deviceRef.current;

    if (!device) return;

    gsap.to(device, {
      rotationY: pointerRef.current.x * 9,
      rotationX: -pointerRef.current.y * 6,
      duration: 0.65,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const resetPointer = () => {
    pointerRef.current = { x: 0, y: 0 };

    if (deviceRef.current) {
      gsap.to(deviceRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  };

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      className="relative isolate overflow-hidden rounded-[30px] sm:rounded-[38px] border border-white/10 bg-[#080D19] py-12 sm:py-16 px-3 sm:px-8"
      style={
        {
          "--device-accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* BACKGROUND GLOW */}

      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />

      <div
        className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: accentColor }}
      />

      {/* GRID BACKGROUND */}

      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* THREE JS CANVAS */}

      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none opacity-90"
      />

      {/* STAGE CONTENT */}

      <div className="relative z-10 flex flex-col items-center">

        {/* TOP LABEL */}

        <div className="mb-9 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: accentColor }}
          />

          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-white/70 uppercase">
            Interactive 3D Experience
          </span>
        </div>

        {/* 3D DEVICE */}

        <div
          className={`relative ${deviceWidth} transition-all duration-700`}
          style={{
            perspective: "1500px",
          }}
        >
          <div
            ref={deviceRef}
            className="relative will-change-transform"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* DEVICE SHADOW */}

            <div
              className="absolute -inset-8 rounded-[40px] blur-[45px] opacity-30 pointer-events-none"
              style={{
                background: accentColor,
                transform: "translateZ(-50px)",
              }}
            />

            {/* SCREEN FRAME */}

            <div
              className={`relative z-10 overflow-hidden bg-[#111827] ${deviceShape}`}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: `
                  0 35px 90px rgba(0,0,0,0.65),
                  0 0 35px ${accentColor}22,
                  inset 0 0 0 1px rgba(255,255,255,0.12)
                `,
              }}
            >
              {/* CAMERA */}

              {deviceView === "mobile" && (
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 w-20 h-4 rounded-full bg-[#05070B]" />
              )}

              {/* WEBSITE CONTENT */}

              <div className="relative bg-white overflow-hidden">
                {children}
              </div>

            </div>

            {/* LAPTOP BASE */}

            {deviceView === "desktop" && (
              <div
                className="relative mx-auto h-[13px] w-[108%] -ml-[4%] rounded-b-[18px] border-t border-white/20 bg-gradient-to-b from-[#9CA3AF] via-[#374151] to-[#111827]"
                style={{
                  transform: "translateZ(3px)",
                  boxShadow: "0 22px 35px rgba(0,0,0,0.4)",
                }}
              >
                <div className="mx-auto w-[18%] h-[4px] rounded-b-lg bg-[#111827]/80" />
              </div>
            )}

            {/* TABLET SIDE DETAIL */}

            {deviceView === "tablet" && (
              <div className="absolute top-1/2 -right-[7px] w-[5px] h-12 rounded-full bg-[#6B7280]" />
            )}

          </div>
        </div>

        {/* BOTTOM STATUS */}

        <div className="mt-10 flex flex-wrap justify-center gap-3">

          {["3D Perspective", "Live Preview", "Responsive Design"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-wider text-white/55"
              >
                {item}
              </span>
            )
          )}

        </div>

      </div>
    </div>
  );
}
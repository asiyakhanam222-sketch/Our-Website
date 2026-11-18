// frontend/app/(pages)/websites/layout.tsx
import React from "react";

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full">{children}</section>;
}
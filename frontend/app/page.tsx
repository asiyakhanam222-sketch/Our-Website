// frontend/app/page.tsx
import React from "react";
import Hero from "./(pages)/home/Hero";
import CategoriesSection from "./(pages)/home/Categories";
import FeaturedWebsites from "./(pages)/home/FeaturedWebsites";
import WhyChooseUs from "./(pages)/home/WhyChooseUs";
import HowItWorks from "./(pages)/home/HowItWorks";
import Services from "./(pages)/home/Services";
import Pricing from "./(pages)/home/Pricing";
import Testimonials from "./(pages)/home/Testimonials";
import FAQ from "./(pages)/home/FAQ";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <CategoriesSection />
      <FeaturedWebsites />
      <WhyChooseUs />
      <HowItWorks />
      <Services />
      <Pricing />
      <Testimonials />
      <FAQ />
    </div>
  );
}
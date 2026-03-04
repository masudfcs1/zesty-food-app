import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import ZestyProductsSection from "@/components/ZestyProductsSection";
import IngredientsSection from "@/components/IngredientsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import ScrollProgress from "@/components/ScrollProgress";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection />

      <MarqueeStrip
        items={[
          "Fresh Coconut",
          "100% Natural",
          "No Preservatives",
          "Handcrafted",
          "Tropical Bliss",
          "Premium Quality",
          "Artisan Made",
        ]}
        speed={25}
      />

      <div id="products">
        <ProductSection />
      </div>

      <ZestyProductsSection />

      <MarqueeStrip
        items={[
          "Order Now",
          "Free Delivery on 3+ Boxes",
          "Halal Certified",
          "Family Packs Available",
          "Served Chilled",
        ]}
        speed={20}
        reverse
      />

      <div id="ingredients">
        <IngredientsSection />
      </div>

      <HowItWorksSection />

      <div id="reviews">
        <TestimonialsSection />
      </div>

      <MarqueeStrip
        items={[
          "★ 4.9 Rating",
          "5000+ Happy Customers",
          "Award Winning",
          "Featured in Food Magazine",
          "Best Dessert 2026",
        ]}
        speed={22}
      />

      <div id="pricing">
        <PricingSection />
      </div>

      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";

import BestsellerCarousel from "@/components/BestsellerCarousel";
import LifestyleShowcase from "@/components/LifestyleShowcase";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <BestsellerCarousel />
        <LifestyleShowcase />
        <NewArrivalsSection />
        <AboutSection />
        <NewsletterSection />
        <div className="h-32 md:h-48 bg-background"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

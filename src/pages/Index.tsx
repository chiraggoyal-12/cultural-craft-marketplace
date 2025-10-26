import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import CustomisationsCarousel from "@/components/CustomisationsCarousel";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Social Media Floating Buttons */}
      <div className="fixed right-4 md:right-8 bottom-8 z-40 flex flex-col gap-3">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
          asChild
        >
          <a href="https://www.instagram.com/_handora_creations_/?igsh=N2hwYnk3bDIyYXU5&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
            <Instagram className="h-5 w-5 text-white" />
          </a>
        </Button>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <a href="https://www.facebook.com/share/1GgwnMsKhn/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
            <Facebook className="h-5 w-5 text-white" />
          </a>
        </Button>
      </div>

      <main>
        <HeroSection />
        <NewArrivalsSection />
        <CustomisationsCarousel />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/40 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-hero font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="block sm:inline">Connecting Cultures,</span>{" "}
            <span className="bg-gradient-to-r from-gold-light to-accent bg-clip-text text-transparent block sm:inline">
              One Craft at a Time
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Discover authentic handcrafted treasures that tell stories of tradition, 
            artistry, and cultural heritage from skilled artisans around the world.
          </p>
          
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-medium shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-105 flex-1 sm:flex-none"
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-black hover:bg-white hover:text-foreground px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 flex-1 sm:flex-none"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-page-bg.png";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 sm:py-10"
    >
      {/* Background Image with Curved Edges */}
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight font-serif transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
                >
                  <span className="block sm:inline">Connecting Cultures,</span>{" "}
                  <span className="block sm:inline">One Craft at a Time</span>
                </h1>

                <p
                  className={`text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-sans transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
                >
                  Discover authentic handcrafted treasures that tell stories of
                  tradition, artistry, and cultural heritage from skilled
                  artisans around the world.
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center transition-all duration-1000 delay-600 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#e6b34d] hover:bg-[#d4a043] text-white px-8 sm:px-10 py-4 text-lg font-bold rounded-full shadow-lg smooth-transition hover:shadow-xl hover:scale-105"
                  >
                    <Link to="/shop">Shop Now</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#f2c266] hover:bg-[#e6b34d] text-white px-8 sm:px-10 py-4 text-lg font-bold rounded-full shadow-lg smooth-transition hover:shadow-xl hover:scale-105"
                  >
                    <Link to="/about">Our Story</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

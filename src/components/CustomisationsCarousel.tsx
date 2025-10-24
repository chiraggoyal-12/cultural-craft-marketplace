import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const slides = [
  {
    title: "DIRECT CREATE",
    subtitle: "is opening a Souvenir Shop",
    location: "at one of India's most loved Monuments.",
    description: "The shop will showcase themed and handcrafted merchandise that is a perfect blend of DESIGN and CRAFTSMANSHIP.",
    highlight: "DESIGNERS AND MAKERS - Wishing to Collaborate!",
    buttonText: "SIGN UP",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2000"
  },
  {
    title: "BESPOKE",
    subtitle: "Marble Decor",
    location: "Handcrafted for Your Space",
    description: "Discover unique marble pieces designed to elevate your interiors with timeless elegance and artisanal quality.",
    highlight: "Custom Orders Welcome - Let's Create Together!",
    buttonText: "EXPLORE",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000"
  },
  {
    title: "ARTISAN",
    subtitle: "Stoneware Collection",
    location: "Exclusively Crafted Gifts",
    description: "Premium stoneware pieces that blend traditional craftsmanship with contemporary design for memorable gifting.",
    highlight: "Perfect for Corporate & Retail Partners!",
    buttonText: "CONNECT",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000"
  },
  {
    title: "HANDORA",
    subtitle: "Retail Showcase",
    location: "Partner with Heritage Crafts",
    description: "Bring authentic handcrafted pieces to your retail space and offer your customers truly unique products.",
    highlight: "Wholesale & Partnership Opportunities Available!",
    buttonText: "GET STARTED",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=2000"
  }
];

const CustomisationsCarousel = () => {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section 
      ref={ref}
      className={`relative w-full min-h-screen bg-background py-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
          Personalize Your Product
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full min-h-[80vh] flex items-center px-4 sm:px-8 lg:px-16 xl:px-24">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 w-full items-center max-w-7xl mx-auto">
                    {/* Left Content */}
                    <div 
                      className={`space-y-4 md:space-y-6 transition-all duration-700 delay-200 ${
                        current === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                      }`}
                    >
                      <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                          {slide.title}
                        </h2>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-foreground/90">
                          {slide.subtitle}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground italic">
                          {slide.location}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
                        {slide.description}
                      </p>

                      <div className="space-y-4">
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                          {slide.highlight}
                        </p>
                        
                        <Button 
                          onClick={() => navigate("/customisations")}
                          size="lg"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg w-full sm:w-auto"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div 
                      className={`relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 delay-300 ${
                        current === index ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
                      }`}
                    >
                      <img 
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomisationsCarousel;

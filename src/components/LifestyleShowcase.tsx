import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Home, Utensils } from "lucide-react";
import lifestyleLiving from "@/assets/lifestyle-living.jpg";
import lifestyleDining from "@/assets/lifestyle-dining.jpg";
import lifestyleSpiritual from "@/assets/lifestyle-spiritual.jpg";

const LifestyleShowcase = () => {
  const lifestyleScenes = [
    {
      id: "cozy-living",
      title: "Serene Living Spaces",
      subtitle: "Tea lights & Urlis for peaceful moments",
      description:
        "Transform your home into a sanctuary with our handcrafted candle holders and decorative pieces",
      image: lifestyleLiving,
      products: ["Rose Quartz Tea Light", "Lotus Urli"],
      link: "/shop/artisan-home-serenity",
      icon: Home,
      gradient: "from-muted/20 to-muted/40",
    },
    {
      id: "dining-elegance",
      title: "Elegant Dining",
      subtitle: "Cake stands & Wine chillers for memorable meals",
      description:
        "Elevate your dining experience with sophisticated serving pieces and wine accessories",
      image: lifestyleDining,
      products: ["Banswara Cake Stand", "Wine Chiller"],
      link: "/shop/culinary-crafts",
      icon: Utensils,
      gradient: "from-muted/20 to-muted/40",
    },
    {
      id: "spiritual-corner",
      title: "Sacred Spaces",
      subtitle: "Divine art for your spiritual practice",
      description:
        "Create meaningful spiritual corners with our collection of divine sculptures and artifacts",
      image: lifestyleSpiritual,
      products: ["Boat Ganesh", "Krishna Sculpture"],
      link: "/shop/divine-artistry",
      icon: Sparkles,
      gradient: "from-muted/20 to-muted/40",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Crafts in Your Everyday Life
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how our artisan pieces seamlessly blend into your lifestyle,
            creating moments of beauty and meaning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {lifestyleScenes.map((scene) => {
            const IconComponent = scene.icon;

            return (
              <Card
                key={scene.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${scene.gradient} to-black/60`}
                  />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wider">
                          {scene.subtitle}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold mb-3">{scene.title}</h3>

                      <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {scene.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {scene.products.map((product, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                    <Button
                      size="sm"
                      className="bg-white/90 text-foreground hover:bg-white"
                      asChild
                    >
                      <Link to={scene.link}>Explore</Link>
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">
                      {scene.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover products that enhance your{" "}
                      {scene.title.toLowerCase()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover-scale"
                    >
                      <Link to={scene.link}>Shop Collection</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifestyleShowcase;

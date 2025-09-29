import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Award } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Crafted with Love",
      description: "Every piece is made with passion and dedication by skilled artisans"
    },
    {
      icon: Globe,
      title: "Cultural Heritage",
      description: "Preserving traditional techniques and stories from around the world"
    },
    {
      icon: Users,
      title: "Artisan Partners",
      description: "Supporting local communities and sustainable craftsmanship"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Authentic, high-quality materials and exceptional craftsmanship"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Handora
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe that every handcrafted item carries the soul of its maker and the 
              wisdom of cultural traditions. Handora bridges the gap between ancient 
              artistry and modern living, bringing you authentic pieces that transform 
              spaces and connect hearts.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our mission is to preserve traditional craftsmanship while providing artisans 
              with sustainable livelihoods. Each purchase supports not just a craft, but 
              a community, a tradition, and a way of life that has been passed down through 
              generations.
            </p>
            
            <Button 
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-cultural"
            >
              Learn Our Story
            </Button>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-warm transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
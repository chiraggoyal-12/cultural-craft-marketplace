import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Globe, Award, Heart } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: "Crafted with Care",
      description: "Each product is hand-finished with precision, ensuring durability, beauty, and attention to detail."
    },
    {
      icon: Globe,
      title: "Cultural Heritage",
      description: "Inspired by Rajasthan's rich legacy of stone artistry, our designs capture timeless traditions with a contemporary touch."
    },
    {
      icon: Sparkles,
      title: "Curated Collection",
      description: "We carefully select trending yet timeless pieces—perfect for modern homes, thoughtful gifting, and elegant decor."
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Only the finest materials and craftsmanship go into our products, guaranteeing long-lasting value and authenticity."
    }
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden animate-fade-in">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Handora
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8" />
          </div>

          {/* Main Content with Enhanced Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left Content */}
            <div className="lg:pr-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg sm:text-xl">
                  At Handora, we bring the <span className="text-primary font-semibold">timeless beauty</span> of Rajasthan's marble and stone craftsmanship into today's homes. 
                  Each piece is a blend of tradition and modern design, carefully curated to add elegance, authenticity, and charm to your space.
                </p>
                <p className="text-lg sm:text-xl">
                  From intricate decor accents to functional stoneware, our collection reflects the artistry that Rajasthan is celebrated for worldwide.
                </p>
                <div className="pt-4 border-l-4 border-primary pl-6">
                  <p className="text-xl sm:text-2xl font-semibold text-foreground italic">
                    "Every item tells a story of culture, history, and unmatched skill"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title}
                  className="group hover:shadow-2xl transition-all duration-500 border-border/30 bg-card/80 backdrop-blur-sm hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-500 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30">
                      <feature.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
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

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Unique Products</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-secondary/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Years Heritage</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-accent/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Handcrafted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
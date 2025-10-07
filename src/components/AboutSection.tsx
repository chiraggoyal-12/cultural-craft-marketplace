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
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:pr-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 sm:mb-8">
              About Handora
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-base sm:text-lg">
                At Handora, we bring the timeless beauty of Rajasthan's marble and stone craftsmanship into today's homes. 
                Each piece is a blend of tradition and modern design, carefully curated to add elegance, authenticity, and charm to your space. 
                From intricate decor accents to functional stoneware, our collection reflects the artistry that Rajasthan is celebrated for worldwide.
              </p>
              <p className="text-base sm:text-lg">
                Our mission is simple: to deliver authentic, high-quality handcrafted products that celebrate heritage while complementing modern lifestyles. 
                Every item tells a story—of culture, history, and the unmatched skill of traditional stone carving.
              </p>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card 
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-border/30 bg-card"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 bg-muted">
                    <feature.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">
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
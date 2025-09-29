import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import culinaryImage from "@/assets/category-culinary.jpg";
import divineImage from "@/assets/category-divine.jpg";
import homeImage from "@/assets/category-home.jpg";
import sipSmokeImage from "@/assets/category-sip-smoke.jpg";

const CategorySection = () => {
  const categories = [
    {
      title: "Culinary Crafts",
      description: "Elevate your dining with handmade elegance",
      image: culinaryImage,
      href: "/shop/culinary-crafts",
      items: "Cake stands, serving bowls, pottery"
    },
    {
      title: "Divine Artistry",
      description: "Spiritual art pieces that inspire",
      image: divineImage,
      href: "/shop/divine-artistry",
      items: "Ganesh sculptures, spiritual figurines"
    },
    {
      title: "Artisan Home & Serenity",
      description: "Transform your space with cultural beauty",
      image: homeImage,
      href: "/shop/artisan-home-serenity",
      items: "Candle holders, soap dishes, urlis"
    },
    {
      title: "Crafted Sip & Smoke",
      description: "Artisanal pieces for refined moments",
      image: sipSmokeImage,
      href: "/shop/crafted-sip-smoke",
      items: "Wine chillers, coasters, ashtrays"
    }
  ];

  return (
    <section className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of authentic handcrafted items, 
            each telling a unique story of tradition and artistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.title}
              className="group overflow-hidden border-0 shadow-cultural hover:shadow-elegant transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-2 text-sm">
                  {category.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  {category.items}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 h-auto text-primary hover:text-primary/80 font-medium group-hover:translate-x-1 transition-transform"
                >
                  Explore Collection →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
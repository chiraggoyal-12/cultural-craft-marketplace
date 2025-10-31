import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { categories } from '@/data/products';
import { useProductsWithMedia } from '@/hooks/useProductsWithMedia';

const FeaturedCategoryGrid = () => {
  const { products } = useProductsWithMedia();

  // Select featured products per category
  const categoryProducts = {
    'culinary-crafts': products.find(p => p.id === 'banswara-cake-stand'),
    'divine-artistry': products.find(p => p.id === 'boat-ganesh'),
    'artisan-home-serenity': products.find(p => p.id === 'rose-quartz-tea-light-big'),
    'crafted-sip-smoke': products.find(p => p.id === 'wine-chiller-black')
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selections from each artisan category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(categoryProducts).map(([categoryKey, product]) => {
            if (!product) return null;
            
            const category = categories[categoryKey as keyof typeof categories];
            
            return (
              <Card key={categoryKey} className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4 right-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {category.name}
                    </Badge>
                  </div>
                  
                  {/* Desktop hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-foreground hover:bg-white"
                      asChild
                    >
                      <Link to={`/product/${encodeURIComponent(product.id)}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View & Request Quote
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Mobile/Tablet actions - always visible */}
                  <div className="absolute top-4 right-4 md:hidden">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-foreground hover:bg-white w-10 h-10 p-0"
                      asChild
                    >
                      <Link to={`/product/${encodeURIComponent(product.id)}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Price info - responsive positioning */}
                  <div className="absolute bottom-4 left-4 right-4 md:transform md:translate-y-full md:group-hover:translate-y-0 md:transition-transform md:duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-center">
                        <span className="text-xl md:text-2xl font-bold text-foreground">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1 hidden md:block">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Link to={`/product/${encodeURIComponent(product.id)}`}>
                    <h3 className="font-semibold text-lg text-foreground mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover-scale"
                    >
                      <Link to={`/shop/${categoryKey}`}>
                        Shop Category
                      </Link>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {product.material}
                    </span>
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

export default FeaturedCategoryGrid;
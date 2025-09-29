import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Eye, ShoppingCart, Play } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useProductsWithMedia } from '@/hooks/useProductsWithMedia';

const BestsellerCarousel = () => {
  const { addItem } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products } = useProductsWithMedia();

  // Get bestsellers and featured products
  const bestsellerProducts = [
    ...products.filter(p => p.bestseller),
    ...products.filter(p => p.featured && !p.bestseller)
  ].slice(0, 6);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, bestsellerProducts.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, bestsellerProducts.length - 2)) % Math.max(1, bestsellerProducts.length - 2));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Bestsellers & Featured
            </h2>
            <p className="text-muted-foreground text-lg">
              Most loved crafts by our customers
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="hover-scale"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="hover-scale"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
          >
            {bestsellerProducts.map((product, index) => (
              <div key={product.id} className="w-1/3 flex-shrink-0 px-3">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.bestseller && (
                        <Badge className="bg-orange-500 text-white">
                          Bestseller
                        </Badge>
                      )}
                      {product.featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                      {product.newArrival && (
                        <Badge className="bg-green-500 text-white">
                          New
                        </Badge>
                      )}
                    </div>

                    {/* Video badge - optional for future use */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1 bg-white/90 text-foreground hover:bg-white"
                            asChild
                          >
                            <Link to={`/product/${product.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Quick View
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addItem(product)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="font-bold text-primary">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.max(1, bestsellerProducts.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerCarousel;
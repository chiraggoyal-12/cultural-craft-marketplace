import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { useProductsWithMedia } from '@/hooks/useProductsWithMedia';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const BestsellerCarousel = () => {
  const { products } = useProductsWithMedia();

  // Get bestsellers and featured products
  const bestsellerProducts = [
    ...products.filter(p => p.bestseller),
    ...products.filter(p => p.featured && !p.bestseller)
  ].slice(0, 8);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Bestsellers & Featured
          </h2>
          <p className="text-muted-foreground text-lg">
            Most loved crafts by our customers
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {bestsellerProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
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
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-full bg-white/90 text-foreground hover:bg-white"
                          asChild
                        >
                          <Link to={`/product/${product.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View & Request Quote
                          </Link>
                        </Button>
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-16 h-12 w-12 border-2 border-border hover:bg-accent hover:text-accent-foreground shadow-lg" />
          <CarouselNext className="-right-4 lg:-right-16 h-12 w-12 border-2 border-border hover:bg-accent hover:text-accent-foreground shadow-lg" />
        </Carousel>
      </div>
    </section>
  );
};

export default BestsellerCarousel;
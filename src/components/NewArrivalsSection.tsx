import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye, Play } from 'lucide-react';
import { products, getNewArrivals } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const NewArrivalsSection = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Get new arrivals and mix with some featured if we need more products
  const newProducts = [
    ...getNewArrivals(),
    ...products.filter(p => p.featured && !p.newArrival).slice(0, 3)
  ].slice(0, 6);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Just Added
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            New Arrivals & Curated Picks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fresh additions to our collection and handpicked favorites from our artisans
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {newProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.newArrival && (
                    <Badge className="bg-green-500 text-white text-xs">
                      New
                    </Badge>
                  )}
                  {product.featured && !product.newArrival && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Pick
                    </Badge>
                  )}
                </div>

                {/* Action buttons on hover */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={() => addToWishlist(product)}
                  >
                    <Heart 
                      className={`h-3 w-3 ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`} 
                    />
                  </Button>
                  
                  {/* Video play button - for future use */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white opacity-50"
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>

                {/* Quick actions on hover */}
                <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 bg-white/90 hover:bg-white text-xs"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 hover:bg-white text-xs"
                      asChild
                    >
                      <Link to={`/product/${product.id}`}>
                        <Eye className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 text-sm hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="font-bold text-primary text-sm">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ★ {product.rating}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {product.material}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="hover-scale">
            <Link to="/shop">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
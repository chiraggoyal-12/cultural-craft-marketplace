import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProductsWithMedia } from "@/hooks/useProductsWithMedia";

const ProductShowcase = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { products } = useProductsWithMedia();

  const getProductBadge = (product: Product) => {
    if (product.newArrival) return "New";
    if (product.bestseller) return "Bestseller";
    if (product.featured) return "Featured";
    return null;
  };

  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Crafts
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked collection of authentic artisanal pieces, 
            each carrying the essence of traditional craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => addToWishlist(product)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-primary text-primary' : ''}`} 
                    />
                  </Button>
                </div>
                {getProductBadge(product) && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                      {getProductBadge(product)}
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    <span className="font-bold text-primary">
                      ₹{product.price}
                    </span>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => addItem(product)}
                    className="gap-1"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/shop">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
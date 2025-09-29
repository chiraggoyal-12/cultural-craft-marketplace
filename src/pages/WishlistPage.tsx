import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and shop them later
            </p>
            <Button size="lg" asChild>
              <a href="/shop">Discover Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist ({wishlistItems.length} items)</h1>
          <Button 
            variant="outline" 
            onClick={clearWishlist}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-warm transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.newArrival && (
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 text-xs rounded">
                      New
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded">
                      Bestseller
                    </span>
                  )}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.shortDescription}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => addItem(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Heart className="w-4 h-4 mr-2 fill-primary text-primary" />
                    Remove from Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
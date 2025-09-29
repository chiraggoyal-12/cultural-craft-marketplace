import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Star, Plus, Minus, Share, Truck, Shield, RotateCcw } from "lucide-react";
import { getProductById, products, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import ReviewsSection from "@/components/ReviewsSection";
import ProductQA from "@/components/ProductQA";

const ProductPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = getProductById(id || "");
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          <span className="mx-2">/</span>
          <a href={`/shop/${product.category}`} className="hover:text-primary capitalize">
            {product.category.replace('-', ' ')}
          </a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
              <img 
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground">{product.shortDescription}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleWishlistToggle}>
                <Heart 
                  className={`w-5 h-5 ${
                    isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground"
                  }`} 
                />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.newArrival && <Badge className="bg-secondary">New Arrival</Badge>}
              {product.bestseller && <Badge className="bg-primary">Bestseller</Badge>}
              {product.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
            </div>

            {/* Review Count */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Material & Region */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Material:</span>
                <p className="font-medium">{product.material}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Origin:</span>
                <p className="font-medium">{product.region}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-border min-w-[60px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button 
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button variant="outline" size="lg" className="flex-1">
                Buy Now
              </Button>
              <Button variant="outline" size="icon">
                <Share className="w-4 h-4" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Authentic Craft</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="w-4 h-4 text-primary" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <ReviewsSection productId={product.id} />
        </div>

        {/* Q&A Section */}
        <div className="mb-12">
          <ProductQA productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-warm transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {relatedProduct.shortDescription}
                    </p>
                    <span className="text-lg font-bold text-foreground">
                      ₹{relatedProduct.price.toLocaleString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
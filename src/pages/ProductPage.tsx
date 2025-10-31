import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Share, Truck, Shield, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import ReviewsSection from "@/components/ReviewsSection";
import ProductQA from "@/components/ProductQA";
import { useProductMedia } from "@/hooks/useProductMedia";
import { useProduct } from "@/hooks/useProducts";
import { useProductReviewCount } from "@/hooks/useReviewCounts";
import { QuotationModal } from "@/components/QuotationModal";

const ProductPage = () => {
  const { id: encodedId } = useParams();
  const id = encodedId ? decodeURIComponent(encodedId) : '';
  const { count: reviewCount } = useProductReviewCount(id || '');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quotationModalOpen, setQuotationModalOpen] = useState(false);
  
  const { product, loading: productLoading } = useProduct(id || null);
  const { allImages, primaryImage, loading: mediaLoading } = useProductMedia(id || "");
  
  // Use database images
  const productImages = allImages.length > 0 ? allImages : (primaryImage ? [primaryImage] : []);
  const displayImage = productImages[selectedImage] || primaryImage;
  
  if (productLoading || mediaLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

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
              {mediaLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : (
                <img 
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
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
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.new_arrival && <Badge className="bg-secondary">New Arrival</Badge>}
              {product.bestseller && <Badge className="bg-primary">Bestseller</Badge>}
              {product.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
            </div>

            {/* Review Count */}
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">{reviewCount}</span>
              <span className="text-sm text-muted-foreground">
                {reviewCount === 1 ? 'Review' : 'Reviews'}
              </span>
            </div>

            {/* Material & Dimensions */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Material:</span>
                <p className="font-medium">{product.material}</p>
              </div>
              {product.dimensions && (
                <div>
                  <span className="text-sm text-muted-foreground">Dimensions:</span>
                  <p className="font-medium">{product.dimensions}</p>
                </div>
              )}
            </div>

            {/* Get Quotation Button */}
            <Button 
              size="lg"
              onClick={() => setQuotationModalOpen(true)}
              className="w-full mb-6"
            >
              Get Quotation
            </Button>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
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
              {product.care_instructions && (
                <>
                  <h4 className="text-lg font-semibold mt-6 mb-2">Care Instructions</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.care_instructions}
                  </p>
                </>
              )}
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
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {relatedProduct.shortDescription}
                    </p>
                    <Button size="sm" className="w-full" asChild>
                      <a href={`/product/${relatedProduct.id}`}>Get Quote</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <QuotationModal
        open={quotationModalOpen}
        onOpenChange={setQuotationModalOpen}
        productId={product.id}
        productName={product.name}
      />
      
      <Footer />
    </div>
  );
};

export default ProductPage;

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Heart, ShoppingCart, Star, Grid, List } from "lucide-react";
import { categories, getProductsByCategory, products, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const ShopPage = () => {
  const { category } = useParams();
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  
  // Get products for category or all products
  const categoryProducts = category ? getProductsByCategory(category) : products;
  const categoryInfo = category ? categories[category as keyof typeof categories] : null;
  
  // Get unique materials for filter
  const materials = Array.from(new Set(products.map(p => p.material)));
  
  // Filter and sort products
  const filteredProducts = categoryProducts.filter(product => {
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    return inPriceRange && materialMatch;
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return b.reviewCount - a.reviewCount;
      case "rating":
        return b.reviewCount - a.reviewCount;
      default:
        return b.newArrival ? 1 : -1;
    }
  });

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleWishlistToggle = (product: Product) => {
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
        {/* Header Section */}
        <div className="mb-8">
          {categoryInfo && (
            <div 
              className="h-64 bg-cover bg-center rounded-lg mb-6 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundImage: `url(/src/assets/category-${category?.replace('-', '-')}.jpg)` }}
            >
              <div className="absolute inset-0 bg-warm-brown/60" />
              <div className="relative text-center text-white">
                <h1 className="text-4xl font-bold mb-2">{categoryInfo.name}</h1>
                <p className="text-lg">{categoryInfo.description}</p>
              </div>
            </div>
          )}
          
          {!categoryInfo && (
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
              <p className="text-lg text-muted-foreground">Discover our complete collection of handcrafted treasures</p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Materials */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Material</label>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={material}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => handleMaterialToggle(material)}
                        />
                        <label htmlFor={material} className="text-sm">{material}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedMaterials([]);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} of {categoryProducts.length} products
              </p>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {sortedProducts.map(product => (
                <Card 
                  key={product.id}
                  className={`group overflow-hidden hover:shadow-warm transition-all duration-300 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <img 
                      src={product.image}
                      alt={product.name}
                      className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                        viewMode === "list" ? "w-full h-48" : "w-full h-64"
                      }`}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.newArrival && <Badge className="bg-secondary">New</Badge>}
                      {product.bestseller && <Badge className="bg-primary">Bestseller</Badge>}
                      {product.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                    </div>
                    
                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${
                          isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground"
                        }`} 
                      />
                    </Button>
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.shortDescription}
                      </p>
                      
                      {/* Review Count */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-muted-foreground">
                          {product.reviewCount} reviews
                        </span>
                      </div>
                      
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
                    </div>
                    
                    <div className={`${viewMode === "list" ? "mt-4" : ""}`}>
                      <Button 
                        className="w-full"
                        onClick={() => addItem(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedMaterials([]);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
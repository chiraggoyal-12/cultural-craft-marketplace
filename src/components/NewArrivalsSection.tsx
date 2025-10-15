import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useProductsWithMedia } from "@/hooks/useProductsWithMedia";

const NewArrivalsSection = () => {
  const { addItem } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { products } = useProductsWithMedia();

  // Get new arrivals and mix with some featured if we need more products (8 total)
  const newProducts = [
    ...products.filter((p) => p.newArrival),
    ...products.filter((p) => p.featured && !p.newArrival).slice(0, 5),
  ].slice(0, 8);

  // Define grid layout patterns for varied sizes
  const getGridClass = (index: number) => {
    const pattern = index % 8;
    
    // Desktop patterns: varied sizes
    if (pattern === 0) return "col-span-1 row-span-2"; // tall left
    if (pattern === 1) return "col-span-1 md:col-span-2 row-span-1"; // wide top
    if (pattern === 2) return "col-span-1 row-span-1"; // square
    if (pattern === 3) return "col-span-1 row-span-2"; // tall
    if (pattern === 4) return "col-span-1 row-span-1"; // square
    if (pattern === 5) return "col-span-1 md:col-span-2 row-span-1"; // wide
    if (pattern === 6) return "col-span-1 row-span-1"; // square
    if (pattern === 7) return "col-span-1 row-span-2"; // tall right
    
    return "col-span-1 row-span-1";
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 lg:px-12 bg-background">
      {/* Header */}
      <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-8 md:mb-12 text-center text-foreground">
        New Arrivals & Curated Picks
      </h2>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-4 max-w-[1400px] mx-auto">
        {newProducts.map((product, index) => (
          <div
            key={product.id}
            className={`group relative bg-card rounded-sm overflow-hidden ${getGridClass(index)}`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block h-full">
              <div className="relative h-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* NEW Badge */}
                {product.newArrival && (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                    <span className="bg-foreground text-background text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 tracking-widest">
                      NEW
                    </span>
                  </div>
                )}

                {/* Product Name Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-3 md:p-4 z-10">
                  <h3 className="font-sans text-foreground text-xs md:text-sm lg:text-base font-bold tracking-wide uppercase leading-tight">
                    {product.name}
                  </h3>
                </div>

                {/* Hover Actions Overlay */}
                <div
                  className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center gap-2 z-20 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-black hover:bg-white/90 font-semibold text-xs px-3 h-8"
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(product);
                    }}
                  >
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black font-semibold text-xs px-3 h-8"
                    asChild
                  >
                    <span>
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      View
                    </span>
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;

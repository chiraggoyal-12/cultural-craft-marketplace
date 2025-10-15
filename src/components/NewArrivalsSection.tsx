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

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 md:mb-12 text-center">
        New Arrivals & Curated Picks
      </h2>

      {/* Column-based layout matching Jaypore design */}
      <div 
        className="max-w-[1400px] mx-auto"
        style={{
          columnCount: 'auto',
          columnWidth: '280px',
          columnGap: '16px',
        }}
      >
        {newProducts.map((product) => (
          <div
            key={product.id}
            className="break-inside-avoid mb-4 group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link to={`/product/${product.id}`} className="block">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* NEW Badge */}
                {product.newArrival && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black text-white text-xs font-bold px-3 py-1.5 tracking-widest">
                      NEW
                    </span>
                  </div>
                )}

                {/* Hover Actions Overlay */}
                <div
                  className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center gap-2 z-20 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Button
                    size="sm"
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

              {/* Product Name - Below Image */}
              <p className="text-center text-sm md:text-base font-bold tracking-wide uppercase text-foreground">
                {product.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;

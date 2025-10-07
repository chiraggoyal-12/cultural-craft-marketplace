import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Play } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useProductsWithMedia } from "@/hooks/useProductsWithMedia";

const NewArrivalsSection = () => {
  const { addItem } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { products } = useProductsWithMedia();

  // Get new arrivals and mix with some featured if we need more products (8 total for 4x2 grid)
  const newProducts = [
    ...products.filter((p) => p.newArrival),
    ...products.filter((p) => p.featured && !p.newArrival).slice(0, 5),
  ].slice(0, 8);

  return (
    <section className="py-20 md:py-32 px-4 md:px-20 text-center relative">
      {/* Header */}
      <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8 md:mb-16 text-gray-900">
        New Arrivals & Curated Picks
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
        {newProducts.map((product, index) => {
          // Apply curved corners to specific positions
          const isTopLeft = index === 0;
          const isBottomRight = index === 7;

          const cornerClass = isTopLeft
            ? "rounded-tl-3xl"
            : isBottomRight
            ? "rounded-br-3xl"
            : "rounded-xl";

          return (
            <div
              key={product.id}
              className="flex flex-col items-center group cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${cornerClass} w-full aspect-square`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* NEW Badge */}
                {product.newArrival && (
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-black text-white text-xs font-medium px-2 py-1 tracking-wide">
                      NEW
                    </span>
                  </div>
                )}

                {/* Hover Overlay with Actions - Hidden on mobile, shown on desktop */}
                <div
                  className={`absolute inset-0 bg-black/40 transition-all duration-300 hidden md:flex items-center justify-center ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white text-black hover:bg-white/90 font-medium px-4 py-2 text-sm"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-white font-medium px-4 py-2 text-sm"
                      asChild
                    >
                      <Link to={`/product/${product.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="mt-2 md:mt-3 font-sans text-sm md:text-base text-black font-semibold tracking-wide uppercase text-center">
                {product.name}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArrivalsSection;

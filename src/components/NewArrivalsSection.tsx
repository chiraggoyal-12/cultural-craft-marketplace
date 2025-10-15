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
    // Pattern: tall, wide, square, tall, wide, square, tall, wide
    const pattern = index % 8;
    
    // Mobile: 2 columns, Desktop: 4 columns with spans
    if (pattern === 0) return "col-span-1 row-span-2"; // tall
    if (pattern === 1) return "col-span-1 md:col-span-2 row-span-1"; // wide
    if (pattern === 2) return "col-span-1 row-span-1"; // square
    if (pattern === 3) return "col-span-1 row-span-2"; // tall
    if (pattern === 4) return "col-span-1 md:col-span-2 row-span-1"; // wide
    if (pattern === 5) return "col-span-1 row-span-1"; // square
    if (pattern === 6) return "col-span-1 row-span-2"; // tall
    if (pattern === 7) return "col-span-1 md:col-span-2 row-span-1"; // wide
    
    return "col-span-1 row-span-1";
  };

  return (
    <section className="py-12 md:py-24 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-8 md:mb-12 text-center">
        New Arrivals & Curated Picks
      </h2>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] gap-3 md:gap-4 max-w-7xl mx-auto">
        {newProducts.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={`group relative overflow-hidden rounded-sm ${getGridClass(index)} cursor-pointer`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* NEW Badge */}
            {product.newArrival && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white text-black text-xs font-bold px-3 py-1.5 tracking-wider">
                  NEW
                </span>
              </div>
            )}

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
              <h3 className="font-serif text-white text-base md:text-xl lg:text-2xl font-semibold tracking-wide uppercase leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Hover Actions Overlay */}
            <div
              className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center gap-2 md:gap-3 z-20 ${
                hoveredProduct === product.id ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-black hover:bg-white/90 font-semibold text-xs md:text-sm px-3 md:px-4 h-8 md:h-9"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
              >
                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Add
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-xs md:text-sm px-3 md:px-4 h-8 md:h-9"
                asChild
              >
                <span>
                  <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  View
                </span>
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;

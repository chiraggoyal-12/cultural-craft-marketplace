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

  // Get new arrivals and mix with some featured if we need more products (8 total for 2 rows)
  const newProducts = [
    ...products.filter((p) => p.newArrival),
    ...products.filter((p) => p.featured && !p.newArrival).slice(0, 5),
  ].slice(0, 8);

  // Grid layout: 4 columns, 2 rows with varied card sizes
  const gridConfig = [
    { span: "col-span-1", height: "row-span-1" }, // 0 - square
    { span: "col-span-1", height: "row-span-2" }, // 1 - tall
    { span: "col-span-2", height: "row-span-1" }, // 2 - wide
    { span: "col-span-1", height: "row-span-1" }, // 3 - square
    { span: "col-span-1", height: "row-span-1" }, // 4 - square
    { span: "col-span-2", height: "row-span-1" }, // 5 - wide
    { span: "col-span-2", height: "row-span-1" }, // 6 - wide
    { span: "col-span-1", height: "row-span-1" }, // 7 - square
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 lg:px-12">
      {/* Header */}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 md:mb-12 text-center">
        New Arrivals & Curated Picks
      </h2>

      {/* 2-Row Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 auto-rows-[200px] md:auto-rows-[280px] gap-3 md:gap-4 max-w-[1400px] mx-auto">
        {newProducts.map((product, index) => {
          const config = gridConfig[index] || gridConfig[0];
          
          return (
            <div
              key={product.id}
              className={`group relative overflow-hidden ${config.span} ${config.height}`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <Link to={`/product/${product.id}`} className="block h-full w-full">
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* NEW Badge */}
                  {product.newArrival && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                      <span className="bg-black text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 tracking-widest">
                        NEW
                      </span>
                    </div>
                  )}

                  {/* Product Name Overlay - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 md:p-4 z-10">
                    <h3 className="font-sans text-black text-xs md:text-sm lg:text-base font-bold tracking-wide uppercase text-center">
                      {product.name}
                    </h3>
                  </div>

                  {/* Hover Actions Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center gap-2 z-20 ${
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
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewArrivalsSection;

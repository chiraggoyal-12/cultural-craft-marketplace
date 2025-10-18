import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductsWithMedia } from "@/hooks/useProductsWithMedia";

const NewArrivalsSection = () => {
  const { products } = useProductsWithMedia();

  // Get new arrivals and mix with some featured if we need more products (8 total)
  const newProducts = [
    ...products.filter((p) => p.newArrival),
    ...products.filter((p) => p.featured && !p.newArrival).slice(0, 5),
  ].slice(0, 8);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-foreground">
          Our Best Selling Products
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/product/${product.id}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden mb-4 bg-[#f5f1e8] rounded-lg aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-center text-base md:text-lg font-semibold mb-4 text-foreground min-h-[3rem] flex items-center justify-center">
                  {product.name}
                </h3>

                {/* Get Quote Button */}
                <Button
                  className="w-full bg-[#6b5744] hover:bg-[#5a4936] text-white"
                  asChild
                >
                  <span>Get Quote</span>
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-12 py-6 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;

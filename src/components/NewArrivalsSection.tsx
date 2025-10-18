import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductsWithMedia } from "@/hooks/useProductsWithMedia";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NewArrivalsSection = () => {
  const { products } = useProductsWithMedia();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);

  // Get new arrivals and mix with some featured if we need more products (8 total)
  const newProducts = [
    ...products.filter((p) => p.newArrival),
    ...products.filter((p) => p.featured && !p.newArrival).slice(0, 5),
  ].slice(0, 8);

  return (
    <section 
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 transition-all duration-1000 ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-foreground transition-all duration-700 delay-200 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}>
          Our Best Selling Products
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group transition-all duration-700 ${
                sectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: sectionVisible ? `${300 + index * 100}ms` : '0ms'
              }}
            >
              <Link to={`/product/${product.id}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden mb-4 bg-[#f5f1e8] rounded-lg aspect-square shadow-md group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-center text-base md:text-lg font-semibold mb-4 text-foreground min-h-[3rem] flex items-center justify-center group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Get Quote Button */}
                <Button
                  className="w-full bg-[#6b5744] hover:bg-[#5a4936] text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  asChild
                >
                  <span>Get Quote</span>
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className={`text-center transition-all duration-700 delay-1000 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <Button
            size="lg"
            variant="outline"
            className="px-12 py-6 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
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

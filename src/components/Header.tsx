import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import PredictiveSearch from "@/components/PredictiveSearch";
import { Product } from "@/data/products";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleProductSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const categories = [
    { name: "Culinary Crafts", slug: "culinary-crafts" },
    { name: "Divine Artistry", slug: "divine-artistry" }, 
    { name: "Artisan Home & Serenity", slug: "artisan-home-serenity" },
    { name: "Crafted Sip & Smoke", slug: "crafted-sip-smoke" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Handora
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center">
                Shop
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-elegant border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4 space-y-2">
                  <Link
                    to="/shop"
                    className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
                  >
                    All Products
                  </Link>
                  <div className="border-t border-border my-2"></div>
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/shop/${category.slug}`}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
              Journal
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <PredictiveSearch 
              onProductSelect={handleProductSelect}
              className="w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
              <Link to="/wishlist">
                <Heart className="w-5 h-5" />
              </Link>
            </Button>
            {/* User Account */}
            {user ? (
              <Button variant="ghost" size="icon" onClick={signOut} title="Sign Out">
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/auth">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <PredictiveSearch 
            onProductSelect={handleProductSelect}
            className="w-full"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-2">
              <span className="block text-sm font-medium text-muted-foreground">Shop Categories</span>
              <Link
                to="/shop"
                className="block pl-4 text-foreground hover:text-primary transition-colors font-medium"
              >
                All Products
              </Link>
              <div className="border-t border-border my-2 ml-4"></div>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/shop/${category.slug}`}
                  className="block pl-4 text-foreground hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link to="/about" className="block text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/blog" className="block text-foreground hover:text-primary transition-colors">
              Journal
            </Link>
            <Link to="/contact" className="block text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PredictiveSearch from "@/components/PredictiveSearch";
import { Product } from "@/data/products";
import handoraLogo from "@/assets/handora-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleProductSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const categories = [
    { name: "Culinary Crafts", slug: "culinary-crafts" },
    { name: "Divine Artistry", slug: "divine-artistry" },
    { name: "Artisan Home & Serenity", slug: "artisan-home-serenity" },
    { name: "Crafted Sip & Smoke", slug: "crafted-sip-smoke" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur b border-b border-border smooth-transition bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Logo Section - Centered */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <Link to="/">
            <img
              src={handoraLogo}
              alt="Handora"
              className="h-16 w-auto smooth-transition hover:scale-105"
            />
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 pb-4">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-foreground hover:text-primary smooth-transition flex items-center">
                Products
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
            <Link
              to="/customisations"
              className="text-foreground hover:text-primary smooth-transition"
            >
              Customisations
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary smooth-transition"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="text-foreground hover:text-primary smooth-transition"
            >
              Journal
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary smooth-transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section - Search Bar + Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center max-w-sm">
              <PredictiveSearch
                onProductSelect={handleProductSelect}
                className="w-full"
              />
            </div>
            {/* User Account */}
            {user ? (
              <Button variant="ghost" size="icon" asChild title="My Account">
                <Link to="/dashboard">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/auth">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
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
              <span className="block text-sm font-medium text-muted-foreground">
                Shop Categories
              </span>
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
            <Link
              to="/customisations"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Customisations
            </Link>
            <Link
              to="/about"
              className="block text-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Journal
            </Link>
            <Link
              to="/contact"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

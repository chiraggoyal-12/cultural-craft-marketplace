import { useState } from "react";
import { Search, Heart, User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Culinary Crafts",
    "Divine Artistry", 
    "Artisan Home & Serenity",
    "Crafted Sip & Smoke"
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Handora
            </h1>
            <span className="hidden sm:block text-sm text-muted-foreground">
              Connecting Cultures
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <div className="relative group">
              <button className="text-foreground hover:text-primary transition-colors flex items-center">
                Shop
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-elegant border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4 space-y-2">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`/shop/${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </a>
            <a href="/blog" className="text-foreground hover:text-primary transition-colors">
              Journal
            </a>
            <a href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search for crafts..."
                className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search for crafts..."
              className="pl-10 bg-muted/50 border-border"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="/" className="block text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <div className="space-y-2">
              <span className="block text-sm font-medium text-muted-foreground">Shop Categories</span>
              {categories.map((category) => (
                <a
                  key={category}
                  href={`/shop/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block pl-4 text-foreground hover:text-primary transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
            <a href="/about" className="block text-foreground hover:text-primary transition-colors">
              About Us
            </a>
            <a href="/blog" className="block text-foreground hover:text-primary transition-colors">
              Journal
            </a>
            <a href="/contact" className="block text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
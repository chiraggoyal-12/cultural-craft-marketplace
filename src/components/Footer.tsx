import { useState } from "react";
import { Heart, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import handoraLogo from "@/assets/handora-logo.png";
import footerBg from "@/assets/footer-bg.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, "footer");
    if (result.success) {
      setEmail("");
    }
  };

  return (
    <footer 
      className="relative border-t border-border/20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Explore Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop/culinary-crafts"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Culinary Crafts
                </a>
              </li>
              <li>
                <a
                  href="/shop/divine-artistry"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Divine Artistry
                </a>
              </li>
              <li>
                <a
                  href="/shop/artisan-home-serenity"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Artisan Home & Serenity
                </a>
              </li>
              <li>
                <a
                  href="/shop/crafted-sip-smoke"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Crafted Sip & Smoke
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Journal
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/artisans"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Meet Our Artisans
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="/payment"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Payment Methods
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Stay connected with Handora. Discover stories, culture, and
                exclusive offers.
              </p>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-background/50 border-border text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "..." : "Join"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={handoraLogo} alt="Handora" className="h-8 w-auto" />
              <span className="text-sm text-muted-foreground">
                Connecting Cultures, One Craft at a Time
              </span>
            </div>

            <p className="text-sm text-muted-foreground flex items-center">
              © Handora {currentYear}. All Rights Reserved. Crafted with{" "}
              <Heart className="w-4 h-4 mx-1 text-primary fill-current" /> by
              Handora.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

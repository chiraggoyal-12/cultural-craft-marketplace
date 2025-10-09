import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import newsletterBg from "@/assets/new-collection-bg1.png";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, "home");
    if (result.success) {
      setEmail("");
    }
  };

  return (
    <section
      className="bg-background"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 py-32 md:py-48 lg:py-64">
        <Card className="bg-transparent border-transparent shadow-none overflow-hidden">
          <CardContent className="p-10 md:p-16 text-center text-foreground">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Connected with Handora
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Discover stories behind our crafts, meet the artisans, and be
                the first to know about new collections and exclusive offers.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-muted-foreground text-sm mt-4">
                Join 5,000+ craft lovers. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import { Card, CardContent } from "@/components/ui/card";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'home');
    if (result.success) {
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-hero border-0 shadow-elegant overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Connected with Handora
              </h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Discover stories behind our crafts, meet the artisans, and be the first 
                to know about new collections and exclusive offers.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 backdrop-blur-sm"
                />
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="bg-white text-foreground hover:bg-white/90 font-medium shadow-lg"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              
              <p className="text-white/70 text-sm mt-4">
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const NewsletterSection = () => {
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
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 backdrop-blur-sm"
                />
                <Button 
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 font-medium shadow-lg"
                >
                  Subscribe
                </Button>
              </div>
              
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
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      rating: 5,
      text: "The Banswara cake stand is absolutely stunning! The craftsmanship is impeccable and it has become the centerpiece of my dining table. Love supporting traditional artisans.",
      product: "Banswara Cake Stand"
    },
    {
      name: "Sarah Johnson",
      location: "San Francisco, USA",
      rating: 5,
      text: "I'm amazed by the spiritual energy of the Ganesh sculpture. The attention to detail and the cultural significance make it more than just a decoration - it's a piece of art.",
      product: "Boat Ganesh"
    },
    {
      name: "Ahmed Hassan",
      location: "Dubai, UAE",
      rating: 5,
      text: "The rose quartz tea light holders create such a peaceful ambiance in my meditation space. The quality is exceptional and shipping was careful and fast.",
      product: "Rose Quartz Tea Light Holder"
    }
  ];

  return (
    <section className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have brought authentic 
            craftsmanship into their homes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-0 shadow-cultural hover:shadow-elegant transition-all duration-300 bg-card/70 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 text-gold fill-current"
                    />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Customer Info */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    Purchased: {testimonial.product}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-gold fill-current mr-2" />
              <span className="font-semibold">4.9/5</span>
              <span className="ml-1">Average Rating</span>
            </div>
            <div>
              <span className="font-semibold">2,500+</span>
              <span className="ml-1">Happy Customers</span>
            </div>
            <div>
              <span className="font-semibold">50+</span>
              <span className="ml-1">Artisan Partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
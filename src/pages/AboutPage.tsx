import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Leaf, CheckCircle, Globe, Sparkles, TrendingUp, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/lifestyle-spiritual.jpg';
import artisanImage from '@/assets/lifestyle-living.jpg';
import craftImage from '@/assets/lifestyle-dining.jpg';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              About Handora
            </h1>
            <Button asChild variant="secondary" size="lg" className="mt-6">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>

        {/* About Handora - Intro */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Welcome to <span className="font-playfair font-semibold text-primary">Handora</span>, where the timeless artistry of Rajasthan meets the modern world. Founded in the heart of India's desert state, Handora is a celebration of authentic handicrafts—specializing in exquisite marble and stone items that blend traditional craftsmanship with contemporary elegance. Our name, inspired by "hand" and "aura", reflects the magical essence infused into every piece by skilled artisans whose hands breathe life into stone.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={artisanImage} 
                  alt="Artisan at work" 
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
                  <p>
                    Handora was born from a passion to preserve and promote Rajasthani heritage. Rajasthan, home to majestic forts, intricate carvings, and the world-famous Makrana marble that adorns icons like the Taj Mahal, has always been our inspiration.
                  </p>
                  <p>
                    Starting small in local workshops, our founder envisioned a global platform to share these treasures with the world. Today, Handora stands as a bridge between age-old traditions and modern homes, connecting artisans of Rajasthan with customers worldwide.
                  </p>
                  <p>
                    Every piece tells a story of dedication, heritage, and innovation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Craftsmanship */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Craftsmanship</h2>
                <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
                  <p>
                    At Handora, we create handcrafted marble and stone products that are both beautiful and functional. From elegant décor—vases, coasters, trays, candle holders, and jewelry boxes—to bespoke wall art and tableware, our collection highlights sustainability, quality, and versatility.
                  </p>
                  <p>
                    Each item is meticulously carved by master artisans using time-honored techniques passed down through generations. We ethically source premium materials and ensure eco-conscious practices that respect both the environment and artisan communities.
                  </p>
                  <p>
                    What makes us unique? The way we fuse classic Rajasthani motifs—floral patterns, geometric designs, intricate inlays—with modern aesthetics, making our creations perfect for contemporary lifestyles while honoring their roots.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img 
                  src={craftImage} 
                  alt="Handcrafted marble products" 
                  className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Our mission is to deliver timeless handcrafted marble and stone products that bring the aura of Rajasthan into homes across the world. We are dedicated to:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <Award className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Quality & Authenticity</h3>
                  <p className="text-muted-foreground">
                    Maintaining the highest standards of quality and authenticity in every product.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Curated Collection</h3>
                  <p className="text-muted-foreground">
                    Offering a curated collection that blends traditional artistry with modern design.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-md">
                <CardContent className="p-8 text-center">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Seamless Experience</h3>
                  <p className="text-muted-foreground">
                    Providing a reliable and seamless shopping experience for customers worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-foreground/80 italic">
                By choosing Handora, you're not just purchasing a product—you're investing in a piece of Rajasthan's heritage, crafted to last for generations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Handora */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Why Choose Handora?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
                <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Authenticity Guaranteed</h3>
                  <p className="text-muted-foreground">Every piece is 100% handcrafted—no mass production.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
                <Globe className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Global Reach with Local Heart</h3>
                  <p className="text-muted-foreground">We ship worldwide, carrying Rajasthan's charm across borders.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
                <TrendingUp className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">In-Demand Designs</h3>
                  <p className="text-muted-foreground">From minimalist accents to personalized engravings, rooted in tradition yet modern.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
                <Heart className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Customer-Centric Approach</h3>
                  <p className="text-muted-foreground">Quality, cultural storytelling, and your satisfaction are at our core.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Our Journey */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover collections that embody the soul of Rajasthan. Whether you're decorating a modern space, gifting something timeless, or seeking a custom creation—Handora is here to craft something truly special for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/shop">Explore Collections</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/40 to-secondary/50" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Bring Rajasthan's Aura Into Your Home
            </h2>
            <p className="text-lg md:text-xl text-white drop-shadow-md mb-8 max-w-2xl mx-auto">
              Explore our collections today and discover handcrafted pieces that tell a story.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base font-semibold">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
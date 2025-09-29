import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Leaf } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Handora</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are passionate about preserving traditional craftsmanship while bringing 
              authentic handmade products to modern homes around the world.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020, Handora began as a dream to bridge the gap between 
                    traditional artisans and contemporary consumers. We believe that every 
                    handcrafted piece tells a story of heritage, skill, and passion.
                  </p>
                  <p>
                    Our journey started when we discovered the incredible talent of artisans 
                    in rural communities who were struggling to reach wider markets. We saw 
                    an opportunity to create a platform that would showcase their beautiful 
                    work while providing them with sustainable income.
                  </p>
                  <p>
                    Today, we work with over 200 artisans across different regions, each 
                    specializing in unique traditional crafts passed down through generations.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-2xl mb-2">200+</h3>
                    <p className="text-muted-foreground">Artisan Partners</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-2xl mb-2">50k+</h3>
                    <p className="text-muted-foreground">Happy Customers</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-2xl mb-2">100%</h3>
                    <p className="text-muted-foreground">Handmade</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-2xl mb-2">Eco</h3>
                    <p className="text-muted-foreground">Friendly</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're committed to creating positive impact through authentic craftsmanship
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Authenticity</h3>
                  <p className="text-muted-foreground">
                    Every product is genuinely handcrafted using traditional techniques, 
                    ensuring authentic quality and uniqueness in each piece.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Community</h3>
                  <p className="text-muted-foreground">
                    We support artisan communities by providing fair wages and helping 
                    them preserve their cultural heritage through their craft.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                  <p className="text-muted-foreground">
                    Our commitment to sustainable practices ensures that our beautiful 
                    products don't come at the cost of our planet's future.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              A passionate group of individuals dedicated to bringing you the finest handcrafted products
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-2">Founder & CEO</p>
                  <p className="text-muted-foreground text-sm">
                    Passionate about connecting artisans with global markets
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">Michael Chen</h3>
                  <p className="text-primary font-medium mb-2">Head of Artisan Relations</p>
                  <p className="text-muted-foreground text-sm">
                    Building lasting partnerships with craftspeople worldwide
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-lg mb-2">Emily Rodriguez</h3>
                  <p className="text-primary font-medium mb-2">Quality & Sustainability Director</p>
                  <p className="text-muted-foreground text-sm">
                    Ensuring every product meets our high standards
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
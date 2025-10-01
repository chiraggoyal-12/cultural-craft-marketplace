import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react';

const BlogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Artisan stories data
  const artisanStories = [
    {
      id: 1,
      title: "Craft & Legacy: Marble Artisans of Banswara",
      excerpt: "Meet Suresh Gehlot, a third-generation marble artisan whose hands transform cold stone into timeless treasures. In the heart of Banswara, his family has preserved the ancient art of marble inlay work for over 60 years.",
      artisan: "Suresh Gehlot",
      craft: "Marble Inlay & Carving",
      region: "Banswara, Rajasthan",
      date: "2024-01-20",
      readTime: "8 min read",
      category: "Marble Craft",
      image: "/src/assets/products/banswara-cake-stand.jpg",
      featured: true,
      challenge: "Finding quality marble and competing with machine-made products",
      impact: "Each purchase supports traditional skills and provides sustainable income for 15 artisan families",
      technique: "Hand-carved using traditional chisels and natural stone inlay techniques passed through generations"
    },
    {
      id: 2,
      title: "Golden Fibres: The Sikki Craft of Bihar",
      excerpt: "Meera Thakur weaves magic with golden grass. The ancient Sikki craft of Bihar, once fading into obscurity, finds new life through her dedication and the support of conscious consumers.",
      artisan: "Meera Thakur",
      craft: "Sikki Grass Weaving",
      region: "Madhubani, Bihar",
      date: "2024-01-15",
      readTime: "7 min read",
      category: "Textile Craft",
      image: "/src/assets/lifestyle-living.jpg",
      featured: false,
      challenge: "Limited market access and younger generation moving away from traditional crafts",
      impact: "Your purchase helps preserve a 1000-year-old craft and empowers rural women artisans",
      technique: "Natural sikki grass is hand-woven using intricate coiling techniques, creating delicate yet durable pieces"
    },
    {
      id: 3,
      title: "Clay, Relief & Color: The Molela Terracotta Tradition",
      excerpt: "In the village of Molela, clay becomes divine. Artisans create stunning terracotta plaques depicting deities and folk tales, using techniques unchanged for centuries.",
      artisan: "Molela Artisan Collective",
      craft: "Terracotta Relief Work",
      region: "Molela, Rajasthan",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Terracotta Craft",
      image: "/src/assets/lifestyle-spiritual.jpg",
      featured: false,
      challenge: "Rising clay costs and maintaining traditional natural dyes in modern markets",
      impact: "Supporting an entire village's heritage craft tradition and eco-friendly art form",
      technique: "Hand-molded clay with raised relief work, painted using natural pigments and traditional motifs"
    },
    {
      id: 4,
      title: "Weaving Freedom: How Manchaha Empowers Rug Artisans",
      excerpt: "Every knot tells a story of independence. The Manchaha initiative brings together master weavers who create not just rugs, but pathways to economic freedom and artistic expression.",
      artisan: "Manchaha Artisan Collective",
      craft: "Hand-woven Textiles",
      region: "Multiple regions, India",
      date: "2024-01-05",
      readTime: "9 min read",
      category: "Textile Craft",
      image: "/src/assets/lifestyle-dining.jpg",
      featured: false,
      challenge: "Fair wages, safe working conditions, and breaking the cycle of middleman exploitation",
      impact: "Direct support to artisan cooperatives ensures fair trade and sustainable livelihoods",
      technique: "Traditional pit loom weaving with natural fibers, combining ancient patterns with contemporary design"
    }
  ];

  const categories = ['all', 'Marble Craft', 'Textile Craft', 'Terracotta Craft'];
  const regions = ['all', 'Rajasthan', 'Bihar'];

  const filteredStories = selectedFilter === 'all' 
    ? artisanStories 
    : artisanStories.filter(story => 
        story.category === selectedFilter || story.region.includes(selectedFilter)
      );

  const featuredPost = filteredStories.find(post => post.featured);
  const regularPosts = filteredStories.filter(post => !post.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Mission Statement */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/src/assets/hero-banner.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-6 text-base px-6 py-2">Stories Behind the Art</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Handora Journal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We share authentic stories of artisans and their crafts—to inspire, build trust, 
              and celebrate the heritage, craftsmanship, and human impact behind every piece we offer.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                size="sm"
              >
                All Stories
              </Button>
              {categories.filter(c => c !== 'all').map(category => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
              {regions.filter(r => r !== 'all').map(region => (
                <Button
                  key={region}
                  variant={selectedFilter === region ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(region)}
                  size="sm"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artisan Story */}
        {featuredPost && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Badge className="mb-4 text-base px-4 py-2">Featured Artisan Story</Badge>
                <h2 className="text-3xl font-bold mb-2">Spotlight</h2>
                <p className="text-muted-foreground">The craft and the hands that create it</p>
              </div>
              
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden h-[400px] lg:h-auto">
                    <img 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                        {featuredPost.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                    <CardTitle className="text-3xl mb-4 text-foreground hover:text-primary transition-colors cursor-pointer leading-tight">
                      {featuredPost.title}
                    </CardTitle>
                    <p className="text-lg mb-6 leading-relaxed text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <span className="font-semibold text-foreground min-w-[80px]">Artisan:</span>
                        <span>{featuredPost.artisan}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <span className="font-semibold text-foreground min-w-[80px]">Craft:</span>
                        <span>{featuredPost.craft}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{featuredPost.region}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1">Read Full Story</Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Artisan Stories Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">More Artisan Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every craft has a story. Every artisan has a voice. Discover the people and traditions behind our collection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(story => (
                <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 backdrop-blur-sm bg-background/80">
                      {story.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-1">
                    <CardTitle className="text-xl mb-3 text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight">
                      {story.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed flex-1">
                      {story.excerpt}
                    </p>
                    
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-semibold text-foreground">Artisan:</span>
                        <span>{story.artisan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{story.region}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statement Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Choice Makes a Difference</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When you choose handcrafted products, you're not just buying an object—you're preserving centuries-old traditions, 
                supporting artisan families, and keeping cultural heritage alive for future generations. Every purchase is a vote 
                for sustainability, authenticity, and human connection over mass production.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Artisans Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Traditional Crafts Preserved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Fair Trade Commitment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join Our Story</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to receive the latest artisan stories, craft insights, and behind-the-scenes glimpses into 
                the world of traditional Indian craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <Button size="lg">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, ArrowRight, Home, Sparkles } from 'lucide-react';
import { stories } from '@/data/stories';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';
import heroBanner from '@/assets/hero-banner.jpg';

const BlogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await subscribe(email, 'blog');
    if (result.success) {
      setEmail("");
    }
  };

  const categories = ['all', ...Array.from(new Set(stories.map(s => s.category)))];
  const regions = ['all', ...Array.from(new Set(stories.map(s => s.region.split(',')[1]?.trim() || s.region)))];

  const filteredStories = selectedFilter === 'all' 
    ? stories 
    : stories.filter(story => 
        story.category === selectedFilter || story.region.includes(selectedFilter)
      );

  const featuredStory = filteredStories.find(story => story.featured);
  const regularStories = filteredStories.filter(story => !story.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner Section */}
        <section className="relative py-32 overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroBanner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Badge className="mb-6 text-base px-6 py-2 bg-terracotta text-white border-0">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Artisan Journal
            </Badge>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight drop-shadow-sm">
              Stories Behind the Craft
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
              Every handmade piece carries not just material, but memory, tradition, and the artisan's touch. 
              Discover the real stories of the people and practices that shape our collection.
            </p>
            <Button asChild variant="outline" size="lg" className="shadow-lg">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-10 border-y bg-gradient-to-r from-warm-beige via-background to-warm-beige">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-6 tracking-wider uppercase">
              Filter by Category or Region
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                size="lg"
                className="rounded-full shadow-sm"
              >
                All Stories
              </Button>
              {categories.filter(c => c !== 'all').map(category => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(category)}
                  size="lg"
                  className="rounded-full shadow-sm"
                >
                  {category}
                </Button>
              ))}
              {regions.filter(r => r !== 'all').map(region => (
                <Button
                  key={region}
                  variant={selectedFilter === region ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(region)}
                  size="lg"
                  className="rounded-full shadow-sm"
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Story */}
        {featuredStory && (
          <section className="py-24 bg-gradient-warm">
            <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                <Badge className="mb-4 text-base px-8 py-3 bg-terracotta text-white border-0 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  Featured Story
                </Badge>
                <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-4 text-foreground">Spotlight</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The craft and the hands that create it</p>
              </div>
              
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden h-[500px] lg:h-auto">
                    <img 
                      src={featuredStory.image.replace('/src', '')}
                      alt={featuredStory.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6">
                      <Badge variant="secondary" className="backdrop-blur-md bg-background/90 text-base px-5 py-2 shadow-lg border">
                        {featuredStory.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-12 lg:p-16 flex flex-col justify-center bg-card">
                    <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                      {featuredStory.title}
                    </h3>
                    <p className="text-lg mb-10 leading-relaxed text-muted-foreground">
                      {featuredStory.excerpt}
                    </p>
                    
                    <div className="space-y-5 mb-10 p-6 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-foreground min-w-[100px] text-sm uppercase tracking-wider">Artisan:</span>
                        <span className="text-base font-medium text-foreground">{featuredStory.artisan}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-foreground min-w-[100px] text-sm uppercase tracking-wider">Craft:</span>
                        <span className="text-base font-medium text-foreground">{featuredStory.craft}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-terracotta" />
                        <span className="text-base font-medium text-foreground">{featuredStory.region}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10 pb-10 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-terracotta" />
                        <span className="font-medium">{new Date(featuredStory.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-terracotta" />
                        <span className="font-medium">{featuredStory.readTime}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${featuredStory.id}`}>
                      <Button size="lg" className="w-full group text-base py-6 shadow-lg bg-terracotta hover:bg-terracotta-dark text-white">
                        Read Full Story
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Stories Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 text-foreground">More Artisan Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every craft has a story. Every artisan has a voice. Discover the people and traditions behind our collection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularStories.map(story => (
                <Card key={story.id} className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col border-2">
                  <Link to={`/blog/${story.id}`} className="flex flex-col h-full">
                    <div className="relative overflow-hidden h-72">
                      <img 
                        src={story.image.replace('/src', '')}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      <Badge className="absolute top-5 left-5 backdrop-blur-md bg-background/95 text-sm px-4 py-2 shadow-lg border font-semibold">
                        {story.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-8 flex flex-col flex-1 bg-card">
                      <h3 className="font-playfair text-2xl font-bold mb-5 text-foreground group-hover:text-terracotta transition-colors line-clamp-2 leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed flex-1 text-base">
                        {story.excerpt}
                      </p>
                      
                      <div className="space-y-4 mb-8 p-5 rounded-lg bg-muted/20 border">
                        <div className="flex items-start gap-3 text-sm">
                          <span className="font-bold text-foreground min-w-[70px] uppercase tracking-wider text-xs">Artisan:</span>
                          <span className="font-medium text-foreground">{story.artisan}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-terracotta" />
                          <span className="font-medium text-foreground">{story.region}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-4 h-4 text-terracotta" />
                          <span className="font-medium">{story.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-terracotta group-hover:text-white transition-all font-semibold">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Newsletter */}
        <section className="py-24 bg-gradient-to-br from-terracotta via-forest to-terracotta-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-90" />
              <h2 className="font-playfair text-5xl font-bold mb-6">Join Our Story</h2>
              <p className="text-lg text-white/90 mb-12 leading-relaxed font-medium">
                Subscribe to receive the latest artisan stories, craft insights, and behind-the-scenes glimpses into 
                the world of traditional Indian craftsmanship.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  type="email" 
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="flex-1 px-6 py-6 border-2 border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 text-base"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isLoading}
                  className="px-10 py-6 bg-white text-terracotta hover:bg-white/90 font-bold shadow-xl"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
              <p className="text-sm text-white/80 mt-8 font-medium">
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { stories } from '@/data/stories';

const BlogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

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
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/src/assets/hero-banner.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              Stories Behind the Craft
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Every handmade piece carries not just material, but memory, tradition, and the artisan's touch. 
              Here are real stories of the people and practices that shape our collection.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-y bg-muted/20">
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

        {/* Featured Story */}
        {featuredStory && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <Badge className="mb-4 text-base px-6 py-2">Featured Story</Badge>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-3">Spotlight</h2>
                <p className="text-xl text-muted-foreground">The craft and the hands that create it</p>
              </div>
              
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden h-[450px] lg:h-auto">
                    <img 
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge variant="secondary" className="backdrop-blur-sm bg-background/90 text-base px-4 py-2">
                        {featuredStory.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-10 lg:p-12 flex flex-col justify-center">
                    <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-5 text-foreground leading-tight">
                      {featuredStory.title}
                    </h3>
                    <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
                      {featuredStory.excerpt}
                    </p>
                    
                    <div className="space-y-4 mb-8 text-sm">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <span className="font-semibold text-foreground min-w-[90px]">Artisan:</span>
                        <span className="text-base">{featuredStory.artisan}</span>
                      </div>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <span className="font-semibold text-foreground min-w-[90px]">Craft:</span>
                        <span className="text-base">{featuredStory.craft}</span>
                      </div>
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                        <span className="text-base">{featuredStory.region}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredStory.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredStory.readTime}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${featuredStory.id}`}>
                      <Button size="lg" className="w-full group">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Stories Grid */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">More Artisan Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Every craft has a story. Every artisan has a voice. Discover the people and traditions behind our collection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {regularStories.map(story => (
                <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col">
                  <Link to={`/blog/${story.id}`}>
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Badge className="absolute top-4 left-4 backdrop-blur-sm bg-background/90 text-sm px-3 py-1">
                        {story.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-7 flex flex-col flex-1">
                      <h3 className="font-playfair text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-1">
                        {story.excerpt}
                      </p>
                      
                      <div className="space-y-3 mb-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="font-semibold text-foreground">Artisan:</span>
                          <span>{story.artisan}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{story.region}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{story.readTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Read Story
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
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold mb-6">Join Our Story</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Subscribe to receive the latest artisan stories, craft insights, and behind-the-scenes glimpses into 
                the world of traditional Indian craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-5 py-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-base"
                />
                <Button size="lg" className="px-8">Subscribe</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
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

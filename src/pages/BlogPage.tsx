import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';

const BlogPage = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Handcrafted Stone Carving",
      excerpt: "Discover the ancient techniques passed down through generations of artisans in Rajasthan.",
      content: "Explore the intricate world of stone carving where every piece tells a story...",
      author: "Rajesh Kumar",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Craftsmanship",
      image: "/src/assets/category-culinary.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Crafting: Our Environmental Journey",
      excerpt: "Learn how traditional crafting methods contribute to sustainable living and environmental conservation.",
      content: "In a world increasingly focused on sustainability, traditional crafts offer...",
      author: "Priya Sharma",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Sustainability",
      image: "/src/assets/category-home.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Behind the Scenes: Meet Our Artisan Partners",
      excerpt: "Get to know the talented craftspeople who bring our beautiful products to life.",
      content: "Every product in our collection has a story, and behind each story is a skilled artisan...",
      author: "Amit Patel",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Artisans",
      image: "/src/assets/category-divine.jpg",
      featured: false
    },
    {
      id: 4,
      title: "The Cultural Significance of Handmade Crafts",
      excerpt: "Understanding how traditional crafts preserve cultural heritage and connect us to our roots.",
      content: "Handmade crafts are more than just objects; they are vessels of culture...",
      author: "Meera Joshi",
      date: "2023-12-28",
      readTime: "6 min read",
      category: "Culture",
      image: "/src/assets/category-sip-smoke.jpg",
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Handora Journal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stories of craftsmanship, culture, and the artisans who keep traditions alive.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <Badge className="mb-4">Featured Story</Badge>
                <h2 className="text-2xl font-bold mb-4">Latest from our Journal</h2>
              </div>
              
              <Card className="overflow-hidden hover:shadow-warm transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                    <CardTitle className="text-2xl mb-4 text-foreground hover:text-primary transition-colors cursor-pointer">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-lg mb-6">
                      {featuredPost.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <Button className="w-fit">Read Full Story</Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">More Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4">{post.category}</Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-3 text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">Read More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our journal for the latest stories about craftsmanship, culture, and artisan spotlights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
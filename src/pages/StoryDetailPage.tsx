import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { stories } from '@/data/stories';
import { products } from '@/data/products';

const StoryDetailPage = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const story = stories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
            <Button onClick={() => navigate('/blog')}>Back to Journal</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProductDetails = story.relatedProducts
    .map(productId => products.find(p => p.id === productId))
    .filter(Boolean);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = story.title;
    
    const shareUrls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Back Button */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Button>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative h-[500px] overflow-hidden">
          <img 
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Badge className="mb-4">{story.category}</Badge>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <article className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Title and Meta */}
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(story.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{story.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{story.region}</span>
              </div>
            </div>

            {/* Artisan Info */}
            <div className="bg-muted/30 rounded-lg p-6 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Artisan</h3>
                  <p className="text-muted-foreground">{story.artisan}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Craft</h3>
                  <p className="text-muted-foreground">{story.craft}</p>
                </div>
              </div>
            </div>

            {/* Story Sections */}
            <div className="prose prose-lg max-w-none">
              {story.fullContent.sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="font-playfair text-3xl font-semibold mb-4 text-foreground">
                    {section.heading}
                  </h2>
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg leading-relaxed text-muted-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t">
              <h3 className="font-playfair text-2xl font-semibold mb-4">Share This Story</h3>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Products */}
        {relatedProductDetails.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-playfair text-4xl font-bold mb-4">Discover Related Pieces</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each piece carries the spirit of this craft tradition
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedProductDetails.map(product => (
                  <Card key={product?.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <Link to={`/product/${product?.id}`}>
                      <div className="relative overflow-hidden h-64">
                        <img 
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-playfair text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {product?.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product?.description}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{product?.price.toLocaleString()}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* More Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-4xl font-bold mb-6">Continue Reading</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore more stories of artisans and the crafts that define cultural heritage
            </p>
            <Button size="lg" onClick={() => navigate('/blog')}>
              View All Stories
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StoryDetailPage;

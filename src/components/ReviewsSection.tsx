import React, { useState, useEffect } from 'react';
import { ThumbsUp, Camera, Video, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Review {
  id: string;
  title?: string;
  content?: string;
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  profiles: {
    display_name?: string;
    avatar_url?: string;
  };
  review_media: Array<{
    id: string;
    media_url: string;
    media_type: 'image' | 'video';
  }>;
}

interface ReviewsProps {
  productId: string;
}

const ReviewsSection: React.FC<ReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('most_helpful');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    title: '',
    content: ''
  });
  const { user } = useAuth();

  const fetchReviews = async () => {
    try {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_user_id_fkey(display_name, avatar_url),
          review_media(id, media_url, media_type)
        `)
        .eq('product_id', productId);

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'most_helpful':
        default:
          query = query.order('helpful_count', { ascending: false });
          break;
      }

      const { data, error } = await query;
      if (error) throw error;
      setReviews(data as any || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, sortBy]);

  const submitReview = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to write a review",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          title: reviewData.title,
          content: reviewData.content,
          is_verified_purchase: false // Would need order verification logic
        });

      if (error) throw error;

      toast({
        title: "Review submitted",
        description: "Thank you for your review!"
      });

      setShowWriteReview(false);
      setReviewData({ title: '', content: '' });
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };


  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-muted h-32 rounded-lg"></div>
      ))}
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <Dialog open={showWriteReview} onOpenChange={setShowWriteReview}>
              <DialogTrigger asChild>
                <Button>Write a Review</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="review-title">Title (optional)</Label>
                    <Input
                      id="review-title"
                      value={reviewData.title}
                      onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Great product!"
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-content">Review</Label>
                    <Textarea
                      id="review-content"
                      value={reviewData.content}
                      onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Tell others about your experience..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={submitReview} className="w-full">
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Controls */}
      {reviews.length > 0 && (
        <div className="flex items-center justify-between">
          <h4 className="font-medium">All Reviews ({reviews.length})</h4>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most_helpful">Most Helpful</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.profiles?.avatar_url} />
                    <AvatarFallback>
                      {review.profiles?.display_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {review.profiles?.display_name || 'Anonymous'}
                      </span>
                      {review.is_verified_purchase && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {review.title && (
                      <h5 className="font-medium">{review.title}</h5>
                    )}
                    
                    {review.content && (
                      <p className="text-muted-foreground">{review.content}</p>
                    )}
                    
                    {/* Review Media */}
                    {review.review_media.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {review.review_media.map((media) => (
                          <div key={media.id} className="relative">
                            {media.media_type === 'image' ? (
                              <img
                                src={media.media_url}
                                alt="Review"
                                className="w-16 h-16 object-cover rounded border"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center">
                                <Video className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful_count})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
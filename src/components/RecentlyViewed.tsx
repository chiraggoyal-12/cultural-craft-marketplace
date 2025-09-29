import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Product, getProductById } from '@/data/products';
import { Eye } from 'lucide-react';

const RecentlyViewed: React.FC = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Function to track product view
  const trackProductView = async (productId: string) => {
    try {
      const sessionId = !user ? getSessionId() : null;
      
      // Use upsert to handle existing records
      await supabase
        .from('recently_viewed')
        .upsert({
          user_id: user?.id || null,
          session_id: sessionId,
          product_id: productId,
          viewed_at: new Date().toISOString()
        }, {
          onConflict: user ? 'user_id,product_id' : 'session_id,product_id'
        });
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  };

  // Get or create session ID for guest users
  const getSessionId = () => {
    let sessionId = localStorage.getItem('guest_session_id');
    if (!sessionId) {
      sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('guest_session_id', sessionId);
    }
    return sessionId;
  };

  // Fetch recently viewed products
  const fetchRecentlyViewed = async () => {
    try {
      setLoading(true);
      const sessionId = !user ? getSessionId() : null;
      
      let query = supabase
        .from('recently_viewed')
        .select('product_id, viewed_at')
        .order('viewed_at', { ascending: false })
        .limit(8);

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Get product details for each ID
      const products = data
        ?.map(item => getProductById(item.product_id))
        .filter(Boolean) as Product[];

      setRecentlyViewed(products || []);
    } catch (error) {
      console.error('Error fetching recently viewed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentlyViewed();
  }, [user]);

  // Expose the tracking function globally
  useEffect(() => {
    (window as any).trackProductView = trackProductView;
    return () => {
      delete (window as any).trackProductView;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-muted h-24 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Recently Viewed</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="aspect-square bg-muted rounded overflow-hidden mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-medium text-sm truncate">{product.name}</h4>
              <p className="text-primary font-semibold text-sm">₹{product.price.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
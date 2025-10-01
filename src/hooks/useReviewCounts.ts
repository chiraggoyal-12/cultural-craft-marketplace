import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useReviewCounts = () => {
  const [reviewCounts, setReviewCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewCounts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('product_id');

        if (error) throw error;

        // Count reviews per product
        const counts: Record<string, number> = {};
        data?.forEach((review) => {
          counts[review.product_id] = (counts[review.product_id] || 0) + 1;
        });

        setReviewCounts(counts);
      } catch (err) {
        console.error('Error fetching review counts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewCounts();
  }, []);

  return { reviewCounts, loading };
};

export const useProductReviewCount = (productId: string) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const { count: reviewCount, error } = await supabase
          .from('reviews')
          .select('*', { count: 'exact', head: true })
          .eq('product_id', productId);

        if (error) throw error;
        setCount(reviewCount || 0);
      } catch (err) {
        console.error('Error fetching review count:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchCount();
    }
  }, [productId]);

  return { count, loading };
};

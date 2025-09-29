import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProductMedia {
  id: string;
  product_id: string;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

export const useProductMedia = (productId: string) => {
  const [media, setMedia] = useState<ProductMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('product_media')
          .select('*')
          .eq('product_id', productId)
          .order('sort_order', { ascending: true });

        if (fetchError) throw fetchError;
        setMedia(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchMedia();
    }
  }, [productId]);

  const primaryImage = media.find(m => m.is_primary)?.media_url || media[0]?.media_url;
  const allImages = media.map(m => m.media_url);

  return { media, primaryImage, allImages, loading, error };
};

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products as hardcodedProducts, Product } from '@/data/products';

interface ProductWithMedia extends Product {
  primaryImage?: string;
}

export const useProductsWithMedia = () => {
  const [productsWithMedia, setProductsWithMedia] = useState<ProductWithMedia[]>(hardcodedProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        setLoading(true);
        const { data: mediaData, error } = await supabase
          .from('product_media')
          .select('*')
          .eq('is_primary', true);

        if (error) throw error;

        // Create a map of product_id to primary image
        const mediaMap = new Map(
          mediaData?.map(m => [m.product_id, m.media_url]) || []
        );

        // Update products with database images
        const updated = hardcodedProducts.map(product => ({
          ...product,
          primaryImage: mediaMap.get(product.id),
          image: mediaMap.get(product.id) || product.image
        }));

        setProductsWithMedia(updated);
      } catch (err) {
        console.error('Error fetching product media:', err);
        // Fall back to hardcoded products
        setProductsWithMedia(hardcodedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMedia();
  }, []);

  return { products: productsWithMedia, loading };
};

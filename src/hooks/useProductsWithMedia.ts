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

        console.log('Fetched media data:', mediaData);

        // Convert Google Drive URLs to direct image URLs
        const convertGoogleDriveUrl = (url: string) => {
          if (url.includes('drive.google.com')) {
            const match = url.match(/[?&]id=([^&]+)/);
            if (match) {
              return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
            }
          }
          return url;
        };

        // Create a map of product_id to primary image
        // Convert product names to slugs to match hardcoded product IDs
        const mediaMap = new Map(
          mediaData?.map(m => {
            const slug = m.product_id.toLowerCase().replace(/\s+/g, '-');
            const imageUrl = convertGoogleDriveUrl(m.media_url);
            console.log(`Mapping ${m.product_id} -> ${slug} -> ${imageUrl}`);
            return [slug, imageUrl];
          }) || []
        );

        console.log('Media map:', Array.from(mediaMap.entries()));

        // Update products with database images
        const updated = hardcodedProducts.map(product => {
          const dbImage = mediaMap.get(product.id);
          console.log(`Product ${product.id}: ${dbImage ? 'FOUND' : 'NOT FOUND'} in database`);
          return {
            ...product,
            primaryImage: dbImage,
            image: dbImage || product.image
          };
        });

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

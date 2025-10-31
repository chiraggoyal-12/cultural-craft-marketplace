import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/data/products';
import { useReviewCounts } from './useReviewCounts';

interface ProductWithMedia extends Product {
  primaryImage?: string;
}

export const useProductsWithMedia = () => {
  const [productsWithMedia, setProductsWithMedia] = useState<ProductWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const { reviewCounts, loading: reviewsLoading } = useReviewCounts();

  useEffect(() => {
    const fetchAllMedia = async () => {
      // Wait for review counts to be loaded
      if (reviewsLoading) return;
      
      try {
        setLoading(true);
        
        // Fetch products from database
        const { data: dbProducts, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;

        // Fetch primary media
        const { data: mediaData, error: mediaError } = await supabase
          .from('product_media')
          .select('*')
          .eq('is_primary', true);

        if (mediaError) throw mediaError;

        console.log('Fetched products:', dbProducts);
        console.log('Fetched media data:', mediaData);
        console.log('Review counts:', reviewCounts);

        // Convert Google Drive URLs to direct image URLs
        const convertGoogleDriveUrl = (url: string) => {
          if (url.includes('drive.google.com')) {
            // Handle both URL formats:
            // 1. ?id=FILE_ID
            // 2. /d/FILE_ID/view
            let fileId = null;
            
            const idMatch = url.match(/[?&]id=([^&]+)/);
            if (idMatch) {
              fileId = idMatch[1];
            } else {
              const dMatch = url.match(/\/d\/([^\/]+)\//);
              if (dMatch) {
                fileId = dMatch[1];
              }
            }
            
            if (fileId) {
              return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
            }
          }
          return url;
        };

        // Create media map by product_id
        const mediaMap = new Map(
          mediaData?.map(m => {
            const imageUrl = convertGoogleDriveUrl(m.media_url);
            console.log(`Mapping ${m.product_id} -> ${imageUrl}`);
            return [m.product_id, imageUrl];
          }) || []
        );

        console.log('Media map:', Array.from(mediaMap.entries()));

        // Map database products to Product interface with media
        const updated = (dbProducts || []).map(dbProduct => {
          const primaryImage = mediaMap.get(dbProduct.id);
          console.log(`Product ${dbProduct.name} (${dbProduct.id}): ${primaryImage ? 'FOUND' : 'NOT FOUND'} primary image`);
          
          return {
            id: dbProduct.id,
            name: dbProduct.name,
            price: Number(dbProduct.price),
            category: dbProduct.category,
            subcategory: dbProduct.category, // Using category as subcategory for now
            image: primaryImage || '',
            images: primaryImage ? [primaryImage] : [],
            description: dbProduct.description,
            shortDescription: dbProduct.description.substring(0, 100),
            artisanStory: dbProduct.description,
            careInstructions: dbProduct.care_instructions || 'Handle with care',
            material: dbProduct.material,
            region: 'India',
            inStock: dbProduct.in_stock,
            featured: dbProduct.featured,
            bestseller: dbProduct.bestseller,
            newArrival: dbProduct.new_arrival,
            reviewCount: reviewCounts[dbProduct.id] || 0,
            primaryImage
          } as ProductWithMedia;
        });

        setProductsWithMedia(updated);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductsWithMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMedia();
  }, [reviewCounts, reviewsLoading]);

  return { products: productsWithMedia, loading: loading || reviewsLoading };
};

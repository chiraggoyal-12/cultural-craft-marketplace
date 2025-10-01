import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products as hardcodedProducts, Product } from '@/data/products';
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

        // Create a comprehensive map to fix circular image assignments
        // Database product_id -> Actual product slug mapping
        const correctMappings: Record<string, string> = {
          'Krishna': 'krishna-sculpture',
          'Onyx Flower Vase Big': 'onyx-flower-vase-big',
          'Rose Quartz Tree': 'rose-quartz-tree',
          'BIG Rose Quartz Tea light Holder': 'rose-quartz-tea-light-big',
          'SMALL Rose Quartz Tea Light holder': 'rose-quartz-tea-light-small',
          'Soapstone Ash Tray Round': 'soapstone-ash-tray-round',
          'Travertine Cake Stand': 'travertine-cake-stand',
          'Tree of Life 7 Chakra': 'tree-of-life-7-chakra',
          'Wine Chiller Banswara': 'wine-chiller-banswara',
          'Wine Chiller Black': 'wine-chiller-black',
          'Banswara Cake Stand': 'banswara-cake-stand',
          'Boat Ganesh': 'boat-ganesh',
          'Ganesh Ji 260': 'ganesh-ji-260',
          'Banswara Oval Soap dish': 'banswara-oval-soap-dish',
          'Banswara Round Soap Dish Polished': 'banswara-round-soap-dish-polished',
          'Banswara Trinket Box': 'banswara-trinket-box',
          'Bottle shape Oil Diffuser': 'bottle-shape-oil-diffuser',
          'Candle Stand Big Banswara': 'candle-stand-big-banswara',
          'Candle Stand Cone Small': 'candle-stand-cone-small',
          'Candle Stand Travertine': 'candle-stand-travertine',
          'Desk Clock Marble Stand': 'desk-clock-marble-stand',
          'Elephant Oil Diffuser': 'elephant-oil-diffuser',
          'Finger Urli': 'finger-urli',
          'Fluted Urli': 'fluted-urli',
          'Jali Soap Dish': 'jali-soap-dish',
          'Laltain': 'laltain',
          'Lotus Urli': 'lotus-urli',
          'Rose Quartz Coasters': 'rose-quartz-coasters',
        };

        const mediaMap = new Map(
          mediaData?.map(m => {
            const slug = correctMappings[m.product_id] || m.product_id.toLowerCase().replace(/\s+/g, '-');
            const imageUrl = convertGoogleDriveUrl(m.media_url);
            console.log(`Mapping ${m.product_id} -> ${slug} -> ${imageUrl}`);
            return [slug, imageUrl];
          }) || []
        );

        console.log('Media map:', Array.from(mediaMap.entries()));

        // Update products with database images and review counts
        const updated = hardcodedProducts.map(product => {
          const dbImage = mediaMap.get(product.id);
          console.log(`Product ${product.id}: ${dbImage ? 'FOUND' : 'NOT FOUND'} in database`);
          return {
            ...product,
            primaryImage: dbImage,
            image: dbImage || product.image,
            reviewCount: reviewCounts[product.id] || 0
          };
        });

        setProductsWithMedia(updated);
      } catch (err) {
        console.error('Error fetching product media:', err);
        // Fall back to hardcoded products with review counts
        const fallback = hardcodedProducts.map(product => ({
          ...product,
          reviewCount: reviewCounts[product.id] || 0
        }));
        setProductsWithMedia(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMedia();
  }, [reviewCounts]);

  return { products: productsWithMedia, loading: loading || reviewsLoading };
};

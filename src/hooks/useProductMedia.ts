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
        
        // Reverse mapping: Product slug -> Database product_id
        const slugToDbName: Record<string, string> = {
          'krishna-sculpture': 'Krishna',
          'onyx-flower-big': 'Onyx Flower Vase Big',
          'rose-quartz-tree': 'Rose Quartz Tree',
          'rose-quartz-tea-light-big': 'BIG Rose Quartz Tea light Holder',
          'rose-quartz-tea-light-small': 'SMALL Rose Quartz Tea Light holder',
          'soapstone-ash-tray-round': 'Soapstone Ash Tray Round',
          'travertine-cake-stand': 'Travertine Cake Stand',
          'tree-of-life-7-chakra': 'Tree of Life 7 Chakra',
          'wine-chiller-banswara': 'Wine Chiller Banswara',
          'wine-chiller-black': 'Wine Chiller Black',
          'banswara-cake-stand': 'Banswara Cake Stand',
          'boat-ganesh': 'Boat Ganesh',
          'ganesh-ji-260': 'Ganesh Ji 260',
          'banswara-oval-soap-dish': 'Banswara Oval Soap dish',
          'banswara-round-soap-dish-polished': 'Banswara Round Soap Dish Polished',
          'banswara-trinket-box': 'Banswara Trinket Box',
          'bottle-shape-oil-diffuser': 'Bottle shape Oil Diffuser',
          'candle-stand-big-banswara': 'Candle Stand Big Banswara',
          'candle-stand-cone-small': 'Candle Stand Cone Small',
          'candle-stand-travertine': 'Candle Stand Travertine',
          'desk-clock-marble-stand': 'Desk Clock Marble Stand',
          'elephant-oil-diffuser': 'Elephant Oil Diffuser',
          'finger-urli': 'Finger Urli',
          'fluted-urli': 'Fluted Urli',
          'jali-soap-dish': 'Jali Soap Dish',
          'laltain': 'Laltain',
          'lotus-urli': 'Lotus Urli',
          'rose-quartz-coasters': 'Rose Quartz Coasters',
        };
        
        const productName = slugToDbName[productId] || productId;
        console.log(`Product page query: ${productId} -> ${productName}`);
        
        const { data, error: fetchError } = await supabase
          .from('product_media')
          .select('*')
          .ilike('product_id', productName)
          .order('sort_order', { ascending: true });

        if (fetchError) throw fetchError;
        
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
        
        const convertedData = data?.map(item => ({
          ...item,
          media_url: convertGoogleDriveUrl(item.media_url)
        })) || [];
        
        setMedia(convertedData);
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

-- Fix circular image assignment issues in product_media table
-- Based on user feedback about which images are showing incorrectly

-- Create temporary table to store correct mappings
CREATE TEMP TABLE correct_image_mapping AS
SELECT 
  'Rose Quartz Tree' as product_id,
  '15vSMGzVMQUQDIDAyph9oZVbVvlxV_pLV' as correct_image_id
UNION ALL SELECT 'SMALL Rose Quartz Tea Light holder', '1zHJ9mZ5Ihg_hHGDLUTKMh5uzOuep22Ey'
UNION ALL SELECT 'BIG Rose Quartz Tea light Holder', '1qw3Bkb-ZsUTogkHvRyOCEkAYeVneZBbx'
UNION ALL SELECT 'Soapstone Ash Tray Round', '1PmPyykL5h6GefhrWWiCM2UH4s-egArk8'
UNION ALL SELECT 'Travertine Cake Stand', '14kiBwlTnQcy0BSIQ5xWI2ZRMvcPWmdHr'
UNION ALL SELECT 'Tree of Life 7 Chakra', '1icn-kiTA8png8uzkasWsFJLZbI0HgBw-'
UNION ALL SELECT 'Wine Chiller Banswara', '1dXrStL6GcJ1H_rESrYccUJ5I5NtsdyAj'
UNION ALL SELECT 'Wine Chiller Black', '1Kgt1sXTiGjkJ2O6Gl83YsHc0ssOpggK6';

-- Update primary images with correct assignments
UPDATE product_media pm
SET media_url = 'https://drive.google.com/uc?export=view&id=' || cim.correct_image_id
FROM correct_image_mapping cim
WHERE pm.product_id = cim.product_id
  AND pm.is_primary = true;

-- Drop temporary table
DROP TABLE correct_image_mapping;
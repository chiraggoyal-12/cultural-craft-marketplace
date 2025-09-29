-- Set database timezone to IST (India Standard Time)
SET timezone = 'Asia/Kolkata';

-- Create a function to get current IST time
CREATE OR REPLACE FUNCTION now_ist()
RETURNS timestamp with time zone
LANGUAGE sql
STABLE
AS $$
  SELECT now() AT TIME ZONE 'Asia/Kolkata' AT TIME ZONE 'Asia/Kolkata';
$$;

-- Update the update_updated_at_column function to use IST
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now_ist();
  RETURN NEW;
END;
$$;

-- Update default values for all existing timestamp columns to use IST
ALTER TABLE public.addresses ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.blog_posts ALTER COLUMN created_at SET DEFAULT now_ist();
ALTER TABLE public.blog_posts ALTER COLUMN updated_at SET DEFAULT now_ist();

ALTER TABLE public.contact_messages ALTER COLUMN created_at SET DEFAULT now_ist();
ALTER TABLE public.contact_messages ALTER COLUMN updated_at SET DEFAULT now_ist();

ALTER TABLE public.order_items ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.orders ALTER COLUMN created_at SET DEFAULT now_ist();
ALTER TABLE public.orders ALTER COLUMN updated_at SET DEFAULT now_ist();

ALTER TABLE public.product_answers ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.product_media ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.product_questions ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.profiles ALTER COLUMN created_at SET DEFAULT now_ist();
ALTER TABLE public.profiles ALTER COLUMN updated_at SET DEFAULT now_ist();

ALTER TABLE public.recently_viewed ALTER COLUMN viewed_at SET DEFAULT now_ist();

ALTER TABLE public.review_media ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.reviews ALTER COLUMN created_at SET DEFAULT now_ist();
ALTER TABLE public.reviews ALTER COLUMN updated_at SET DEFAULT now_ist();

ALTER TABLE public.saved_cart_items ALTER COLUMN saved_at SET DEFAULT now_ist();

ALTER TABLE public.testimonials ALTER COLUMN created_at SET DEFAULT now_ist();

ALTER TABLE public.wishlist_items ALTER COLUMN added_at SET DEFAULT now_ist();
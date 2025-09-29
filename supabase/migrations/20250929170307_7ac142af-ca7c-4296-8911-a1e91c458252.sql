-- Make rating column nullable in reviews table
ALTER TABLE public.reviews ALTER COLUMN rating DROP NOT NULL;
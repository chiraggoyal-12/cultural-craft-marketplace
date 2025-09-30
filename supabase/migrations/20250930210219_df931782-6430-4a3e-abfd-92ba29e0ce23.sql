-- Create products table to store all product information
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  material TEXT NOT NULL,
  dimensions TEXT,
  weight TEXT,
  care_instructions TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now_ist(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now_ist()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view published products
CREATE POLICY "Anyone can view published products"
ON public.products
FOR SELECT
USING (published = true);

-- Allow admins to manage all products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster category queries
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_published ON public.products(published);
CREATE INDEX idx_products_featured ON public.products(featured, published);
CREATE INDEX idx_products_bestseller ON public.products(bestseller, published);
CREATE INDEX idx_products_new_arrival ON public.products(new_arrival, published);
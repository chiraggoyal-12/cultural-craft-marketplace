-- Create quotation_requests table for B2B single-product inquiries
CREATE TABLE public.quotation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now_ist(),
  status text NOT NULL DEFAULT 'pending',
  product_id text NOT NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  customization_notes text,
  customer_name text NOT NULL,
  customer_company text,
  customer_mobile text NOT NULL,
  customer_email text
);

-- Enable RLS
ALTER TABLE public.quotation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit quotation requests
CREATE POLICY "Anyone can submit quotation requests"
ON public.quotation_requests
FOR INSERT
WITH CHECK (true);

-- Allow admins to view all quotation requests
CREATE POLICY "Admins can view all quotation requests"
ON public.quotation_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update quotation requests
CREATE POLICY "Admins can update quotation requests"
ON public.quotation_requests
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_quotation_requests_created_at ON public.quotation_requests(created_at DESC);
CREATE INDEX idx_quotation_requests_status ON public.quotation_requests(status);
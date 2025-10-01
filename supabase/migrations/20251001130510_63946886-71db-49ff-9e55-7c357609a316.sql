-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- 'home', 'about', 'footer', 'blog'
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now_ist(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now_ist()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert their email)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Only admins can view subscriptions
CREATE POLICY "Admins can view newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update subscriptions
CREATE POLICY "Admins can update newsletter subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster email lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);

-- Create index for source filtering
CREATE INDEX idx_newsletter_source ON public.newsletter_subscriptions(source);
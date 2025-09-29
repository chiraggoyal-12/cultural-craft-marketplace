-- Fix critical security vulnerability: Restrict profiles table access
-- Remove the dangerous public SELECT policy that allows anyone to view all profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policy: Users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Fix second critical vulnerability: Remove public access to contact messages
-- This contains customer emails, names, and private messages
DROP POLICY IF EXISTS "Anyone can view contact messages" ON public.contact_messages;

-- Keep the INSERT policy for contact form submissions (this is safe)
-- Contact messages should only be viewable by administrators
-- For now, remove SELECT access entirely until proper admin system is implemented
-- Drop the existing admin SELECT policy and recreate it to ensure admins can see all products
DROP POLICY IF EXISTS "Admins can manage products" ON products;

-- Create separate policies for admins
CREATE POLICY "Admins can select all products"
ON products
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can insert products"
ON products
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update products"
ON products
FOR UPDATE
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete products"
ON products
FOR DELETE
USING (
  has_role(auth.uid(), 'admin'::app_role)
);
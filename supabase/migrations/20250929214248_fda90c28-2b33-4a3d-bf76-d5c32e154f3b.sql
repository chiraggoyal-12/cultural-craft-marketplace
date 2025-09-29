-- Allow admins to insert product media
CREATE POLICY "Admins can insert product media"
ON product_media
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Allow admins to update product media
CREATE POLICY "Admins can update product media"
ON product_media
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Allow admins to delete product media
CREATE POLICY "Admins can delete product media"
ON product_media
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));
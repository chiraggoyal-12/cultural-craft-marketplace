-- Allow users to create their own orders
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to create order items for their orders
CREATE POLICY "Users can create order items for their orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (order_id IN (
  SELECT id FROM orders WHERE user_id = auth.uid()
));
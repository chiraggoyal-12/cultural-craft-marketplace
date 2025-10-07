import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { processUPIPayment } from '@/services/paymentService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Lock, QrCode, Shield, CheckCircle, Smartphone } from 'lucide-react';
import qrCodeImage from '@/assets/QR_Payments.jpg';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  // Calculate totals
  const subtotal = total;
  const shipping = subtotal > 2000 ? 0 : 150; // Free shipping above ₹2000
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const finalTotal = subtotal + shipping + tax;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zipCode'];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const createOrder = async () => {
    const orderNum = `HDR-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setOrderNumber(orderNum);

    // Create order in database
    const orderData: any = {
      user_id: user?.id,
      order_number: orderNum,
      status: 'pending',
      subtotal: subtotal,
      shipping_amount: shipping,
      tax_amount: tax,
      total_amount: finalTotal,
      payment_method: 'upi',
      shipping_address: {
        name: `${formData.firstName} ${formData.lastName}`,
        street_address: formData.street,
        apartment: '',
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        country: formData.country
      },
      billing_address: {
        name: `${formData.firstName} ${formData.lastName}`,
        street_address: formData.street,
        apartment: '',
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        country: formData.country
      }
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_image: item.image,
      unit_price: item.price,
      quantity: item.quantity,
      total_price: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return orderNum;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    if (!showQRCode) {
      // First click - show QR code
      setShowQRCode(true);
      toast({
        title: "Scan QR Code to Pay",
        description: "Please scan the QR code with your UPI app and make the payment, then click 'Place Order' again.",
      });
      return;
    }

    // Second click - place order after payment
    setProcessing(true);

    try {
      // Create order
      const orderNum = await createOrder();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderNum} has been placed. We will verify the payment and update the order status.`,
      });

      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: orderNum, 
          totalAmount: finalTotal,
          orderDate: new Date().toISOString(),
          paymentMethod: 'UPI QR Code',
          showPaymentInstructions: true
        } 
      });

    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to create order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-center gap-3">
                      <QrCode className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-800">UPI QR Code Payment</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          Scan the QR code below with any UPI app to make payment
                        </p>
                      </div>
                    </div>
                  </div>

                  {showQRCode && (
                    <div className="mt-6 space-y-4">
                      <div className="text-center">
                        <h4 className="font-medium mb-4">Scan QR Code to Pay</h4>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 inline-block">
                          <img 
                            src={qrCodeImage} 
                            alt="UPI QR Code for Handora Payments"
                            className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-lg"
                          />
                        </div>
                        <div className="mt-4 space-y-2">
                          <p className="font-semibold text-lg">Amount: ₹{finalTotal.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            UPI ID: handora@paytm
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h5 className="font-medium text-yellow-800 mb-2">Payment Instructions:</h5>
                        <ol className="space-y-1 text-sm text-yellow-700">
                          <li>1. Open any UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
                          <li>2. Tap "Scan QR Code" and scan the code above</li>
                          <li>3. Pay the exact amount: <strong>₹{finalTotal.toLocaleString()}</strong></li>
                          <li>4. Take a screenshot of payment confirmation</li>
                          <li>5. Click "Place Order" button below to complete your order</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (GST)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {shipping === 0 && (
                    <Badge variant="secondary" className="w-full justify-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Free Shipping Applied
                    </Badge>
                  )}
                  
                  <Button 
                    onClick={handlePayment}
                    className="w-full"
                    size="lg"
                    disabled={processing}
                  >
                    {processing ? "Processing..." : 
                     showQRCode ? "Place Order - ₹" + finalTotal.toLocaleString() : 
                     "Show QR Code & Pay - ₹" + finalTotal.toLocaleString()}
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 inline mr-1" />
                    {showQRCode ? "Complete payment and click Place Order" : "Secure checkout with UPI QR Code"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
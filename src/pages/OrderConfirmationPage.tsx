import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Mail, Calendar, MapPin, CreditCard, Truck, QrCode, ExternalLink } from 'lucide-react';

interface OrderDetails {
  orderNumber: string;
  totalAmount: number;
  orderDate: string;
  paymentMethod: string;
  paymentId?: string;
  status?: string;
  showPaymentInstructions?: boolean;
  items?: Array<{
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress?: {
    name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

const OrderConfirmationPage = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order details from navigation state or fetch from database
    const stateOrder = location.state as OrderDetails;
    
    if (stateOrder) {
      setOrderDetails(stateOrder);
      setLoading(false);
    } else {
      // If no state, try to get the latest order for the user
      fetchLatestOrder();
    }
  }, [location.state]);

  const fetchLatestOrder = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            product_id,
            product_name,
            product_image,
            quantity,
            unit_price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return;
      }

      if (order) {
        const orderData: any = order;
        const shippingAddr = typeof orderData.shipping_address === 'string' 
          ? JSON.parse(orderData.shipping_address)
          : orderData.shipping_address;

        setOrderDetails({
          orderNumber: orderData.order_number,
          totalAmount: orderData.total_amount,
          orderDate: orderData.created_at,
          paymentMethod: orderData.payment_method,
          paymentId: orderData.payment_id || undefined,
          status: orderData.status,
          items: orderData.order_items?.map((item: any) => ({
            id: item.product_id,
            name: item.product_name,
            image: item.product_image,
            quantity: item.quantity,
            price: item.unit_price
          })),
          shippingAddress: shippingAddr
        });
      }
    } catch (error) {
      console.error('Error fetching latest order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'cod':
        return <Truck className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card':
        return 'Card Payment';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the order details you're looking for.
            </p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const estimatedDelivery = new Date(new Date(orderDetails.orderDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center space-y-6 mb-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for your purchase from Handora
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  Your order has been successfully placed and is being processed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Order Number</p>
                      <p className="text-sm text-muted-foreground">#{orderDetails.orderNumber}</p>
                    </div>
                  </div>
                  {orderDetails.status && getStatusBadge(orderDetails.status)}
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Order Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(orderDetails.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {getPaymentMethodIcon(orderDetails.paymentMethod)}
                    <div>
                      <p className="font-medium">Payment Method</p>
                      <p className="text-sm text-muted-foreground">
                        {getPaymentMethodText(orderDetails.paymentMethod)}
                      </p>
                    </div>
                  </div>
                </div>

                {orderDetails.paymentId && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Payment ID</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {orderDetails.paymentId}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping Address */}
            {orderDetails.shippingAddress && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{orderDetails.shippingAddress.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.shippingAddress.street_address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postal_code}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails.shippingAddress.country}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Items */}
          {orderDetails.items && orderDetails.items.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{orderDetails.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Instructions for UPI */}
          {orderDetails?.showPaymentInstructions && orderDetails?.paymentMethod === 'UPI QR Code' && (
            <Card className="mt-6 border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Complete Your Payment
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Your order is created but payment is pending. Please complete the payment to confirm your order.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Payment Instructions:</h4>
                  <ol className="space-y-2 text-sm text-orange-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <span>Go to the payment page to see the UPI QR code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Scan the QR code with any UPI app (PhonePe, Google Pay, Paytm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                      <span>Pay the exact amount: <strong>₹{orderDetails.totalAmount.toLocaleString()}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                      <span>Add order number in payment note: <strong>{orderDetails.orderNumber}</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                      <span>Take a screenshot of payment confirmation</span>
                    </li>
                  </ol>
                </div>
                
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link to="/payment">
                      <QrCode className="w-4 h-4 mr-2" />
                      Go to Payment Page
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-800 mb-2">Payment Verification Process:</h5>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• We will check our bank account for your payment</li>
                    <li>• Once payment is verified, your order status will be updated to "Confirmed"</li>
                    <li>• You will receive an email confirmation when your order is confirmed</li>
                    <li>• Order processing will begin after payment verification</li>
                    <li>• This process usually takes 24-48 hours</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your handcrafted items are being carefully prepared by our artisans. 
                    We'll send you tracking information as soon as your order ships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Your order will be delivered within 5-7 business days. 
                    You'll receive SMS updates about the delivery status.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/dashboard">View My Orders</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
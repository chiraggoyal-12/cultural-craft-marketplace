import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Mail, Calendar } from 'lucide-react';

const OrderConfirmationPage = () => {
  const orderNumber = `HDR-${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="text-center space-y-6">
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
                      <p className="text-sm text-muted-foreground">#{orderNumber}</p>
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
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">Sent to your email address</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We'll send you tracking information as soon as your order ships.
                Your handcrafted items are being carefully prepared by our artisans.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
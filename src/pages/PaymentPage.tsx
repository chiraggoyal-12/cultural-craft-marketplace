import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, Shield, Clock, CheckCircle } from "lucide-react";
import qrCodeImage from "@/assets/QR_Payments.jpg";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Payment Methods</h1>
            <p className="text-lg text-muted-foreground">
              Secure and convenient payment options for your handcrafted treasures
            </p>
          </div>
          
          {/* UPI QR Payment Section */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">UPI QR Code Payment</CardTitle>
              <CardDescription className="text-lg">
                Scan the QR code with any UPI app to make instant payments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Display */}
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200">
                  <img 
                    src={qrCodeImage} 
                    alt="UPI QR Code for Handora Payments"
                    className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-lg"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <p className="font-semibold text-lg">UPI ID: handora@paytm</p>
                  <p className="text-muted-foreground">
                    Scan with PhonePe, Google Pay, Paytm, or any UPI app
                  </p>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  How to Pay:
                </h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Open any UPI app on your phone (PhonePe, Google Pay, Paytm, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Tap on "Scan QR Code" or "Scan & Pay"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Scan the QR code above with your phone camera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Enter the exact amount and complete the payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                    <span>Take a screenshot of the payment confirmation</span>
                  </li>
                </ol>
              </div>

              {/* Payment Benefits */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Instant Payment</p>
                    <p className="text-sm text-green-600">Real-time transaction</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">100% Secure</p>
                    <p className="text-sm text-blue-600">Bank-grade security</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800">24/7 Available</p>
                    <p className="text-sm text-purple-600">Pay anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash on Delivery Option */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Cash on Delivery (COD)
              </CardTitle>
              <CardDescription>
                Pay when your order arrives at your doorstep
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">No upfront payment required</p>
                    <p className="text-sm text-muted-foreground">Pay only when you receive your order</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Free COD available</p>
                    <p className="text-sm text-muted-foreground">No additional charges for cash payment</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Inspect before payment</p>
                    <p className="text-sm text-muted-foreground">Check your items before paying</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Security & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Security Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All transactions are encrypted and secure</li>
                    <li>• We never store your payment information</li>
                    <li>• Bank-grade security for all payments</li>
                    <li>• PCI DSS compliant payment processing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Payment confirmation: 24-48 hours</li>
                    <li>• Order processing: 1-2 business days</li>
                    <li>• Delivery: 5-7 business days</li>
                    <li>• Support: support@handora.com</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
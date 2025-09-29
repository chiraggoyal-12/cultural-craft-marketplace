import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CreditCard, Wallet, Shield } from "lucide-react";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Payment Methods</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Accepted Payment Methods</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <CreditCard className="w-10 h-10 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Credit & Debit Cards</h3>
                <p className="text-sm text-muted-foreground">We accept Visa, Mastercard, American Express, and Discover</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <Wallet className="w-10 h-10 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Digital Wallets</h3>
                <p className="text-sm text-muted-foreground">PayPal, Apple Pay, Google Pay, and other digital wallets</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <Shield className="w-10 h-10 mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">All transactions are encrypted and secure</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Payment Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>
              <p>All transactions are protected by industry-standard SSL encryption to ensure your data remains private and secure.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Your billing address must match the address associated with your payment method. Orders may be delayed if billing information cannot be verified.</p>
              <p>You will receive an email confirmation once your payment has been processed successfully.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;

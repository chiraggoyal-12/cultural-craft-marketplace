import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Shipping & Returns</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We offer shipping to destinations worldwide. Shipping costs and delivery times vary based on your location and selected shipping method.</p>
              
              <h3 className="text-lg font-semibold text-foreground">Shipping Options:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>International Shipping:</strong> 10-15 business days</li>
              </ul>
              
              <p>All orders are processed within 1-2 business days. You will receive a tracking number once your order ships.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Returns Policy</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We want you to be completely satisfied with your purchase. If you're not happy, we accept returns within 30 days of delivery.</p>
              
              <h3 className="text-lg font-semibold text-foreground">Return Requirements:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Items must be unused and in original condition</li>
                <li>Original packaging must be intact</li>
                <li>Include proof of purchase</li>
                <li>Return shipping costs are the responsibility of the customer</li>
              </ul>
              
              <p>To initiate a return, please contact our customer service team with your order number and reason for return.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We're happy to exchange items for a different size, color, or product. Exchange requests must be made within 30 days of delivery.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;

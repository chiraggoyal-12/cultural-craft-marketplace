import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Terms & Conditions</h1>
        
        <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Agreement to Terms</h2>
            <p>By accessing and using Handora's website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Use of Website</h2>
            <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the website.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Product Information</h2>
            <p>We strive to provide accurate product descriptions and images. However, since our products are handcrafted, slight variations may occur. We do not warrant that product descriptions or other content is accurate, complete, or error-free.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Pricing and Payment</h2>
            <p>All prices are subject to change without notice. We reserve the right to modify or discontinue products without prior notification. Payment must be received before order processing begins.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Orders and Fulfillment</h2>
            <p>We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing or product information, or suspected fraudulent or unauthorized transactions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of Handora and is protected by copyright and intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
            <p>Handora shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or products.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Governing Law</h2>
            <p>These Terms and Conditions are governed by and construed in accordance with applicable laws, and any disputes shall be subject to the exclusive jurisdiction of the courts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to Terms</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
            <p>For questions about these Terms and Conditions, please contact us through our Contact page.</p>
          </section>

          <p className="text-sm italic mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

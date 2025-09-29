import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I place an order?</AccordionTrigger>
            <AccordionContent>
              Browse our collections, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, debit cards, and secure online payment methods including PayPal and digital wallets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Standard shipping takes 5-7 business days. Express shipping options are available at checkout for faster delivery.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Can I return or exchange an item?</AccordionTrigger>
            <AccordionContent>
              Yes, we accept returns within 30 days of delivery. Items must be unused and in original packaging. See our Shipping & Returns page for full details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Are these products handmade?</AccordionTrigger>
            <AccordionContent>
              Yes, all our products are handcrafted by skilled artisans, making each piece unique with its own character and charm.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;

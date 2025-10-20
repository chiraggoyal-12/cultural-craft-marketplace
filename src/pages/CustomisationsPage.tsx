import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import customisationBg from "@/assets/customisation-page.png";

const CustomisationsPage = () => {
  const headerAnim = useScrollAnimation(0.1);
  const contentAnim = useScrollAnimation(0.1);
  const faqAnim = useScrollAnimation(0.1);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can I customize the design, size, and finish of handicraft products?",
      a: "Absolutely! At Handora, we specialize in custom B2B orders. You can customize the design, material, color, size, and finish of our marble, stone, and metal handicrafts to perfectly align with your brand aesthetics or client requirements."
    },
    {
      q: "Do you work with businesses for bulk or retail collaborations?",
      a: "Yes, we primarily serve B2B clients- including interior designers, luxury retail stores, hotels, and corporate gifting partners. We offer bulk pricing, exclusive designs, and branding support for retail or project-based collaborations."
    },
    {
      q: "What materials do you use for customization?",
      a: "We work with a wide range of premium natural materials sourced from Rajasthan- including marble, onyx, travertine, sandstone, and semi-precious stones. Each material is hand-finished by our skilled artisans to maintain authenticity and quality."
    },
    {
      q: "Can you create products based on our design or mood board?",
      a: "Yes! You can share reference images, sketches, or mood boards, and our design team will collaborate with you to develop a custom prototype that matches your brand's vision while maintaining traditional craftsmanship."
    },
    {
      q: "What is the minimum order quantity (MOQ) for customized products?",
      a: "For custom-made items, our MOQ varies depending on the product type and complexity. Generally, we accept bulk orders starting from 20–50 units, but we also accommodate smaller batches for select premium collections."
    },
    {
      q: "How long does the customization process take?",
      a: "The lead time depends on order size and product type. Typically: Sample or prototype development: 10–15 days, Bulk production: 3–6 weeks. We always communicate timelines clearly to meet your delivery expectations."
    },
    {
      q: "Do you export internationally?",
      a: "Yes, Handora works with global retailers and design houses. We handle secure packaging, documentation, and logistics to ensure smooth international shipping from Rajasthan to your location."
    },
    {
      q: "Can products be branded or packaged under our company's name?",
      a: "Of course! We offer white-label and co-branding options, including custom packaging, labeling, and logo engraving, helping your brand stand out with authentic handcrafted collections."
    },
    {
      q: "How do you ensure product quality and consistency in bulk orders?",
      a: "Every piece is individually inspected and crafted under strict quality standards. Our artisans follow detailed molds, templates, and finish samples to ensure consistency across bulk production."
    },
    {
      q: "How can I start a custom order or partnership?",
      a: "Simply contact us on WhatsApp or via our Custom Enquiry Form on the website. Share your product needs, materials, or design references, and our team will get in touch with tailored solutions and pricing details."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={customisationBg}
            alt="Customisation Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div></div>
            <div
              ref={contentAnim.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-1000 ${
                contentAnim.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-background/95 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-border shadow-elegant">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  Custom B2B Solutions
                </h1>
                <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed">
                  Looking for customized handcrafted pieces for your next project or collection?
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                  Whether you're sourcing bespoke marble decor, stoneware gifts, or planning to showcase Handora's crafts in your retail space, we'd love to collaborate!
                </p>
                <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                  Reach out to us directly on WhatsApp—we'll help you bring your creative vision to life.
                </p>
                
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://wa.me/917340636904"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Contact us on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            ref={headerAnim.ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 transition-all duration-1000 ${
              headerAnim.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our B2B customisation services
            </p>
          </div>

          <div
            ref={faqAnim.ref as React.RefObject<HTMLDivElement>}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  faqAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left group"
                >
                  <div
                    className={`p-6 rounded-xl border transition-all duration-500 ${
                      openFaq === index
                        ? "bg-gradient-to-r from-primary/5 to-accent/5 border-primary shadow-elegant scale-[1.02]"
                        : "bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                          openFaq === index ? "text-primary" : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {faq.q}
                      </h3>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                          openFaq === index
                            ? "bg-primary text-primary-foreground rotate-180 scale-110"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openFaq === index
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomisationsPage;

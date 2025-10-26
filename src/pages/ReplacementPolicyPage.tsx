import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Video, XCircle } from 'lucide-react';

const ReplacementPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Return/Replacement Policy</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Handora, every product is packed with care and love just for you. Please read our policy carefully.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Replacement Eligibility */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <AlertCircle className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Replacement Eligibility</h2>
                      <p className="text-muted-foreground">
                        We offer replacements under specific conditions to ensure quality and fairness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      At Handora, every product is packed with care and love just for you. However, if there's an issue with your order, we do offer a replacement, provided the following conditions are met:
                    </p>
                    
                    <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                      <div className="flex items-start gap-3 mb-3">
                        <Video className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2">Required: Product Unboxing Video</h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>A product unboxing video must be recorded while opening the parcel.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>The video must clearly show the parcel condition before opening.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>The video must show the product inside immediately after opening.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Only if this video is provided, a replacement will be processed.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strictly No Returns */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-destructive/10 p-3 rounded-lg">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Strictly No Returns</h2>
                      <p className="text-muted-foreground">
                        Please note our return policy carefully before making a purchase.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-destructive/5 p-6 rounded-lg border border-destructive/20">
                      <p className="text-foreground font-medium mb-3">
                        Please note, we do not accept returns under any circumstances.
                      </p>
                      <p className="text-muted-foreground">
                        Replacements are provided only in cases of a wrong, defective, or damaged product and only when supported by a valid unboxing video.
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">What Qualifies for Replacement?</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>Wrong product delivered (with unboxing video proof)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>Defective product (with unboxing video proof)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">✓</span>
                          <span>Damaged product during shipping (with unboxing video proof)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our replacement policy or need to initiate a replacement request, please contact us:
                  </p>
                  <div className="space-y-2 text-foreground">
                    <p>
                      <span className="font-semibold">Email:</span>{' '}
                      <a href="mailto:2025handora@gmail.com" className="text-primary hover:underline">
                        2025handora@gmail.com
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{' '}
                      <a href="tel:+917340636904" className="text-primary hover:underline">
                        +91 73406 36904
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReplacementPolicyPage;

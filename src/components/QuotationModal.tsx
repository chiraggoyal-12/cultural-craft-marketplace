import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, Phone } from "lucide-react";

interface QuotationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  open,
  onOpenChange,
  productId,
  productName,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 1,
    customization_notes: "",
    customer_name: "",
    customer_company: "",
    customer_mobile: "",
    customer_email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_mobile || formData.quantity < 1) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("quotation_requests").insert({
        product_id: productId,
        product_name: productName,
        quantity: formData.quantity,
        customization_notes: formData.customization_notes || null,
        customer_name: formData.customer_name,
        customer_company: formData.customer_company || null,
        customer_mobile: formData.customer_mobile,
        customer_email: formData.customer_email || null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Request Submitted!",
        description: "Your quotation request has been sent. We will contact you shortly.",
      });

      // Reset form
      setFormData({
        quantity: 1,
        customization_notes: "",
        customer_name: "",
        customer_company: "",
        customer_mobile: "",
        customer_email: "",
      });

      onOpenChange(false);
    } catch (error: any) {
      console.error("Error submitting quotation:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Quotation</DialogTitle>
          <DialogDescription>
            Fill in the details below to receive a custom quotation for {productName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                value={productName}
                disabled
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="quantity">
                Quantity <span className="text-destructive">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                required
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                }
              />
            </div>

            <div>
              <Label htmlFor="customization">Customization Details</Label>
              <Textarea
                id="customization"
                placeholder="Tell us about any specific customization requirements, size preferences, color variations, or special requests..."
                rows={4}
                value={formData.customization_notes}
                onChange={(e) =>
                  setFormData({ ...formData, customization_notes: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="company">Company Name (Optional)</Label>
              <Input
                id="company"
                type="text"
                placeholder="Enter your company name"
                value={formData.customer_company}
                onChange={(e) =>
                  setFormData({ ...formData, customer_company: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="mobile">
                Mobile Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="mobile"
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={formData.customer_mobile}
                onChange={(e) =>
                  setFormData({ ...formData, customer_mobile: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.customer_email}
                onChange={(e) =>
                  setFormData({ ...formData, customer_email: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Quotation Request
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
            <Phone className="mx-auto h-8 w-8 text-primary mb-2" />
            <p className="text-sm font-medium mb-1">
              For immediate quotes or further information
            </p>
            <p className="text-lg font-bold text-primary">
              Call us at +91 73406 36904
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

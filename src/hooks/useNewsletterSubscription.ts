import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export const useNewsletterSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string, source: 'home' | 'about' | 'footer' | 'blog') => {
    setIsLoading(true);

    try {
      // Validate email format
      const validatedEmail = emailSchema.parse(email.trim().toLowerCase());

      // Try to insert the email
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: validatedEmail,
          source: source
        });

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          toast({
            title: "Already subscribed!",
            description: "You're already on our mailing list. We'll keep you updated!",
            variant: "default",
          });
          return { success: true, duplicate: true };
        }
        
        throw error;
      }

      toast({
        title: "Thank you for subscribing! 🎉",
        description: "You've successfully joined our newsletter. Stay tuned for updates!",
      });

      return { success: true, duplicate: false };
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        console.error('Newsletter subscription error:', error);
        toast({
          title: "Oops! Something went wrong",
          description: "We couldn't process your subscription. Please try again.",
          variant: "destructive",
        });
      }
      return { success: false, duplicate: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading };
};

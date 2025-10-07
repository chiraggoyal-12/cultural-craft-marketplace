// Payment service for handling UPI QR payments
import { supabase } from '@/integrations/supabase/client';

export interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

// UPI Payment Configuration
const UPI_ID = "handora@paytm"; // Replace with your actual UPI ID
const MERCHANT_NAME = "Handora";

// Generate UPI payment link
export const generateUPIPaymentLink = (paymentData: PaymentData): string => {
  const amount = paymentData.amount;
  const transactionNote = `Handora Order ${paymentData.orderId}`;
  
  // Create UPI payment URL
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
  
  return upiUrl;
};

// Process UPI payment (simplified for QR code display)
export const processUPIPayment = async (paymentData: PaymentData): Promise<PaymentResponse> => {
  try {
    // For UPI QR payments, we just need to show the QR code
    // The actual payment verification will be done manually by admin
    console.log('UPI Payment initiated for order:', paymentData.orderId);
    
    return {
      success: true,
      orderId: paymentData.orderId,
      paymentId: `upi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  } catch (error) {
    console.error('Error processing UPI payment:', error);
    return {
      success: false,
      error: 'UPI payment processing failed'
    };
  }
};

// Verify UPI payment (manual verification by admin)
export const verifyUPIPayment = async (orderId: string): Promise<PaymentResponse> => {
  try {
    // This will be called when admin confirms payment manually
    console.log('Verifying UPI payment for order:', orderId);
    
    return {
      success: true,
      orderId: orderId,
      paymentId: `verified_${Date.now()}`
    };
  } catch (error) {
    console.error('Error verifying UPI payment:', error);
    return {
      success: false,
      error: 'UPI payment verification failed'
    };
  }
};

// Update order payment status in database
export const updateOrderPaymentStatus = async (
  orderId: string, 
  status: string, 
  paymentId?: string
): Promise<boolean> => {
  try {
    const updateData: any = {
      payment_status: status,
      updated_at: new Date().toISOString()
    };

    if (paymentId) {
      updateData.payment_id = paymentId;
    }

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('order_number', orderId);

    if (error) {
      console.error('Error updating order payment status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating order payment status:', error);
    return false;
  }
};

// Generate OTP for payment verification
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP (simulate SMS/Email)
export const sendOTP = async (phone: string, email: string, otp: string): Promise<boolean> => {
  try {
    // In production, integrate with SMS/Email service
    console.log(`OTP ${otp} sent to ${phone} and ${email}`);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

// Verify OTP
export const verifyOTP = (inputOTP: string, generatedOTP: string): boolean => {
  return inputOTP === generatedOTP;
};

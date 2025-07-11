export interface PaymentRequest {
  amount: number;
  currency: string;
  email: string;
  reference: string;
  callback_url: string;
  metadata?: Record<string, string | number>;
}

export interface PaymentResponse {
  status: string;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaymentVerification {
  status: string;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, string | number>;
  };
}

const LEADREMIT_PUBLIC_KEY = 'live_6f9a954c2ecaa28d7ae3e3c213d8e872472f70b53b79561df89000b0a07a50c33318241bb75c6f5e6711270cf62bd87cpb';
const LEADREMIT_SECRET_KEY = 'live_dae42cdd5d3b8780fd6c480ecd0d6f1624635b3a27dad77a72d78630f7c7650ac32b3ccbc23a531faada6d675f7357731741638013130sk';

export class PaymentService {
  private static baseUrl = 'https://api.leadremit.com/v1';

  static async initializePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LEADREMIT_PUBLIC_KEY}`,
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw new Error('Failed to initialize payment');
    }
  }

  static async verifyPayment(reference: string): Promise<PaymentVerification> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LEADREMIT_SECRET_KEY}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Failed to verify payment');
    }
  }

  static async createWebhookHandler(webhookUrl: string): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LEADREMIT_SECRET_KEY}`,
        },
        body: JSON.stringify({
          url: webhookUrl,
          events: ['charge.success', 'charge.failed', 'transfer.success', 'transfer.failed']
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Webhook creation error:', error);
      throw new Error('Failed to create webhook');
    }
  }
}

// Payment amount constants
export const PAYMENT_AMOUNTS = {
  APPLICATION_FEE: 5000, // ₦5,000
  REGISTRATION_FEE: 15000, // ₦15,000 (if no social registration)
};

// Payment status constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS]; 
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const LEADREMIT_SECRET_KEY = 'live_dae42cdd5d3b8780fd6c480ecd0d6f1624635b3a27dad77a72d78630f7c7650ac32b3ccbc23a531faada6d675f7357731741638013130sk';

interface WebhookEvent {
  event: string;
  data: {
    id: string;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string;
    created_at: string;
    updated_at: string;
    metadata: Record<string, string | number>;
    reference: string;
    failures: unknown;
    source_details: unknown;
    recipient_details: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-leadremit-signature');

    // Verify webhook signature
    if (!signature) {
      console.error('No signature found in webhook');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify the signature
    const expectedSignature = crypto
      .createHmac('sha512', LEADREMIT_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event: WebhookEvent = JSON.parse(body);
    console.log('Received webhook event:', event);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulPayment(event.data);
        break;
      
      case 'charge.failed':
        await handleFailedPayment(event.data);
        break;
      
      case 'transfer.success':
        await handleSuccessfulTransfer(event.data);
        break;
      
      case 'transfer.failed':
        await handleFailedTransfer(event.data);
        break;
      
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleSuccessfulPayment(data: WebhookEvent['data']) {
  try {
    console.log('Processing successful payment:', data.reference);
    
    // Here you would typically:
    // 1. Update your database with payment status
    // 2. Send confirmation email to user
    // 3. Update application status
    // 4. Trigger any post-payment workflows
    
    // Example: Update application in database
    // await updateApplicationPaymentStatus({
    //   reference: data.reference,
    //   amount: data.amount / 100, // Convert from kobo to naira
    //   currency: data.currency,
    //   status: 'success',
    //   paidAt: data.created_at,
    //   metadata: data.metadata
    // });
    
    // Example: Send confirmation email
    // await sendPaymentConfirmationEmail(data.metadata.email, paymentData);
    
    console.log('Successfully processed payment:', data.reference);
  } catch (error) {
    console.error('Error processing successful payment:', error);
  }
}

async function handleFailedPayment(data: WebhookEvent['data']) {
  try {
    console.log('Processing failed payment:', data.reference);
    
    // Here you would typically:
    // 1. Update your database with failed payment status
    // 2. Send failure notification to user
    // 3. Update application status
    
    // Example: Update application in database
    // await updateApplicationPaymentStatus({
    //   reference: data.reference,
    //   amount: data.amount / 100,
    //   currency: data.currency,
    //   status: 'failed',
    //   failedAt: data.updated_at,
    //   metadata: data.metadata
    // });
    
    // Example: Send failure notification
    // await sendPaymentFailureEmail(data.metadata.email, paymentData);
    
    console.log('Successfully processed failed payment:', data.reference);
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

async function handleSuccessfulTransfer(data: WebhookEvent['data']) {
  try {
    console.log('Processing successful transfer:', data.transfer_code);
    
    // Handle successful transfers (if applicable)
    // This might be used for refunds or other transfers
    
    console.log('Successfully processed transfer:', data.transfer_code);
  } catch (error) {
    console.error('Error processing successful transfer:', error);
  }
}

async function handleFailedTransfer(data: WebhookEvent['data']) {
  try {
    console.log('Processing failed transfer:', data.transfer_code);
    
    // Handle failed transfers (if applicable)
    
    console.log('Successfully processed failed transfer:', data.transfer_code);
  } catch (error) {
    console.error('Error processing failed transfer:', error);
  }
}

// GET method for webhook verification (optional)
export async function GET() {
  return NextResponse.json({ 
    message: 'Leadremit webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
} 
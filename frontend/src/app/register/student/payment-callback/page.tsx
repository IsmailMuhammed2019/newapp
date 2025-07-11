'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { PaymentService, PAYMENT_STATUS } from '@/services/payment';
import { useRegistrationStore } from '@/store/registration';
import PageLayout from '@/components/layout/PageLayout';

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, setFormData } = useRegistrationStore();
  
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const reference = searchParams.get('reference');

    if (!reference) {
      setVerificationStatus('error');
      setErrorMessage('No payment reference found');
      return;
    }

    const verifyPayment = async () => {
      try {
        const verification = await PaymentService.verifyPayment(reference);
        
        if (verification.status === 'success' && verification.data?.status === 'success') {
          setFormData({
            paymentStatus: PAYMENT_STATUS.SUCCESS,
            paymentVerified: true,
            paymentDate: verification.data.paid_at,
            paymentReference: reference
          });
          setVerificationStatus('success');
        } else {
          setFormData({
            paymentStatus: PAYMENT_STATUS.FAILED,
            paymentReference: reference
          });
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('error');
        setErrorMessage('Failed to verify payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, setFormData]);

  const handleContinue = () => {
    router.push('/register/student');
  };

  const handleRetry = () => {
    router.push('/register/student');
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-2">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-bold">
                Payment Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {verificationStatus === 'loading' && (
                <div className="text-center space-y-4">
                  <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Verifying Payment</h3>
                    <p className="text-sm text-gray-600">Please wait while we verify your payment...</p>
                  </div>
                </div>
              )}

              {verificationStatus === 'success' && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Payment Successful!</h3>
                    <p className="text-sm text-green-700">
                      Your application fee has been paid successfully. You can now continue with your application.
                    </p>
                    {formData.paymentDate && (
                      <p className="text-xs text-green-600 mt-2">
                        Paid on: {new Date(formData.paymentDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button onClick={handleContinue} className="w-full">
                    Continue Application
                  </Button>
                </div>
              )}

              {verificationStatus === 'failed' && (
                <div className="text-center space-y-4">
                  <XCircle className="h-12 w-12 mx-auto text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900">Payment Failed</h3>
                    <p className="text-sm text-red-700">
                      Your payment was not successful. Please try again or contact support if the problem persists.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleRetry} className="w-full">
                      Try Again
                    </Button>
                    <Button variant="outline" onClick={handleContinue} className="w-full">
                      Continue Without Payment
                    </Button>
                  </div>
                </div>
              )}

              {verificationStatus === 'error' && (
                <div className="text-center space-y-4">
                  <AlertCircle className="h-12 w-12 mx-auto text-yellow-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900">Verification Error</h3>
                    <p className="text-sm text-yellow-700">
                      {errorMessage || 'An error occurred while verifying your payment. Please contact support.'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleRetry} className="w-full">
                      Try Again
                    </Button>
                    <Button variant="outline" onClick={handleContinue} className="w-full">
                      Continue Application
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 mx-auto animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading payment verification...</p>
        </div>
      </div>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
} 
import { useRegistrationStore } from '@/store/registration';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, Info, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { PaymentService, PAYMENT_AMOUNTS, PAYMENT_STATUS } from '@/services/payment';

export default function PaymentStep() {
  const { formData, setFormData } = useRegistrationStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ [field]: value });
    // Reset payment status when user changes their choice
    setErrorMessage('');
  };

  const handlePayment = async () => {
    if (!formData.email) {
      setErrorMessage('Email is required for payment');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const paymentData = {
        amount: PAYMENT_AMOUNTS.APPLICATION_FEE * 100, // Convert to kobo
        currency: 'NGN',
        email: formData.email,
        reference: `APP-${formData.applicationId}-${Date.now()}`,
        callback_url: `${window.location.origin}/register/student/payment-callback`,
        metadata: {
          applicationId: formData.applicationId,
          fullName: formData.fullName,
          phone: formData.phone,
          program: formData.selectedProgram,
        }
      };

      const response = await PaymentService.initializePayment(paymentData);
      
      if (response.status === 'success' && response.data?.authorization_url) {
        // Store payment reference in form data
        setFormData({ 
          paymentReference: response.data.reference,
          paymentStatus: PAYMENT_STATUS.PENDING 
        });
        
        // Redirect to payment page
        window.location.href = response.data.authorization_url;
      } else {
        setErrorMessage(response.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Payment initialization failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    try {
      const verification = await PaymentService.verifyPayment(reference);
      
      if (verification.status === 'success' && verification.data?.status === 'success') {
        setFormData({ 
          paymentStatus: PAYMENT_STATUS.SUCCESS,
          paymentVerified: true,
          paymentDate: verification.data.paid_at
        });
      } else {
        setFormData({ paymentStatus: PAYMENT_STATUS.FAILED });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setErrorMessage('Payment verification failed');
    }
  };

  // Check for payment callback
  const urlParams = new URLSearchParams(window.location.search);
  const paymentReference = urlParams.get('reference');

  if (paymentReference && !formData.paymentVerified) {
    verifyPayment(paymentReference);
  }

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <CreditCard className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900">Application Fee Payment</h3>
        </div>
        <p className="text-sm text-orange-700">Complete your application by paying the application fee or provide your social registration number</p>
      </div>

      {/* Payment Status Display */}
      {formData.paymentStatus === PAYMENT_STATUS.SUCCESS && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-900">Payment Successful!</h4>
          </div>
          <p className="text-sm text-green-700">
            Your application fee has been paid successfully. You can now proceed to the next step.
          </p>
          {formData.paymentDate && (
            <p className="text-xs text-green-600 mt-2">
              Paid on: {new Date(formData.paymentDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {formData.paymentStatus === PAYMENT_STATUS.FAILED && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h4 className="font-medium text-red-900">Payment Failed</h4>
          </div>
          <p className="text-sm text-red-700">
            Your payment was not successful. Please try again or contact support if the problem persists.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h4 className="font-medium text-red-900">Error</h4>
          </div>
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hasSocialRegistration" className="text-sm font-medium">
            Do you have a social registration number? *
          </Label>
          <Select value={formData.hasSocialRegistration} onValueChange={(value) => handleInputChange('hasSocialRegistration', value)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, I have a social registration number</SelectItem>
              <SelectItem value="no">No, I need to pay the application fee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasSocialRegistration === 'yes' && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">Social Registration Number</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                You can proceed without payment by providing your valid social registration number.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialRegistrationNumber" className="text-sm font-medium">
                Social Registration Number *
              </Label>
              <Input
                id="socialRegistrationNumber"
                type="text"
                required
                value={formData.socialRegistrationNumber}
                onChange={(e) => handleInputChange('socialRegistrationNumber', e.target.value)}
                placeholder="Enter your social registration number"
                className="h-11"
              />
              <p className="text-xs text-gray-500">
                Please enter your valid social registration number to proceed without payment.
              </p>
            </div>
          </div>
        )}

        {formData.hasSocialRegistration === 'no' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-blue-900">Application Fee</h4>
                <p className="text-3xl font-bold text-blue-600">₦{PAYMENT_AMOUNTS.APPLICATION_FEE.toLocaleString()}.00</p>
                <p className="text-sm text-blue-700 mt-1">One-time application fee</p>
              </div>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>What happens after payment:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You&apos;ll be redirected to an online assessment</li>
                  <li>Complete the assessment to evaluate your skills</li>
                  <li>Successful candidates will be contacted via email for an online assessment</li>
                  <li>Final selection will be based on assessment performance</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Payment Options</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Click &quot;Proceed to Payment&quot; to choose from Paystack, Flutterwave, or LeadRemit payment methods.
              </p>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || !formData.email}
              className="w-full h-12 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </>
              )}
            </Button>

            {!formData.email && (
              <p className="text-sm text-red-600 text-center">
                Please provide your email address in the Personal Information section to proceed with payment.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
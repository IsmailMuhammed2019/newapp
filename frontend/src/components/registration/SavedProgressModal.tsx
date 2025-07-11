import { useRegistrationStore } from '@/store/registration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileText, User, ArrowRight, RefreshCw } from 'lucide-react';

interface SavedProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedProgressModal({ isOpen, onClose }: SavedProgressModalProps) {
  const { formData, currentStep, loadSavedProgress, clearSavedProgress } = useRegistrationStore();

  if (!isOpen) return null;

  const handleContinue = () => {
    loadSavedProgress();
    onClose();
  };

  const handleStartFresh = () => {
    clearSavedProgress();
    onClose();
  };

  const getStepName = (step: number) => {
    const steps = [
      'Personal Information',
      'Account Security', 
      'Program Selection',
      'Payment Information',
      'Review & Submit'
    ];
    return steps[step] || 'Unknown Step';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Continue Your Application?
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            We found a saved application from your previous session.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Saved Progress Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {formData.fullName || 'No name provided'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Last saved: {formatDate(formData.lastSaved)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Progress: {getStepName(currentStep)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue Application
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleStartFresh}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Fresh
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your progress is automatically saved as you fill out the form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 
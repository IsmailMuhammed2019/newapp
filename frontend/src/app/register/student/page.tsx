'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRegistrationStore } from '@/store/registration';
import PersonalInfoStep from '@/components/registration/PersonalInfoStep';
import AccountSecurityStep from '@/components/registration/AccountSecurityStep';
import EducationStep from '@/components/registration/EducationStep';
import NYSCStep from '@/components/registration/NYSCStep';
import ProgramStep from '@/components/registration/ProgramStep';
import ClassTimeStep from '@/components/registration/ClassTimeStep';
import FinancialStep from '@/components/registration/FinancialStep';
import PaymentStep from '@/components/registration/PaymentStep';
import ReviewStep from '@/components/registration/ReviewStep';
import PageLayout from '@/components/layout/PageLayout';
import SavedProgressModal from '@/components/registration/SavedProgressModal';
import { CheckCircle, User, Shield, School, Award, BookOpen, Clock, Briefcase, CreditCard, Save, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  'Personal Information',
  'Account Security',
  'Educational Background',
  'NYSC Information',
  'Program Selection',
  'Class Schedule',
  'Employment & Requirements',
  'Payment Information',
  'Review & Submit'
];

const stepIcons = [
  User,
  Shield,
  School,
  Award,
  BookOpen,
  Clock,
  Briefcase,
  CreditCard,
  CheckCircle
];

export default function StudentRegistrationPage() {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    formData, 
    checkSavedProgress
  } = useRegistrationStore();
  
  const [showSavedProgressModal, setShowSavedProgressModal] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // Check for saved progress on component mount
  useEffect(() => {
    const hasProgress = checkSavedProgress();
    if (hasProgress) {
      setShowSavedProgressModal(true);
    }
  }, [checkSavedProgress]);

  // Show save indicator when form data changes
  useEffect(() => {
    if (formData.lastSaved) {
      setShowSaveIndicator(true);
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [formData.lastSaved]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <AccountSecurityStep />;
      case 2:
        return <EducationStep />;
      case 3:
        return <NYSCStep />;
      case 4:
        return <ProgramStep />;
      case 5:
        return <ClassTimeStep />;
      case 6:
        return <FinancialStep />;
      case 7:
        return <PaymentStep />;
      case 8:
        return <ReviewStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-2">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="text-center relative">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Student Application Form
                </CardTitle>
                <p className="text-gray-600 max-w-md mt-3 mx-auto">
                  Complete your comprehensive application to join our world-class training program. 
                  This multi-step process ensures we gather all necessary information to provide you 
                  with the best learning experience and career opportunities.
                </p>
                
                {/* Save Indicator - Positioned absolutely */}
                {showSaveIndicator && (
                  <div className="absolute top-0 right-0 flex items-center space-x-2 text-green-600 text-sm bg-white px-2 py-1 rounded-md shadow-sm">
                    <Save className="w-4 h-4" />
                    <span>Progress Saved</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Steps */}
              <div className="mb-8">
                {/* Progress Bar */}
                <div className="relative w-full">
                  {/* Background Line */}
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  ></div>
                  
                  {/* Step Icons */}
                  <div className="relative flex justify-between">
                    {steps.map((_, index) => {
                      const IconComponent = stepIcons[index];
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                            index < currentStep
                              ? 'bg-blue-600 text-white border-blue-600'
                              : index === currentStep
                              ? 'bg-white text-blue-600 border-blue-600'
                              : 'bg-white text-gray-400 border-gray-300'
                          }`}>
                            {index < currentStep ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <IconComponent className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Current Step Content */}
              <div className="min-h-[400px]">
                {renderStep()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2"
                >
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-sm">
                    Step {currentStep + 1} of {steps.length}
                  </Badge>
                </div>
                
                <Button
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center space-x-2"
                >
                  <span>{currentStep === steps.length - 2 ? 'Review' : 'Next'}</span>
                </Button>
              </div>

              {/* Submit Button for Final Step */}
              {currentStep === steps.length - 1 && (
                <div className="pt-4 border-t">
                  <Button className="w-full" size="lg">
                    Submit Application
                  </Button>
                </div>
              )}

              {/* Auto-save Notice */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <div className="text-center">
                  <span className="font-medium">Auto-save Enabled:</span> Your progress is automatically saved as you fill out the form. 
                  You can safely leave and return later to continue from where you left off. 
                  All your information will be securely stored in your browser.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Saved Progress Modal */}
      <SavedProgressModal 
        isOpen={showSavedProgressModal}
        onClose={() => setShowSavedProgressModal(false)}
      />
    </PageLayout>
  );
} 
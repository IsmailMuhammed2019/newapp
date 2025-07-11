'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Cookie className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                We use cookies to enhance your experience
              </h3>
              <p className="text-sm text-gray-600">
                This website uses cookies to improve functionality, analyze site usage, and provide personalized content. 
                By continuing to use this site, you consent to our use of cookies.{' '}
                <a 
                  href="/privacy-policy" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              className="text-sm"
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="text-sm bg-blue-600 hover:bg-blue-700"
            >
              Accept All
            </Button>
            <button
              onClick={declineCookies}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close cookie notice"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
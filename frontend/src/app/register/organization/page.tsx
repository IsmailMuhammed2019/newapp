'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export default function OrganizationRegistrationPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Organization Registration
              </CardTitle>
              <p className="text-gray-600">
                Partner with us to provide training opportunities for your employees or community
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-yellow-700 mb-4">
                  The organization registration form is currently under development. 
                  Please check back soon or contact us for partnership opportunities.
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-yellow-600">
                    <strong>Partnership benefits:</strong>
                  </p>
                  <ul className="text-sm text-yellow-600 space-y-1">
                    <li>• Corporate training programs</li>
                    <li>• Customized curriculum</li>
                    <li>• Bulk enrollment discounts</li>
                    <li>• Dedicated support team</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Registration Options
                  </Button>
                </Link>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
} 
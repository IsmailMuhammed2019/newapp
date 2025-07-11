'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

export default function InstructorRegistrationPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Instructor Application
              </CardTitle>
              <p className="text-gray-600">
                Share your expertise and help shape the next generation of tech professionals
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-yellow-700 mb-4">
                  The instructor application form is currently under development. 
                  Please check back soon or contact us for more information.
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-yellow-600">
                    <strong>What we&apos;re looking for:</strong>
                  </p>
                  <ul className="text-sm text-yellow-600 space-y-1">
                    <li>• Industry experience in technology</li>
                    <li>• Teaching or mentoring experience</li>
                    <li>• Strong communication skills</li>
                    <li>• Passion for helping others learn</li>
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
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
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
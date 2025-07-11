'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';

const registrationTypes = [
  {
    title: 'Apply as Student',
    description: 'Join our training program as a student and start your journey towards a successful career in technology.',
    icon: GraduationCap,
    href: '/register/student',
    color: 'blue',
    features: [
      'Comprehensive training programs',
      'Job guarantee upon completion',
      'Industry-recognized certifications',
      'Personal career guidance'
    ]
  },
  {
    title: 'Apply as Instructor',
    description: 'Share your expertise and help shape the next generation of tech professionals.',
    icon: Users,
    href: '/register/instructor',
    color: 'green',
    features: [
      'Flexible teaching schedules',
      'Competitive compensation',
      'Professional development opportunities',
      'Impact students\' lives'
    ]
  },
  {
    title: 'Register as Organization',
    description: 'Partner with us to provide training opportunities for your employees or community.',
    icon: Building2,
    href: '/register/organization',
    color: 'purple',
    features: [
      'Corporate training programs',
      'Customized curriculum',
      'Bulk enrollment discounts',
      'Dedicated support team'
    ]
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        card: 'border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300',
        icon: 'text-blue-600 bg-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        title: 'text-blue-900'
      };
    case 'green':
      return {
        card: 'border-green-200 hover:border-green-300 hover:shadow-lg transition-all duration-300',
        icon: 'text-green-600 bg-green-100',
        button: 'bg-green-600 hover:bg-green-700 text-white',
        title: 'text-green-900'
      };
    case 'purple':
      return {
        card: 'border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300',
        icon: 'text-purple-600 bg-purple-100',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        title: 'text-purple-900'
      };
    default:
      return {
        card: 'border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300',
        icon: 'text-gray-600 bg-gray-100',
        button: 'bg-gray-600 hover:bg-gray-700 text-white',
        title: 'text-gray-900'
      };
  }
};

export default function RegisterPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Registration Type
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the appropriate registration option based on your role and requirements
            </p>
          </div>

          {/* Registration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrationTypes.map((type, index) => {
              const colors = getColorClasses(type.color);
              const IconComponent = type.icon;
              
              return (
                <Card key={index} className={`${colors.card} h-full flex flex-col`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.icon} mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className={`text-2xl font-bold ${colors.title}`}>
                      {type.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      {type.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    {/* Features */}
                    <div className="flex-1 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                      <ul className="space-y-2">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Action Button */}
                    <Link href={type.href} className="mt-auto">
                      <Button className={`w-full ${colors.button} group`}>
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help you select the right registration option for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>Contact Support</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>View FAQ</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 
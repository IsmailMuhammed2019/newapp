import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Cookie, Eye, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How we collect, use, and protect your information
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cookie className="h-5 w-5 text-blue-600" />
                  <span>Cookie Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  This website uses cookies to enhance your browsing experience and provide personalized content. 
                  Cookies are small text files that are stored on your device when you visit our website.
                </p>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How to Manage Cookies:</h3>
                  <p>
                    You can control and manage cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>View and delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies</li>
                    <li>Set preferences for different types of cookies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  <span>Information We Collect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  We collect information that you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Register for an account</li>
                  <li>Apply for our training programs</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                </ul>
                
                <p>
                  We also automatically collect certain information when you visit our website, including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Device information</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span>How We Protect Your Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate security measures to protect your personal information against:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Unauthorized access or disclosure</li>
                  <li>Data loss or corruption</li>
                  <li>Malicious attacks</li>
                </ul>
                
                <p>
                  Your data is encrypted during transmission and storage. We regularly review and update our 
                  security practices to ensure the highest level of protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Object to certain types of processing</li>
                </ul>
                
                <p>
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@icbm.training" className="text-blue-600 hover:text-blue-800 underline">
                    privacy@icbm.training
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@icbm.training</p>
                  <p><strong>Phone:</strong> 09121346509</p>
                  <p><strong>Address:</strong> Digital Bridge Institute, Victoria Island, Lagos State</p>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 
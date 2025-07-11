import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Heart,
  DollarSign,
  Target as TargetIcon,
  CheckCircle2,
  Users2,
  Building,
  Briefcase,
  Laptop,
  Utensils,
  Stethoscope,
  UserCheck,
  FileText
} from 'lucide-react';

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <TargetIcon className="h-4 w-4 mr-2" />
            About ICBM
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Intelligent Capacity Building Model
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            A national workforce transformation program jointly managed by Digital Bridge Institute (DBI) 
            and SBTS Group to train and place 50,000 Nigerians into high-growth jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#mission">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-black hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <TargetIcon className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To transform Nigeria&apos;s workforce by providing comprehensive training, mentorship, 
                  and guaranteed job placement for 50,000 Nigerians across high-growth sectors 
                  including BPO, Cybersecurity, and AI centers.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become Africa&apos;s leading workforce transformation program, creating a sustainable 
                  pipeline of skilled professionals who drive economic growth and technological advancement.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">Why ICBM is Urgently Needed</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Heart className="h-6 w-6 text-red-300 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Student at the Center</h4>
                      <p className="text-sm opacity-90 mt-1">
                        ICBM takes a 360° view of the student&apos;s journey — from application, training, 
                        to guaranteed job placement with a pay as you earn model under the Student Loan Program.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-green-300 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Guaranteed Job Placement</h4>
                      <p className="text-sm opacity-90 mt-1">
                        Upon successful completion, students are guaranteed job placement in one of our 
                        SBTS-operated BPO/SOC centers — starting at ₦300,000/month for entry-level BPO 
                        roles and ₦500,000/month for advanced cybersecurity, AI, and data science tracks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <DollarSign className="h-6 w-6 text-yellow-300 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Student Loan as a Great Leveler</h4>
                      <p className="text-sm opacity-90 mt-1">
                        Financing is provided through PeaceInvest and Arise Funds, allowing applicants 
                        to complete their training without upfront costs other than downpayments where 
                        necessary and the Mandatory Application Fee of N5,000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get (Upon Admission)
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete support package to ensure your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Tuition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  $1.5k for 3-month programs; $3k for 6-months
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Laptop className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Laptop + Internet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete technology bundle for your studies
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Daily Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Breakfast & lunch provided daily
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Monthly Stipends</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Financial support during your training
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Medical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Medical and psychosocial support included
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle>Career Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional guidance throughout your journey
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle>Global Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Industry-recognized certifications
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Job Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Post-graduation job placement assistance
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Apply to the ICBM Program
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All applicants must go through a Three-Step Process to qualify
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Complete the online application form</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Pay a non-refundable ₦5,000 application fee</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Select your preferred program area of interest</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Take the ICBM Aptitude Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>You will be scheduled for a skills and aptitude test</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>This evaluates your academic readiness and career fit</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Financial & Admission Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>You may be required to provide a Guarantor or make a Down Payment based on your profile</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Once accepted, you&apos;ll be onboarded with the full ICBM student support package</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-yellow-800 font-medium">
                <strong>Note:</strong> Admission is merit-based and space-limited per cohort. Early application improves your chances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Who Should Apply?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of Nigerians transforming their careers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users2 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Youth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seeking meaningful careers in technology and business
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Graduates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Unemployed graduates or underemployed workers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Career Switchers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Individuals looking to switch careers into tech, data, or customer service
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Employers, religious organizations, State governments, NGO&apos;s, and parents looking to sponsor others
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                <strong>Refer Someone Today.</strong> This Could Change Their Life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be More. Build Intelligently.
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the ICBM movement and transform your career with guaranteed job placement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-black text-black hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 
'use client';

import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  Brain,
  Users,
  Code,
  Cloud,
  Database,
  Cpu
} from 'lucide-react';

// Program data
const programs = [
  {
    id: 1,
    name: 'Cybersecurity Fundamentals',
    category: 'Cybersecurity',
    description: 'Master the basics of cybersecurity and protect digital assets with industry-standard tools and techniques.',
    duration: '4 months',
    price: '₦150,000',
    level: 'Beginner',
    icon: Shield,
    features: [
      'Network Security Basics',
      'Threat Detection & Analysis',
      'Security Tools & Technologies',
      'Incident Response',
      'Security Best Practices'
    ],
    outcomes: [
      'Understand cybersecurity fundamentals',
      'Use industry-standard security tools',
      'Implement security measures',
      'Respond to security incidents'
    ],
    jobTitles: ['Cybersecurity Analyst', 'Security Specialist', 'IT Security Officer'],
    salary: '₦300,000 - ₦500,000/month'
  },
  {
    id: 2,
    name: 'Data Protection & Privacy',
    category: 'Data Protection',
    description: 'Learn GDPR, NDPA compliance and data governance best practices for the modern digital landscape.',
    duration: '3 months',
    price: '₦120,000',
    level: 'Intermediate',
    icon: Lock,
    features: [
      'GDPR & NDPA Compliance',
      'Data Governance',
      'Privacy by Design',
      'Data Classification',
      'Audit & Assessment'
    ],
    outcomes: [
      'Implement data protection regulations',
      'Design privacy-compliant systems',
      'Conduct privacy assessments',
      'Manage data governance'
    ],
    jobTitles: ['Data Protection Officer', 'Privacy Specialist', 'Compliance Analyst'],
    salary: '₦350,000 - ₦600,000/month'
  },
  {
    id: 3,
    name: 'AI & Machine Learning',
    category: 'Emerging Tech',
    description: 'Explore artificial intelligence and machine learning applications for real-world problem solving.',
    duration: '6 months',
    price: '₦200,000',
    level: 'Advanced',
    icon: Brain,
    features: [
      'Machine Learning Algorithms',
      'Deep Learning & Neural Networks',
      'Natural Language Processing',
      'Computer Vision',
      'AI Ethics & Governance'
    ],
    outcomes: [
      'Build ML models and algorithms',
      'Implement AI solutions',
      'Understand AI ethics',
      'Deploy AI applications'
    ],
    jobTitles: ['AI Specialist', 'Machine Learning Engineer', 'Data Scientist'],
    salary: '₦500,000 - ₦800,000/month'
  },
  {
    id: 4,
    name: 'Network Security Essentials',
    category: 'Cybersecurity',
    description: 'Comprehensive network security training covering infrastructure protection and monitoring.',
    duration: '4 months',
    price: '₦140,000',
    level: 'Intermediate',
    icon: Database,
    features: [
      'Network Infrastructure Security',
      'Firewall Configuration',
      'Intrusion Detection Systems',
      'VPN & Remote Access',
      'Network Monitoring'
    ],
    outcomes: [
      'Secure network infrastructure',
      'Configure security devices',
      'Monitor network traffic',
      'Implement access controls'
    ],
    jobTitles: ['Network Security Engineer', 'Infrastructure Specialist', 'Security Administrator'],
    salary: '₦400,000 - ₦650,000/month'
  },
  {
    id: 5,
    name: 'Digital Forensics',
    category: 'Cybersecurity',
    description: 'Learn digital forensics techniques for cybercrime investigation and evidence collection.',
    duration: '5 months',
    price: '₦180,000',
    level: 'Advanced',
    icon: Cpu,
    features: [
      'Digital Evidence Collection',
      'Forensic Analysis Tools',
      'Cybercrime Investigation',
      'Legal Procedures',
      'Report Writing'
    ],
    outcomes: [
      'Collect and preserve digital evidence',
      'Analyze forensic data',
      'Investigate cybercrimes',
      'Write forensic reports'
    ],
    jobTitles: ['Digital Forensics Analyst', 'Cybercrime Investigator', 'Forensic Specialist'],
    salary: '₦450,000 - ₦700,000/month'
  },
  {
    id: 6,
    name: 'Cloud Security Architecture',
    category: 'Cloud Security',
    description: 'Design and implement secure cloud infrastructure for modern enterprise environments.',
    duration: '4 months',
    price: '₦160,000',
    level: 'Advanced',
    icon: Cloud,
    features: [
      'Cloud Security Models',
      'Identity & Access Management',
      'Data Encryption',
      'Security Monitoring',
      'Compliance Frameworks'
    ],
    outcomes: [
      'Design secure cloud architectures',
      'Implement cloud security controls',
      'Manage cloud compliance',
      'Monitor cloud security'
    ],
    jobTitles: ['Cloud Security Architect', 'DevSecOps Engineer', 'Cloud Security Specialist'],
    salary: '₦500,000 - ₦750,000/month'
  },
  {
    id: 7,
    name: 'Business Process Outsourcing',
    category: 'BPO',
    description: 'Master customer service excellence and business process management for global markets.',
    duration: '3 months',
    price: '₦100,000',
    level: 'Beginner',
    icon: Users,
    features: [
      'Customer Service Excellence',
      'Business Process Management',
      'Communication Skills',
      'Quality Assurance',
      'Performance Metrics'
    ],
    outcomes: [
      'Deliver exceptional customer service',
      'Manage business processes',
      'Meet performance targets',
      'Handle customer inquiries'
    ],
    jobTitles: ['Customer Service Representative', 'BPO Specialist', 'Call Center Agent'],
    salary: '₦300,000 - ₦450,000/month'
  },
  {
    id: 8,
    name: 'Software Development',
    category: 'Development',
    description: 'Full-stack development training with modern frameworks and best practices.',
    duration: '6 months',
    price: '₦180,000',
    level: 'Intermediate',
    icon: Code,
    features: [
      'Frontend Development',
      'Backend Development',
      'Database Design',
      'API Development',
      'DevOps Practices'
    ],
    outcomes: [
      'Build full-stack applications',
      'Design and implement APIs',
      'Manage databases',
      'Deploy applications'
    ],
    jobTitles: ['Software Developer', 'Full Stack Developer', 'Web Developer'],
    salary: '₦400,000 - ₦700,000/month'
  }
];

// Program categories
const categories = [
  { name: 'All Programs', value: 'all', icon: GraduationCap },
  { name: 'Cybersecurity', value: 'cybersecurity', icon: Shield },
  { name: 'Data Protection', value: 'data-protection', icon: Lock },
  { name: 'AI & ML', value: 'ai-ml', icon: Brain },
  { name: 'BPO', value: 'bpo', icon: Users },
  { name: 'Development', value: 'development', icon: Code },
  { name: 'Cloud Security', value: 'cloud-security', icon: Cloud }
];

export default function ProgramsPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <GraduationCap className="h-4 w-4 mr-2" />
            Training Programs
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Training Programs
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Choose from our comprehensive range of programs designed to prepare you for 
            high-growth careers in technology and business process outsourcing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#programs">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white/10">
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Categories</h2>
            <p className="text-gray-600">Browse programs by category</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.value}
                  className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <IconComponent className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Available Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the program that best fits your career goals and interests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <Card key={program.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {program.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <CardDescription className="text-gray-700">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{program.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {program.level}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {program.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Career Outcomes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {program.jobTitles.map((title, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Expected Salary:</strong> {program.salary}
                      </div>
                      <Link href={`/register?program=${program.id}`}>
                        <Button className="w-full">
                          Apply for this Program
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Guarantee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Job Guarantee by Tier
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your career path with guaranteed employment
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
                  Tier 1
                </Badge>
                <CardTitle className="text-3xl font-bold text-gray-900">Entry-Level Jobs</CardTitle>
                <div className="text-2xl font-bold text-green-600">₦300,000/month</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Program Areas:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Customer Service Excellence</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Technical Support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Data Entry</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Healthcare Admin Support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Digital Marketing Support</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Job Titles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Customer Rep', 'Virtual Assistant', 'Call Center Agent', 'Technical Support'].map((title, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
                  Tier 2
                </Badge>
                <CardTitle className="text-3xl font-bold text-gray-900">Advanced Jobs</CardTitle>
                <div className="text-2xl font-bold text-green-600">₦500,000/month</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Program Areas:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Cybersecurity Fundamentals / SOC Analyst</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Data Science / AI & Machine Learning</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Full Stack Development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">Cloud & DevOps</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Job Titles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Cybersecurity Analyst', 'SOC Analyst', 'Software Developer', 'Data Scientist', 'AI Specialist'].map((title, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Apply
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple three-step process to start your career transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Apply Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Complete the online application form</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Pay ₦5,000 application fee</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Select your preferred program</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Take Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Complete aptitude assessment</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Skills evaluation</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Career fit assessment</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Get Admitted</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Financial review</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Admission confirmation</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Start your training</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Nigerians who have successfully transitioned into high-paying tech careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-black hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 
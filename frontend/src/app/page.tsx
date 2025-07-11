'use client';

import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  Heart,
  DollarSign,
  Briefcase,
  Laptop,
  Utensils,
  Stethoscope,
  UserCheck,
  FileText,
  Target as TargetIcon,
  CheckCircle2 as CheckCircle2Icon,
  Phone,
  Mail,
  Users2,
  GraduationCap,
  Building
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: "Transform Your Career with ICBM",
    subtitle: "Intelligent Capacity Building Model",
    description: "Join 50,000+ Nigerians in high-growth jobs across BPO, Cybersecurity, and AI centers",
    image: "/sliders/slider1.jpg",
    cta: "Apply Now",
    stats: { students: "500+", employment: "95%", companies: "50+", certification: "100%" }
  },
  {
    id: 2,
    title: "Guaranteed Job Placement",
    subtitle: "Starting at ₦300,000/month",
    description: "Complete training with laptop, internet, meals, stipend, and job support included",
    image: "/sliders/slider2.jpg",
    cta: "Learn More",
    stats: { students: "500+", employment: "95%", companies: "50+", certification: "100%" }
  },
  {
    id: 3,
    title: "Student Loan Program",
    subtitle: "Pay After Job Placement",
    description: "No upfront costs except ₦5,000 application fee. Repay only after getting hired",
    image: "/sliders/slider3.jpg",
    cta: "Get Started",
    stats: { students: "500+", employment: "95%", companies: "50+", certification: "100%" }
  },
  {
    id: 4,
    title: "State-of-the-Art Training Centers",
    subtitle: "DBI Centers Nationwide",
    description: "Access world-class facilities and expert instructors across Nigeria",
    image: "/sliders/slider4.jpg",
    cta: "View Centers",
    stats: { students: "500+", employment: "95%", companies: "50+", certification: "100%" }
  }
];

// Program tiers
const programTiers = [
  {
    tier: "Tier 1",
    title: "Entry-Level Jobs",
    salary: "₦300,000/month",
    jobs: [
      "Customer Service Excellence",
      "Technical Support", 
      "Data Entry",
      "Healthcare Admin Support",
      "Digital Marketing Support"
    ],
    titles: ["Customer Rep", "Virtual Assistant", "Call Center Agent", "Technical Support"]
  },
  {
    tier: "Tier 2", 
    title: "Advanced Jobs",
    salary: "₦500,000/month",
    jobs: [
      "Cybersecurity Fundamentals / SOC Analyst",
      "Data Science / AI & Machine Learning",
      "Full Stack Development",
      "Cloud & DevOps"
    ],
    titles: ["Cybersecurity Analyst", "SOC Analyst", "Software Developer", "Data Scientist", "AI Specialist"]
  }
];

// Trending Programs data
const trendingPrograms = [
  {
    id: 1,
    name: "Cybersecurity Training",
    description: "Master the fundamentals of cybersecurity and become a certified security professional",
    image: "/programs/cybersecurity-training.jpg",
    duration: "6 months",
    salary: "₦500,000/month",
    trending: true,
    badge: "Hot"
  },
  {
    id: 2,
    name: "AI & Machine Learning",
    description: "Learn cutting-edge AI and ML technologies for the future of work",
    image: "/programs/aiml.jpg",
    duration: "6 months",
    salary: "₦500,000/month",
    trending: true,
    badge: "Trending"
  },
  {
    id: 3,
    name: "Software Development",
    description: "Full-stack development with modern technologies and frameworks",
    image: "/programs/software-development.jpg",
    duration: "6 months",
    salary: "₦500,000/month",
    trending: true,
    badge: "Popular"
  },
  {
    id: 4,
    name: "Security & Compliance",
    description: "Specialized training in security protocols and compliance standards",
    image: "/programs/security.jpg",
    duration: "3 months",
    salary: "₦400,000/month",
    trending: false,
    badge: "New"
  }
];

// DBI Centers
const dbiCenters = [
  {
    name: "DBI Abuja Campus",
    description: "Our flagship campus in the heart of Nigeria's capital",
    address: "#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria",
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active"
  },
  {
    name: "DBI Lagos Campus", 
    description: "Located in Nigeria's commercial hub",
    address: "Victoria Island, Lagos",
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active"
  },
  {
    name: "DBI Enugu Campus",
    description: "Serving the eastern region with modern facilities",
    address: "New Haven, Enugu", 
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active"
  },
  {
    name: "DBI Kano Campus",
    description: "Northern Nigeria's premier digital skills center",
    address: "Nasarawa GRA, Kano",
    phone: "09121346509", 
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active"
  },
  {
    name: "DBI Yola Campus",
    description: "Empowering the northeast region",
    address: "Jimeta, Yola",
    phone: "09121346509",
    email: "info@icbm.training", 
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active"
  },

];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Slider background image */}
            <Image 
              src={slide.image} 
              alt={slide.title} 
              fill 
              style={{ objectFit: 'cover', zIndex: 0 }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 z-10"></div>
            <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 z-20">
              <div className="max-w-7xl mx-auto text-center text-white">
                <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
                  <TargetIcon className="h-4 w-4 mr-2" />
                  {slide.subtitle}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{slide.stats.students}</div>
                    <div className="text-sm opacity-80">Students Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{slide.stats.employment}</div>
                    <div className="text-sm opacity-80">Employment Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{slide.stats.companies}</div>
                    <div className="text-sm opacity-80">Partner Companies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{slide.stats.certification}</div>
                    <div className="text-sm opacity-80">Certification Rate</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register">
                    <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-black hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                About ICBM
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Intelligent Capacity Building Model
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A national workforce transformation program jointly managed by Digital Bridge Institute (DBI) 
                and SBTS Group to train and place 50,000 Nigerians into high-growth jobs across BPO, 
                Cybersecurity, and AI centers.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">360° view of the student&apos;s journey — from application, training, to guaranteed job placement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Starting at ₦300,000/month for entry-level BPO roles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2Icon className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">₦500,000/month for advanced cybersecurity, AI, and data science tracks</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">What You Get (Upon Admission)</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-yellow-300" />
                    <span>Tuition ($1.5k for 3-month programs; $3k for 6-months)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Laptop className="h-5 w-5 text-blue-300" />
                    <span>Laptop + internet bundle</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Utensils className="h-5 w-5 text-green-300" />
                    <span>Daily meals (breakfast & lunch)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-300" />
                    <span>Monthly stipends</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="h-5 w-5 text-purple-300" />
                    <span>Medical and psychosocial support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-5 w-5 text-indigo-300" />
                    <span>Career mentorship</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-teal-300" />
                    <span>Global certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Tiers Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/back1.jpg" 
            alt="Background" 
            fill 
            style={{ objectFit: 'cover' }}
            className="opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Job Guarantee by Tier
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your career path with guaranteed employment
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programTiers.map((tier, index) => (
              <Card key={index} className={`border-${index === 0 ? 'blue' : 'purple'}-200 bg-gradient-to-br from-${index === 0 ? 'blue' : 'purple'}-50 to-${index === 0 ? 'indigo' : 'pink'}-50 backdrop-blur-sm bg-white/80`}>
                <CardHeader className="text-center">
                  <Badge variant="secondary" className={`mb-4 bg-${index === 0 ? 'blue' : 'purple'}-100 text-${index === 0 ? 'blue' : 'purple'}-800`}>
                    {tier.tier}
                  </Badge>
                  <CardTitle className="text-3xl font-bold text-gray-900">{tier.title}</CardTitle>
                  <div className="text-2xl font-bold text-green-600">{tier.salary}</div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Program Areas:</h4>
                    <ul className="space-y-2">
                      {tier.jobs.map((job, jobIndex) => (
                        <li key={jobIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{job}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Job Titles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tier.titles.map((title, titleIndex) => (
                        <Badge key={titleIndex} variant="outline" className="text-sm">
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trending Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most popular programs chosen by our students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingPrograms.map((program) => (
              <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Program Image */}
                <div className="relative w-full h-48">
                  <Image 
                    src={program.image} 
                    alt={program.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {program.trending && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        {program.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {program.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Starting Salary:</span>
                    <span className="font-medium text-green-600">{program.salary}</span>
                  </div>
                  
                  <Link href="/register">
                    <Button className="w-full mt-4" size="sm">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DBI Centers Section */}
      <section id="centers" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Centers Across Nigeria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities across major cities in Nigeria
            </p>
          </div>
          {/* Custom 3+2 grid for 5 centers */}
          <div className="space-y-8">
            {/* First row: 3 centers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dbiCenters.slice(0, 3).map((center, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Center Image */}
                  <div className="relative w-full h-48">
                    <Image 
                      src={`/campus/dbi-${center.name.toLowerCase().replace('dbi ', '').replace(' campus', '')}-campus.jpg`}
                      alt={center.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant={center.status === 'Active' ? "default" : "secondary"}>
                        {center.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <CardDescription>{center.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Second row: 2 centers, centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {dbiCenters.slice(3, 5).map((center, index) => (
                <Card key={index + 3} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Center Image */}
                  <div className="relative w-full h-48">
                    <Image 
                      src={`/campus/dbi-${center.name.toLowerCase().replace('dbi ', '').replace(' campus', '')}-campus.jpg`}
                      alt={center.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant={center.status === 'Active' ? "default" : "secondary"}>
                        {center.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <CardDescription>{center.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/centers">
              <Button size="lg" className="text-lg px-8 py-4">
                View All Centers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who Should Apply Section */}
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

      {/* How to Apply Section */}
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

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
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

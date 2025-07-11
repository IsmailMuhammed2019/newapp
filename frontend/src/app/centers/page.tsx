'use client';

import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  GraduationCap, 
  ArrowRight,
  MapPin,
  Users,
  Building,
  Wifi,
  Laptop,
  Utensils,
  Stethoscope,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// Centers data
const centers = [
  {
    id: 1,
    name: 'DBI Abuja Center',
    location: '#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria',
    status: 'Active',
    capacity: 500,
    programs: ['Cybersecurity', 'Data Protection', 'AI & ML', 'BPO'],
    facilities: ['Computer Labs', 'High-Speed Internet', 'Cafeteria', 'Medical Support', 'Career Counseling'],
    contact: {
      phone: '09121346509',
      email: 'info@icbm.training',
      address: '#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria'
    },
    description: "Our flagship campus in the heart of Nigeria's capital, offering comprehensive training programs with state-of-the-art facilities.",
    image: '/campus/dbi-abuja-campus.jpg'
  },
  {
    id: 2,
    name: 'DBI Lagos Center',
    location: 'Victoria Island, Lagos',
    status: 'Active',
    capacity: 400,
    programs: ['Cybersecurity', 'Software Development', 'BPO', 'Digital Marketing'],
    facilities: ['Computer Labs', 'High-Speed Internet', 'Cafeteria', 'Medical Support', 'Career Counseling'],
    contact: {
      phone: '09121346509',
      email: 'info@icbm.training',
      address: 'Victoria Island, Lagos State'
    },
    description: "Located in Nigeria's commercial hub, this center provides specialized training for the tech industry.",
    image: '/campus/dbi-lagos-campus.jpg'
  },
  {
    id: 3,
    name: 'DBI Enugu Center',
    location: 'New Haven, Enugu',
    status: 'Active',
    capacity: 300,
    programs: ['Cybersecurity', 'Data Science', 'BPO', 'Cloud Computing'],
    facilities: ['Computer Labs', 'High-Speed Internet', 'Cafeteria', 'Medical Support', 'Career Counseling'],
    contact: {
      phone: '09121346509',
      email: 'info@icbm.training',
      address: 'New Haven, Enugu State'
    },
    description: "Eastern Nigeria's premier digital skills center, serving the region with comprehensive training programs.",
    image: '/campus/dbi-enugu-campus.jpg'
  },
  {
    id: 4,
    name: 'DBI Kano Center',
    location: 'Nasarawa GRA, Kano',
    status: 'Active',
    capacity: 250,
    programs: ['Cybersecurity', 'BPO', 'Digital Skills', 'E-commerce'],
    facilities: ['Computer Labs', 'High-Speed Internet', 'Cafeteria', 'Medical Support', 'Career Counseling'],
    contact: {
      phone: '09121346509',
      email: 'info@icbm.training',
      address: 'Nasarawa GRA, Kano State'
    },
    description: "Northern Nigeria's premier digital skills center, serving the growing demand for digital skills in the region.",
    image: '/campus/dbi-kano-campus.jpg'
  },
  {
    id: 5,
    name: 'DBI Yola Center',
    location: 'Jimeta, Yola',
    status: 'Active',
    capacity: 200,
    programs: ['Cybersecurity', 'BPO', 'Digital Skills', 'E-commerce'],
    facilities: ['Computer Labs', 'High-Speed Internet', 'Cafeteria', 'Medical Support', 'Career Counseling'],
    contact: {
      phone: '09121346509',
      email: 'info@icbm.training',
      address: 'Jimeta, Yola, Adamawa State'
    },
    description: "Empowering the northeast region with comprehensive digital skills training.",
    image: '/campus/dbi-yola-campus.jpg'
  },

];

export default function CentersPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Building className="h-4 w-4 mr-2" />
            Training Centers
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Training Centers
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            State-of-the-art facilities across Nigeria, bringing world-class training 
            and guaranteed job placement to every region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#centers">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white/10">
                View Centers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Centers Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nationwide Network
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From Abuja to Lagos, Enugu to Kano, our centers are strategically located 
              to serve students across Nigeria with the same high-quality training experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">6 Centers</h3>
              <p className="text-gray-600">Across major cities in Nigeria</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1,850+ Capacity</h3>
              <p className="text-gray-600">Total student capacity across all centers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">15+ Programs</h3>
              <p className="text-gray-600">Specialized training programs available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Grid */}
      <section id="centers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Your Nearest Center
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the center closest to you and start your career transformation journey
            </p>
          </div>
          
          {/* Custom 3+2 grid for 5 centers */}
          <div className="space-y-8">
            {/* First row: 3 centers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {centers.slice(0, 3).map((center) => (
                <Card key={center.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Campus image */}
                  <div className="relative w-full h-48">
                    <Image 
                      src={center.image} 
                      alt={center.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={center.id === 1}
                    />
                  </div>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant={center.status === 'Active' ? "default" : "secondary"}>
                        {center.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{center.name}</CardTitle>
                    <CardDescription className="text-gray-700">
                      {center.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Capacity: {center.capacity} students</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Programs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {center.programs.map((program, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Facilities:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {center.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <span className="text-gray-600">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Second row: 2 centers, centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {centers.slice(3, 5).map((center) => (
                <Card key={center.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  {/* Campus image */}
                  <div className="relative w-full h-48">
                    <Image 
                      src={center.image} 
                      alt={center.name} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={center.id === 1}
                    />
                  </div>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge variant={center.status === 'Active' ? "default" : "secondary"}>
                        {center.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{center.name}</CardTitle>
                    <CardDescription className="text-gray-700">
                      {center.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Capacity: {center.capacity} students</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Programs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {center.programs.map((program, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Facilities:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {center.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center space-x-1">
                            <span className="text-gray-600">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{center.contact.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              World-Class Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every ICBM center is equipped with state-of-the-art facilities to ensure 
              the best learning experience for our students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Laptop className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Computer Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Modern computer labs with high-performance workstations and the latest software
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>High-Speed Internet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Fiber-optic internet connectivity for seamless online learning and research
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Cafeteria</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  On-site cafeteria serving nutritious meals to support your learning journey
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Medical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  On-site medical support and wellness services for student health and well-being
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Choose your nearest center and begin your transformation into a high-demand professional
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
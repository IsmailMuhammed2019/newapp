'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Building
} from 'lucide-react';
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// DBI Centers data
const centers = [
  {
    id: 1,
    name: "DBI Abuja Campus",
    location: "#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria",
    address: "#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria",
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active",
    coordinates: { lat: 9.0820, lng: 8.6753 }
  },
  {
    id: 2,
    name: "DBI Lagos Campus", 
    location: "Victoria Island, Lagos",
    address: "Victoria Island, Lagos",
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active",
    coordinates: { lat: 6.5244, lng: 3.3792 }
  },
  {
    id: 3,
    name: "DBI Enugu Campus",
    location: "New Haven, Enugu",
    address: "New Haven, Enugu", 
    phone: "09121346509",
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active",
    coordinates: { lat: 6.4584, lng: 7.5464 }
  },
  {
    id: 4,
    name: "DBI Kano Campus",
    location: "Nasarawa GRA, Kano",
    address: "Nasarawa GRA, Kano",
    phone: "09121346509", 
    email: "info@icbm.training",
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active",
    coordinates: { lat: 11.9914, lng: 8.5317 }
  },
  {
    id: 5,
    name: "DBI Yola Campus",
    location: "Jimeta, Yola",
    address: "Jimeta, Yola",
    phone: "09121346509",
    email: "info@icbm.training", 
    hours: "Mon-Fri: 8AM-6PM",
    status: "Active",
    coordinates: { lat: 9.2035, lng: 12.4954 }
  },

];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    submitted: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setFormData(prev => ({ ...prev, submitted: true }));
    setTimeout(() => {
      setFormData(prev => ({ ...prev, submitted: false }));
    }, 5000); // Hide message after 5 seconds
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-black border-white/30">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Us
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Ready to transform your career? Our expert advisors are standing by to help you 
            design the perfect learning solution.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="application">Application Support</SelectItem>
                          <SelectItem value="programs">Program Information</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                  
                  {formData.submitted && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 font-medium">Message sent successfully!</p>
                      </div>
                      <p className="text-gray-600 mb-4">Thank you for your message. We&apos;ll get back to you soon.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of the following channels. We&apos;re here to help you 
                  start your career transformation journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@icbm.training</p>
                    <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">09121346509</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 8:00 AM - 6:00 PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Head Office</h3>
                    <p className="text-gray-600">#8 P.O.W. Mafemi Crescent, Utako, Abuja, Nigeria</p>
                    <p className="text-sm text-gray-500">Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 3:00 PM</p>
                    <p className="text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">What is the application fee?</h4>
                    <p className="text-sm text-gray-600">The application fee is ₦5,000 (five thousand naira) and is non-refundable.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">How long does the application process take?</h4>
                    <p className="text-sm text-gray-600">The complete application process typically takes 2-3 weeks from submission to admission decision.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">What if I don&apos;t have a computer?</h4>
                    <p className="text-sm text-gray-600">No problem! The program includes a laptop and internet bundle as part of your admission package.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DBI Centers Map */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Centers Across Nigeria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the ICBM training center nearest to you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centers.map((center) => (
              <Card key={center.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Campus image */}
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
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge variant={center.status === 'Active' ? "default" : "secondary"}>
                      {center.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{center.name}</CardTitle>
                  <CardDescription>{center.location}</CardDescription>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 
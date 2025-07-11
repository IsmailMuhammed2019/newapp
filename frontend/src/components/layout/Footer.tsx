import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/logo3.png" 
                alt="ICBM Logo" 
                width={218} 
                height={48} 
                className="w-[218px] h-[48px]"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Transforming careers through intelligent capacity building and guaranteed job placement.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-gray-900">Programs</Link></li>
              <li><Link href="/centers" className="text-gray-600 hover:text-gray-900">Centers</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link></li>
              <li><Link href="/register" className="text-gray-600 hover:text-gray-900">Register</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>09121346509</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@icbm.training</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Victoria Island, Lagos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 ICBM Training. All rights reserved. | Powered by SBTS Group & Digital Bridge Institute</p>
        </div>
      </div>
    </footer>
  );
} 
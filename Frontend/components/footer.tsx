"use client"

import Link from "next/link"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Globe,
  Mountain,
  Plane,
  Star,
  Clock,
  Shield,
  ArrowUp,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 mb-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated with Our Latest Tours
          </h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals, new destinations, and travel tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white"
            />
            <Button className="bg-white text-teal-600 hover:bg-gray-100 whitespace-nowrap">
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Journey Planner Pro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner for unforgettable travel experiences across Pakistan and around the world. Creating memories that last a lifetime.
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>500+ Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>3+ Years Experience</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
                  { icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                  { icon: Twitter, color: "hover:bg-blue-400", label: "Twitter" },
                  { icon: Youtube, color: "hover:bg-red-600", label: "YouTube" }
                ].map(({ icon: Icon, color, label }) => (
                  <div
                    key={label}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${color} transition-all duration-300 cursor-pointer group`}
                  >
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/tours", label: "Tour Packages" },
                { href: "/plan", label: "Custom Plans" },
                { href: "/book", label: "Book Now" },
                { href: "/contact", label: "Contact Us" }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-gray-400 hover:text-teal-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tour Categories</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mountain className="h-4 w-4 text-emerald-500" />
                <span>Pakistan Northern Areas</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Plane className="h-4 w-4 text-blue-500" />
                <span>International Tours</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Globe className="h-4 w-4 text-purple-500" />
                <span>Religious Tours</span>
              </li>
            </ul>
            
            <div className="pt-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Popular Destinations</h4>
              <ul className="space-y-2 text-sm">
                {["Hunza Valley", "Skardu", "Switzerland", "Malaysia", "Umrah & Hajj"].map((dest) => (
                  <li key={dest} className="text-gray-400 hover:text-teal-400 transition-colors cursor-pointer">
                    {dest}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                  <Phone className="h-4 w-4 text-teal-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-400 group-hover:text-white transition-colors">+92 300 1234567</p>
                  <p className="text-xs text-gray-500">24/7 Support Available</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                  <Mail className="h-4 w-4 text-teal-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-400 group-hover:text-white transition-colors">info@journeyplannerpro.com</p>
                  <p className="text-xs text-gray-500">Quick Response Guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                  <MapPin className="h-4 w-4 text-teal-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-gray-400 group-hover:text-white transition-colors text-sm">
                    Plot #B-45, Block 5, Gulshan-e-Iqbal
                  </p>
                  <p className="text-gray-400 group-hover:text-white transition-colors text-sm">
                    Near Sir Syed University, Karachi
                  </p>
                  <p className="text-xs text-gray-500">Visit Our Office</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Business Hours</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Journey Planner Pro. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookie-policy" className="hover:text-teal-400 transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/sitemap" className="hover:text-teal-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-xs text-gray-500">Made with ❤️ in Pakistan</p>
              <Button
                onClick={scrollToTop}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 rounded-full w-10 h-10 p-0"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
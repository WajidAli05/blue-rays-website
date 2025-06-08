import React from "react"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white pt-10 pb-6 px-6 rounded-t-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Blue Rays Technologies LLC</h3>
          <p className="text-sm text-blue-200 mb-4">
            Powering digital commerce through innovation, trust, and technology.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="/returns" className="hover:text-white transition">Returns Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="text-sm text-blue-200 space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5" />
              <span>123 Blue Rays Ave, Silicon Valley, CA</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:support@bluerays.tech" className="hover:text-white transition">
                support@bluerays.tech
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 mt-10 pt-4 text-center text-xs text-blue-300">
        &copy; {new Date().getFullYear()} Blue Rays Technologies LLC. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
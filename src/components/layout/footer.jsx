import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-green-600">GreenCart</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
            <p className="text-gray-400 text-xs">
              Copyright 2025 © GreatStack.dev All Right Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h5 className="text-gray-800 font-bold text-base mb-6 uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Offers & Deals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="md:col-span-1">
            <h5 className="text-gray-800 font-bold text-base mb-6 uppercase tracking-wider">Need help?</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Return & Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-1">
            <h5 className="text-gray-800 font-bold text-base mb-6 uppercase tracking-wider">Follow Us</h5>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors flex items-center gap-2">
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors flex items-center gap-2">
                  <Twitter size={16} />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors flex items-center gap-2">
                  <Facebook size={16} />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-600 transition-colors flex items-center gap-2">
                  <Youtube size={16} />
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider - Only shown on mobile */}
        <div className="border-t border-gray-200 mt-12 pt-8 md:hidden">
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              Copyright 2025 © GreatStack.dev All Right Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
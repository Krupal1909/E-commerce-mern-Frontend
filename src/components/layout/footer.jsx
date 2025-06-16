import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src="../../../public/assets/logo.svg" alt="GreenCart Logo" className="h-8 mb-4" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Offers & Deals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Need help?</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Return & Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Track your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-1">
            <h3 className="text-gray-900 font-semibold text-sm mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
                  YouTube
                </a>
              </li>
            </ul> 
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Copyright 2025 © GreatStack.dev All Right Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
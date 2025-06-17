import React from 'react';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="  mb-4 md:text-4xl text-2xl font-medium">
          Never Miss a Deal!
        </h2>
        <p className="text-lg text-black-300 mb-8">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
  <input
    type="email"
    placeholder="Enter your email id"
    className="flex-grow px-4 py-3 rounded-lg border border-emerald-400 ring-1 ring-emerald-300 outline-none"
  />
  <button className=" text-emerald-600 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-100 bg-emerald-50 transition-colors duration-200 flex items-center justify-center gap-2">
    <Send size={18} />
    Subscribe
  </button>
</div>
      </div>
    </div>
  );
};

export default Newsletter;
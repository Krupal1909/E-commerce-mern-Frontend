import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const AddShippingAddress = ({ onBack, onSaveAddress }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'zipCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Create formatted address string
    const formattedAddress = `${formData.firstName} ${formData.lastName}\n${formData.street}\n${formData.city}, ${formData.state} ${formData.zipCode}\n${formData.country}\nPhone: ${formData.phone}`;
    
    // Call the callback function to save address
    if (onSaveAddress) {
      onSaveAddress(formattedAddress);
    }
    
    alert('Address saved successfully!');
    
    // Go back to cart
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </button>
          </div>

          <h1 className="text-xl font-semibold mb-6">
            Add Shipping <span className="text-green-500">Address</span>
          </h1>

          <div className="space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
              />
            </div>

            {/* Street */}
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                required
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Zip Code and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-sm"
                required
              />
            </div>

            {/* Save Address Button */}
            <button
              type="button"
              onClick={handleSaveAddress}
              className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors shadow-sm"
            >
              SAVE ADDRESS
            </button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="flex justify-center items-center">
          <div className="w-80 h-80">
            <img 
              src="../../../public/assets/add-address.svg"
              alt="Add Address Illustration"
              className="w-full h-full object-contain mt-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShippingAddress;
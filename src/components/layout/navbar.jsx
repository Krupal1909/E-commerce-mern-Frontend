import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <img src="../../../public/assets/logo.svg" alt="Logo" className="h-8  hidden md:block mr-auto" />
      

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 transition-colors font-medium rounded-3xl">
              Seller Dashboard
            </a>
            <a href="#" className="text-gray-700  transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700  transition-colors font-medium">
              All Products
            </a>
            
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button className="relative p-2 text-gray-700 hover:text-green-500 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Profile */}
            <button className="p-2 text-gray-700 hover:text-green-500 transition-colors">
              <User className="w-6 h-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-green-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-3">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Mobile Navigation Links */}
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                All Products
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                Seller Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
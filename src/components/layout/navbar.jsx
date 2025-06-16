import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
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
          <div className="flex-shrink-0">
            <img src="../../../public/assets/logo.svg" alt="Logo" className="h-8 cursor-pointer" />
          </div>

          {/* Navigation & Search */}
          <div className="flex items-center space-x-6">
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="border border-gray-300 px-3 py-1 rounded-full text-xs cursor-pointer opacity-80 font-semibold hover:border-green-500 transition-colors"
                onClick={() => navigate('/seller')}
              >
                Seller Dashboard
              </a>
              <a
                href="#"
                className="text-gray-700 text-[15px] font-semibold transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 text-[15px] font-semibold transition-colors"
              >
                All Products
              </a>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none  text-sm"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Icons + Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* Cart Icon */}
              <button className="relative p-2 text-gray-700 transition-colors">
                <ShoppingCart className="w-5 h-5 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  2
                </span>
              </button>

              {/* User Icon */}
              <button className="p-2 text-gray-700 transition-colors">
                <User className="w-5 h-5 cursor-pointer" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 h-full px-3 text-gray-400  transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Links */}
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                All Products
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
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

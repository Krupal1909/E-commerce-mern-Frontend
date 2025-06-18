import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/cartContexts";
import AuthModal from "../auth/authModel";

// Auth utilities
const authUtils = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== "undefined";
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  },
};

// User Dropdown Component
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMyOrders = () => {
    setIsOpen(false);
    navigate("/my-orders");
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        {user && (
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user.name}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            onClick={handleMyOrders}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-gray-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders</span>
          </button>

          <hr className="my-1 border-gray-200" />

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://e-commerce-mern-backend-5izw.onrender.com/api/product/get-product");
        const data = await response.json();
        setAllProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const checkAuth = () => {
      const authenticated = authUtils.isAuthenticated();
      const currentUser = authUtils.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUser(currentUser);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Handle clicks outside search to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products locally as user types
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowResults(query.length > 0);

    if (query.length < 2) {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)) ||
      (product.category && (
        (typeof product.category === 'string' && product.category.toLowerCase().includes(query)) ||
        (product.category.name && product.category.name.toLowerCase().includes(query))
      ))
    );

    setFilteredProducts(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/product");
    }
    setShowResults(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => {
      const authenticated = authUtils.isAuthenticated();
      const currentUser = authUtils.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUser(currentUser);
    }, 100);
  };

  const handleLogout = () => {
    authUtils.logout();
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setShowResults(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0" onClick={() => navigate("/")}>
              <img
                src="../../../public/assets/logo.svg"
                alt="Logo"
                className="h-8 cursor-pointer"
              />
            </div>

            {/* Navigation & Search */}
            <div className="flex items-center space-x-6">
              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#"
                  className="border border-gray-300 px-3 py-1 rounded-full text-xs cursor-pointer opacity-80 font-semibold hover:border-green-500 transition-colors"
                  onClick={() => navigate("/seller")}
                >
                  Seller Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-700 text-[15px] font-semibold transition-colors"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 text-[15px] font-semibold transition-colors"
                  onClick={() => navigate("/product")}
                >
                  All Products
                </a>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex">
                <div className="relative" ref={searchRef}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                    onFocus={() => setShowResults(searchQuery.length > 0)}
                    className="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  {/* Search Results Dropdown */}
                  {showResults && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                      {filteredProducts.length > 0 ? (
                        <ul>
                          {filteredProducts.map((product) => (
                            <li
                              key={product._id || product.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleResultClick(product._id || product.id)}
                            >
                              <div className="flex items-center">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover mr-3"
                                />
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {product.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                          {searchQuery.length >= 2 ? "No products found" : "Type at least 2 characters"}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Icons + Login/User + Mobile Menu */}
              <div className="flex items-center space-x-2">
                {/* Cart Icon with dynamic count */}
                <button
                  className="relative p-2 text-gray-700 transition-colors"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-5 h-5 cursor-pointer" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* User Dropdown or Login */}
                {isAuthenticated && user ? (
                  <UserDropdown user={user} onLogout={handleLogout} />
                ) : (
                  <>
                    {/* User Icon for non-authenticated users */}
                    <button className="p-2 text-gray-700 transition-colors">
                      <User className="w-5 h-5 cursor-pointer" />
                    </button>

                    {/* Login Button - Desktop */}
                    <button
                      onClick={handleLogin}
                      className="hidden md:block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 text-gray-700 transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {/* Mobile Search */}
                <div className="mb-3" ref={searchRef}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                      onFocus={() => setShowResults(searchQuery.length > 0)}
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                    <button
                      onClick={handleSearchSubmit}
                      className="absolute right-0 top-0 h-full px-3 text-gray-400 transition-colors"
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    {/* Mobile Search Results */}
                    {showResults && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                          <ul>
                            {filteredProducts.map((product) => (
                              <li
                                key={product._id || product.id}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={() => handleResultClick(product._id || product.id)}
                              >
                                <div className="flex items-center">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-10 h-10 object-cover mr-3"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ${product.price}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            {searchQuery.length >= 2 ? "No products found" : "Type at least 2 characters"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Links */}
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
                  onClick={() => navigate("/product")}
                >
                  All Products
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
                  onClick={() => navigate("/seller")}
                >
                  Seller Dashboard
                </a>

                {/* Mobile Login/User Section */}
                {isAuthenticated && user ? (
                  <>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="px-3 py-2 text-sm text-gray-500">
                        Welcome, {user.name}
                      </div>
                      <a
                        href="#"
                        className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors font-medium"
                        onClick={() => {
                          navigate("/my-orders");
                          setIsMenuOpen(false);
                        }}
                      >
                        My Orders
                      </a>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode="login"
      />
    </>
  );
};

export default Navbar;
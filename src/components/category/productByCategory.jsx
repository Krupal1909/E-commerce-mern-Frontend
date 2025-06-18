import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../../contexts/cartContexts'; // Import your cart context

const ProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();
  const BASE_URL = 'https://e-commerce-mern-backend-en61.onrender.com';
  
  // Get cart functions from context
  const { addToCart, increaseQuantity, decreaseQuantity, cart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category by name first
        const categoryRes = await axios.get(`${BASE_URL}/api/category/get-category-by-name/${categoryName}`);
        setCategory(categoryRes.data.category);
        
        // Then fetch products by category ID
        const productsRes = await axios.get(`${BASE_URL}/api/product/get-products-by-category/${categoryRes.data.category._id}`);
        setProducts(productsRes.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1); // Add 1 quantity of the product
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!category) return <div className="text-center py-8">Category not found</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 relative">
      <h4 className="text-2xl font-medium text-gray-700 mb-8 capitalize">{category.name}</h4>
      
      {/* Shopping Cart Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="relative p-2 bg-white rounded-full shadow-md border-none cursor-pointer flex items-center justify-center">
          <span className="text-xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const productId = product._id || product.id;
          const cartQuantity = cart[productId] || 0;

          return (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <Link to={`/product/${product._id}`}>
                <div className="p-4">
                  <img 
                    src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`} 
                    alt={product.name}
                    className="w-full h-48 object-contain mb-4"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                  <h6 className="text-sm font-medium text-gray-800 mb-2">{product.name}</h6>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                    </div>
                    <span className="text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.discountedPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${product.discountedPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
              
              {/* Add to Cart Button */}
              {cartQuantity > 0 ? (
                <div className="flex items-center justify-between bg-green-50 p-2">
                  <button 
                    onClick={() => decreaseQuantity(productId)}
                    className="text-green-600 font-bold text-lg px-2"
                  >
                    -
                  </button>
                  <span className="font-medium">{cartQuantity}</span>
                  <button 
                    onClick={() => increaseQuantity(productId)}
                    className="text-green-600 font-bold text-lg px-2"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleAddToCart(productId)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 flex items-center justify-center"
                >
                  <span className="mr-2">🛒</span> Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsByCategory;
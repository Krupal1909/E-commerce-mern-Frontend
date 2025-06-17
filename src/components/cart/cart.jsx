import React, { useState, useEffect } from 'react';
import { useCart } from '../../../contexts/cartContexts';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

// Import the AddShippingAddress component
import AddShippingAddress from '../address/addAddress';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCart();
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch product details for cart items
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (Object.keys(cart).length === 0) {
        setCartProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productIds = Object.keys(cart);
        
        // Fetch all products from backend
        const response = await fetch('http://localhost:5000/api/product/get-product');
        const data = await response.json();
        const allProducts = Array.isArray(data) ? data : data.products || [];
        
        // Filter products that are in cart
        const productsInCart = allProducts.filter(product => {
          const productId = product.id || product._id;
          return productIds.includes(productId?.toString());
        });

        // Add cart quantity to each product
        const cartProductsWithQuantity = productsInCart.map(product => ({
          ...product,
          quantity: cart[product.id || product._id] || 0,
          productId: product.id || product._id
        }));

        setCartProducts(cartProductsWithQuantity);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cart]);

  // Calculate totals
  const subtotal = cartProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  const shippingFee = subtotal > 200 ? 0 : 10; // Free shipping over $200
  const taxRate = 0.02; // 2% tax
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + shippingFee + tax;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleChangeAddress = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = (newAddress) => {
    setDeliveryAddress(newAddress);
    setShowAddressForm(false);
  };

  const handleBackFromAddress = () => {
    setShowAddressForm(false);
  };

  // Create Razorpay order
  const createRazorpayOrder = async (amount) => {
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR'
        })
      });
      
      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    try {
      setProcessingPayment(true);
      
      // Create order on backend
      const order = await createRazorpayOrder(totalAmount);
      
      const options = {
         key: 'rzp_test_2Y8nSYbNfsleHw',
        amount: order.amount,
        currency: order.currency,
        name: 'Your Store Name',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          // Payment successful
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('http://localhost:5000/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });

            const verifyResult = await verifyResponse.json();
            
            if (verifyResult.success) {
              // Create order after successful payment
              await createOrder(response.razorpay_payment_id);
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          address: deliveryAddress
        },
        theme: {
          color: '#10B981' // Green color matching your theme
        },
        modal: {
          ondismiss: function() {
            setProcessingPayment(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment');
      setProcessingPayment(false);
    }
  };

  // Create order after successful payment
  const createOrder = async (paymentId = null) => {
    try {
      const orderData = {
        items: cartProducts.map(product => ({
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          image: product.image
        })),
        subtotal,
        shippingFee,
        tax,
        totalAmount,
        deliveryAddress,
        paymentMethod,
        paymentId, // Include payment ID for online payments
        paymentStatus: paymentMethod === 'Cash On Delivery' ? 'pending' : 'completed'
      };

      const response = await fetch('http://localhost:5000/api/order/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/my-order');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      alert('Please add a delivery address');
      return;
    }

    // Handle different payment methods
    if (paymentMethod === 'Cash On Delivery') {
      await createOrder();
    } else if (paymentMethod === 'Razorpay') {
      await handleRazorpayPayment();
    } else {
      // For other online payment methods, redirect to Razorpay
      await handleRazorpayPayment();
    }
  };

  // Show address form if showAddressForm is true
  if (showAddressForm) {
    return (
      <AddShippingAddress 
        onBack={handleBackFromAddress}
        onSaveAddress={handleSaveAddress}
      />
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <button
            onClick={() => navigate('/product')}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Shopping Cart <span className="text-green-500 text-lg">{getTotalItems()} Items</span>
              </h1>
              <button
                onClick={() => navigate('/product')}
                className="flex items-center text-green-500 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </button>
            </div>

            {/* Cart Headers */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b text-gray-600 font-medium">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Subtotal</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-4">
              {cartProducts.map((product) => (
                <div key={product.productId} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100">
                  {/* Product Details */}
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500">Weight: {product.weight || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 flex items-center justify-center">
                    <span className="font-semibold text-gray-800">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(product.productId, product.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 min-w-[3rem] text-center">{product.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product.productId, product.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-2 flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveItem(product.productId)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* Delivery Address */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700">DELIVERY ADDRESS</span>
                <button 
                  onClick={handleChangeAddress}
                  className="text-green-500 text-sm hover:text-green-600"
                >
                  {deliveryAddress ? 'Change' : 'Add Address'}
                </button>
              </div>
              {deliveryAddress ? (
                <div className="p-3 bg-gray-50 border rounded-lg text-sm whitespace-pre-line">
                  {deliveryAddress}
                </div>
              ) : (
                <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <span className="text-gray-500 text-sm">No address added</span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-3">PAYMENT METHOD</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Razorpay">Online Payment (Razorpay)</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee</span>
                <span className={`font-semibold ${shippingFee === 0 ? 'text-green-500' : ''}`}>
                  {shippingFee === 0 ? 'Free' : `₹${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (2%)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={!deliveryAddress || processingPayment}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                deliveryAddress && !processingPayment
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {processingPayment ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
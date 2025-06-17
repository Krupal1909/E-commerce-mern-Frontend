import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (productId, quantity = 1) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const increaseQuantity = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decreaseQuantity = (productId) => {
    setCart(prev => {
      if (prev[productId] > 1) {
        return { ...prev, [productId]: prev[productId] - 1 };
      } else {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart).map(([productId, quantity]) => ({
      productId,
      quantity
    }));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getCartItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
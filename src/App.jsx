// import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navbar";
import Home from "./components/home/home";
import Cart from "./components/cart/cart";
import Product from "./components/products/product";
import Category from "./components/category/category";
import Order from "./components/orders/order";
import NotFound from "./components/notFound/notFound";
import Seller from "./components/seller/seller";
import AddAddress from "./components/address/addAddress"; // Adjust path as needed
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../contexts/cartContexts";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/my-order" element={<Order />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
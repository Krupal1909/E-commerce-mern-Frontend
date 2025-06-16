/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Navbar from "./components/layout/navbar";
// import Footer from "./components/layout/footer";
import Home from "./components/home/home";
import Cart from "./components/cart/cart";
import Product from "./components/products/product";
import Category from "./components/category/category";
import Order from "./components/orders/order";
import NotFound from "./components/notFound/notFound";
import Seller from "./components/seller/seller";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Footer> */}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </Footer>/ */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;

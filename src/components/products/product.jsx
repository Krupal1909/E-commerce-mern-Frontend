import React, { useEffect, useState } from "react";
import { useCart } from "../../../contexts/cartContexts"; // Adjust path as needed

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, increaseQuantity, decreaseQuantity, getTotalItems } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/product/get-product")
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.products || []);
      });
  }, []);

  const handleAdd = (id) => {
    addToCart(id, 1);
  };

  const totalItems = getTotalItems();

  return (
    <div style={{ padding: "32px", position: "relative" }}>
      <h5 className="text-2xl font-medium uppercase p-4">ALL PRODUCTS</h5>
      
      {/* Shopping Cart Button */}
      <div style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 100
      }}>
        <button style={{
          position: "relative",
          padding: "8px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{ fontSize: "20px" }}>🛒</span>
          {totalItems > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#21b573",
              color: "white",
              fontSize: "10px",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",

          gap: "32px",
          marginTop: "32px",

        }}
      >
        {products.map((product) => {
          const productId = product.id || product._id || Math.random().toString(36).substr(2, 9);
          
          return (
            <div
              key={productId}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 10,
                padding: 20,
                background: "#fff",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={product.image}
                className="hover:scale-150 transition-transform duration-300 ease-in-out"
                alt={product.name}
                style={{ width: 120, height: 110, objectFit: "contain" }}
              />
              <div style={{ marginTop: 18, width: "100%" }}>
                <div style={{ color: "#868686", fontSize: 14 }}>
                  {product.category}
                </div>
                <div style={{ fontWeight: 600, fontSize: 18, color: "#222" }}>
                  {product.name}
                </div>
                <div style={{ color: "#21b573", margin: "8px 0 0 0" }}>
                  {"★".repeat(product.rating || 0)}
                  {"☆".repeat(5 - (product.rating || 0))}
                  <span style={{ color: "#868686", marginLeft: 4 }}>
                    ({product.rating})
                  </span>
                </div>
                <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
                  <div style={{ color: "#21b573", fontWeight: 700, fontSize: 20 }}>
                    ${product.price}
                  </div>
                  <div
                    style={{
                      color: "#868686",
                      textDecoration: "line-through",
                      marginLeft: 7,
                    }}
                  >
                    ${product.oldPrice}
                  </div>
                  <div style={{ flex: 1 }} />
                  {cart[productId] ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#e9f9f1",
                        borderRadius: 5,
                        padding: "2px 7px",
                        minWidth: 70,
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(productId)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#21b573",
                          fontSize: 18,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 500 }}>{cart[productId]}</span>
                      <button
                        onClick={() => increaseQuantity(productId)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#21b573",
                          fontSize: 18,
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdd(productId)}
                      style={{
                        marginLeft: 10,
                        border: "1px solid #21b573",
                        background: "#e9f9f1",
                        color: "#21b573",
                        borderRadius: 5,
                        padding: "5px 18px",
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: 7 }}>🛒</span> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
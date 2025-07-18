import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";

function Product({ productData }) {
  return (
    <div
      className="product-card"
      style={{
        background: "rgba(75, 64, 195, 0.6)",
        borderRadius: "12px",
        padding: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        backdropFilter: "blur(2px)",
        width: "46%",
        height: "40%",
        maxHeight: "600px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <h2 style={{ 
        justifyContent: "center", 
        fontSize: "2rem", 
        marginBottom: "8px", 
        textAlign: "center",
        marginTop: 0 // Remove gap above the title
      }}>
        {productData.title}
      </h2>
      {productData.previewUrl && (
        <div style={{ width: "100%", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
          <img
            src={productData.previewUrl}
            alt={productData.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
        </div>
      )}
      {/* <div
        style={{
          fontSize: "0.85rem",
          overflow: "auto",
          flex: 1,
          minHeight: 0,
          textAlign: "center"
        }}
        dangerouslySetInnerHTML={{ __html: productData.description }}
      /> */}
    </div> 
  );
}

export default Product;

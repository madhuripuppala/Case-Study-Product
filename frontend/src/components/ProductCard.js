import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>

      <p className="product-description">{product.description}</p>

      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="add-to-cart-btn" title="Add to cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

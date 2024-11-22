import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetail } from '../actions/productActions';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetail || {});

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return (price - price * (discountPercentage / 100)).toFixed(2);
  };

  return (
    <div className="product-detail-container">
      {loading && (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {product && (
        <div className="product-detail">
          <div className="product-detail-header">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-summary">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-brand">Brand: {product.brand}</p>
              <div className="product-pricing">
                <h4 className="discounted-price">
                  Rs. {calculateDiscountedPrice(product.price, product.discountPercentage)}
                </h4>
                <div className="original-price">
                  <span className="line-through">Rs. {product.price}</span>
                  <span className="discount-percentage">
                    ({product.discountPercentage}% off)
                  </span>
                </div>
                <div className="flex ml-10 items-center mt-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    #{product.brand}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #{product.category}
                  </span>
                </div>


              </div>
            </div>
          </div>
          <div className="product-detail-body">
            <p className="product-description">{product.description}</p>
            <p className="product-stock">
              Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
            </p>
            <div className="product-rating">
              <p>
                Rating: {product.rating}{' '}
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(product.rating)) +
                    '☆'.repeat(5 - Math.floor(product.rating))}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

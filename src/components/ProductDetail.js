import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../actions/productActions';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, product } = useSelector((state) => state.productDetail || {});

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);

  const handleGoToProduct = () => {
    navigate('/Products');
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
          <img src={product.thumbnail} alt="product image" className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
        </div>
      )}
      <style>
        {`
          .product-detail-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .loading-spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
          }
          .error-message {
            color: #red;
            font-weight: bold;
            text-align: center;
          }
          .product-detail {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .product-image {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
          }
          .product-title {
            font-weight: bold;
            color: #333;
          }
          .product-description {
            color: #666;
          }
          .card-btn2 {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .card-btn2:hover {
            background-color: #3e8e41;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;
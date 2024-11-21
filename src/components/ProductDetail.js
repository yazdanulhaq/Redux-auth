import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchProductDetail } from '../actions/productActions';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.productDetail || {});

  useEffect(() => {
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId]);


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
          <div className="flex items-center justify-center">
                <span className="line-through text-gray-400 mr-2">Rs.{product.price}</span>
                <span className="text-sm">-{product.discountPercentage}%</span>
              </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
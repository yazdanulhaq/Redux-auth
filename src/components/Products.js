import React, { useEffect } from 'react';
import { fetchProducts } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector(state => state.products || {});

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleGoToPosts = () => {
        navigate('/Posts');
    };
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return (price - price * (discountPercentage / 100)).toFixed(2);
    };

    console.log("products :: ", products)
    return (
        <div className="container">
            <h1 className="title">Products</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="posts-grid">
                {products?.products?.length > 0 ? (
                    products.products.map((product, index) => (
                        <div key={index} className="post-card">
                             <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.thumbnail} alt="prduct image" />
                            <h3 className="post-title">{product.title}</h3>
                            <p className="product-price">${product.price}</p>
                                        <p className="product-discount">
                                            Discounted Price: Rs{" "}
                                            {calculateDiscountedPrice(
                                                product.price,
                                                product.discountPercentage
                                            )}
                                        </p>
                                        <p className="product-discount-percentage">
                                            Discount: {product.discountPercentage}%
                                        </p>
                        </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No product available</p>
                )}
            </div>
        </div>
    );
};

export default Products;

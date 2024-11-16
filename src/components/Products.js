import React, { useEffect, useState } from 'react';
import { fetchProducts, UPDATE_SKIP, UPDATE_TOTAL } from '../actions/productActions';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products, skip, limit, total } = useSelector(state => state.products || {});

    const [url, setUrl] = useState('products')

    const handleUpdateSkip = (newSkipValue) => {
        dispatch({ type: UPDATE_SKIP, payload: newSkipValue });
    };

    const handleUpdateTotal = (newTotal) => {
        dispatch({ type: UPDATE_TOTAL, payload: newTotal });
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            handleUpdateSkip(skip + products.length);
            handleUpdateTotal(products.total);
    
            console.log("Current totalRecord:", total);
            console.log("Fetch Product Count:", skip + products.length);
    
            if (total > skip) {
                dispatch(fetchProducts(url, limit, skip));
            } 
        }
    };
    

    useEffect (() =>  {
        window.addEventListener("scroll" , handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[]);

    useEffect(() => {
        dispatch(fetchProducts(url, limit, skip));
    }, [dispatch]);


    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return (price - price * (discountPercentage / 100)).toFixed(2);
    };

    return (
        <div className="container">
            <h1 className="title">Products</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="posts-grid">
                {products?.length > 0 ? (
                    products?.map((product, index) => (
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

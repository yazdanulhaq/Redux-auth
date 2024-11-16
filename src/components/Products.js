import React, { useEffect, useRef } from 'react';
import { fetchProducts, setPage } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, total, page, limit, loading, error } = useSelector((state) => state.products);


    const pageRef = useRef(page);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            console.log( page, limit)
            if (!loading && page < Math.ceil(total / limit)) {
                const nextPage = pageRef.current + 1;
                dispatch(setPage(nextPage));
            } else {
                console.log("else")
            }
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    useEffect(() => {
        if (page) {
          dispatch(fetchProducts(page, limit)); // Fetch products for the current page
        }
      }, [dispatch, page, limit]);


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

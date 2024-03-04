import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

function ProductViews() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }
                return res.json();
            })
            .then(productData => {
                setProduct(productData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });

        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, [id]);

    const handleAddToCart = async (productId) => {
        try {
            const response = await axios.post(`http://localhost:5000/add-to-cart/${productId}`);
            if (response.status === 200) {
                const newProduct = response.data.product;
                const updatedCart = [...cart, newProduct];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const isInCart = (productId) => {
        return cart.some(item => item._id === productId);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                <div>
                    <button className="btn btn-primary" onClick={() => navigate('/user/productlist')}>Back</button>
                </div>
                <div>
                    <h2 className="text-center">Product Details</h2>
                </div>
                <div>
                    <Link to="/user/cart" style={{ fontSize: "30px" }}>
                        {cart.length > 0 && <i className="bi bi-cart4 me-3">{cart.length}</i>}
                    </Link>
                </div>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div className="row">
                    <div className="col-md-6 mt-2">
                        <div className="card mb-3">
                            <img src={`http://localhost:5000/get-image/${product.image}`} alt={product.title} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{product.title}</h5>
                                <p className="card-text act-price fw-bold">Price: {product.price}৳</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <div className="card">
                            <div className="card-body mt-2">
                                <h5 className="card-title">Details</h5>
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.details) }}></div>
                                {isInCart(product._id) ? (
                                    <button disabled className="btn btn-secondary mt-3">In Cart</button>
                                ) : (
                                    <button onClick={() => handleAddToCart(product._id)} className="btn btn-success mt-3">Add to Cart</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
}

export default ProductViews;

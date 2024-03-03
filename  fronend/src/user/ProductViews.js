import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams instead of props.match.params
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductViews() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams(); // Access id parameter directly

    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${id}`) // Use id directly
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
    }, [id]); // Add id to dependency array

    const handleAddToCart = async (productId) => {
        console.log('Adding product to cart:', productId);
        try {
            const response = await axios.post(`http://localhost:5000/add-to-cart/${productId}`);

            if (response.status === 200) {
                navigate('/user/cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div>
            <h2 className="mb-4">Product Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div className="product">
                    <img src={`http://localhost:5000/get-image/${product.image}`} alt={product.title} className="mb-3" />
                    <div>
                        <h3>{product.title}</h3>
                        <p className="act-price">Price: {product.price}৳</p>
                        <p>Category: {product.category}</p>
                        <p className="about">Details: {product.details}</p>
                        <button onClick={() => handleAddToCart(product._id)} className='btn btn-success mr-2'>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>

    );
}

export default ProductViews;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);
    // const navigate = useNavigate(); 

    useEffect(() => {
        fetch('http://localhost:5000/get-image')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setProducts(data.data);
                } else {
                    console.error('Error fetching products:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            setCart(JSON.parse(storedCartItems));
        }
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleAddToCart = async (productId) => {
        try {
            const response = await axios.post(`http://localhost:5000/add-to-cart/${productId}`);
            if (response.status === 200) {
                const newProduct = response.data.product;
                setCart([...cart, newProduct]);
                localStorage.setItem('cart', JSON.stringify([...cart, newProduct]))
                // navigate('/user/cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const isInCart = (productId) => {
        return cart.some(item => item._id === productId);
    };

    const filteredProducts = products.filter(product =>
        (selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase())
    );

    return (
        <div className="container" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center mt-5 mb-4" style={{ color: '#343a40' }}>Buy Product</h1>
                <div className="d-flex align-items-center mt-5">
                    <Link to="/user/cart" style={{ fontSize: "30px" }}>
                        {/* <FaShoppingCart /> */}
                        {cart.length > 0 && <i class="bi bi-cart4" >{cart.length} </i>}
                    </Link>
                </div>
            </div>
            <select className="form-select mt-3" onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="laptop">Laptop</option>
                <option value="mouse">Mouse</option>
                <option value="keyboard">Keyboard</option>
            </select>

            <div className="row mt-5">
                {filteredProducts.map(p => (
                    <div key={p._id} className="col-md-3">
                        <div className="card mb-3">
                            <img src={`http://localhost:5000/get-image/${p.image}`} alt={p.title} className="card-img-top" />
                            <div className="card-body">
                                <h3 className="card-title">{p.title}</h3>
                                <p className="card-text">Price: {p.price}৳</p>
                                {isInCart(p._id) ? (
                                    <button disabled className='btn btn-secondary me-2'>
                                        In Cart
                                    </button>
                                ) : (
                                    <button onClick={() => handleAddToCart(p._id)} className='btn btn-success me-2'>
                                        Add to Cart
                                    </button>
                                )}
                                <Link to={`/user/products/${p._id}/view`} className='btn btn-primary'>View Product</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

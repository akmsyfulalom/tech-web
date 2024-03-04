import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';



function HomeProduct() {
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
    ).slice(0, 3);

    return (
        <div className="container" >
            <div className="d-flex justify-content-between align-items-center">
                <div className="text-center">
                    <h1 className="text-center mt-5 mb-4" style={{ color: '#343a40' }}>Buy Product</h1>
                </div>
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

            <div className="row row-cols-5 row-cols-md-4 g-3 mt-3">
                {filteredProducts.map(p => (
                    <div key={p._id} className="col">
                        <div className="card h-100 shadow">
                            <img src={`http://localhost:5000/get-image/${p.image}`} alt={p.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{p.title}</h5>
                                <p className="card-text">Price: {p.price}৳</p>
                            </div>
                            <div className="card-footer">
                                {isInCart(p._id) ? (
                                    <button disabled className="btn btn-secondary me-2">
                                        In Cart
                                    </button>
                                ) : (
                                    <button onClick={() => handleAddToCart(p._id)} className="btn btn-success me-2 my-2">
                                        Add to Cart
                                    </button>
                                )}
                                <Link to={`/user/products/${p._id}/view`} className="btn btn-primary ">View Product</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default HomeProduct;

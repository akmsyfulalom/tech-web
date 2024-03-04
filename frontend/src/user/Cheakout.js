import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';


function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [checkoutInput, setCheckoutInput] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });

    const [error, setError] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });

    const [paymentType, setPaymentType] = useState('Cash'); // Added paymentType state

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCheckoutInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange = (e) => {
        setPaymentType(e.target.value);
    };

    const submitOrder = (e) => {
        e.preventDefault();

    };

    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/user/cart')}>Back</button>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="card border border-dark mr-2">
                        <div className="card-header">
                            <h4>Cart Information</h4>
                        </div>
                        <div className="card-body">
                            <h5>Items:</h5>
                            <ul className="list-group">
                                {location.state.cartItems.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        <div>Product Name: {item.title}</div>
                                        <div>Quantity: {item.quantity}</div>
                                        <div>Price: {item.price} ৳</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card-footer text-start  mt-2 ">
                            <h5>Total Price: {location.state.totalPrice.toFixed(2)}৳</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card border border-dark">
                        <div className="card-header">
                            <h4>More Information</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>

                                    <div className='col-md-12'>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='radio'
                                                name='paymentMethod'
                                                value='Cash'
                                                onChange={handleChange}
                                                checked={paymentType === 'Cash'}
                                            />
                                            <label className='form-check-label'>
                                                Cash on Delivery
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='radio'
                                                name='paymentMethod'
                                                value='Online'
                                                onChange={handleChange}
                                                checked={paymentType === 'Online'}
                                            />
                                            <label className='form-check-label'>
                                                Online Payment
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <Link to='/user/order' state={{
                                                checkoutInput: checkoutInput,
                                                paymentType: paymentType,
                                                totalPrice: location.state.totalPrice,
                                                cartItems: location.state.cartItems
                                            }}
                                                className="btn btn-primary mx-1 mt-2 ">Place Order</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Checkout;

import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useNavigation

function Order() {
    const navigate = useNavigate(); // Use useNavigate instead of useNavigation
    const location = useLocation();
    const { checkoutInput, paymentType, totalPrice, cartItems } = location.state;

    const handleConfirmOrder = async () => {
        try {
            const orderData = {
                checkoutInput,
                paymentType,
                totalPrice,
                cartItems
            };
            await axios.post('http://localhost:5000/orders', orderData);

            // alert('Order confirmed!');
            localStorage.removeItem("cart");
            navigate('/user/thankyou'); // Use navigate function to go to Thankyou page
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to confirm order');
        }
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-start">
                <div className="col-md-8 text-start">
                    <button className="btn btn-primary" onClick={() => navigate('/user/cart')}>Back</button>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h4>Order Information</h4>
                        </div>
                        <div className="card-body">
                            <h5>Items:</h5>
                            <ul>
                                {cartItems.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        <div>Product Name: {item.title}</div>
                                        <div>Quantity: {item.quantity}</div>
                                    </li>
                                ))}
                            </ul>
                            <h5>Total Price: {totalPrice.toFixed(2)}৳</h5>
                            <hr />
                            <p><strong>Name:</strong> {checkoutInput.firstname} {checkoutInput.lastname}</p>
                            <p><strong>Phone Number:</strong> {checkoutInput.phone}</p>
                            <p><strong>Email Address:</strong> {checkoutInput.email}</p>
                            <p><strong>City:</strong> {checkoutInput.city}</p>
                            <p><strong>Full Address:</strong> {checkoutInput.address}</p>
                            <p><strong>Payment Method:</strong> {paymentType}</p>
                            <button className="btn btn-primary btn-block mt-3" onClick={handleConfirmOrder}>Confirm Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Order;

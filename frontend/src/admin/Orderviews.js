import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orderviews() {
    const [orders, setOrders] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDeleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${id}`);
            setOrders(orders.filter(order => order._id !== id));
            setDeleteMessage('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
            setDeleteMessage('Failed to delete order');
        }
    };

    return (
        <div className="container">
            {orders.length === 0 ? (
                <div className="alert alert-info mt-3">No orders available</div>
            ) : (
                <div className="row">
                    {orders.map((order, index) => (
                        <div key={index} className="col-md-6 mt-3">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Order #{index + 1}</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><strong>Name:</strong> {order.checkoutInput.name}</li>
                                        <li className="list-group-item"><strong>Phone Number:</strong> {order.checkoutInput.phone}</li>
                                        <li className="list-group-item"><strong>Email Address:</strong> {order.checkoutInput.email}</li>

                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {deleteMessage && <div className="alert alert-success mt-3">{deleteMessage}</div>}
        </div>
    );
}

export default Orderviews;

import React from 'react';
import { Link } from 'react-router-dom';

const Thankyou = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <img src="../images/images.png" width="100" alt="Logo" />
                            <h5 className="mt-4">Thank You!</h5>
                            <p className="mt-3">Your order has been confirmed.</p>
                            <p>We're happy to inform you that, in the following three days, your product will be delivered to you safely.</p>
                            <p className="font-weight-bold">Thanks for shopping with us!</p>
                            <p> Tech Web Team </p>
                            <Link to="/user/productlist" className="btn btn-primary mt-3">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thankyou;

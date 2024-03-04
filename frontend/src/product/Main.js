import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center welcome">
                    Welcome to my Admin site
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4 text-center product-container">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to='/admin/orderviews' className='btn btn-primary btn-lg btn-block'>Order Views</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/admin/products' className='btn btn-primary btn-lg btn-block'>Product details</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Main;




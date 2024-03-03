// App.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NewsHome = () => {
    return (
        <div className="container">

            <div className="row justify-content-center mt-5">
                <div className="col-md-4 text-center product-container">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to='/news/post-news' className='btn btn-primary btn-lg btn-block'>Post a News</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/news/manage-news' className='btn btn-primary btn-lg btn-block'>Manage News</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewsHome;

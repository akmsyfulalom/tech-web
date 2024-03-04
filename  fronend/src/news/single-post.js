// NewsDetails.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './loader';

const SinglePost = () => {
    const { _id } = useParams();
    const [newsDetails, setNewsDetails] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/news/${_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch news details');
            }
            const data = await response.json();
            setNewsDetails(data);
        } catch (error) {
            console.error('Error fetching news details:', error);
        }
    };

    if (!newsDetails) {
        return <Loader />;
    }

    return (
        <div className="container " style={{ marginTop: "16px", marginBottom: "16px" }}>
            <section id="header" className="jumbotron text-center" style={{ paddingBottom: "32px", paddingTop: "24px" }}>
                <h1 className="display-3">News Details</h1>
                <p className="lead">Always willing to publish news at earliest convenience!</p>
                <div className='d-flex justify-content-center align-items-center gap-1'>
                    <Link to={"/news"} className="btn btn-primary">News Home</Link>
                   
                    
                </div>
            </section>
            <div className="row">
                <div className="col-lg-8 mx-auto">

                    <div className='text-center'>
                        <img className="mb-3 img-fluid" src={newsDetails?.image} style={{ maxWidth: '100%', width: '500px', height: '300px' }} alt="News" />
                    </div>
                    <h2>{newsDetails.title}</h2>
                    
                    <p dangerouslySetInnerHTML={{ __html: newsDetails.description }} />
                </div>
            </div>
        </div>
    );
};

export default SinglePost;

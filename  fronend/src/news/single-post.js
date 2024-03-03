// NewsDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    
                    <div className='text-center'>
                        <img className="mb-3 img-fluid" src={"data:image/jpeg;base64,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"} style={{ maxWidth: '100%', width: '500px', height: '300px' }} alt="News" />
                    </div>
                    <h2>{newsDetails.title}</h2>
                    <p>{newsDetails.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;

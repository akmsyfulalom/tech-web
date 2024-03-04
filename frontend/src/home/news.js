import React, { useEffect, useState } from 'react'
import Loader from '../news/loader';
import { Link } from 'react-router-dom';

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/news');
            if (!response.ok) {
                throw new Error('Failed to fetch news data');
            }
            const data = await response.json();

            const limitedData = data.slice(0, 3);
            setNewsData(limitedData);
        } catch (error) {
            console.error('Error fetching news data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const truncateText = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
    };
    return (
        <div>
            <h1 className='text-center ' style={{ marginBottom: "40px" }}>Our Latest News</h1>
            <section id="gallery">
                <div className="container">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="row">
                            {newsData && newsData.map((news, index) => (
                                <div className="col-lg-4 mb-4" key={index}>
                                    <div className="card">
                                        <img src={news?.image} alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{news?.title}</h5>

                                            <p dangerouslySetInnerHTML={{ __html: truncateText(news?.description, 10) }} />
                                            <Link to={`/news/${news?._id}`} className="btn btn-outline-success btn-sm">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <div className='d-flex justify-content-center'>
                <Link to={"/news"} className='btn btn-primary'>See All News</Link>
            </div>
        </div>
    )
}

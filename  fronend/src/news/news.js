import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./loader";


const News = () => {
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
      setNewsData(data);
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
    <div style={{ marginTop: "20px" }}>
      <section id="header" className="jumbotron text-center" style={{ paddingBottom: "32px", paddingTop: "24px" }}>
        <h1 className="display-3">News</h1>
        <p className="lead">Always willing to publish news at earliest convenience!</p>
        

      </section>

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
                      
                      <p dangerouslySetInnerHTML={{ __html:truncateText(news?.description, 10)}} />
                      <Link to={`/news/${news?._id}`} className="btn btn-outline-success btn-sm">Read More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default News;

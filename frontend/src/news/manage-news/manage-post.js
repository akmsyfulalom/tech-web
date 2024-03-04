import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManagePost = () => {
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

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

    const handleDeleteClick = (newsItem) => {
        setSelectedNews(newsItem);
        setShowDeleteModal(true);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/news/${selectedNews._id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete news');
            }
            setNewsData(newsData.filter(item => item._id !== selectedNews._id));
        } catch (error) {
            console.error('Error deleting news:', error);
        } finally {
            setShowDeleteModal(false);
            setSelectedNews(null);
            setIsModalOpen(false);
            setIsUpdating(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedNews(null);
        setIsModalOpen(false);
    };

    const handleEditClick = (newsItem) => {
        setSelectedNews(newsItem);
        setEditedTitle(newsItem.title);
        setEditedDescription(newsItem.description);
        setShowEditModal(true);
        setIsModalOpen(true);
    };

    const handleEditCancel = () => {
        setSelectedNews(null);
        setEditedTitle('');
        setEditedDescription('');
        setShowEditModal(false);
        setIsModalOpen(false);
    };

    const handleEditUpdate = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/news/${selectedNews._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editedTitle,
                    description: editedDescription
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update news');
            }
            const updatedNews = await response.json();
            const updatedNewsData = newsData.map(item => (item._id === updatedNews._id ? updatedNews : item));
            setNewsData(updatedNewsData);
            setShowEditModal(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating news:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={`container text-center pt-10 pb-10 ${isModalOpen ? 'modal-open' : ''}`}>
            {isLoading && <div>Loading...</div>}
            <div className="col-lg-10 col-md-12 col-sm-12 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsData.map(newsItem => (
                            <tr key={newsItem._id}>
                                <td className="align-middle"><img src={newsItem.image} alt="News" style={{ maxWidth: '100px' }} /></td>
                                <td className="align-middle" style={{ maxWidth: '500px' }}>{newsItem.title}</td>
                                <td className="align-middle">
                                    <button className="btn btn-primary" onClick={() => handleEditClick(newsItem)}>Edit</button>
                                    <button className="btn btn-danger m-2" onClick={() => handleDeleteClick(newsItem)}>Delete</button>
                                    <Link className="btn btn-info" to={`/news/${newsItem._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedNews && (
                <div className="modal" style={{ display: showEditModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit News</h5>
                                <button type="button" className="btn-close" onClick={handleEditCancel}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="editTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="editTitle" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="editDescription" rows="3" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleEditUpdate} disabled={isUpdating}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedNews && (
                <div className="modal" style={{ display: showDeleteModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={handleDeleteCancel}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete "{selectedNews.title}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm} disabled={isUpdating}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && <div className="overlay-modal-open"></div>}
        </div>
    );
};

export default ManagePost;

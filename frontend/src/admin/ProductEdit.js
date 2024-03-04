import React, { useState, useEffect } from 'react';
import Wrapper from './Wrapper';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        details: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const { productId } = useParams();
    const Navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            fetch(`http://localhost:5000/get-product/${productId}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch product');
                    }
                    return res.json();
                })
                .then(product => {
                    setFormData({
                        title: product.title || '',
                        price: product.price || '',
                        category: product.category || '',
                        details: product.details || '',
                        image: null
                    });
                })
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productId) {
            console.error('Product ID is undefined');
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('details', formData.details);
        formDataToSend.append('image', formData.image);

        try {
            const response = await fetch(`http://localhost:5000/update-product/${productId}`, {
                method: 'PUT',
                body: formDataToSend
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            setMessage('Product updated successfully');
            setTimeout(() => {
                setMessage('');
                Navigate('/admin/products');
            }, 3000); // Clear message and redirect after 3 seconds
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Wrapper>

            <div className="container w-50 mt-5">
                <div className="card border-5">
                    <div className="card-body">
                        <h2 className="card-title text-center text-white bg-dark   mb-4">Edit Product</h2>

                        <form className="card border-5 p-3" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group ">
                                <label>Title:</label>
                                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <select className="form-control" name="category" value={formData.category} onChange={handleInputChange}>
                                    <option value="">Select category</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="keyboard">Keyboard</option>
                                    <option value="mouse">Mouse</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Details:</label>
                                <textarea className="form-control" name="details" value={formData.details} onChange={handleInputChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Image:</label>
                                <input type="file" className="form-control" name="image" onChange={handleFileChange} />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4 content conter">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>

            {message && <div>{message}</div>}
        </Wrapper>
    );
}

export default ProductEdit;

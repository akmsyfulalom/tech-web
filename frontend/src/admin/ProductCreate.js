import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from './Wrapper';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ProductCreate() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        getImage();
    }, []);

    const submitImage = async (formData) => {
        try {
            const result = await axios.post(
                "http://localhost:5000/upload-image",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(result.data);
            setSuccessMessage('Product uploaded successfully');
            setTimeout(() => {
                setSuccessMessage('');
                // Navigate to the product page after 2 seconds
                Navigate('/admin/products');
            }, 2000);
            getImage(); // Refresh the image list
        } catch (error) {
            console.error(error);
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "price") {
            setPrice(value);
        } else if (name === "category") {
            setCategory(value);
        } else if (name === "image") {
            setImage(e.target.files[0]);
        }
    };

    const getImage = async () => {
        try {
            const result = await axios.get("http://localhost:5000/get-image");
            setAllImage(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("details", draftToHtml(convertToRaw(editorState.getCurrentContent())));
        submitImage(formData);
    };

    const categories = ['Laptop', 'Keyboard', 'Mouse'];

    return (
        <Wrapper>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card h-50 w-50 mt-5">
                    <div className="card border-3 ">
                        <div className="card-body">
                            <h2 className="card-title text-center text-white bg-dark">Add Product</h2>

                            <form className="container card border-5 card-body h-40 w-40 mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-2">
                                    <label className="form-label">Title:</label>
                                    <input type="text" className="form-control" name="title" onChange={onInputChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Price:</label>
                                    <input type="number" className="form-control" name="price" onChange={onInputChange} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Category:</label>
                                    <select className="form-control" name="category" value={category} onChange={onInputChange}>
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Details:</label>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={setEditorState}
                                        toolbar={{
                                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list'],
                                            inline: { options: ['bold', 'italic', 'underline'] },
                                            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                                            fontSize: { options: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Image:</label>
                                    <input type="file" className="form-control" name="image" onChange={onInputChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        </div>
                    </div>
                </div>
            </div>

        </Wrapper>
    );
}

export default ProductCreate;

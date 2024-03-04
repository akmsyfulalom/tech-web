import React, { useContext, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import ImageUploadSingle from "../ImageUploadSingle"
import { ImageContext } from '../../ImageProvider';


const PostNews = () => {
    const { images } = useContext(ImageContext)
    console.log("🚀 ~ PostNews ~ images:", images)

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [newsTitle, setNewsTitle] = useState('');

    const [loading, setLoading] = useState(false);
    const styles = {
        inputField: {
            backgroundColor: 'white',
            borderRadius: "20px",
            marginTop: '15px',
            marginBottom: '25px'
        },
        dropArea: {
            border: '1px dashed #212529',
            borderRadius: '5px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer'
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true when submitting
        try {
            const descriptionHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            const newsData = {
                title: newsTitle,
                description: descriptionHtml,
                image: images[0].data_url
            };
            console.log("🚀 ~ handleSubmit ~ newsData.image:", newsData.image)
            console.log(newsData, "newsData")
            const response = await fetch('http://localhost:5000/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newsData)
            });

            if (!response.ok) {
                throw new Error('Failed to post news data');
            }

            console.log('News posted successfully');
            setNewsTitle('');
            setEditorState(EditorState.createEmpty());


        } catch (error) {
            console.error('Error posting news data:', error);
        } finally {
            setLoading(false); 
        }
    };



    return (
        <div className="container  ">
            <div className="row justify-content-center my-5">
                <div className="col-md-8 text-center ">
                 
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 mx-auto" style={styles.inputField}>
                        <b style={{ fontSize: '18px', paddingLeft: '5px' }}>News Title</b>
                        <input
                            type="text"
                            value={newsTitle}
                            onChange={(e) => setNewsTitle(e.target.value)}
                            className="form-control mt-2 border-dark"
                            style={{ height: '45px', fontSize: '16px' }}
                        />
                    </div>

                    {/* Image upload */}
                    <div
                        className="form-group col-lg-12 col-md-12 col-sm-12 mx-auto"
                        style={{ ...styles.inputField, ...styles.dropArea }}

                    >
                        <p style={{ fontSize: '18px', marginBottom: '10px' }}>Drop your image or click to upload</p>
                        <ImageUploadSingle />

                    </div>
                    {/* Description */}
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 mx-auto border border-dark p-2 rounded-2" style={styles.inputField}>
                        <b style={{ fontSize: '18px', paddingLeft: '5px' }}>News description</b>
                        <div className="mt-3" style={{ height: '300px' }}>
                            <Editor
                                placeholder='Describe your news...'
                                toolbar={{
                                    style: { position: 'fixed' },
                                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list'],
                                    inline: { options: ['bold', 'italic', 'underline'] },
                                    blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                                    fontSize: { options: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                                }}
                                editorStyle={{ height: '250px' }}
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                            />
                        </div>
                    </div>

            
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 w-100 mx-auto" style={styles.submitButton}>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostNews;

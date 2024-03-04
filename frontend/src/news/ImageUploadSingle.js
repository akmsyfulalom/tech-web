import React, { useContext } from 'react';
import ImageUploading from 'react-images-uploading';
import { ImageContext } from '../ImageProvider';


export default function ImageUpload() {
    const { images, setImages } = useContext(ImageContext);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
       
        if (imageList.length > 0) {
            setImages([imageList[0]]); 
        } else {
            setImages([]); 
        }
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                   
                    <div className="upload__image-wrapper">
                        <button
                            className='btn btn-dark bg-transparent text-dark m-2'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;

                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper m-2">
                                    <button onClick={() => onImageUpdate(index)} className='btn btn-dark bg-transparent text-dark'>Update</button>
                                    <button onClick={() => onImageRemove(index)} className='m-2 btn btn-dark bg-transparent text-dark'>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

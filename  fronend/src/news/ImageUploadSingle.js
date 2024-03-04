// import React, { useContext } from 'react';
// import ImageUploading from 'react-images-uploading';
// import { ImageContext } from '../ImageProvider';

// export default function ImageUpload() {
//     const { images, setImages } = useContext(ImageContext)

//     const maxNumber = 69;

//     const onChange = (imageList, addUpdateIndex) => {
//         // data for submit

//         setImages(imageList);
//     };

//     return (
//         <div className="App">
//             <ImageUploading
//                 multiple
//                 value={images}
//                 onChange={onChange}
//                 maxNumber={maxNumber}
//                 dataURLKey="data_url"
//             >
//                 {({
//                     imageList,
//                     onImageUpload,
//                     onImageRemoveAll,
//                     onImageUpdate,
//                     onImageRemove,
//                     isDragging,
//                     dragProps,
//                 }) => (
//                     // write your building UI
//                     <div>


//                         <div className="upload__image-wrapper">

//                             <input onClick={onImageUpload}
//                                 {...dragProps} type="file" multiple className="file-input file-input-bordered w-full max-w-xs" />
//                             &nbsp;
//                             <button onClick={onImageRemoveAll}>Remove all images</button>
//                             {imageList.map((image, index) => (
//                                 <div key={index} className="image-item">

//                                     <p>Image {index + 1}</p>
//                                     <div className="image-item__btn-wrapper">
//                                         <button onClick={() => onImageRemove(index)} className="btn-xs">Remove</button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                 )}
//             </ImageUploading>
//         </div>
//     );
// }


import React, { useContext } from 'react';
import ImageUploading from 'react-images-uploading';
import { ImageContext } from '../ImageProvider';

export default function ImageUpload() {
    const { images, setImages } = useContext(ImageContext);
    const maxNumber = 69;
    // const onChange = (imageList, addUpdateIndex) => {
    //     // data for submit
    //     if (imageList.length > 0) {
    //         setImages([imageList[0]]); // Only keep the first image
    //     } else {
    //         setImages([]); // Clear the images if no image is selected
    //     }
    // };
    const onChange = (imageList, addUpdateIndex) => {
        // Extract data URL and file name from the first image in the list
        if (imageList.length > 0) {
            const { data_url, file } = imageList[0];
            const { name } = file;
            setImages([{ data_url, name }]);
        } else {
            // If no image is selected, clear the images
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
                    // write your building UI
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

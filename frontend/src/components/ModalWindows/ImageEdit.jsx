import React from 'react';

const ImageEdit = ({picture, deletePicture}) => {
    return (
        <div className="card text-center col-3">
            <img src={picture.url} alt="///" className="card-img-top" style={{height: "100px"}}/>
            {/*<div className="card-body">*/}
            {/*    <h5 className="card-title">Special title treatment</h5>*/}
            {/*    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>*/}
            {/*    <a href="#" className="btn btn-primary">Go somewhere</a>*/}
            {/*</div>*/}
            <div className="card-footer">
                <button className="btn" onClick={() => {
                    deletePicture(picture.picture_id)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="firebrick"
                         className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        // <div className="mt-3 col">
        //     <div className="">
        //
        //
        //     </div>
        // </div>
    );
};

export default ImageEdit;
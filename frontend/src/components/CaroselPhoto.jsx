import React from 'react';

const CaroselPhoto = ({pictures}) => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {pictures.map((pic, index) =>
                    <div className={"carousel-item" + (index === 0 ? ' active' : '')} key={pic.picture_id}>
                        <img src={pic.url} className="d-block w-100" alt="..."/>
                    </div>
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default CaroselPhoto;
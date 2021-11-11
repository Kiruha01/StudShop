import React from 'react';
import RoundLabel from "./RoundLabel";
import classes from "./AdvertVard.module.css"
import OwnerName from "./OwnerName";
import {Link} from "react-router-dom";

const AdvertCard = ({product}) => {
    return (
        <div className={"card m-2 " + classes.shadow}>
            <div className={"h-100 " + classes.image}>
                {product.is_booking ? <RoundLabel color_class={"bg-light " + classes.text}>Забронированно</RoundLabel> : ''}
                <img src={product.pictures[0] ? product.pictures[0].url : ""} className={"card-img-top " + classes.photo_cover}
                     alt="No photo"/>
            </div>
                <div className="card-body position-relative mb-0">
                    <Link to={'/'} className="stretched-link"/>
                    <h5 className="card-title"><strong>{product.name}</strong></h5>
                    <hr/>
                    <div>
                        <p className="mb-0">{product.price} руб.</p>
                        <RoundLabel color_class="bg-primary">{product.location.name}</RoundLabel>

                        {product.category ?
                            <RoundLabel color_class="bg-warning">{product.category.name}</RoundLabel>
                            : ''
                        }
                    </div>
                </div>
            <div className="d-flex flex-row-reverse card-body mt-0">
                <OwnerName name={product.owner.name}/>
            </div>
        </div>
    );
};

export default AdvertCard;
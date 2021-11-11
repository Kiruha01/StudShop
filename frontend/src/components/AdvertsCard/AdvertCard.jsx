import React from 'react';
import RoundLabel from "./RoundLabel";
import classes from "./AdvertVard.module.css"
import OwnerName from "./OwnerName";
import {Link} from "react-router-dom";

const AdvertCard = ({product}) => {
    return (
        <div className="card m-2">
            <div className={classes.image}>
                {product.is_booking ? <RoundLabel color_class={"bg-light " + classes.text}>Забронированно</RoundLabel> : ''}
                <img src={product.pictures[0] ? product.pictures[0].url : ""} className={"card-img-top " + classes.photo_cover}
                     alt="No photo"/>
            </div>
                <div className="card-body">
                    <h5 className="card-title"><strong>{product.name}</strong></h5>
                    <hr/>
                    <div>
                        <p className="mb-0">{product.price} руб.</p>
                        <RoundLabel color_class="bg-primary">{product.location.name}</RoundLabel>
                    </div>
                    <Link to={'/'} className="d-flex flex-row-reverse">
                        <OwnerName name={product.owner.name}></OwnerName>
                    </Link>
                </div>
        </div>
    );
};

export default AdvertCard;
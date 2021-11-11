import React from 'react';
import AdvertCard from "./AdvertsCard/AdvertCard";

const AdvertsPanel = ({products}) => {
    return (
        <div className="d-flex">
            {products.map(pr =>
                <AdvertCard product={pr}/>
            )}
        </div>
    );
};

export default AdvertsPanel;
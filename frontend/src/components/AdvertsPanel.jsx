import React from 'react';
import AdvertCard from "./AdvertsCard/AdvertCard";

const AdvertsPanel = ({products}) => {
    console.log(products)
    return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 ">
            {products.map(pr =>
                <AdvertCard product={pr}/>
            )}
        </div>
    );
};

export default AdvertsPanel;
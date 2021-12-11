import React from 'react';
import AdvertCard from "./AdvertsCard/AdvertCard";

const AdvertsPanel = ({products}) => {
    return (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 ">
            {products.length === 0?
            <h3>Объявлений нет</h3>
            :
            ''}
            {products.map(pr =>
                <AdvertCard product={pr} key={pr.product_id}/>
            )}
        </div>
    );
};

export default AdvertsPanel;
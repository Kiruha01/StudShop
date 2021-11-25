import React from 'react';

const DealItem = ({product, user, date}) => {
    return (
        <div className="card">
            <div className="card-body row">
                <div className="col">{product.name}</div>
                <div className="col">{user.name}</div>
                <div className="col-3">{date}</div>
            </div>
        </div>
    );
};

export default DealItem;
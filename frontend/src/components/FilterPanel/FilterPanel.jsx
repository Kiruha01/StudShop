import React from 'react';

const FilterPanel = ({children, id}) => {
    return (
            <div className="accordion card" id={id}>
                <div className="card-header">
                    Фильтр объявлений
                </div>
                {children}
            </div>

    );
};

export default FilterPanel;
import React from 'react';

const FilterItem = ({filterName, id, accordionId, children}) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={'heading' + id}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target={"#" + id} aria-expanded="true" aria-controls={id}>
                    {filterName}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" aria-labelledby={'heading' + id}
                 data-bs-parent={"#" + accordionId}>
                <div className="accordion-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FilterItem;
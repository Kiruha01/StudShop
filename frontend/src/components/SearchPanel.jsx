import React from 'react';

const SearchPanel = () => {
    return (
        <div className="row">
            <div className="col">
                <input type="text" className="form-control" id="inputPassword2" placeholder="Поиск"/>
            </div>
            <div className="col">
                <button className="btn btn-primary mb-3">Поиск</button>
            </div>
        </div>
    );
};

export default SearchPanel;
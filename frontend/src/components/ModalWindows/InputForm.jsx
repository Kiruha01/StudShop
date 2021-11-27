import React from 'react';

const InputForm = ({name, children}) => {
    return (
        <div className="mb-3 row">
            <label className=" col-sm-3 form-label">{name}</label>
            <div className="col-sm-9">
                {children}
            </div>
        </div>
    );
};

export default InputForm;
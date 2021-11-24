import React from 'react';

const RoundLabel = ({children, color_class, color_hex}) => {
    return (
        <div className={"d-inline-flex px-2 rounded-pill text-white " + color_class}
        style={color_hex ? {backgroundColor: color_hex} : {}}><b>{children}</b></div>
    );
};

export default RoundLabel;
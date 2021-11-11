import React from 'react';

const RoundLabel = ({children, color_class, color_hex}) => {
    return (
        <span className={"badge rounded-pill " + color_class}
        style={color_hex ? {backgroundColor: color_hex} : {}}>{children}</span>
    );
};

export default RoundLabel;
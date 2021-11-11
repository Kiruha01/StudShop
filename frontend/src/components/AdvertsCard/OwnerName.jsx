import React from 'react';

const OwnerName = ({name}) => {
    return (
        <div className="d-flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="midnightblue"
                 className="bi bi-person-fill my-auto" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            <strong className="m-0" style={{color: "midnightblue"}}>{name}</strong>
        </div>
    );
};

export default OwnerName;
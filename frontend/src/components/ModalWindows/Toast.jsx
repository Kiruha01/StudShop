import React from 'react';

const Toast = ({text}) => {
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toaste">
            <div className="toast-header">
                    <strong className="me-auto">Bootstrap</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {text}
            </div>
        </div>
    );
};

export default Toast;
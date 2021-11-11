import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">StudShop</a>

                <button className={"btn btn-success"}>Профиль</button>
            </div>
        </nav>
    );
};

export default Header;
import React from 'react';
import UserServises from '../API/UserServeces'
import {Link} from "react-router-dom";

const Header = ({user}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">StudShop</Link>

                {user ?
                    <div>
                        <Link className={"btn btn-success"} to="/profile">{user.name}</Link>
                        <a href="http://localhost:3000" className={"btn btn-success"}>Выход</a>
                    </div>
                    :
                    <a className={"btn btn-success"} href='http://localhost:5000/login'>Вход</a>

                }
            </div>
        </nav>
    );
};

export default Header;
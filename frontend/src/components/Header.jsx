import React from 'react';
import {Link} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({user, isAuthenticated, isLoading}) => {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">StudShop</Link>
                {isLoading ?
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :

                        isAuthenticated ?
                            <div>
                                <Link className={"btn btn-success"} to="/profile">{user.name}</Link>
                                <button onClick={() => logout()} className={"btn btn-success"}>Выход</button>
                            </div>
                            :
                            <button className={"btn btn-success"} onClick={() => loginWithRedirect()}>Вход</button>
                    }

            </div>
        </nav>
    );
};

export default Header;
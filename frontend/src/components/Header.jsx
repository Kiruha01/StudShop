import React from 'react';
import UserServises from '../API/UserServeces'
import {Link} from "react-router-dom";

const Header = ({user, setUser}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">StudShop</Link>

                {user ?
                    <div>
                        <Link className={"btn btn-success"} to="/profile">{user.name}</Link>
                        <button onClick={UserServises.logout} className={"btn btn-success"}>Выход</button>
                    </div>
                    :
                    <button className={"btn btn-success"} onClick={UserServises.login}>Вход</button>

                }
            </div>
        </nav>
    );
};

export default Header;
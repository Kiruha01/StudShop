import React from 'react';
import UserServises from '../API/UserServeces'

const Header = ({user}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">StudShop</a>

                {user.length ?
                    <div>
                        <a className={"btn btn-success"}>{user.name}</a>
                        <a className={"btn btn-success"}>Выход</a>
                    </div>
                    :
                    <a className={"btn btn-success"} href={UserServises.getLoginUrl('http://localhost:')}>Вход</a>

                }
            </div>
        </nav>
    );
};

export default Header;
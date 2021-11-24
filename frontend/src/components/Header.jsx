import React from 'react';
import UserServises from '../API/UserServeces'

const Header = ({user, setUser}) => {
    async function login() {
        await UserServises.login()
        const res = await UserServises.getInfoAboutMe()
        setUser(res)
    }

    async function logout() {
        await UserServises.logout()
        setUser({})
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">StudShop</a>

                {user ?
                    <div>
                        <a className={"btn btn-success"}>{user.name}</a>
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
import {React, useMemo, useState, useEffect} from 'react';
import UserServeces from "../API/UserServeces";
import List from "../components/DealsList/List";
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";

const ProfilePage = () => {
    const [user, setUser] = useState({user_id: ''})
    const [products, setProducts] = useState([])
    useEffect(async ()=>{
            const r = await UserServeces.getInfo()
            setUser(r)
    }, [])

    useEffect(async () => {
        const res = await AdvertServices.getAll({my: true})
        setProducts(res)
    }, [])

    return (
        <div className="container">
            <div className="row">
                <h1>Данные профиля</h1>
                <div className="row">
                    <div className="col-3">
                        <span>Имя</span>
                    </div>
                    <div className="col">
                        <span>{user.name}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        <span>Почта</span>
                    </div>
                    <div className="col">
                        <span>{user.email}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        <span>Способ связи</span>
                    </div>
                    <div className="col">
                        <input value={user.com_method} onChange={(event => setUser({...user, com_method: event.target.value}))}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary"
                            onClick={() => UserServeces.updateComMethod(user.user_id, user.com_method)}>Сохранить изменения</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <h1>Совершённые сделки</h1>
                <List user_id={user.user_id}/>
            </div>

            <div className="row">
                <h1>Ваши объявления</h1>
                <AdvertsPanel products={products}/>
            </div>
        </div>
    );
};

export default ProfilePage;
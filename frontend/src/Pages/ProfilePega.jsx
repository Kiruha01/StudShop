import {React, useMemo, useState, useEffect} from 'react';
import UserServeces from "../API/UserServeces";
import List from "../components/DealsList/List";
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";
import {useParams} from 'react-router-dom'

const ProfilePage = ({user}) => {
    const [products, setProducts] = useState([])
    const [curUser, setCurUser] = useState([])
    const params = useParams()
    useEffect(async ()=> {
        if (params.id){
            const res = await UserServeces.getInfoById(params.id)
            setCurUser(res)
        }
        else{
            setCurUser(user)
        }
    })

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
                        <span>{curUser.name}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        <span>Почта</span>
                    </div>
                    <div className="col">
                        <span>{curUser.email}</span>
                    </div>
                </div>
                <div className="row">

                    <div className="col-3">
                        <span>Способ связи</span>
                    </div>
                    <div className="col">
                        {params.id ?
                            <span>{curUser.com_method}</span>
                            :
                            <input value={curUser.com_method}
                                   onChange={(event => setCurUser({...curUser, com_method: event.target.value}))}/>
                        }
                    </div>
                    {params.id ?
                        ''
                        :
                        <div className="col">
                            <button className="btn btn-primary"
                                    onClick={() => UserServeces.updateComMethod('', curUser.com_method)}>Сохранить изменения</button>
                        </div>}
                </div>
            </div>

            <div className="row">
                <h1>Совершённые сделки</h1>
                <List user_id={curUser.user_id}/>
            </div>

            {params.id ?
                ''
                :
                <div className="row">
                    <h1>Ваши объявления</h1>
                    <AdvertsPanel products={products}/>
                </div>
            }
        </div>
    );
};


export default ProfilePage;
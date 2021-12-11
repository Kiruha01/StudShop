import {React, useMemo, useState, useEffect} from 'react';
import UserServeces from "../API/UserServeces";
import List from "../components/DealsList/List";
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/Loader";

const ProfilePage = ({user, isAuth}) => {
    const [products, setProducts] = useState([])
    const [curUser, setCurUser] = useState(null)
    const params = useParams()
    const [getInfo, isLoading] = useFetching(async () => {
            if (params.id) {
                setCurUser(await UserServeces.getInfoById(params.id))
                const res = await AdvertServices.getAll({owner: params.id})
                setProducts(res)
            } else {
                setCurUser(await UserServeces.getInfo())
                const res = await AdvertServices.getAll({my: true})
                setProducts(res)
        }
    })

    const [changeCom, isChanging] = useFetching(async ()=> {
        await UserServeces.updateComMethod('', curUser.com_method)
    })
    useEffect(async ()=> {
        await getInfo()
    }, [])

    return (
        <div>
        {
            isLoading || !curUser?
                <Loader/>
                :
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
                                    onClick={changeCom}>Сохранить изменения</button>
                            {isChanging?
                                <Loader/>
                                :
                                ""}
                        </div>

                    }
                </div>
            </div>


                        <div className="row">
                            {params.id ?
                                <h1>Объявления</h1>
                                :
                                <h1>Ваши объявления</h1>
                            }

                                <AdvertsPanel products={products}/>
                        </div>

                </div>
        }
        </div>
    );
};


export default ProfilePage;
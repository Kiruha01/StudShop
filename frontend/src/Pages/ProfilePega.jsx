import {React, useState, useEffect} from 'react';
import UserServeces from "../API/UserServeces";
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/Loader";
import List from "../components/DealsList/List";
import CreateCategory from "../components/ModalWindows/CreateCategory";
import {toast, ToastContainer} from "react-toastify";
import RoundLabel from "../components/AdvertsCard/RoundLabel";

const ProfilePage = ({user}) => {
    const [products, setProducts] = useState([])
    const [curUser, setCurUser] = useState(null)
    const params = useParams()
    const [getInfo, isLoading] = useFetching(async () => {
            if (params.id) {
                setCurUser(await UserServeces.getInfoById(params.id))
                const res = await AdvertServices.getAll({owner: params.id})
                setProducts(res)
            } else {
                setCurUser(user)
                const res = await AdvertServices.getAll({my: true})
                setProducts(res)
        }
    })

    const [changeCom, isChanging] = useFetching(async ()=> {
        await UserServeces.updateComMethod('', curUser.com_method)
    })

    const [changeStaff, isChangingStaff] = useFetching(async (is_staff)=> {
        return  await UserServeces.updateStaff(params.id, is_staff)
    })

    async function setStaff(is_staff){
        const res = await changeStaff(is_staff)
        if (res.status === 204){
            setCurUser({...curUser, is_staff: is_staff})
        }
        else {
            toast.error("Что-то пошло не так", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(()=> {
        async function fetch() {
            await getInfo()
        }
        fetch()
    }, [])

    return (
        <div>
        {
            isLoading || !curUser?
                <Loader/>
                :
                <div className="container">
                    <CreateCategory/>
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                    />
                    <div className="row">
                        <div className="d-flex">
                        <h1>Данные профиля</h1>
                            {curUser.is_staff?
                            <RoundLabel color_class="bg-warning"><h1>Admin</h1></RoundLabel>
                                :""
                            }
                        </div>
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
                                    onClick={changeCom}>Сохранить изменения</button>
                            {isChanging?
                                <Loader/>
                                :
                                ""}
                        </div>

                    }
                </div>
            </div>
                    {user && user.is_staff && !params.id ?
                        <div className="row">
                            <button className="btn btn-warning" data-bs-toggle="modal"
                                    data-bs-target="#createCat">Создать категорию</button>
                        </div>
                        :
                        ""
                    }
                    {user && user.is_staff && params.id && curUser.is_staff ?
                        <div className="row">
                            <button className="btn btn-danger" onClick={()=> {setStaff(false)}}>Разжалобить администратора</button>
                        </div>
                        :
                        ""
                    }
                    {user && user.is_staff && params.id && !curUser.is_staff ?
                        <div className="row">
                            <button className="btn btn-primary" onClick={()=> {setStaff(true)}}>Назначить администратором</button>
                        </div>
                        :
                        ""
                    }
                    {isChangingStaff?
                    <Loader/>:""
                    }

            <div className="row">
                <h1>Совершённые сделки</h1>
                <List user_id={curUser.user_id}/>
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
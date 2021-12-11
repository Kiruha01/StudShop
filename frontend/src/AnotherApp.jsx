import {React, useEffect, useState} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"
import ProductPage from "./Pages/ProductPage";
import ProfilePage from "./Pages/ProfilePega";
import axios from "axios";
import {useFetching} from "./hooks/useFetching";

function AnotherApp() {
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [fun, isLoading] = useFetching(async ()=> {
        const qParams = new URLSearchParams(location.search)
        const token = qParams.get('token')
        console.log('token ' + token)
        if (token){
            axios.defaults.headers.common['Authorization'] = token
            const r =  await UserServises.getInfo()
            setUser(r)
            navigate('/')
            return
        }else {
            const r = await UserServises.getInfo()
            setUser(r)
        }
    })
    useEffect(()=>{
        async function fetch() {
            await fun()
        }
        fetch()
    }, [])

    return (
        <div>
            {isLoading ?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                :
                <div>
                    <Header user={user}/>
                    <Routes>
                        <Route path="/" element={<MainPage user={user}/>}/>
                    </Routes>
                    <Routes>
                        <Route path="/product/:id" element={<ProductPage user={user}/>}/>
                    </Routes>
                    <Routes>
                        <Route exact path="/profile" element={<ProfilePage user={user}/>}/>
                    </Routes>
                    <Routes>
                        <Route exact path="/profile/:id" element={<ProfilePage user={user}/>}/>
                    </Routes>
                </div>
            }
        </div>
    );
}

export default AnotherApp;

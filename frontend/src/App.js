import {React, useState, useEffect} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"
import ProductPage from "./Pages/ProductPage";
import ProfilePage from "./Pages/ProfilePega";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

function App() {
    const { user, isAuthenticated, isLoading } = useAuth0()
    const {getAccessTokenSilently} = useAuth0()
    useEffect(async ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer " + await getAccessTokenSilently();
    })

  return (
      <div>
            <BrowserRouter>
                <Header user={user} isLoading={isLoading} isAuthenticated={isAuthenticated}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage user={user}/>}/>
                </Routes>
                {/*<Routes>*/}
                {/*    <Route exact path="/profile" element={<ProfilePage user={user}/>}/>*/}
                {/*</Routes>*/}
                {/*<Routes>*/}
                {/*    <Route exact path="/profile/:id" element={<ProfilePage user={user}/>}/>*/}
                {/*</Routes>*/}
            </BrowserRouter>
      </div>
  );
}

export default App;

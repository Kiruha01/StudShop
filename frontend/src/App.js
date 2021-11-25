import {React, useState, useEffect} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"
import ProductPage from "./Pages/ProductPage";
import ProfilePage from "./Pages/ProfilePega";

function App() {
    const [userInfo, setUserInfo] = useState({})
    useEffect(async () => {
        const curentUserInfo = await UserServises.getInfo('')
            setUserInfo(curentUserInfo)
    }, [])

  return (
      <div>
            <BrowserRouter>
                <Header user={userInfo} setUser={setUserInfo}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage user={userInfo}/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/profile" element={<ProfilePage user={userInfo} setUser={setUserInfo}/>}/>
                </Routes>
                <Routes>
                    <Route exact path="/profile/:id" element={<ProfilePage user={userInfo} setUser={setUserInfo}/>}/>
                </Routes>
            </BrowserRouter>
      </div>
  );
}

export default App;

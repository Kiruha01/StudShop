import {React, useState, useEffect} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"
import ProductPage from "./Pages/ProductPage";
import axios from "axios";

function App() {
    const [userInfo, setUserInfo] = useState({})
    useEffect(async () => {
        const curentUserInfo = UserServises.getInfoAboutMe()
            setUserInfo(curentUserInfo)
    }, [])

  return (
      <div>
          <Header user={userInfo}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
                <Routes>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                </Routes>
            </BrowserRouter>
      </div>
  );
}

export default App;

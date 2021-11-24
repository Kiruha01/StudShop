import {React, useState, useEffect} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"

function App() {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
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
            </BrowserRouter>
      </div>
  );
}

export default App;

import {React, useEffect} from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import UserServises from "./API/UserServeces"
import ProductPage from "./Pages/ProductPage";
import ProfilePage from "./Pages/ProfilePega";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {useFetching} from "./hooks/useFetching";

function App() {
    const { user, isAuthenticated } = useAuth0()
    const {getAccessTokenSilently} = useAuth0()
    const [fun, isLoading] = useFetching(async ()=> {
        if (isAuthenticated) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + await getAccessTokenSilently()
            const resp = await UserServises.getInfo()
            if (resp == null) {
                await UserServises.login()
            }
        }
    })
    useEffect(()=>{
        async function fetch() {
            await fun()
        }
        fetch()
    }, [user])

  return (
      <div>
          {isLoading ?
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
              :
              <BrowserRouter>
                  <Header user={user} isLoading={isLoading} isAuthenticated={isAuthenticated}/>
                  <Routes>
                      <Route path="/" element={<MainPage user={user}/>}/>
                  </Routes>
                  <Routes>
                      <Route path="/product/:id" element={<ProductPage user={user} isAuth={isAuthenticated}/>}/>
                  </Routes>
                  <Routes>
                      <Route exact path="/profile" element={<ProfilePage user={user} isAuth={isAuthenticated}/>}/>
                  </Routes>
                  <Routes>
                      <Route exact path="/profile/:id" element={<ProfilePage user={user}/>}/>
                  </Routes>
              </BrowserRouter>
          }
      </div>
  );
}

export default App;

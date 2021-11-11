import React from "react";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";

function App() {
  return (
      <div>
          <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                </Routes>
            </BrowserRouter>
      </div>
  );
}

export default App;

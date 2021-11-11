import React from 'react';
import SearchPanel from "../components/SearchPanel";

const MainPage = () => {
    return (
        <div className="container-fluid">
            <div className="row pt-2">
                <div className="col-2 p-3">
                    <button className="btn btn-light">+ Создать объявление</button>
                </div>
                <div className="col p-3">
                    <SearchPanel/>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-2 p-3">
                    <div className="bg-danger">sds</div>
                </div>
                <div className="col p-3">
                    <div className="bg-danger">sdsd</div>
                </div>
            </div>
        </div>

    );
};

export default MainPage;
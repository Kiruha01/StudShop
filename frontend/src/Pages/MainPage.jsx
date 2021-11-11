import {React, useState, useEffect} from 'react';
import SearchPanel from "../components/SearchPanel";
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import FilterByBooking from "../components/FilterPanel/FilterByBooking";

const MainPage = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
    }, [])

    async function getProducts(){
        const products = await AdvertServices.getAll()
        setProducts(products)
    }

    return (
        <div className="container-fluid">
            <div className="row pt-2">
                <div className="col-3 p-3 d-flex flex-column">
                    <button className="btn btn-light">+ Создать объявление</button>
                </div>
                <div className="col p-3">
                    <SearchPanel/>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-3 p-3">
                    <FilterPanel id="filter">
                        <FilterByBooking idAccordion="filter"/>
                    </FilterPanel>
                </div>
                <div className="col p-3">
                    <AdvertsPanel products={products} />
                </div>
            </div>
        </div>

    );
};

export default MainPage;
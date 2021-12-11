import {React, useState, useEffect} from 'react';
import AdvertsPanel from "../components/AdvertsPanel";
import AdvertServices from "../API/AdvertServices";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import FilterByBooking from "../components/FilterPanel/FilterByBooking";
import CreateAdvert from "../components/ModalWindows/CreateAdvert";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/Loader";

const MainPage = ({user}) => {
    const [products, setProducts] = useState([])
    const [productFilter, setProductFilter] = useState({})
    const [getProducts, isLoading] = useFetching(async () => {
        const products = await AdvertServices.getAll({...productFilter})
        setProducts(products)
    })

    useEffect(() => {
        getProducts()
    }, [productFilter])

    return (
<div>

        <div className="container-fluid">
            <div className="row pt-2">
                <div className="col-3 p-3 d-flex flex-column">
                    {user?
                    <button className="btn btn-light" data-bs-toggle="modal" data-bs-target="#createAdvert">+
                        Создать объявление
                    </button>
                    :
                    ''}
                    <CreateAdvert/>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-3 p-3">
                    <FilterPanel id="filter">
                        <FilterByBooking idAccordion="filter" filter={productFilter}
                                         setFilter={setProductFilter}/>
                    </FilterPanel>
                </div>
                <div className="col p-3">
                    {isLoading ?
                        <Loader/>
                        :
                        <AdvertsPanel products={products}/>
                    }
                </div>
            </div>


        </div>

</div>
    );
}

export default MainPage;
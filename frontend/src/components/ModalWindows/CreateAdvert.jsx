import {React, useState, useEffect, useRef} from 'react';
import InputForm from "./InputForm";
import CategoryService from "../../API/CategoryService";
import LocationService from "../../API/LocationService";
import AdvertServices from "../../API/AdvertServices";

const CreateAdvert = () => {
    const [categories, setCategories] = useState([])
    const [locations, setLocations] = useState([])

    const newName = useRef()
    const newPrice = useRef()
    const newDescription = useRef()
    const newLocation = useRef()
    const newCategory = useRef()

    useEffect(async () => {
        setCategories(await CategoryService.getAll())
        setLocations(await LocationService.getAll())

    }, [])

    const create = async () => {
        const data = {
            name: newName.current.value,
            price: newPrice.current.value,
            description: newDescription.current.value,
            location_id: newLocation.current.value,
            category_id: newCategory.current.value
        }
        await AdvertServices.create(data)
    }


    return (
        <div className="modal fade" tabIndex="-1" id="createAdvert">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <InputForm name="Название">
                            <input type="text" className="form-control" ref={newName}/>
                        </InputForm>
                        <InputForm name="Цена">
                            <input type="number" className="form-control" ref={newPrice}/>
                        </InputForm>
                        <InputForm name="Описание">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={newDescription}/>
                        </InputForm>
                        <InputForm name="Расположение">
                            <select className="form-select" aria-label="Default select example" ref={newLocation}>
                                <option selected disabled> </option>
                                {locations.map(item =>
                                    <option value={item.location_id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>
                        <InputForm name="Категория">
                            <select className="form-select" aria-label="Default select example" ref={newCategory}>
                                <option selected disabled> </option>
                                {categories.map(item =>
                                <option value={item.category_id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={create}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAdvert;
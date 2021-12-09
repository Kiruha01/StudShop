import {React, useState, useEffect, useRef} from 'react';
import InputForm from "./InputForm";
import CategoryService from "../../API/CategoryService";
import LocationService from "../../API/LocationService";
import AdvertServices from "../../API/AdvertServices";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NumberInput from "./NumberInput";

const CreateAdvert = () => {
    const [categories, setCategories] = useState([])
    const [locations, setLocations] = useState([])
    const navigate = useNavigate();

    const closeButton = useRef()

    const newName = useRef()
    const newPrice = useRef()
    const newDescription = useRef()
    const newLocation = useRef()
    const newCategory = useRef()

    useEffect(async () => {
        setCategories(await CategoryService.getAll())
        setLocations(await LocationService.getAll())
    }, [])

    const create = async (e) => {
        const data = {
            name: newName.current.value || undefined,
            price: parseInt(newPrice.current.value, 10) || undefined,
            description: newDescription.current.value || undefined,
            location_id: newLocation.current.value || undefined,
            category_id: newCategory.current.value || undefined
        }
        const res = await AdvertServices.create(data)
        if (res.status !== 201){
            console.log(res.data)
            toast.error(JSON.stringify(res.data.message), {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            toast.success("Ваше объявление создано!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            closeButton.current.click()
            navigate('/product/' + res.data.id)
        }
    }


    return (
        <div className="modal fade" tabIndex="-1" id="createAdvert">
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                />
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать объявление</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                id='close' ref={closeButton}></button>
                    </div>
                    <div className="modal-body">
                        <InputForm name="Название">
                            <input type="text" className="form-control" ref={newName}/>
                        </InputForm>
                        <InputForm name="Цена">
                            <NumberInput ref={newPrice}/>
                            {/*<input type="number" pattern="[0-9]*"*/}
                            {/*       className="form-control" ref={newPrice}/>*/}
                        </InputForm>
                        <InputForm name="Описание">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={newDescription}/>
                        </InputForm>
                        <InputForm name="Расположение">
                            <select className="form-select" aria-label="Default select example" ref={newLocation}>
                                <option selected disabled> </option>
                                {locations.map(item =>
                                    <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>
                        <InputForm name="Категория">
                            <select className="form-select" aria-label="Default select example" ref={newCategory}>
                                <option selected disabled> </option>
                                {categories.map(item =>
                                <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-primary"
                                onClick={create}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAdvert;
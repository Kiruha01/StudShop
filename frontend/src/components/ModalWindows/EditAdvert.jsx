import {React, useState, useRef, useEffect} from 'react';
import InputForm from "./InputForm";
import CategoryService from "../../API/CategoryService";
import LocationService from "../../API/LocationService";
import AdvertServices from "../../API/AdvertServices";
import { ToastContainer, toast } from 'react-toastify';
import ImageEdit from "./ImageEdit";

const EditAdvert = ({product, setProduct}) => {
    console.log(product)
    const [newProduct, setNewProduct] = useState({})
    const closeButton = useRef()

    const [categories, setCategories] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(async () => {
        setNewProduct({...product, location_id: product.location.location_id, category_id: product.category.category_id})
        setCategories(await CategoryService.getAll())
        setLocations(await LocationService.getAll())
    }, [product])

    async function edit(){
        const response = await AdvertServices.edit(product.product_id, newProduct)
        if (response.status !== 204){
            toast.error("Some error!")
        }
    }

    async function send(e){
        console.log(e.target.files)
        var formData = new FormData();
        formData.append("image", e.target.files[0]);
        await AdvertServices.add_photo(product.product_id, formData)
    }

    return (
        <div className="modal fade" tabIndex="-1" id="createAdvert">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                id='close' ref={closeButton}></button>
                    </div>
                    <div className="modal-body">
                        <InputForm name="Название">
                            <input type="text" className="form-control" value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                        </InputForm>
                        <InputForm name="Цена">
                            <input type="number" className="form-control" value={newProduct.price}
                                   onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
                        </InputForm>
                        <InputForm name="Описание">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={newProduct.description}
                                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}/>
                        </InputForm>
                        <InputForm name="Расположение">
                            <select className="form-select" aria-label="Default select example" value={newProduct.location_id}
                                    onChange={(e) => setNewProduct({...newProduct, location_id: e.target.value})}>
                                <option selected disabled> </option>
                                {locations.map(item =>
                                    <option value={item.location_id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>
                        <InputForm name="Категория">
                            <select className="form-select" aria-label="Default select example" value={newProduct.category_id}
                                    onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value})}>
                                <option selected disabled> </option>
                                {categories.map(item =>
                                    <option value={item.category_id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>

                    <div className="row">
                        {newProduct.pictures?.map(p => <ImageEdit picture={p} />)}
                    </div>
                        <h5>Добавить файл</h5>
                        <input type="file" accept="image/*" onChange={send}/>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"
                                onClick={edit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAdvert;
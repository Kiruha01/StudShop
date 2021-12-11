import {React, useState, useRef, useEffect} from 'react';
import InputForm from "./InputForm";
import CategoryService from "../../API/CategoryService";
import LocationService from "../../API/LocationService";
import AdvertServices from "../../API/AdvertServices";
import {toast, ToastContainer} from 'react-toastify';
import ImageEdit from "./ImageEdit";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../Loader";

const EditAdvert = ({product, setProduct}) => {
    console.log(product)
    const [newProduct, setNewProduct] = useState({})
    const closeButton = useRef()

    const [categories, setCategories] = useState([])
    const [locations, setLocations] = useState([])
    const [f, isLoading] = useFetching(async ()=>{
        return await AdvertServices.edit(product.id, newProduct)
    })
    const [uploadFile, isUploading] = useFetching(async (formData)=>{
        const r =  await AdvertServices.add_photo(product.id, formData)
        if (r.status !== 201){
            toast.error("Фото не было добавлено", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setProduct({...product, pictures: [...product.pictures, r.data]})
        }
    })

    const [deleteFile, isDeleting] = useFetching(async (id)=>{
        const r = await AdvertServices.delete_photo(id)
        if (r.status !== 204){
            toast.error("Не удалось удалить фото", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setProduct({
                ...product, pictures: product.pictures.filter((p) => {
                return p.id !== id
                })
            })
        }
    })

    useEffect(async () => {
        setNewProduct({...product, location_id: product.location.id, category_id: product.category?.id})
        setCategories(await CategoryService.getAll())
        setLocations(await LocationService.getAll())
    }, [])

    async function edit(){
        const response = await f()
        if (response.status !== 200){
            toast.error("Some error!")
        }
        else{
            const prod = (await AdvertServices.getById(product.id)).data
            setProduct(prod)
            closeButton.current.click()
        }
    }

    async function send(e){
        console.log(e.target.files)
        var formData = new FormData();
        formData.append("image", e.target.files[0]);
        await uploadFile(formData)
    }

    return (
        <div className="modal fade" tabIndex="-1" id="createAdvert">
            <ToastContainer
            />
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Редактировать объявление</h5>
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
                                    <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>
                        <InputForm name="Категория">
                            <select className="form-select" aria-label="Default select example" value={newProduct.category_id}
                                    onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value})}>
                                <option selected disabled> </option>
                                {categories.map(item =>
                                    <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </InputForm>

                    <div className="row">
                        {product.pictures?.map(p => <ImageEdit picture={p} deletePicture={deleteFile}/>)}
                    </div>
                        <h5>Добавить файл</h5>
                        <input type="file" accept="image/*" onChange={send}/>
                    </div>

                    <div className="modal-footer">
                        {isLoading || isUploading || isDeleting?
                        <Loader/>
                        :
                            ""
                        }
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                        <button type="button" className="btn btn-primary"
                                onClick={edit}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAdvert;
import React, {useRef} from 'react';
import InputForm from "./InputForm";
import Loader from "../Loader";
import {useFetching} from "../../hooks/useFetching";
import {toast, ToastContainer} from "react-toastify";
import CategoryService from "../../API/CategoryService";

const CreateCategory = () => {
    const closeButton = useRef()

    const newName = useRef()

    const [createCat, isCreating] = useFetching(async ()=>{
        const res = await CategoryService.create(newName.current.value)
        if (res.status !== 201){
            toast.error("Что-то пошло не так", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else{
            toast.success("Категория создана!", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return res.data
        }

    })

    async function create(){
        const data = await createCat()
        if (data){
            closeButton.current.click()
        }
    }

    return (
        <div className="modal fade" tabIndex="-1" id="createCat">

            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Создать категорию</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                id='close' ref={closeButton}></button>
                    </div>
                    <div className="modal-body">
                        <InputForm name="Название">
                            <input type="text" className="form-control" ref={newName}/>
                        </InputForm>
                    </div>
                    {/*<h2>Существующие категории</h2>
                    <div style={{maxHeight: "400px"}} className="overflow-scroll">

                    </div>*/}
                    <div className="modal-footer">
                        {isCreating?
                            <Loader/>
                            :
                            ""}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-primary"
                                onClick={create}>Сохранить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
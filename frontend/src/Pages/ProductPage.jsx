import {React, useMemo, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import AdvertServices from "../API/AdvertServices";
import CaroselPhoto from "../components/CaroselPhoto";
import RoundLabel from "../components/AdvertsCard/RoundLabel";
import OwnerName from "../components/AdvertsCard/OwnerName";
import classes from "../components/AdvertsCard/AdvertVard.module.css";
import QueueList from "../components/Queue/QueueList";
import BookingService from "../API/BookingService";

const ProductPage = ({user}) => {
    const params = useParams()
    const [productInfo, setInfo] = useState({name: null, pictures: [], location: {},
        category: {}, owner: {}, price: null})
    const [youBooked, setYouBooked] = useState(false)

    useEffect(async () => {
        const response = await AdvertServices.getById(params.id)
        setInfo(response.data)
        setYouBooked(response.data.you_booked)
    }, [])

    const bookProduct = async () => {
        try {
            await BookingService.Book(params.id)
            setYouBooked(true)
            setInfo({...productInfo, queue_len: productInfo.queue_len + 1, is_booking: true})
        }
        catch (e){
            if (e.response?.status === 409){
                alert(e.response.data.toString())
            }
        }
    }

    const unbookProduct = async () => {
        try {
            const res = await BookingService.Unbook(params.id)
            setYouBooked(false)
            setInfo({...productInfo, queue_len: productInfo.queue_len - 1, is_booking: productInfo.queue_len - 1 > 0})

        }
        catch (e){
            if (e.response?.status === 409){
                alert(e.response.data.toString())
            }
        }
    }

    const openProduct = async () => {
        const r = await AdvertServices.set_is_active(productInfo.product_id, true)
        if (r.status !== 204){
            alert(r.data)
        }
        else
            setInfo({...productInfo, is_active: true})

    }
    const closeProduct = async () => {
        const r = await AdvertServices.set_is_active(productInfo.product_id, false)
        if (r.status !== 204){
            alert(r.data)
        }
        else
            setInfo({...productInfo, is_active: false})
    }

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-4" style={{position: "relative"}}>
                    {productInfo.is_booking ? <RoundLabel color_class={"bg-dark " + classes.text}>Забронированно</RoundLabel> : ''}
                    {productInfo.pictures.length? <CaroselPhoto pictures={productInfo.pictures}/> : ''}
                    {user.user_id !== productInfo.owner.user_id ?
                        <div className="d-flex justify-content-between">
                            {!youBooked ?
                                <button className="btn btn-success" onClick={bookProduct}>Забронировать продукт</button>
                                :
                                <button className="btn btn-dark" onClick={unbookProduct}>NON Забронировать
                                    продукт</button>
                            }
                            <div>Людей в очереди <span
                                className="badge rounded-pill bg-success align-self-end">{productInfo.queue_len}</span>
                            </div>
                        </div>
                        : ''}
                    {user.user_id === productInfo.owner.user_id?
                    <div className="d-flex">
                        <button className="btn btn-dark flex-fill"
                        >Редактировать</button>
                        </div>
                        : '' }
                    {user.user_id === productInfo.owner.user_id && productInfo.is_active ?
                        <div className="d-flex">
                            <button className="btn btn-danger flex-fill"
                            onClick={closeProduct}>Закрыть объявление</button>
                        </div>
                    : ''}
                    {user.user_id === productInfo.owner.user_id && !productInfo.is_active ?
                        <div className="d-flex">
                            <button className="btn btn-light flex-fill"
                            onClick={openProduct}>Открыть повторно</button>
                        </div>
                        : ''
                    }

                </div>
                <div className="col-8 p-3">
                    <h1>{productInfo.name}</h1>
                    {productInfo.description ?
                        <div>
                            <h3>Описание</h3>
                            <p className="mx-2">{productInfo.description}</p>
                        </div>
                        : ''}
                        <div className="d-flex justify-content-between">
                            <div>
                                <RoundLabel color_class="bg-primary h4 px-3">{productInfo.location.name}</RoundLabel>
                                <br/>
                                {productInfo.category ?
                                    <RoundLabel color_class="bg-warning h4 px-3">{productInfo.category.name}</RoundLabel>
                                    : ''
                                }
                            </div>
                            <div className="d-flex mx-5">
                                <h3 style={{color: "midnightblue"}}>Цена:  </h3>
                                <h3 >{productInfo.price}</h3>
                            </div>
                        </div>
                    <div>
                        <h3>Продавец</h3>
                        <div className="d-flex mx-3">
                            <OwnerName  name={productInfo.owner.name} user_id={productInfo.owner.user_id}/>
                            <p className="mx-2">{productInfo.owner.com_method}</p>
                        </div>
                    </div>
                    <br/>
                    {user.user_id === productInfo.owner.user_id ?
                        <QueueList product_id={productInfo.product_id}/>
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
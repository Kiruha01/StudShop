import {React, useState, useEffect} from 'react';
import BookingService from "../../API/BookingService";
import QeueItem from "./QeueItem";
import { useFetching} from "../../hooks/useFetching";
import Loader from "../Loader";

const QueueList = ({product_id}) => {
    const [qeue, setQueue] = useState([])
    const [getQ, isGetting] = useFetching(async ()=>{
        setQueue(await BookingService.getAllBookings(product_id))
    })

    const  deleteBookById = async (id) => {
        await BookingService.deleteBooking(product_id, id)
        setQueue(qeue.filter((el) => el.id !== id))
    }

    useEffect(() => {
        async function fetch(){
            try {
                await getQ()
            }
            catch (e){

            }
        }
        fetch()
    }, [product_id])

    return (
        <div>
            {isGetting ?
                <Loader/>
                :
                <div>
                {qeue.map(item => <QeueItem bookingData={item} delBooking={deleteBookById}/>)}
            {qeue.length === 0?
                <h5>Брони нет</h5>
                :""}
                </div>
            }
        </div>
    );
};

export default QueueList;
import {React, useState, useEffect} from 'react';
import BookingService from "../../API/BookingService";
import QeueItem from "./QeueItem";

const QueueList = ({product_id}) => {
    const [qeue, setQueue] = useState([])

    const  deleteBookById = async (id) => {
        await BookingService.deleteBooking(product_id, id)
        setQueue(qeue.filter((el) => el.id !== id))
    }

    useEffect(async () => {
        try {
            // if (!product_id) {
                setQueue(await BookingService.getAllBookings(product_id))
            // }
        }
        catch (e){

        }
    }, [product_id])

    return (
        <div>
            {qeue.map(item => <QeueItem bookingData={item} delBooking={deleteBookById}/>)}
        </div>
    );
};

export default QueueList;
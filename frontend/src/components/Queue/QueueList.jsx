import {React, useState, useEffect} from 'react';
import BookingService from "../../API/BookingService";
import QeueItem from "./QeueItem";

const QueueList = ({product_id}) => {
    const [qeue, setQueue] = useState([])

    useEffect(async () => {
        try {
            setQueue(await BookingService.getAllBookings(product_id))
        }
        catch (e){

        }
    }, [product_id])

    return (
        <div>
            {qeue.map(item => <QeueItem bookingData={item}/>)}
        </div>
    );
};

export default QueueList;
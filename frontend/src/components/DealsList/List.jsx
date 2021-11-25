import {React, useState, useEffect} from 'react';
import UserServeces from "../../API/UserServeces";
import DealItem from "./DealItem";

const QueueList = ({user_id}) => {
    const [list, setList] = useState([])

    useEffect(async () => {
        try {
            setList(await UserServeces.getAllDeals(user_id))
        }
        catch (e){

        }
    }, [user_id])

    return (
        <div>
            {list?.map(item => <DealItem product={item.product} user={item.user} date={item.date} />)}
        </div>
    );
};

export default QueueList;
import {React, useState, useEffect} from 'react';
import FilterItem from "./FilterItem";

const FilterByBooking = ({idAccordion, filter, setFilter}) => {
    const [is_booking, setIs_booking] = useState(false)
    const [Notis_booking, setNotIs_booking] = useState(false)

    useEffect(()=>{
        if (is_booking ^ Notis_booking){
            setFilter({...filter, is_booking: is_booking})
        }
        else {
            setFilter({...filter, is_booking: undefined})
        }
    }, [is_booking, Notis_booking])


    return (
        <FilterItem filterName="Бронь" accordionId={idAccordion} id="bookfilter" key='1'>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={is_booking} id="isBooking_check"
                onChange={(event => {
                    setIs_booking(event.target.checked)
                    console.log(event.target.checked)
                })}/>
                    <label className="form-check-label" htmlFor="isBooking_check">
                        Забронировано
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={Notis_booking} id="isNotBooking_check"
                       onChange={(event => {
                           setNotIs_booking(event.target.checked)
                       })}/>
                <label className="form-check-label" htmlFor="isNotBooking_check">
                    Не забронировано
                </label>
            </div>
        </FilterItem>
    );
};

export default FilterByBooking;
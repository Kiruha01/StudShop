import React from 'react';
import FilterItem from "./FilterItem";

const FilterByBooking = ({idAccordion}) => {
    return (
        <FilterItem filterName="Бронь" accordionId={idAccordion} id="bookfilter" key='1'>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="isBooking_check"/>
                    <label className="form-check-label" htmlFor="isBooking_check">
                        Забронировано
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="isNotBooking_check"/>
                <label className="form-check-label" htmlFor="isNotBooking_check">
                    Не забронировано
                </label>
            </div>
        </FilterItem>
    );
};

export default FilterByBooking;
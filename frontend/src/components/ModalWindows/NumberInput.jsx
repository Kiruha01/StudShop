import {React, useState} from 'react';

const NumberInput = ({ref}) => {
    const [val, setVal] = useState('')

    function onChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setVal(e.target.value)
        }
    }
    return (
        <input value={val} className="form-control" ref={ref} onChange={onChange}/>
    );
};

export default NumberInput;
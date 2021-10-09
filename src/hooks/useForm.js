import { useState } from 'react';

export const useForm = ( initialState = {} ) => {

    const [value, setValue] = useState(initialState);

    const handleReset = (newState = initialState) => {
        setValue(newState)
    }

    const handleInputChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    return {
        value, 
        handleReset, 
        handleInputChange
    }

}

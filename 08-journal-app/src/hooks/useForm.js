import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState( initialState );

    const reset = (newFormState = initialState) => setValues( newFormState );

    const handleInputChange = ({ target: { name, value } }) => setValues({
        ...values,
        [ name ]: value
    });

    return [
        values,
        handleInputChange,
        reset
    ];

}
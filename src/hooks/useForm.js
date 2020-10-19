import {useState} from 'react';

export default (callback) => {
    const [values, setValues] = useState({});

    const handleInputChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        callback(values);
        const newItem = {};
        setValues(newItem);

    }

    return [handleInputChange, handleSubmit, values];
}
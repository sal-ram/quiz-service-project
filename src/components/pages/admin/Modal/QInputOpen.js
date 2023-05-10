import { TextField } from '@mui/material';
import React from 'react';

export const QInputOpen = ({ handleChange, values }) => {

    const handleForm = (newValue) => {
        handleChange("correctAnswer", newValue.target.value)
    }

    return (
        <>
            <TextField label="Правильный ответ:"
                id="correctAnswer"
                name="correctAnswer"
                required
                defaultValue={values.correctAnswer}
            
            />
        </>
    )
};
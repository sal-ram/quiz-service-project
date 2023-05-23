import { TextField } from '@mui/material';
import React from 'react';

export const QInputOpen = ({ handleChange, values }) => {

    // const handleForm = (newValue) => {
    //     handleChange("correctAnswer", newValue.target.value)
    // }

    return (
        <>
            <TextField label="Правильный ответ:"
                id="correctAnswer"
                name="correctAnswer"
                required
                defaultValue={values.type === "open" ? values.correctAnswer : ""}
                multiline
                rows={4}
                sx={{ width: "326px", }}
                onChange={(e) => handleChange("correctAnswer", e.target.value)}
            />
        </>
    )
};
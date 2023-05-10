import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const QInputMultiple = ({ handleChange, values }) => {

    let [answers, setAnswers] = useState(["a", "b", "c"]);
    let [correctA, setCorrectA] = useState([]);

    const handleSelect = (ans) => {
        if (correctA.some(q => q === ans)) {
            setCorrectA((correctA) => [...correctA.filter(e => e !== ans)])
        } else {
            setCorrectA((correctA) => [...correctA, ans])
        }
    }

    useEffect(() => {
        if (values.answers) {
            setAnswers(values.answers);
            setCorrectA(values.correctAnswer);
        }
    }, []);


    return (
        <>
            <FormGroup>
                {answers.map((ans) =>
                    <FormControlLabel control={<Checkbox
                        checked={correctA.some(q => q === ans)}
                        onChange={() => handleSelect(ans)} />} label={
                        <TextField
                            variant='outlined'
                            margin="normal"
                            fullWidth
                            id="text"
                            label="Вариант ответа"
                            name="text"
                            value={ans}
                            // onChange={() => { }}
                        />} />
                )}
            </FormGroup>
        </>
    )
};
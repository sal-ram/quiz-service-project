import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const QInputOne = ({ handleChange, values }) => {


    let [answers, setAnswers] = useState(["a", "b", "c"]);
    let [correctA, setCorrectA] = useState();

    // const [selected, setSelected] = useState();

    const handleSelect = (e) => {
        setCorrectA(e.target.value);
    }

    useEffect(() => {
        console.log(values);
        if (values.answers) {
            setAnswers(values.answers);
            setCorrectA(values.correctAnswer);
        }
    }, []);

    return (
        <>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={handleSelect}
                    value={correctA ? correctA : {}}
                >
                    {answers.map((ans) =>
                        <FormControlLabel value="ans" key={ans} control={<Radio value={ans} />} label={
                            <TextField
                                variant='outlined'
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Вариант ответа"
                                name="text"
                                value={ans}
                                // onChange={() => { }}
                            />}
                        />
                    )}
                </RadioGroup>
            </FormControl>

        </>
    )
};
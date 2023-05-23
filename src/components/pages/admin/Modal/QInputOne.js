import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const QInputOne = ({ handleChange, values }) => {

    let [answers, setAnswers] = useState({ "a": "a", "b": "b", "c": "c" });
    let [correctA, setCorrectA] = useState("a");

    const handleSelect = (e) => {
        setCorrectA(e.target.value);
        handleChange("correctAnswer", answers[e.target.value]);
    }

    useEffect(() => {
        console.log(values);
        if (values.answers && values.type === "one") {
            setAnswers(values.answers);
            setCorrectA(values.correctAnswer);
        } else {
            handleChange("answers", Object.keys(answers).map((i) => answers[i]));
            handleChange("correctAnswer", correctA);
        }
    }, []);

    return (
        <>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={handleSelect}
                    value={correctA}
                >
                    {Object.keys(answers).map((ans) =>
                        <FormControlLabel value="ans" key={ans} control={<Radio value={ans} />} label={
                            <TextField
                                variant='outlined'
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Вариант ответа"
                                name="text"
                                defaultValue={answers[ans]}
                                onChange={(e) => {
                                    let ans_list = answers;
                                    ans_list[ans] = e.target.value;
                                    setAnswers((ans_list) => (ans_list));
                                    handleChange("answers",ans_list);
                                    if (correctA === ans) {
                                        handleChange("correctAnswer", e.target.value);
                                    }
                                }}
                            />}
                        />
                    )}
                </RadioGroup>
            </FormControl>

        </>
    )
};
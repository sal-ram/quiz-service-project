import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const QInputMultiple = ({ handleChange, values }) => {

    let [answers, setAnswers] = useState({ "a": "a", "b": "b", "c": "c" });
    let [correctA, setCorrectA] = useState(["a"]);

    const handleSelect = (a) => {
        console.log(a);
        let ans = answers[a];
        console.log(ans);
        if (correctA.some(q => q === ans)) {

            setCorrectA((correctA) => [...correctA.filter(e => e !== ans)]);
            handleChange("correctAnswer", [...correctA.filter(e => e !== ans)]);
        } else {
            setCorrectA((correctA) => [...correctA, ans]);
            handleChange("correctAnswer", [...correctA, ans]);
        }
    }

    useEffect(() => {
        if (values.answers && values.type === "multiple") {
            setAnswers(values.answers);
            setCorrectA(values.correctAnswer);
        } else {
            handleChange("answers", Object.keys(answers).map((i) => answers[i]));
            handleChange("correctAnswer", correctA);
        }
    }, []);


    return (
        <>
            <FormGroup>
                {Object.keys(answers).map((ans) =>
                    <FormControlLabel key={ans} control={<Checkbox

                        checked={correctA.some(q => q === answers[ans])}
                        onChange={() => handleSelect(ans)} />} label={
                            <TextField
                                variant='outlined'
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Вариант ответа"
                                name="text"
                                defaultValue={answers[ans]}
                                onChange={(e) => {
                                    if (correctA.some(q => q === answers[ans])) {
                                        console.log("correct");
                                        let correct_list = correctA;
                                        for (let i = 0; i < correct_list.length; i++){
                                            if (correct_list[i] === answers[ans]) {
                                                correct_list[i] = e.target.value;
                                            }
                                        }
                                        // correct_list[ans] = e.target.value;
                                        setCorrectA((correct_list) => correct_list);
                                        handleChange("correctAnswer", correct_list);
                                    }
                                    let ans_list = answers;
                                    ans_list[ans] = e.target.value;
                                    setAnswers((ans_list) => (ans_list));
                                    handleChange("answers", ans_list);

                                }}
                            />} />
                )}
            </FormGroup>
        </>
    )
};
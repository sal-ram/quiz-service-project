import { Box, DialogContent, DialogContentText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledButton } from '../style/Button.styled';
import { QInputOne } from './QInputOne';
import { QInputMultiple } from './QInputMultiple';
import { QInputOpen } from './QInputOpen';

export const QuestionInput = ({ nextStep, prevStep, handleChange, values, closeModal, handleEditQuestion }) => {

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let text = data.get('text');
        console.log(text);
        handleChange("text", text);
        let points = data.get('points');
        console.log(points);
        handleChange("points", points);
        if (values.type === "open") {

            let correctAnswer = data.get("correctAnswer");
            console.log(correctAnswer);
            handleChange("correctAnswer", correctAnswer);
            // nextStep();
            closeModal();
            // handleEditQuestion(values.id);
        }

    }

    const handleSubmitCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("data", data);
        let text = data.get('text');
        console.log(text);
        handleChange("text", text);
        let points = data.get('points');
        console.log(points);
        handleChange("points", points);
        if (values.type === "open") {

            let correctAnswer = data.get("correctAnswer");
            console.log(correctAnswer);
            handleChange("correctAnswer", correctAnswer);
            // nextStep();
            closeModal();

        }

    }

    const renderSwitch = (type) => {
        switch (type) {
            case "one":
                return <QInputOne handleChange={handleChange} values={values} />;
            case "multiple":
                return <QInputMultiple handleChange={handleChange} values={values} />;
            case "open":
                return <QInputOpen handleChange={handleChange} values={values} />;
            default:
        };
    }

    useEffect(() => {
        // console.log(answers);

    }, []);

    return (

        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box component="form" onSubmit={values.text ? handleSubmitEdit : handleSubmitCreate} noValidate sx={{
                    mt: 1, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Текст вопроса"
                        name="text"
                        defaultValue={values.text}
                    />

                    {renderSwitch(values.type)}
                    <TextField label="Кол-во баллов:"
                        id="points"
                        name="points"
                        required
                        defaultValue={values.points}
                    />
                    {values.text ?
                        <StyledButton type="submit"
                        // onClick={() => {
                        // closeModal();
                        // handleEditQuestion();
                        // }}
                        >сохранить изменения</StyledButton> :
                        <><StyledButton type="submit"
                            onClick={() => {
                                nextStep();
                            }}
                        >добавить вопрос</StyledButton>
                            <StyledButton onClick={() => {
                                prevStep();
                            }}>вернуться к выбору</StyledButton>
                        </>
                    }

                </Box>
            </DialogContentText>
        </DialogContent>

    )
};
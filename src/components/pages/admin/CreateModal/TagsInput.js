import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { StyledButton } from '../style/Button.styled';

export const TagsInput = ({ step, nextStep, prevStep, handleChange, values }) => {



    return (
        <>
            <DialogTitle id="alert-dialog-title">
                { }
                <br />
                "Выберите тип вопроса"
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <StyledButton onClick={() => {
                        values.type = "one";
                        handleChange("type");
                        nextStep();
                    }}>вопрос с вариантом ответа</StyledButton>
                    <StyledButton onClick={() => {
                        values.type = "multiple";
                        handleChange("type");
                        nextStep();
                    }}>вопрос с несколькими ответами</StyledButton>
                    <StyledButton onClick={() => {
                        values.type = "open";
                        handleChange("type");
                        nextStep();
                    }}>открытый вопрос</StyledButton>
                </DialogContentText>
            </DialogContent>
        </>
    )
};
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { StyledButton } from '../style/Button.styled';

export const ChoseType = ({ nextStep, prevStep, handleChange, values }) => {
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
                        // values.type = "one";
                        handleChange("type", "one");
                        nextStep();
                    }}>вопрос с вариантом ответа</StyledButton>
                    <StyledButton onClick={() => {
                        // values.type = "multiple";
                        handleChange("type", "multiple");
                        nextStep();
                    }}>вопрос с несколькими ответами</StyledButton>
                    <StyledButton onClick={() => {
                        // values.type = "open";
                        handleChange("type", "open");
                        nextStep();
                    }}>открытый вопрос</StyledButton>
                </DialogContentText>
            </DialogContent>
        </>
    )
};
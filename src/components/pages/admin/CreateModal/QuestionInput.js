import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { StyledButton } from '../style/Button.styled';

export const QuestionInput = ({ nextStep, prevStep, handleChange, values }) => {
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
                        // handleChange("type", "one");
                        nextStep();
                    }}>добавить вопрос</StyledButton>
                    <StyledButton onClick={() => {
                        // values.type = "multiple";
                        // handleChange("type", "multiple");
                        prevStep();
                    }}>вернуться к выбору</StyledButton>
                </DialogContentText>
            </DialogContent>
        </>
    )
};
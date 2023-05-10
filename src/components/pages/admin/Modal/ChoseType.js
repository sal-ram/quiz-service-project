import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react';
import { StyledButton } from '../style/Button.styled';
import { StyledTitle } from '../style/Title.styled';
import { Box } from '@mui/system';

export const ChoseType = ({ nextStep, prevStep, handleChange, values }) => {

    useEffect(() => {
        console.log(values.type);
        if (values.text) {
            nextStep();
        }
    }, []);

    return (
        <>
            <DialogTitle id="alert-dialog-title">
                <StyledTitle sx={{
                    fontSize: "24px",
                    lineHeight: "33px"
                }}>Выберите тип вопроса</StyledTitle>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box component="" sx={{
                        mt: 3, display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <StyledButton sx={{
                            width: "376px",
                            height: "57px",
                            mt: 1, mb: 2,
                        }}
                            onClick={() => {
                                handleChange("type", "one");
                                nextStep();
                            }}>вопрос с вариантом ответа</StyledButton>
                        <StyledButton sx={{
                            width: "376px",
                            height: "57px",
                            mt: 1, mb: 2, backgroundColor: "#2C5198",
                        }}
                            onClick={() => {
                            handleChange("type", "multiple");
                            nextStep();
                        }}>вопрос с несколькими ответами</StyledButton>
                        <StyledButton sx={{
                            width: "376px",
                            height: "57px",
                            mt: 1, mb: 2,
                        }}
                            onClick={() => {
                            handleChange("type", "open");
                            nextStep();
                            }}>открытый вопрос</StyledButton>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </>
    )
};
import { Chip, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { StyledButton } from '../style/Button.styled';
import { Box } from '@mui/system';

export const TagsInput = ({ step, nextStep, prevStep, handleChange, values, closeModal, createQuestion }) => {

    const handleCreate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const tag = data.get('tag');
        console.log(tag);
        handleChange("tag", tag);
        createQuestion();
        closeModal();
    }

    return (
        <>
            <DialogTitle id="alert-dialog-title">
                { }
                <br />
                "Введите тэг"
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box component="form" onSubmit={handleCreate} noValidate sx={{
                        mt: 1, display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <TextField label="Тэг:" id="tag" name="tag" required />
                        <StyledButton type="submit">добавить вопрос</StyledButton>
                    
                    </Box>

                    <StyledButton onClick={() => {
                        prevStep();
                    }}>вернуться к вопросу</StyledButton>
                </DialogContentText>
            </DialogContent>
        </>
    )
};
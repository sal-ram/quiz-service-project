import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { StyledTitle } from './style/Title.styled';
import { StyledButton } from './style/Button.styled';


export default function AdminHome() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/create-quiz`;
        navigate(path);
    }

    return (
        <Box sx={{
            marginTop: "150px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <StyledTitle component="h1" variant="h5">
                Что вы хотите сделать?
            </StyledTitle>
            <Box component="" sx={{
                mt: 3, display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <StyledButton fullWidth
                    variant="contained"
                    sx={{
                        mt: 3, mb: 1, width: "350px",
                        height: "57px",
                    }} onClick={routeChange}>Создать новый квиз</StyledButton>
                <StyledButton fullWidth
                    variant="contained"
                    sx={{
                        mt: 1, mb: 2, backgroundColor: "#2C5198", width: "350px",
                        height: "57px",
                    }}>Посмотреть последний квиз</StyledButton>
            </Box>
        </Box>
    )
}

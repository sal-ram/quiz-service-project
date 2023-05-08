import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { StyledButton } from './admin/style/Button.styled';
import { StyledTitle } from './admin/style/Title.styled';

export default function StartRoute() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/login`;
        navigate(path);
    }
    return (
        <Box sx={{
            marginTop: "150px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <StyledTitle component="h1" variant="h1">
                Выберите ваш статус
            </StyledTitle>
            <Box component="" sx={{
                mt: "60px", display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <StyledButton
                    variant="contained"
                    sx={{
                        mb: "8px", width: "300px",
                        height: "57px"
                    }}
                    onClick={routeChange}
                >
                    Администратор
                </StyledButton>
                <StyledButton
                    variant="contained"
                    sx={{
                        mt: "8px", backgroundColor: "#2C5198", width: "300px",
                        height: "57px"
                    }}
                    onClick={() => navigate('/team/login')}>
                    Команда
                </StyledButton>

            </Box>
        </Box>
    )
}

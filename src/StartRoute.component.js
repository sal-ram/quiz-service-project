import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from '@mui/material';

export default function StartRoute() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }
    return (
        <Container>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    Выберите ваш статус
                </Typography>
                <Box component="" sx={{ mt: 1 }}>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/team/login')}>Команда</Button>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={routeChange}>Администратор</Button>
                </Box>
            </Box>
        </Container>
    )
}

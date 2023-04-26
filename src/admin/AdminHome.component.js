import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Context } from '..';
import { signOut } from 'firebase/auth';
import { Box, Container, Typography } from '@mui/material';

export default function AdminHome() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/create-quiz`;
        navigate(path);
    }
    const { auth } = useContext(Context);
    const logOut = () => {
        signOut(auth).then(() => {
            console.log('logout');
            let path = `/start`;
            navigate(path);
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
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
                    Что вы хотите сделать?
                </Typography>
                <Box component="" sx={{ mt: 1 }}>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={routeChange}>Создать новый квиз</Button>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Последний квиз</Button>
                    <Button fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={logOut}>выход</Button>
                </Box>
            </Box>
        </Container>
    )
}

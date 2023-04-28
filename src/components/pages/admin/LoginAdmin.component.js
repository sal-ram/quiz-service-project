import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Navigate } from "react-router-dom"
import { Context } from '../../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../../common/Loader.component';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userLogin } from '../../use_cases/AuthAdmin';

export default function LoginAdmin() {

    const { auth } = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signError, setSignError] = useState("");

    const theme = createTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setSignError("");
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        if (email === '') {
            setEmailError("Введите логин");
        }
        if (password === '') {
            setPasswordError("Введите пароль");
        }
        if (email && password) {
            let response = userLogin(email, password);
            response.then((result) => {
                if (result === "wrong-input") {
                    setSignError("Неверный логин и/или пароль")
                }
            })
        }
    };

    if (loading) {
        return (
            <Loader />
        )
    }

    if (user) {
        return (
            <Navigate to='/admin/home' />
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography component="h1" variant="h5">
                            Вход в систему
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Логин"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={!!emailError}
                                helperText={emailError ? emailError : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!!passwordError}
                                helperText={passwordError ? passwordError : ''}
                            />
                            {signError &&
                                <Typography variant="subtitle1" color={theme.palette.error.main} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    {signError}
                                </Typography>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Войти
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}
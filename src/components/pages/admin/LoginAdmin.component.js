import React, { useContext, useState } from 'react'
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
import { StyledButton } from './style/Button.styled';
import { StyledTitle } from './style/Title.styled';

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
                        <StyledTitle component="h1" variant="h5" sx={{ mb: "60px" }}>
                            Вход в систему
                        </StyledTitle>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                            mt: 1, display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <TextField
                                variant='outlined'
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
                                sx={{
                                    width: "530px",
                                    height: "48px",
                                    input: {
                                        background: "#E6E6E6"
                                    },
                                    fieldset: {
                                        borderRadius: "12px",
                                    },
                                    "& fieldset": { border: 'none' },
                                    mb: "30px"
                                }}
                            />
                            <TextField
                                variant='outlined'
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
                                sx={{
                                    width: "530px",
                                    height: "48px",
                                    input: {
                                        background: "#E6E6E6"
                                    },
                                    fieldset: {
                                        borderRadius: "12px",
                                    },
                                    "& fieldset": { border: 'none' },
                                    mt: "10px",
                                    mb: "30px"
                                }}
                            />

                            <Typography variant="subtitle1" color={theme.palette.error.main} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                {signError && "Неверный логин и/или пароль"}
                            </Typography>
                            <StyledButton
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: "100px",
                                    width: "139px",
                                    height: "49px"
                                }}
                            >
                                Войти
                            </StyledButton>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}
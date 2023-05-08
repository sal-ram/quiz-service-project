import * as React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Button, SvgIcon, Toolbar, Tooltip } from '@mui/material';
import { Box, Container } from '@mui/system';
import { ReactComponent as HseIcon } from '../../asserts/hse-logo.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { userLogout } from '../use_cases/AuthAdmin';


export default function Header() {
    const { auth } = React.useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    const theme = createTheme({
        typography: {
            fontSize: 44,
        }
    });

    const logOut = () => {
        userLogout();
    }

    return (
        <AppBar
            sx={{ bgcolor: 'white' }}
            elevation={0}
            position="sticky"
        >
            <Container
            >
                <Toolbar disableGutters>
                    <ThemeProvider theme={theme}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",

                            flexDirection: "row", flexGrow: 1
                        }}>
                            <SvgIcon component={HseIcon}
                                viewBox="0 0 73 73"
                                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Noto Sans',
                                    fontWeight: "900",
                                    fontSize: "44px",
                                    color: '#0F2D69',
                                    textDecoration: 'none',
                                }}
                            >
                                HSE Quiz
                            </Typography>
                        </Box>
                    </ThemeProvider>

                    {user && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip>
                            <Button
                                onClick={logOut}
                                sx={{
                                    color: "#6C6C6C",
                                    fontWeight: "700",
                                    fontSize: "18px"
                                }}
                            >
                                Выход
                                <LogoutIcon sx={{ marginLeft: "5px" }} />
                            </Button>

                        </Tooltip>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>

    );
}
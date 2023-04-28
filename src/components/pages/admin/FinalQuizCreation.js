import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Loader from '../../common/Loader.component';
import { Box, Container } from '@mui/system';
import { Button, Grid, Toolbar, Typography } from '@mui/material';

export default function FinalQuizCreation() {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/create-quiz`;
        navigate(path);
    }

    const createQuiz = async () => {
    }

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <Container>
            <Toolbar
                position="sticky"
            >
                <Grid container spacing={2}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1
                    }}>

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button variant="contained" onClick={routeChange}>назад</Button>
                        <Button variant="contained" >сохранить</Button>
                        <Button variant="contained" >начать сессию</Button>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Вопросы:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Список команд:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5">
                            Информация:
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </Container>
    )
}
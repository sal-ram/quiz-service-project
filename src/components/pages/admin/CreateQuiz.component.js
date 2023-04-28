import React, {  useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import QuestionCard from './QuestionCard.component';
import Loader from '../../common/Loader.component';
import getAllQuestions from '../../use_cases/GetAllQuestions';
import { Grid, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router';


export default function CreateQuiz() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/create-quiz-final`;
        navigate(path);
    }

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);


    const addQuestion = async () => {
    }

    useEffect(() => {
        setLoading(true);
        getAllQuestions()
            .then((result) => {
                setQuestions(result);
            })
            .then(() => {
                setLoading(false);
            });
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
                <Box sx={{
                    display: "flex",
                    flexGrow: 1
                }}>
                    <Typography component="h1" variant="h5">
                        Сборник вопросов
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Button variant="contained" onClick={routeChange}>продолжить</Button>
                </Box>

            </Toolbar>
            <Grid container spacing={2}>
                {questions.map(question =>
                    <Grid item key={question.id} >
                        <QuestionCard question={question} />
                    </Grid>
                )}
            </Grid>
            <Button variant="contained" onClick={addQuestion}>добавить вопрос</Button>
        </Container>
    )
}

import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Loader from '../../../common/Loader.component';
import { Box, Container } from '@mui/system';
import { Card, CardContent, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Toolbar, Typography } from '@mui/material';
import { StyledButton } from '../style/Button.styled';
import { StyledTitle } from '../style/Title.styled';
import QuestionCard from '../QuestionCard.component';
import getAllQuestions from '../../../use_cases/GetAllQuestions';
import getQuiz from '../../../use_cases/GetQuiz';
import { Settings } from './Settings';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../../firebase";

export default function FinalQuizCreation() {

    const typeLabels = {
        "open": "текст",
        "one": "с одним ответом",
        "multiple": "с вариантами ответа"
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/create-quiz`;
        navigate(path);
    }

    const createQuiz = async () => {
    }

    const { quizId } = useParams();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "teams"), (snapshot) => {
            const newTeams = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTeams(newTeams);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setLoading(true);
        if (quizId) {
            getQuiz(quizId)
                .then(quiz => {
                    setQuiz(quiz);
                    const questionList = Object.keys(quiz.questions).map(key => quiz.questions[key]);
                    setQuestions(questionList)
                }
                )
                .catch(error => console.error(error));
        }
        setLoading(false);
    }, []);

    const handleStart = () => {
        // навигейт кудато и отправить что-то на сервер, запустить
        let path = `/admin/active-session/${quizId}`;
        navigate(path);
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <Container>
            <Toolbar
                position="sticky"
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1
                    }}>
                        <StyledTitle component="h1" variant="h5" sx={{ fontSize: "36px", mb: 2 }}>
                            код игры - {quiz.quizCode}
                        </StyledTitle>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <StyledButton variant="contained" sx={{ marginRight: "24px", width: "155px", }} onClick={routeChange}>назад</StyledButton>
                        <StyledButton variant="contained" sx={{ marginRight: "24px", width: "155px" }} >сохранить</StyledButton>
                        <StyledButton variant="contained" onClick={handleStart}
                            sx={{ backgroundColor: "#2C5198", width: "227px", }} >начать сессию</StyledButton>
                    </Box>
                </Grid>

            </Toolbar>
            <Grid container justifyContent="space-between" direction="row">
                <Grid item>
                    <StyledTitle component="h1" variant="h5" sx={{ fontSize: "36px", mb: 2 }}>
                        Вопросы:
                    </StyledTitle>
                    <Grid container
                        rowSpacing={2} direction="column" wrap="nowrap"
                        style={{ maxHeight: '515px', overflowY: 'scroll' }}
                    >
                        {questions.map(question =>
                            <Grid item key={question.id} sx={{ mr: "5px", }} >
                                <Card
                                    sx={{
                                        width: "360px",
                                        backgroundColor: "#E6E6E6"
                                    }}
                                >
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography gutterBottom variant="h5" component="div"
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                lineHeight: "25px",
                                            }}
                                        >
                                            {question.text}
                                        </Typography>
                                        {/* <Checkbox
                                            checked={isSelected}
                                            onChange={handleChange}
                                            style={{
                                                color: "black",
                                            }}
                                        /> */}

                                    </CardContent>
                                    {/* <CssBaseline /> */}
                                    <Toolbar
                                        position="sticky"
                                        style={{ padding: 0 }}
                                    >
                                        <Box sx={{
                                            display: "flex",
                                            flexGrow: 1,
                                            marginLeft: "16px",
                                        }}>
                                            <Chip label={question.tag} sx={{ height: "24px", fontSize: "12px" }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 0 }}>
                                            <Chip label={typeLabels[question.type]} sx={{ height: "24px", fontSize: "12px", ml: "6px" }} />

                                        </Box>
                                    </Toolbar>
                                </Card>
                            </Grid>
                        )}
                    </Grid>

                </Grid>
                <Grid item>
                    <StyledTitle component="h1" variant="h5" sx={{ fontSize: "36px", }}>
                        Список команд:
                    </StyledTitle>
                    <Box sx={{
                        width: 300,
                        height: "500px",
                        borderRadius: "12px",
                        backgroundColor: "#E6E6E6",
                        overflowY: 'scroll',
                        padding: 2
                    }}>
                        {teams.map((item) =>
                            <Typography sx={{
                                fontFamily: 'Noto Sans',
                                fontStyle: "normal",
                                fontWeight: "600",
                                fontSize: "18px",
                                ml: "16px",
                            }}>
                                {item.name}
                            </Typography>
                        )}

                    </Box>

                </Grid>
                <Grid item>
                    <Settings questions={questions} />
                </Grid>
            </Grid>
        </Container>
    )
}
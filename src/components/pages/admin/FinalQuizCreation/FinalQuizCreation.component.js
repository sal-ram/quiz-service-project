import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Loader from '../../../common/Loader.component';
import { Box, Container } from '@mui/system';
import { Checkbox, FormControlLabel, FormGroup, Grid, Toolbar, Typography } from '@mui/material';
import { StyledButton } from '../style/Button.styled';
import { StyledTitle } from '../style/Title.styled';
import QuestionCard from '../QuestionCard.component';
import getAllQuestions from '../../../use_cases/GetAllQuestions';
import getQuiz from '../../../use_cases/GetQuiz';
import { Settings } from './Settings';


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
    const [quiz, setQuiz] = useState([]);
    const [questionList, setQuestionList] = useState([]);
    const [teams, setTeams] = useState([{ name: "1234" }, { name: "sdfbg" }]);

    const fetchData2 = useCallback(async () => {
        setLoading(true);
        const questions = await getAllQuestions();
        setQuestions(questions);
        const data = await getQuiz();
        setQuiz(data);
        let current_questions = [];
        console.log(quiz);
        questions.forEach(function (item, i, arr) {
            if (quiz.questions.includes(item.id)) {
                current_questions.push(item);
            }
        });
        setQuestionList(current_questions);
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            setLoading(true);
            const questions = await getAllQuestions();
            setQuestions(questions);
            const data = await getQuiz();
            setQuiz(data);
            let current_questions = [];
            console.log(quiz);
            setLoading(false);
        }

        // fetchData().catch(console.error);;

        getAllQuestions().then((result) => {
            setQuestions(result);
            setLoading(false);
            // console.log(questions);
        });

        getQuiz().then(setQuiz);

        // let current_questions = [];
        // console.log(quiz);
        // questions.forEach(function (item, i, arr) {
        //     if (quiz.questions.includes(item.id)) {
        //         current_questions.push(item);
        //     }
        // });
        // setQuestionList(current_questions);



        // getQuiz()
        //     .then((result) => {
        //         setQuiz(result);
        //     })
        //     .then(() =>
        //         getAllQuestions()
        //             .then((result) => {
        //                 setQuestions(result);
        //                 let current_questions = [];
        //                 console.log(quiz);
        //                 result.forEach(function (item, i, arr) {
        //                     // if (quiz.questions.includes(item.id)) {
        //                     //     current_questions.push(item);
        //                     // }
        //                 });
        //                 setQuestionList(current_questions);
        //             })
        //             .then(() => {
        //                 setLoading(false);
        //             }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStart = () => {
        // навигейт кудато и отправить что-то на сервер, запустить
        let path = `/admin/active-session`;
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
                sx={{ mt: 1 }}
            >
                <Grid container spacing={2}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1
                    }}>
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
                                <QuestionCard question={question}
                                // handleDelete={handleDeleteQuestion}
                                />
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
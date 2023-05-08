import React, { useState, useEffect} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledTitle } from './style/Title.styled';
import getAllTeams from '../../use_cases/GetAllTeams';
import Loader from '../../common/Loader.component';
import getQuiz from '../../use_cases/GetQuiz';
import getAllAnswers from '../../use_cases/GetAllAnswers';
import getAnswer from '../../use_cases/GetAnswer';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";

const SECONDS_TO_QUESTION = 1090;
export default function ActiveSession() {

    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);    
    let navigate = useNavigate();
    const [ timeLeft, setTimeLeft ] = useState(0);
    const [quiz, setQuiz] = useState([]);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, "answers"), (snapshot) => {
            const newAnswer= snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAnswers(newAnswer);
            console.log(newAnswer);
        });
        return () => unsubscribe();
    }, []);

    const handleFinish = () => {
        let path = `/admin/check-answers/${quizId}`;
        navigate(path);
    }

    const getTeamList = async () => {
        setTeamList(await getAllTeams());
    };

    useEffect(() => {
        setIsLoading(true);
        getTeamList();
        if (quizId) {
            getQuiz(quizId)
              .then(quiz => {setQuiz(quiz); 
                setTimer(Math.floor(quiz.time * 60));
                const questionList = Object.keys(quiz.questions).map(key => quiz.questions[key]);
                setQuestions(questionList)
            }).then(() => {
                    const endTime = localStorage.getItem(`endTime`);
                    if (endTime) {
                        const timeLeft = calculateTimeLeft(new Date(endTime));
                        setTimeLeft(timeLeft);
                        startTimer({ seconds: timeLeft, intervalCallback: setTimeLeft, endedCallback: handleTimerEnd });
                    } else {
                        const endTime = new Date(Date.now() + 1000 * timer);
                        localStorage.setItem(`endTime`, endTime);
                        setTimeLeft(timer);
                        startTimer({ seconds: timer, intervalCallback: setTimeLeft, endedCallback: handleTimerEnd });
                    }
                })
              .catch(error => console.error(error));
        }
        setIsLoading(false);
    }, []);

    const calculateTimeLeft = date => {
        const difference = (date - Date.now()) / 1000;
        return difference > 0 ? difference : 0;
    };
      
    const tickTimer = ({ endDate, intervalCallback, endedCallback }) => {
        setTimeout(() => {
          const timeLeft = calculateTimeLeft(endDate);
          if (timeLeft > 0) {
            intervalCallback(timeLeft);
            tickTimer({ endDate, intervalCallback, endedCallback });
          }
          else {
            endedCallback(timeLeft);
          }
        }, 1000);
    };

    const startTimer = ({ seconds, intervalCallback, endedCallback }) => {
        const endDate = new Date(Date.now() + 1000 * seconds);
        tickTimer({ endDate, intervalCallback, endedCallback });
    };

    const handleTimerEnd = () => {
        localStorage.removeItem(`endTime`);
    };


    if (isLoading) {
        return <Loader />; // Render loader while data is loading
    }

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const paddedSeconds = seconds.toString().padStart(2, '0');
        return `${minutes}:${paddedSeconds}`;
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
                        <StyledButton variant="contained" sx={{ marginRight: "24px", width: '131px', }} > <AccessTimeIcon />
                            {formatTime(Math.ceil(timeLeft))}
                        </StyledButton>
                        <StyledButton variant="contained" onClick={handleFinish}
                            sx={{ backgroundColor: "#2C5198", width: "269px", }} >
                            завершить сессию
                        </StyledButton>
                    </Box>
                </Grid>

            </Toolbar>
            <StyledTitle component="h1" variant="h5" sx={{mb:2}}>
                Обзор сессии:
            </StyledTitle>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Команда</h3></TableCell>
                            {questions.map((q, index) => (
                                <TableCell key={index}><h3>{index + 1}</h3></TableCell>
                            ))}
                            <TableCell><h3>Баллы</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamList.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell component="th" scope="row">
                                    {t.name}
                                </TableCell>
                                {questions.map((q, index) => (
                                    <TableCell key={index}>
                                        {getAnswer(q.id, t.id)?.text === 'correct' ? 1 : '-'}
                                    </TableCell>
                                ))}
                                <TableCell>{t.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

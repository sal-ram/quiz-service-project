import React, { useState, useEffect} from 'react'
import { useNavigate, useParams} from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledTitle } from './style/Title.styled';
import getAllTeams from '../../use_cases/GetAllTeams';
import Loader from '../../common/Loader.component';
import getQuiz from '../../use_cases/GetQuiz';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTable } from './style/Table.styled';

const SECONDS_TO_QUESTION = 1090;
export default function ActiveSession() {

    const { quizId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);    
    let navigate = useNavigate();
    const [ timeLeft, setTimeLeft ] = useState(0);
    const [quiz, setQuiz] = useState([]);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const unsubscribeAnswers = onSnapshot(collection(firestore, "answers"), (snapshot) => {
            const newAnswers = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAnswers(newAnswers);
          });
          
          const unsubscribeTeams = onSnapshot(collection(firestore, "teams"), (snapshot) => {
            const newTeams = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTeamList(newTeams);
          });
          
          return () => {
            unsubscribeAnswers();
            unsubscribeTeams();
          };
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

    const getAnswer = (a, b) => {
        const answer = JSON.parse(localStorage.getItem(`answer-${a}-${b}`));
        console.log(answer);
        if (answer !== null) {
            if (answer.text === "correct") {
                return <CheckIcon />;
            } else if (answer.text === "incorrect") {
                return <CloseIcon />;
            }
        } else  {
            return null;
        }
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
                <StyledTable sx={{ minWidth: 650, paddingTop: "30%" }} aria-label="simple table" className="styled-table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Команда</h3></TableCell>
                            {questions.map((q, index) => (
                                <TableCell key={index} className="question"><h3>{index + 1}</h3></TableCell>
                            ))}
                            <TableCell className="points"><h3>Баллы</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamList.map((t, index) => (
                            <TableRow key={t.id} className={index % 2 === 0 ? "grey-row" : ""}>
                                <TableCell component="td" scope="row">
                                    <p>{t.name}</p>
                                </TableCell>
                                {questions.map((q, index) => (
                                    <TableCell key={index} className="question">
                                        {getAnswer(t.id, index)}
                                    </TableCell>
                                ))}
                                <TableCell className="points"><p>{t.points}</p></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Container>

    )
}

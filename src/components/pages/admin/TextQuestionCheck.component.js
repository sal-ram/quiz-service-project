import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import { StyledTitle } from './style/Title.styled';
import TextQuestionCard from './TextQuestionCard';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
import TextAnswerCard from './TextAnswerCard';


export default function TextQuestionCheck() {

    const [textQuestions, setTextQuestions] = useState([]);
    const { quizId } = useParams();
    const [answers, setAnswers] = useState([]);

    let navigate = useNavigate();

    const handleFinish = () => {
        let path = `/admin/results/${quizId}`;
        navigate(path);
    }

    useEffect(() => {
        const unsubscribeAnswers = onSnapshot(collection(firestore, "answers"), (snapshot) => {
            const newAnswers = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAnswers(newAnswers);
          });
          
          return () => {
            unsubscribeAnswers();
          };
    }, []);

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
                        <StyledButton variant="contained" onClick={handleFinish}
                            sx={{ backgroundColor: "#2C5198", width: "269px", }} >
                            к результатам
                        </StyledButton>
                    </Box>
                </Grid>

            </Toolbar>
            <StyledTitle component="h1" variant="h5" sx={{ mb: 2 }}>
                Открытые вопросы:
            </StyledTitle>
            <Grid container
                spacing={{ xs: 2, md: 3 }}
                style={{ maxHeight: '355px', overflowY: 'scroll' }}
            >
                {answers.map(answer =>
                    (answer.text !== "correct" && answer.text !== "incorrect") &&
                    <Grid item key={answer.id} >
                        <TextAnswerCard answer={answer} quizId={quizId}/>
                    </Grid>
                )}
                {/* {textQuestions.map(question =>
                    <Grid item key={question.id} >
                        <TextQuestionCard question={question} />
                    </Grid>
                )} */}
            </Grid>
        </Container>
    )
}

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledTitle } from './style/Title.styled';


export default function ActiveSession() {

    const [timeLeft, setTimeLeft] = useState(300);
    const [questions, setQuestions] = useState([{}, {}]);
    // let [questionsCount, setQuestionsCount] = useState(0);
    const [teams, setTeams] = useState([{ name: "jkvre" }, { name: "jnwv" }]);

    let navigate = useNavigate();

    const handleFinish = () => {
        let path = `/admin/check-answers`;
        navigate(path);
    }

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
                        <StyledButton variant="contained" sx={{ marginRight: "24px", width: '131px', }} > <AccessTimeIcon /> {"20:59"}</StyledButton>
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
                            <TableCell>Команда</TableCell>
                            {questions.map((q, index) => {
                                <TableCell>{index}</TableCell>
                            })}
                            <TableCell>Баллы</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((t) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {t.name}
                                </TableCell>
                                <TableCell >{t.calories}</TableCell>
                                <TableCell >{t.fat}</TableCell>
                                <TableCell >{t.carbs}</TableCell>
                                <TableCell >{t.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

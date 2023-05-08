import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import { StyledTitle } from './style/Title.styled';
import TextQuestionCard from './TextQuestionCard';



export default function TextQuestionCheck() {

    const [textQuestions, setTextQuestions] = useState([]);

    let navigate = useNavigate();

    const handleFinish = () => {
        let path = `/admin/results`;
        navigate(path);
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
                {textQuestions.map(question =>
                    <Grid item key={question.id} >
                        <TextQuestionCard question={question} />
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

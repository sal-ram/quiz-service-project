import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard.component';
import Loader from '../../common/Loader.component';
import getAllQuestions from '../../use_cases/GetAllQuestions';
import { Grid, Toolbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router';
import { CreateQuestionModal, QuestionModal } from './CreateModal/CreateQuestionModal.component';
import { StyledTitle } from './style/Title.styled';
import { StyledButton } from './style/Button.styled';
import { deleteQuestion } from '../../use_cases/DeleteQuestion';
import { EditQuestionModal } from './EditModal/EditQuestionModal';


export default function CreateQuiz() {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/admin/create-quiz-final`;
        navigate(path);
    }

    const routeChangeBack = () => {
        let path = `/admin/home`;
        navigate(path);
    }

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const addQuestion = () => {
        console.log("modal");
        setCreateModal(true);
    }

    const closeCreateModal = () => { 
        console.log("close");
        setCreateModal(false);
    }

    const closeEditModal = () => {
        console.log("close");
        setEditModal(false);
    }

    const handleDeleteQuestion = (questionId) => {
        deleteQuestion(questionId);
        setLoading(true);
        getAllQuestions()
            .then((result) => {
                setQuestions(result);
            })
            .then(() => {
                setLoading(false);
            });
    }

    const handleEditQuestion = (questionId) => {
        setEditModal(true);
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
        // console.log(getAllQuestions())
        // setQuestions(questionsList);
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
                sx={{ mb: "72px", }}
            >
                <Box sx={{
                    display: "flex",
                    flexGrow: 1,
                    mt: "40px",
                }}>
                    <StyledTitle component="h1" variant="h5">
                        Сборник вопросов
                    </StyledTitle>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <StyledButton variant="contained" onClick={routeChangeBack} sx={{
                        marginRight: "24px",
                        width: "155px",
                        height: "57px",
                    }} >назад</StyledButton>
                    <StyledButton variant="contained" onClick={routeChange} sx={{
                        width: "206px",
                        height: "57px",
                    }} >продолжить</StyledButton>
                </Box>

            </Toolbar>
            <Grid container
                spacing={{ xs: 2, md: 3 }}
                style={{ maxHeight: '355px', overflowY: 'scroll' }}
            >
                {questions.map(question =>
                    <Grid item key={question.id} >
                        <QuestionCard question={question} handleDelete={handleDeleteQuestion} handleEdit={handleEditQuestion} />
                    </Grid>
                )}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: "72px",
            }}>
                <StyledButton variant="contained" onClick={addQuestion} sx={{
                    width: "286px",
                    height: "57px"
                }} >добавить вопрос</StyledButton>
            </Box>

            {createModal && <CreateQuestionModal isOpen={createModal} closeModal={closeCreateModal} />}
            {editModal && <EditQuestionModal isOpen={editModal} closeModal={closeEditModal} />}
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard.component';
import Loader from '../../common/Loader.component';
import getAllQuestions from '../../use_cases/GetAllQuestions';
import { Chip, Grid, Toolbar } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router';
import { QuestionModal } from './Modal/QuestionModal.component';
import { StyledTitle } from './style/Title.styled';
import { StyledButton } from './style/Button.styled';
import { deleteQuestion } from '../../use_cases/DeleteQuestion';
import { createQuiz } from '../../use_cases/CreateQuiz';
import { CreateQuestionModal } from './QuestionModal/CreateQuestionModal';
import { EditQuestionModal } from './QuestionModal/EditQuestionModal';


export default function CreateQuiz() {

    let navigate = useNavigate();

    const routeChangeBack = () => {
        let path = `/admin/home`;
        navigate(path);
    }

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    let [createStep, setCreateStep] = useState(1);

    const [editQuestion, setEditQuestion] = useState("");
    const [selectedQuestions, setSelected] = useState([]);

    const tags = ["физика", "химия", "игры", "программирован"];

    const prevStep = () => {
        if (createStep > 1) {
            setCreateStep(createStep - 1);
        }
    }

    const nextStep = () => {
        if (createStep < 3) {
            setCreateStep(createStep + 1);
        }
    }

    const routeChange = async () => {
        const quizQ = questions.filter((q) => selectedQuestions.includes(q.id));
        console.log("---", quizQ);
        const quiz = await createQuiz(quizQ);
        let path = `/admin/create-quiz-final/${quiz.id}`;
        navigate(path);
    }

    const handleCreateQuestion = () => {
        setCreateStep(1);
        setCreateModal(true);
    }

    const closeCreateModal = () => {
        setCreateModal(false);
    }
    const handleEditQuestion = (question) => {
        setEditModal(true);
        setEditQuestion(question);
    }
    const closeEditModal = () => {
        console.log("close");
        setEditModal(false);
        setEditQuestion("");
    }

    const fetchQuestions = () => {
        setLoading(true);
        getAllQuestions()
            .then((result) => {
                setQuestions(result);
            })
            .then(() => {
                setLoading(false);
            });
    }

    const handleDeleteQuestion = (questionId) => {
        deleteQuestion(questionId);
        fetchQuestions();
    }

    const handleSelect = (questionId, state) => {
        console.log(questionId, state);
        if (state) {
            setSelected((selectedQuestions) => [...selectedQuestions, questionId])
        } else {
            setSelected((selectedQuestions) => [...selectedQuestions.filter(e => e !== questionId)])
        }
    }

    const handleTagClick = (tag) => {

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
            {/* <Toolbar>
                {tags.map((tag) => (
                    <Chip label={tag} variant="outlined" onClick={handleTagClick} />
                ))}
            </Toolbar> */}
            <Grid container
                spacing={{ xs: 2, md: 3 }}
                style={{ maxHeight: '355px', overflowY: 'scroll' }}
            >
                {questions.map(question =>
                    <Grid item key={question.id} >
                        <QuestionCard question={question} handleDelete={handleDeleteQuestion}
                            handleEdit={handleEditQuestion} handleSelect={handleSelect}
                            selected={selectedQuestions.some(q => q === question.id)}
                        />
                    </Grid>
                )}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: "72px",
            }}>
                <StyledButton variant="contained" onClick={handleCreateQuestion} sx={{
                    width: "286px",
                    height: "57px"
                }} >добавить вопрос</StyledButton>
            </Box>

            {/* <QuestionModal step={step} prevStep={prevStep} nextStep={nextStep} isOpen={createModal} closeModal={closeCreateModal}
                fetchQuestions={fetchQuestions}
            />
            <QuestionModal step={step} prevStep={prevStep} nextStep={nextStep} isOpen={editModal} closeModal={closeEditModal}
                fetchQuestions={fetchQuestions} questionInfo={editQuestion}
            /> */}
            <CreateQuestionModal step={createStep} nextStep={nextStep} prevStep={prevStep}
                isOpen={createModal} closeModal={closeCreateModal}
                fetchQuestions={fetchQuestions}
            />
            <EditQuestionModal 
                isOpen={editModal} closeModal={closeEditModal}
                fetchQuestions={fetchQuestions}
                questionInfo={editQuestion}
            />
        </Container>
    )
}

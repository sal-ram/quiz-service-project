import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import getQuestion from '../../use_cases/GetQuestion';
import Loader from '../../common/Loader.component';
import getQuiz from '../../use_cases/GetQuiz';
import getAllTeams from '../../use_cases/GetAllTeams';
import getTeam from '../../use_cases/GetTeam';
import { Button, Checkbox, Chip, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, TextField } from '@mui/material';
import { StyledButton } from './style/Button.styled';

export default function TextAnswerCard({ answer, quizId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState();
  const [questionList, setQuestionList] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const getQuestionText = (index) => {
    const question = questionList.find(question => question.id === index);
    if (question && question.text !== null) {
      return <div>{question.text}</div>;
    } else {
      return null;
    }
  }

  const getTeamName = async () => {
    const team = await getTeam(answer.teamId);
    setTeamName(team.name);
  }

  useEffect(() => {
    setIsLoading(true);
    if (quizId) {
      getQuiz(quizId)
        .then(quiz => {
          setQuiz(quiz);
          const questionList = Object.keys(quiz.questions).map(key => quiz.questions[key]);
          setQuestionList(questionList);
        })
        .catch(error => console.error(error));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getTeamName();
    setIsLoading(false);
  }, [answer.teamId]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

  return (
    <>
        <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {getQuestionText(answer.questionId)}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {answer.text}
                </DialogContentText>
                Кол-во баллов
                <TextField
                    autoFocus
                    margin="dense"
                    id="points"
                    type="number"
                    value={points}
                    onChange={(event) => setPoints(event.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>

                <StyledButton onClick={() => setIsModalOpen(false)}>подтвердить</StyledButton>
            </DialogActions>
        </Dialog>
      <Card
        sx={{
          width: "360px",
          backgroundColor: "#E6E6E6",
          cursor: "pointer",
        }}
        onClick={handleModalOpen}
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
            {getQuestionText(answer.questionId)}
          </Typography>
        </CardContent>
        <Toolbar
          position="sticky"
          style={{ padding: 0 }}
        >
          <Box sx={{
            display: "flex",
            flexGrow: 1,
            marginLeft: "16px",
          }}>
            <Chip label={teamName} sx={{ height: "24px", fontSize: "12px" }} />
          </Box>
            <Box sx={{ flexGrow: 0 }}>
                        <Chip label={answer.text} sx={{ height: "24px", fontSize: "12px", ml: "6px" }} />

                    </Box>
                </Toolbar>
            </Card>
        </>
    );
}
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, TextField, FormGroup } from '@mui/material';
import addAnswer from '../../use_cases/AddAnswer';
import addPoints from '../../use_cases/AppPoints';
import Loader from '../../common/Loader.component';
import "../../../styles/TeamContest.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import getQuizByCode from '../../use_cases/GetQuizByCode';

const SECONDS_TO_QUESTION = 1090;

function TeamContest() {
    let { teamId, quizCode } = useParams();
    const [questionList, setQuestionList] = useState([]);
    const [quiz, setQuiz] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ timeLeft, setTimeLeft ] = useState(0);
    const [timer, setTimer] = useState(0);
    let navigate = useNavigate();
    let storedAnswer;

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
        localStorage.removeItem(`endTime-${teamId}`);
    };

    useEffect(() => {
        setIsLoading(true);
        if (quizCode) {
            getQuizByCode(quizCode)
              .then(quiz => {setQuiz(quiz); 
                const questionList = Object.keys(quiz.questions).map(key => quiz.questions[key]);
                setQuestionList(questionList);
                setTimer(Math.floor(timer * 60))})
              .catch(error => console.error(error));
        }
        setIsLoading(false);
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

        storedAnswer = localStorage.getItem(`answer-${teamId}-${currentQuestionIndex}`);
        console.log(storedAnswer);
        if (storedAnswer) {
            setSelectedOptions(JSON.parse(storedAnswer));
            setIsSubmitted(true);
        }
    }, [teamId]);

    let currentQuestion = questionList[currentQuestionIndex];

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((nextIndex) => nextIndex + 1);
        storedAnswer = localStorage.getItem(`answer-${teamId}-${currentQuestionIndex + 1}`);
        console.log(storedAnswer);
        if (storedAnswer) {
            setSelectedOptions(JSON.parse(storedAnswer));
            setIsSubmitted(true);
        } else {
            setSelectedOptions([]);
            setIsSubmitted(false);
        }
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        storedAnswer = localStorage.getItem(`answer-${teamId}-${currentQuestionIndex - 1}`);
        console.log(storedAnswer);
        if (storedAnswer) {
            setSelectedOptions(JSON.parse(storedAnswer));
            setIsSubmitted(true);
        } else {
            setSelectedOptions([]);
            setIsSubmitted(false);
        }
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        let isCorrect = false;
        console.log(selectedOptions);
        console.log(currentQuestion.correctAnswer);
        localStorage.setItem(`answer-${teamId}-${currentQuestionIndex}`, JSON.stringify(selectedOptions));
        if (currentQuestion.type === 'open') {
            addAnswer(teamId, currentQuestion.id, selectedOptions[0]);
        } else if (currentQuestion.type === 'one') {
            isCorrect = selectedOptions == currentQuestion.correctAnswer;
        } else {
            isCorrect = JSON.stringify(selectedOptions) === JSON.stringify(currentQuestion.correctAnswer);
        }
        if (!isCorrect && !currentQuestion.type === 'open') {
            // alert(`Неправильно. Правильный ответ: ${currentQuestion.correctAnswer}`);
            addAnswer(teamId, currentQuestion.id, "incorrect");
        } else {
            // alert("Правильно!");
            addAnswer(teamId, currentQuestion.id, "correct");
            console.log(currentQuestion.points);
            addPoints(teamId, currentQuestion.points);
        }
        setIsSubmitted(true);
        console.log(selectedOptions);
    };

    const handleOptionChange = (e) => {
        if (currentQuestion.type === 'open') {
            setSelectedOptions([e.target.value]);
        } else if (currentQuestion.type === 'one') {
            setSelectedOptions([e.target.value]);
        } else {
            let updatedAnswers = [...selectedOptions];
            if (e.target.checked) {
                updatedAnswers.push(e.target.value);
            } else {
                updatedAnswers = updatedAnswers.filter((answer) => answer !== e.target.value);
            }
            setSelectedOptions(updatedAnswers);
        }
    };

    const handleCompleteButton = () => {
        localStorage.clear();
        navigate(`/team/waiting/${quizCode}/${teamId}`);
    }

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
        <div className='contest-background'>
            <div className='contest-header'>
                {currentQuestionIndex === questionList.length - 1 && (
                    <button onClick={handleCompleteButton}>
                        Завершить
                    </button>
                )}
                <div className='timer'>
                    {formatTime(Math.ceil(timeLeft))}
                </div>
            </div>
            <div className='contest'>
                {currentQuestionIndex != 0 && (
                    <button className="arrow" onClick={handlePrevQuestion}>
                    <ArrowBackIcon fontSize="large" sx={{ color: '#6C6C6C' }}/>
                    </button>
                )}
                <div className='contest-block'>
                    <h1>Вопрос {currentQuestionIndex + 1}</h1>
                    <div className='question-block'>
                        {currentQuestion && (
                            <div component="answer-block">
                                <p>{currentQuestion.text}</p>
                                {currentQuestion.type === 'open' && (
                                    <textarea
                                        value={selectedOptions[0] || ''}
                                        onChange={handleOptionChange}
                                        label="Введите ответ"
                                        variant="outlined"
                                        disabled={isSubmitted}
                                        placeholder='Text'
                                    />
                                )}
                                {currentQuestion.type === 'one' && (
                                    <RadioGroup
                                        value={selectedOptions[0] || ''}
                                        onChange={handleOptionChange}
                                        disabled={isSubmitted}
                                    >
                                        {currentQuestion.answers.map((answer) => (
                                            <FormControlLabel
                                                key={answer}
                                                value={answer}
                                                control={<Radio disabled={isSubmitted} />}
                                                label={answer}
                                            />
                                        ))}
                                    </RadioGroup>
                                )}
                                {currentQuestion.type === 'multiple' && (
                                    <FormControl component="fieldset">
                                        <FormGroup>
                                            {currentQuestion.answers.map((answer) => (
                                                <FormControlLabel
                                                    key={answer}
                                                    control={<Checkbox
                                                        value={answer}
                                                        onChange={handleOptionChange}
                                                        checked={selectedOptions && selectedOptions.includes(answer)}
                                                        disabled={isSubmitted}
                                                    />}
                                                    label={answer}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                )}
                            </div>
                        )}
                        <button
                            variant="contained"
                            onClick={handleSubmitAnswer}
                            disabled={isSubmitted}>
                            отправить ответ
                        </button>
                    </div>
                </div>
                {currentQuestionIndex != questionList.length - 1 && (
                    <button className="arrow" onClick={handleNextQuestion}>
                        <ArrowForwardIcon fontSize="large" sx={{ color: '#6C6C6C' }}/>
                    </button>
                )} 
            </div>
            {timeLeft <= 0
                ? <Navigate to={`/team/results/${teamId}`} />
                : null
            }
        </div>
    );
}

export default TeamContest;
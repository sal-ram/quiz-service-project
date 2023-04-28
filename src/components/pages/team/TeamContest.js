import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import getAllQuestions from '../../use_cases/GetAllQuestions';
import { Button, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, TextField, FormGroup } from '@mui/material';
import addAnswer from '../../use_cases/AddAnswer';
import addPoints from '../../use_cases/AppPoints';
import Loader from '../../../Loader.component';

function TeamContest() {
    let { teamId } = useParams();
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    let navigate = useNavigate();
    
    const getQuestionList = async () => {
        setIsLoading(true); 
        setQuestionList(await getAllQuestions());
        setIsLoading(false); 
    };
    
    useEffect(() => {
        getQuestionList();
    }, []);

    let currentQuestion = questionList[currentQuestionIndex];

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOptions([]);
        setIsSubmitted(false);
    };
    
    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        setSelectedOptions([]);
        setIsSubmitted(false);
    };

    const handleSubmitAnswer = (e) => {
        e.preventDefault();
        let isCorrect = false;
        console.log(selectedOptions);
        console.log(currentQuestion.correctAnswer);
        if (currentQuestion.type === 'open') {
            addAnswer(teamId, currentQuestion.id, selectedOptions[0]);
        } else if (currentQuestion.type === 'one') {
            isCorrect = selectedOptions == currentQuestion.correctAnswer;
        } else {
            isCorrect = JSON.stringify(selectedOptions) === JSON.stringify(currentQuestion.correctAnswer);
        }
        if (!isCorrect && !currentQuestion.type === 'open') {
            alert(`Неправильно. Правильный ответ: ${currentQuestion.correctAnswer}`);
            addAnswer(teamId, currentQuestion.id, "incorrect");
          } else {
            alert("Правильно!");
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

    if (isLoading) {
        return <Loader />; // Render loader while data is loading
    }

    return (
        <div>
            <h1>Вопрос {currentQuestionIndex + 1}</h1>
            {currentQuestion && (
                <FormControl component="fieldset">
                    <p>{currentQuestion.text}</p>
                    {currentQuestion.type === 'open' && (
                        <TextField
                            value={selectedOptions[0] || ''}
                            onChange={handleOptionChange}
                            label="Введите ответ"
                            variant="outlined"
                            fullWidth
                            disabled={isSubmitted}
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
                                    control={<Radio  disabled={isSubmitted}/>}
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
                    <Button
                        variant="contained"
                        onClick={handleSubmitAnswer}
                        disabled={!selectedOptions.length || isSubmitted}
                    >
                        Submit
                    </Button>
                </FormControl>
            )}
            <Button disabled={currentQuestionIndex === 0} onClick={handlePrevQuestion}>
                Previous question
            </Button>
            <Button disabled={currentQuestionIndex === questionList.length - 1} onClick={handleNextQuestion}>
                Next question
            </Button>
            {currentQuestionIndex === questionList.length - 1 && (
                <Button onClick={() => navigate(`/team/results/${teamId}`)}>Завершить</Button>
            )}
        </div>
    );
}

export default TeamContest;
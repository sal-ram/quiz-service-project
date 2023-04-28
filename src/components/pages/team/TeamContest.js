import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import getAllQuestions from '../../use_cases/GetAllQuestions';

function TeamContest() {
    let { teamId } = useParams();
    const [questionText, setQuestionText] = useState('');
    const [questionList, setQuestionList] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const getQuestionList = async () => {
        setQuestionList(await getAllQuestions());
    };
    
    useEffect(() => {
        getQuestionList();
        console.log(questionList);
    }, []);

    let currentQuestion = questionList[currentQuestionIndex];

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };
    
    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div>
            <h1>Вопрос {currentQuestionIndex + 1}</h1>
            {currentQuestion && (
                <p>{currentQuestion.text}</p>
            )}
            <button disabled={currentQuestionIndex === 0} onClick={handlePrevQuestion}>
                Previous question
            </button>
            <button disabled={currentQuestionIndex === questionList.length - 1} onClick={handleNextQuestion}>
                Next question
            </button>
            {currentQuestionIndex === questionList.length - 1 && (
                <button>Завершить</button>
            )}
        </div>
    );
}

export default TeamContest;
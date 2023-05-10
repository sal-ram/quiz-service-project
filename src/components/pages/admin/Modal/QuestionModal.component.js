import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChoseType } from './ChoseType';
import { QuestionInput } from './QuestionInput';
import { TagsInput } from './TagsInput';
import { createQuestion } from '../../../use_cases/CreateQuestion';
import updateQuestion from '../../../use_cases/UpdateQuestion';

export const QuestionModal = ({ step, prevStep, nextStep, isOpen, closeModal, fetchQuestions, questionInfo }) => {

    const [newQuestion, setNewQuestion] = useState(
        {
            order: "",
            text: "",
            tag: "",
            answers: "",
            correctAnswer: "",
            points: "",
            type: ""
        }
    );

    const handleChange = (p, value) => {
        console.log(p, value);
        setNewQuestion((newQuestion) => ({ ...newQuestion, ...{ [p]: value } }));
        console.log(newQuestion);
    }

    // const { value, required, onChange, disabled, onFocus, onBlur } = useFormControlContext();

    useEffect(() => {
        console.log("fetch");
        setNewQuestion({
            order: "",
            text: "",
            tag: "",
            answers: "",
            correctAnswer: "",
            points: "",
            type: ""
        });
        // console.log(isOpen);
    }, []);



    // const handleCreateQuestion = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log("data");
    //     console.log(data);
    //     // createQuestion(newQuestion);
    //     // fetchQuestions();
    // };

    const handleCreateQuestion = () => {

        console.log(newQuestion);
        createQuestion(newQuestion);
        fetchQuestions();
    };

    const handleEditQuestion = (qId) => {
        console.log("the");
        console.log(newQuestion);
        updateQuestion(qId,newQuestion)
        fetchQuestions();
    }

    // const handleSubmit = questionInfo ? handleEditQuestion : handleCreateQuestion;

    const renderSwitch = (step) => {
        switch (step) {
            case 1:
                return <ChoseType nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={questionInfo ? questionInfo :newQuestion} />;
            case 2:
                return <QuestionInput nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={questionInfo ? questionInfo : newQuestion}
                    handleEditQuestion={handleEditQuestion}
                    closeModal={closeModal}
                />;
            case 3:
                return <TagsInput nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={questionInfo ? questionInfo : newQuestion} closeModal={closeModal}
                    createQuestion={handleCreateQuestion}
                />;
            default:

        };
    }


    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {renderSwitch(step)}
        </Dialog>
    );
}

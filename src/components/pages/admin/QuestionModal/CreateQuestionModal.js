import { Dialog } from "@mui/material";
import React from "react"
import { QInputOne } from "../Modal/QInputOne";
import { QInputMultiple } from "../Modal/QInputMultiple";
import { QInputOpen } from "../Modal/QInputOpen";
import { useState } from "react";
import { ChoseType } from "../Modal/ChoseType";
import { QuestionInput } from "../Modal/QuestionInput";
import { TagsInput } from "../Modal/TagsInput";
import { createQuestion } from "../../../use_cases/CreateQuestion";

export const CreateQuestionModal = ({ step, prevStep, nextStep, isOpen, closeModal, fetchQuestions }) => {

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
        setNewQuestion((newQuestion) => ({ ...newQuestion, ...{ [p]: value } }));
        console.log(newQuestion);
    }

    const handleCreateQuestion = () => {
        console.log(newQuestion);
        createQuestion(newQuestion);
        fetchQuestions();
    };


    const renderSwitch = (step) => {
        switch (step) {
            case 1:
                return <ChoseType nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={newQuestion}
                />;
            case 2:
                return <QuestionInput nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={newQuestion}
                    // handleEditQuestion={handleEditQuestion}
                    closeModal={closeModal}
                />;
            case 3:
                return <TagsInput nextStep={nextStep} prevStep={prevStep}
                    handleChange={handleChange}
                    values={newQuestion}
                    closeModal={closeModal}
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
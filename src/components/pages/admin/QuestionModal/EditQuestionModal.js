import React from "react"
import { Dialog } from "@mui/material";
import { EditInput } from "./EditInput";
import { useState } from "react";
import updateQuestion from "../../../use_cases/UpdateQuestion";
import { useEffect } from "react";

export const EditQuestionModal = ({ isOpen, closeModal, fetchQuestions, questionInfo }) => { 

    let [values, setValues] = useState({
        order: "",
        text: "",
        tag: "",
        answers: "",
        correctAnswer: "",
        points: "",
        type: ""
    });

    // useEffect

    const handleChange = (p, value) => {
        setValues((values) => ({ ...values, ...{ [p]: value } }));
        console.log(values);
    }

    const handleEditQuestion = (qId) => {
        console.log("the");
        console.log(values);
        updateQuestion(qId, values)
        fetchQuestions();
    }


    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <EditInput values={values} handleChange={handleChange} />
        </Dialog>
    );
}
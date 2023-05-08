import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { createQuestion } from '../../../use_cases/CreateQuestion';
import { Steps } from './Steps';
import { ChoseType } from './ChoseType';
import { QuestionInput } from './QuestionInput';
import { TagsInput } from './TagsInput';

export const CreateQuestionModal = (isOpen, closeModal) => {

    // const modalTitle = (type === "CREATE") ? "Добавление вопроса" : "Редактирование вопроса";

    // const [isOpen, setIsOpen] = useState(true);

    let [step, setStep] = useState(1);

    const prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    const nextStep = () => {
        console.log(step);
        setStep(step++);
        console.log(step);
    }

    const handleChange = (p, value) => {
        setNewQuestion({ ...newQuestion, ...{ [p]: value } });
    }

    const [newQuestion, setNewQuestion] = useState({
        order: "",
        text: "",
        tag: "",
        answers: "",
        correctAnswer: "",
        points: "",
        type: ""
    });

    // useEffect(() => {
    //     //Runs only on the first render
    // }, [step]);


    // const onFinishCreate = useCallback(
    //     (values: CreateValues): void => {
    //         createSessionAction({
    //             ...values,
    //             duration: moment(values.duration).format('HH:mm'),
    //             startDate: moment(values.startDate),
    //             endDate: moment(values.endDate)
    //         });
    //         onClose();
    //     },
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     [createSessionAction]
    // );

    const handleClose = () => {
        // setIsOpen(false);
        closeModal();
    };

    const handleCreateQuestion = () => {
        setNewQuestion({ ...newQuestion });
        console.log(newQuestion);
        createQuestion(newQuestion);
    };

    const renderSwitch= (step)=> {
        switch (step) {
            case 1:
                return <ChoseType nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />;
            case 2:
                return <QuestionInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />;
            case 3:
                return <TagsInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />;
            default:
                
        };
    }

    return (
        <Dialog
            open={isOpen}
            // onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {/* <Steps state={state} nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} /> */}
            {/* {step === 1 && <ChoseType nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />}
            {step === 2 && <QuestionInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />}
            {step === 3 && <TagsInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={newQuestion} />} */}
            {renderSwitch(step)}
            {/* <DialogActions>
                <Button onClick={() => { deleteQuestion(question.id); setOpenDelete(false) }} autoFocus>
                    да
                </Button>
                <Button onClick={() => setOpenDelete(false)}>нет</Button>
            </DialogActions> */}
        </Dialog>
    );
}

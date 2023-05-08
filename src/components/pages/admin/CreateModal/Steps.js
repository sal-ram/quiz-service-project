import React from 'react';
import { ChoseType } from './ChoseType';
import { QuestionInput } from './QuestionInput';
import { TagsInput } from './TagsInput';

export const Steps = ({step, nextStep, prevStep, handleChange, values}) => {
    switch (step) {
        case 1:
            console.log(1);
            return (
                <ChoseType nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
            )
        case 2:
            return (
                <QuestionInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
            )
        case 3:
            return (
                <TagsInput nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
            )

        default:
    }

};

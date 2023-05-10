import QuestionStore from '../store/QuestionStore';

const updateQuestion = (qId, newQuestion) => {
    return new QuestionStore().update(qId, newQuestion);
};

export default updateQuestion;
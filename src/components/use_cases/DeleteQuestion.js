import QuestionStore from '../store/QuestionStore';

export const deleteQuestion = (questionId) => {
    return new QuestionStore().delete(questionId);
}
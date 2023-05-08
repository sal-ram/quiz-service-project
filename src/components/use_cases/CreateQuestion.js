import QuestionStore from '../store/QuestionStore';

export const createQuestion = (questionObj) => {
    return new QuestionStore().create({ ...questionObj });
}
import AnswerStore from '../store/AnswerStore';

const getAnswer = (teamId, questionId) => {
    return new AnswerStore().get(teamId, questionId);
};

export default getAnswer;
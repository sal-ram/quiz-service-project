import AnswerStore from '../store/AnswerStore';

const getAnswer = (teamId, questionId) => {
    const is =  new AnswerStore().get(teamId, questionId);
    console.log(is);
    return is;
};

export default getAnswer;
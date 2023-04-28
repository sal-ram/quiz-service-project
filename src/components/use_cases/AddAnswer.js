import AnwerStore from '../store/AnswerStore';

const addAnswer = (teamId, questionId, text) => {
  return new AnwerStore().create(teamId, questionId, text);
};

export default addAnswer;
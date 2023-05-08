import AnswerStore from '../store/AnswerStore';

const getAllAnswers = () => {
  return new AnswerStore().getAll();
};

export default getAllAnswers;
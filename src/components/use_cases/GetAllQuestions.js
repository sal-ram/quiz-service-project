import QuestionStore from '../store/QuestionStore';

const getAllQuestions = () => {
  return new QuestionStore().getAll();
};

export default getAllQuestions;
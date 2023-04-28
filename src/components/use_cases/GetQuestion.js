import QuestionStore from '../store/QuestionStore';

const getQuestion = (questionId) => {
  return new QuestionStore().get(questionId);
};

export default getQuestion;
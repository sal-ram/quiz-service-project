import QuizStore from "../store/QuizStore";

const getQuiz = (quizId) => {
    return new QuizStore().get(quizId);
};

export default getQuiz;
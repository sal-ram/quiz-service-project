import QuizStore from "../store/QuizStore";

const getQuizByCode = (quizCode) => {
    return new QuizStore().getByCode(quizCode);
};

export default getQuizByCode;
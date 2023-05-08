import QuizStore from "../store/QuizStore";

const getQuiz = () => {
    return new QuizStore().get();
};

export default getQuiz;
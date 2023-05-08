import QuizStore from '../store/QuizStore';

export const createQuiz = (questions) => {
    return new QuizStore().create({ ...questions });
}
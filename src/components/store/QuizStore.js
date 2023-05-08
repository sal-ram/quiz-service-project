import BaseStore from './BaseStore';
import { collection, doc, getDoc, addDoc, onSnapshot, query, limit, where, getDocs, updateDoc, orderBy, deleteDoc, setDoc } from "firebase/firestore";

class QuizStore extends BaseStore {

    async create(questions) {
        const shortCode = String(Math.floor(Math.random() * Math.floor(9999)));
        console.log(shortCode);
        const quizRef = await addDoc(collection(this.firestore, "quizes"), {
            questions: questions,
            state: 'NOTSTARTED',
            time: 0,
            quizCode: shortCode 
        });
        console.log(quizRef);
        const quizSnapshot = await getDoc(quizRef);
        console.log(quizSnapshot);
        return this._convertDocToQuiz(quizSnapshot);
    }

    async get(quizId) {
        const quizRef = doc(collection(this.firestore, "quizes"), quizId);
        const quizSnapshot = await getDoc(quizRef);
        return this._convertDocToQuiz(quizSnapshot);
    }

    async getByCode(quizCode) {
        const querySnapshot = await getDocs(
            query(collection(this.firestore, 'quizes'), 
                  where('quizCode', '==', quizCode),
            )
          );
        if (querySnapshot.empty) {
            return null;
        }
        const docSnapshot = querySnapshot.docs[0];
        return this._convertDocToQuiz(docSnapshot);
    }


    _convertDocToQuiz(quizDoc) {
        const quizData = quizDoc.data();
        return {
          id: quizDoc.id,
          questions: quizData.questions,
          state: quizData.state,
          time: quizData.time,
          quizCode: quizData.quizCode
        };
    }
}
export default QuizStore;
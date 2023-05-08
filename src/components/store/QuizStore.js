import BaseStore from './BaseStore';
import { collection, doc, getDoc, addDoc, onSnapshot, query, limit, where, getDocs, updateDoc, orderBy, deleteDoc, setDoc } from "firebase/firestore";

class QuizStore extends BaseStore {

    async get() {
        const questionsRef = collection(this.firestore, 'quizes');
        let questionsQuery = doc(questionsRef, "current-quiz");
        const questionsSnapshot = await getDoc(questionsQuery);
        // const quiz = questionsSnapshot.docs.map(doc => this._convertDocToQuestion(doc));
        // this.questionsList = questions;
        console.log(questionsSnapshot.data())
        return questionsSnapshot.data();
    }

    async getTeams() {
        const questionsRef = collection(this.firestore, 'quizes');
        let questionsQuery = doc(questionsRef, "current-quiz");
        const questionsSnapshot = await getDoc(questionsQuery);
        
    }

}
export default QuizStore;
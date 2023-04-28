import BaseStore from './BaseStore';
import { collection, doc, getDoc, addDoc, onSnapshot, query, limit, where, getDocs, updateDoc, orderBy} from "firebase/firestore";

class QuestionStore extends BaseStore {
  async get(questionId) {
    const questionRef = doc(collection(this.firestore, "questions"), questionId);
    const questionSnapshot = await getDoc(questionRef);
    return this._convertDocToQuestion(questionSnapshot);
  }

  async getAll() {
    const questionsRef = collection(this.firestore, 'questions');
    let questionsQuery = query(questionsRef, orderBy('order'));  
    const questionsSnapshot = await getDocs(questionsQuery);
    const questions = questionsSnapshot.docs.map(doc => this._convertDocToQuestion(doc));
    return questions;
  }

  _convertDocToQuestion(questionDoc) {
    const questionData = questionDoc.data();
    return {
      id: questionDoc.id,
      order: questionData.order,
      text: questionData.text,
      type: questionData.type,
      answers: questionData.answers,
      correctAnswer: questionData.correctAnswer,
      points: questionData.points
    };
  }
}

export default QuestionStore;
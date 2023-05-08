import BaseStore from './BaseStore';
import { collection, getDoc, addDoc, query, where, getDocs} from "firebase/firestore";

class AnwerStore extends BaseStore {
  async get(teamId, questionId) {
    const querySnapshot = await getDocs(
        query(collection(this.firestore, 'answers'), 
              where('teamId', '==', teamId),
              where('questionId', '==', questionId)
        )
      );
      if (querySnapshot.empty) {
        return null;
      }
      const docSnapshot = querySnapshot.docs[0];
      console.log(teamId);
      return this._convertDocToAnswer(docSnapshot);
  }

  async create(teamId, questionId, text) {
    const answerRef = await addDoc(collection(this.firestore, "answers"), {
        teamId: teamId,
        questionId: questionId,
        text: text
    });
    const answerSnapshot = await getDoc(answerRef);
    console.log(answerSnapshot);
    return this._convertDocToAnswer(answerSnapshot);
  }

  async getAll() {
    const answersRef = collection(this.firestore, 'answers');
    const answersQuery = query(answersRef);
    const answersSnapshot = await getDocs(answersQuery);

    const answers = answersSnapshot.docs.map((doc) => this._convertDocToAnwers(doc));

    return answers;
  }
  
  _convertDocToAnswer(answerDoc) {
    const answerData = answerDoc.data();
    return {
      id: answerDoc.id,
      questionId: answerData.order,
      teamId: answerData.text,
      text: answerData.type
    };
  }
}

export default AnwerStore;
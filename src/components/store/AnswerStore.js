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
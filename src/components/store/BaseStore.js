import { auth, firestore } from "../../firebase";

class BaseStore {
  constructor(props) {
    this.firestore = firestore;
    this.auth = auth;
    // this.questionsList = [];
  }
}

export default BaseStore;
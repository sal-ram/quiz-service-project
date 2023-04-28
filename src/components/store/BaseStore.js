import { firestore } from "../../firebase";

class BaseStore {
  constructor(props) {
    this.firestore = firestore;
  }
}

export default BaseStore;
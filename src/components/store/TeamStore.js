import BaseStore from './BaseStore';
import { collection, doc, getDoc, addDoc, onSnapshot, query, limit, where, getDocs, updateDoc} from "firebase/firestore";

class TeamStore extends BaseStore {
  async get(teamId) {
    const teamRef = doc(collection(this.firestore, "teams"), teamId);
    const teamSnapshot = await getDoc(teamRef);
    return this._convertDocToTeam(teamSnapshot);
  }

  async create(teamName) {
    const teamsRef = collection(this.firestore, 'teams');
    const existingTeamQuery = query(teamsRef, where('name', '==', teamName));
    const existingTeamSnapshot = await getDocs(existingTeamQuery);
    if (!existingTeamSnapshot.empty) {
      throw new Error('A team with this name already exists.');
    }
    const teamRef = await addDoc(teamsRef, {name: teamName, points: 0});
    const teamSnapshot = await getDoc(teamRef);
    console.log(teamSnapshot);
    return this._convertDocToTeam(teamSnapshot);
  }

  async update(teamId, newName) {
    const teamsRef = collection(this.firestore, 'teams');
    const existingTeamQuery = query(teamsRef, where('name', '==', newName));
    const existingTeamSnapshot = await getDocs(existingTeamQuery);
    if (!existingTeamSnapshot.empty) {
      throw new Error(`A team with the name ${newName} already exists.`);
    }
    const teamRef = doc(collection(this.firestore, "teams"), teamId);
    let teamSnapshot = await getDoc(teamRef);
    const updatedTeamSnapshot = await updateDoc(teamRef, { name: newName});
    teamSnapshot = await getDoc(teamRef);
    return this._convertDocToTeam(teamSnapshot);
  }

  async addPoints(teamId, points) {
    const teamRef = doc(collection(this.firestore, "teams"), teamId);
    let teamSnapshot = await getDoc(teamRef);
    console.log(teamSnapshot.data().points + points);
    let newPoints = teamSnapshot.data().points + points;
    const updatedTeamSnapshot = await updateDoc(teamRef, {
      points: newPoints
    });
    teamSnapshot = await getDoc(teamRef);
    console.log(teamSnapshot.data());
    return this._convertDocToTeam(teamSnapshot);
  }

  async list(){
    const teamsRef = collection(this.firestore, 'teams');
    const teamsQuery = query(teamsRef);
    const teamsSnapshot = await getDocs(teamsQuery);

    const teams = teamsSnapshot.docs.map((doc) => this._convertDocToTeam(doc));

    return teams;
  }

  _convertDocToTeam(teamDoc) {
    const teamData = teamDoc.data();
    return {
      id: teamDoc.id,
      name: teamData.name,
      points: teamData.points
    };
  }
}

export default TeamStore;
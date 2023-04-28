import TeamStore from '../store/TeamStore';

const getAllTeams = () => {
  return new TeamStore().list();
};

export default getAllTeams;
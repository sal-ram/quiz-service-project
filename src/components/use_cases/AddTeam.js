import TeamStore from '../store/TeamStore';

const addTeam = (teamName) => {
  return new TeamStore().create(teamName);
};

export default addTeam;
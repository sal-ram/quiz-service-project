import TeamStore from '../store/TeamStore';

const getTeam = (teamId) => {
  return new TeamStore().get(teamId);
};

export default getTeam;
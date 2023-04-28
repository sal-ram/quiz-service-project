import TeamStore from '../store/TeamStore';

const updateTeam = (teamId, teamName) => {
  return new TeamStore().update(teamId, teamName);
};

export default updateTeam;
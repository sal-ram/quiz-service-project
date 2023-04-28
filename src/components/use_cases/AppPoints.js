import TeamStore from '../store/TeamStore';

const addPoints = (teamId, points) => {
  return new TeamStore().addPoints(teamId, points);
};

export default addPoints;
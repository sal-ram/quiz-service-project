import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getTeam from '../../use_cases/GetTeam';
import updateTeam from '../../use_cases/UpdateTeam';
import { Button } from '@mui/material';
import getAllTeams from '../../use_cases/GetAllTeams';

const TeamMainPage = () => {
  const [teamName, setTeamName] = useState('');
  const { teamId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const getTeamList = async () => {
    setTeamList(await getAllTeams());
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const team = await updateTeam(teamId, teamName);
    setTeamName(team.name);
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (teamId) {
      getTeam(teamId)
        .then(team => setTeamName(team.name))
        .catch(error => console.error(error));
    }
  }, [teamId]);

  return (
    <div className='main'>
      <h2>Ваше команда:</h2>
      {isEditing ? (
        <input type="text" value={teamName} onChange={handleInputChange} />
      ) : (
        <div>{teamName}</div>
      )}
      {isEditing ? (
        <div>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEditClick}>Edit</Button>
      )}
      <h2>Список активных команд:</h2>
      <div>
        {teamList.map((team) => (
        <h3>
          {team.name}
        </h3>
        ))}
      </div>
      <h2>Сессия еще не началась</h2>
    </div>
  );
};
  
export default TeamMainPage;
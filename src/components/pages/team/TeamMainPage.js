import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getTeam from '../../use_cases/GetTeam';
import updateTeam from '../../use_cases/UpdateTeam';
import { Button } from '@mui/material';
import getAllTeams from '../../use_cases/GetAllTeams';
import Loader from '../../common/Loader.component';

const TeamMainPage = () => {
  const [teamName, setTeamName] = useState('');
  const { teamId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getTeamList = async () => {
    setIsLoading(true);
    setTeamList(await getAllTeams());
    setIsLoading(false);
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (teamName.trim() === '') {
      setError('Введите название');
    } else if (teamName.length < 3) {
      setError('Слишком короткое. Должно быть не менее 3 символов.');
    } else if (teamName.length > 32) {
      setError('Слишком длинное. Должно быть не более 32 символов.');
    } else {
      try {
        const team = await updateTeam(teamId, teamName);
        setTeamName(team.name);
        setIsEditing(false);
        setError('');
      } catch (error) {
        console.log(error);
        setError('Такое имя уже существует. Введите другое, пожалуйста.');
      }
    }
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

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

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
          <>
            {team.id != teamId && (
              <h3>{team.name}</h3>
            )}
          </>
        ))}
      </div>
      {error && <div>{error}</div>}
      <h2>Сессия еще не началась</h2>
    </div>
  );
};

export default TeamMainPage;
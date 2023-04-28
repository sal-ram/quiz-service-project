import { Button, FormControl, Input } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import addTeam from '../../use_cases/AddTeam';
import "../../../styles/TeamLogin.css"

const JoinForm = ({ teamName, setTeamName, setTeamId }) => {
  const [error, setError] = useState('');

  const joinGame = async () => {
    if (teamName.trim() === '') {
        setError('Введите название');
    } else if (teamName.length < 3) {
        setError('Слишком короткое. Должно быть не менее 3 символов.');
    } else if (teamName.length > 32) {
        setError('Слишком длинное. Должно быть не более 32 символов.');
    } else {
      try {
        const teamId = await addTeam(teamName);
        console.log(teamId);
        setTeamId(teamId.id);
      } catch (error) {
        console.log(error);
        setError('Такое имя уже существует. Введите другое, пожалуйста.');
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      joinGame();
    }}>
      <FormControl>
        <p>Регистрация команды</p>
        <label htmlFor="my-input">Название</label>
        <Input
          placeholder="team"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" type="submit">
        Зарегистрироваться
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
};

const TeamLogin = () => {
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');

  return (
    <div className='main'>
      {teamId ? (
        <Navigate to={`/team/mainPage/${teamId}`} />
      ) : (
        <JoinForm
          teamName={teamName}
          setTeamName={setTeamName}
          setTeamId={setTeamId}
        />
      )}
    </div>
  );
};

export default TeamLogin;
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import addTeam from '../../use_cases/AddTeam';
import "../../../styles/TeamLogin.css"
import getQuizByCode from '../../use_cases/GetQuizByCode';

const JoinForm = ({ teamName, setTeamName, setTeamId, quizCode, setQuizCode}) => {
  const [errorName, setErrorName] = useState('');
  const [errorQuiz, setErrorQuiz] = useState('');

  const joinGame = async () => {
    if (teamName.trim() === '') {
        setErrorName('Введите название');
    } else if (teamName.length < 3) {
        setErrorName('Слишком короткое. Должно быть не менее 3 символов.');
    } else if (teamName.length > 32) {
        setErrorName('Слишком длинное. Должно быть не более 32 символов.');
    } else {
      try {
        if (quizCode.trim() === '') {
          setErrorQuiz('Введите номер квиза');
        } else {
          const quiz = getQuizByCode(quizCode);
          console.log(quiz);
          if (quiz) {
            setQuizCode(quizCode);
            setErrorQuiz('');
            const teamId = await addTeam(teamName);
            console.log(teamId);
            setTeamId(teamId.id);
            setErrorName('');
          } else {
            setErrorQuiz('Неверный номер квиза');
          }
        }
      } catch (error) {
        console.log(error);
        setErrorName('Такое имя уже существует. Введите другое, пожалуйста.');
      }
    }
  };

  return (
    <form className="join-form" onSubmit={(e) => {
      e.preventDefault();
      joinGame();
    }}>
      <h1>Регистрация команды</h1>
      <div className='team-form'>
        <label className="input-label">Название</label>
        <input className='input'
          placeholder="team"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        {errorName && <div className='error'>{errorName}</div>}
        <input className='input'
          placeholder="quiz id"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
        />
        {errorQuiz && <div className='error'>{errorQuiz}</div>}
      </div>
      <button type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

const TeamLogin = () => {
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [quizCode, setQuizCode] = useState('');

  return (
    <div className='main'>
      {teamId && quizCode ? (
        <Navigate to={`/team/mainPage/${quizCode}/${teamId}`} />
      ) : (
        <JoinForm
          teamName={teamName}
          setTeamName={setTeamName}
          setTeamId={setTeamId}
          quizCode={quizCode}
          setQuizCode={setQuizCode}
        />
      )}
    </div>
  );
};

export default TeamLogin;
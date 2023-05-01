import { Button } from '@mui/material'
import React from 'react'
import getAllTeams from '../../use_cases/GetAllTeams';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader.component';
import "../../../styles/TeamResults.css"

function TeamResults() {
  const [teamList, setTeamList] = useState([]);
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  let index = 1;

  const getTeamList = async () => {
    setIsLoading(true);
    setTeamList(await getAllTeams());
    setIsLoading(false);
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const getPointsText = (points) => {
    if (points === 1) {
      return 'балл';
    } else if (points >= 2 && points <= 4) {
      return 'балла';
    } else {
      return 'баллов';
    }
  }

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

  return (
    <div className='team-results-page'>
      <button onClick={() => navigate('/')}>Вернуться на главную страницу</button>
      <div className='teams-results'>
        <h1>Результаты сессии:</h1>
        <div className='teams-table'>
          {teamList.map((team) => (
            <div className='table-item'>
              <div className='team-name'>
                <h2>{index++}</h2>
                <h3>{team.name}</h3>
              </div>
              <h2 className='points'>
                {team.points} {getPointsText(team.points)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamResults
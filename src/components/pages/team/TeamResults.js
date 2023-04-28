import { Button } from '@mui/material'
import React from 'react'
import getAllTeams from '../../use_cases/GetAllTeams';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../../Loader.component';

function TeamResults() {
  const [teamList, setTeamList] = useState([]);
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 

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
    <div>
        <p>Результаты сессии:</p>
        <div>
            {teamList.map((team) => (
                <h3>{team.name} - {team.points} {getPointsText(team.points)}</h3>
            ))}
        </div>
        <Button onClick={() => navigate('/')}>Вернуться на главную страницу</Button>
    </div>
  )
}

export default TeamResults
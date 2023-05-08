import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getTeam from '../../use_cases/GetTeam';
import updateTeam from '../../use_cases/UpdateTeam';
import getAllTeams from '../../use_cases/GetAllTeams';
import Loader from '../../common/Loader.component';
import "../../../styles/TeamMainPage.css"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";

const TeamMainPage = () => {
  const [teamName, setTeamName] = useState('');
  const [teamNameInput, setTeamNameInput] = useState(teamName);
  const { teamId } = useParams();
  const quizId = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getTeamList = async () => {
    setIsLoading(true);
    setTeamList(await getAllTeams(quizId));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(firestore, "teams"), (snapshot) => {
        const newTeams = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamList(newTeams);
    });
    setIsLoading(false);
    return () => unsubscribe();
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
        const team = await updateTeam(teamId, teamNameInput);
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
    setTeamNameInput(event.target.value);
    setError('');
  };

  const handleCancelClick = () => {
    setTeamNameInput(teamName);
    setIsEditing(false);
    setError('');
  };

  useEffect(() => {
    if (teamId) {
      getTeam(teamId)
        .then(team => {setTeamName(team.name); setTeamNameInput(team.name)})
        .catch(error => console.error(error));
    }
  }, [teamId]);

  if (isLoading) {
    return <Loader />; // Render loader while data is loading
  }

  return (
    <div className='team-main-page-background'>
      <div className='team-main-page'>
        <div className='team-name'>
          <h1>Ваша команда:</h1>
          {isEditing ? (
            <div>
              <input type="text" value={teamNameInput} onChange={handleInputChange} />
              {error && <div className='error'>{error}</div>}
            </div>
          ) : (
            <h1>{teamName}</h1>
          )}
          {isEditing ? (
            <div>
              <button onClick={handleSaveClick}>
                <CheckIcon fontSize="large"/>
              </button>
              <button onClick={handleCancelClick}>
                <CloseIcon fontSize="large"/>
              </button>
            </div>
          ) : (
            <button onClick={handleEditClick}>
              <EditIcon fontSize='large'/>  
            </button>
          )}
        </div>
        <div className='block-second'>
          <div className='team-list'>
            <h2>Список активных команд:</h2>
            <div className='team-list-field'>
              {teamList.map((team) => (
                <>
                  {team.id != teamId && (
                    <h3>{team.name}</h3>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className='session-time'>
            <h2>Сессия еще не началась</h2>
            <h3>Плановое время начала:</h3>
            <h3>12:00</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMainPage;
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../../../styles/TeamWaitingPage.css"

export default function TeamWaitingPage() {
  return (
    <div className='team-waiting-page'>
        <h1>Результаты еще не готовы</h1>
        <h2>Пожалуйста, подождите, и не закрывайте эту страницу</h2>
        <AccessTimeIcon fontSize="large" sx={{ color: 'black' }}/>
    </div>
  )
}

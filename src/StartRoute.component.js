import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function StartRoute() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }
    return (
        <div>
            start
            <br />
            Выберите ваш статус
            <br />
            <Button variant="contained">Команда</Button>
            <br />
            <Button variant="contained" onClick={routeChange}>Администратор</Button>
        </div>
    )
}

import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/create-quiz`;
        navigate(path);
    }
    return (
        <div>
            admin home
            <br />
            Что вы хотите сделать?
            <br />
            <Button variant="contained" onClick={routeChange}>Создать новый квиз</Button>
            <br />
            <Button variant="contained">Последний квиз</Button>
            <br />
            <Button variant="contained">выход</Button>
        </div>
    )
}

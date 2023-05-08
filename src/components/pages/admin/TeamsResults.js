import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import { StyledTitle } from './style/Title.styled';
import getAllTeams from '../../use_cases/GetAllTeams';
import Loader from '../../common/Loader.component';



export default function TeamsResults() {
    let navigate = useNavigate();

    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let index = 1;

    const handleBack = () => {
        let path = `/admin/home`;
        navigate(path);
    }

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
        <Container>
            <Toolbar
                position="sticky"
                sx={{ mt: 1 }}
            >
                <Grid container spacing={2}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1
                    }}>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <StyledButton variant="contained" onClick={handleBack}
                            sx={{ width: "374px", height: "49px", }} >
                            вернуть в личный кабинет
                        </StyledButton>
                    </Box>
                </Grid>

            </Toolbar>
            <StyledTitle component="h1" variant="h5" sx={{ mb: 2 }}>
                Результаты сессии:
            </StyledTitle>
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
        </Container>
    )
}

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar } from '@mui/material';
import { StyledButton } from './style/Button.styled';
import { StyledTitle } from './style/Title.styled';



export default function TeamsResults() {
    let navigate = useNavigate();

    const [teams, setTeams] = useState([{ name: "wcj kev", points: 0 }, { name: "nwvlr", points: 2 }])

    const handleBack = () => {
        let path = `/admin/home`;
        navigate(path);
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {teams.sort((a, b) => b.points - a.points).map((t, index) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {t.name}
                                </TableCell>
                                <TableCell >{t.points} баллов</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

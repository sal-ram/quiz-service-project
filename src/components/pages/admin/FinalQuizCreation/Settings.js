import React from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { StyledTitle } from "../style/Title.styled";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import StarIcon from '@mui/icons-material/Star';
import { Options } from './Options';

export const Settings = ({ questions }) => {
    return (
        <>
            <StyledTitle component="h1" variant="h5" sx={{ fontSize: "36px", mb: 2 }}>
                Информация:
            </StyledTitle>
            <Box sx={{
                width: "261px",
                height: "57px",
                borderRadius: "12px",
                backgroundColor: "#E6E6E6",
                mb: "30px",
                display: "flex",
                alignItems: "center",
            }}>
                <QuestionMarkIcon sx={{ ml: 2 }} />
                <Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                    ml: "16px",

                }}>
                    Кол-во вопросов: {questions.length}
                </Box>
            </Box>

            <Box sx={{
                width: "297px",
                height: "57px",
                borderRadius: "12px",
                backgroundColor: "#E6E6E6",
                display: "flex",
                alignItems: "center",
            }}>

                <StarIcon sx={{ ml: 2 }} />
                <Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                    ml: "16px",

                }}>
                    Макс кол-во баллов: {questions.reduce((accumulator, object) => {
                        return accumulator + object["points"];
                    }, 0)}
                </Box>
            </Box>

            <StyledTitle component="h1" variant="h5" sx={{ fontSize: "36px", mb: 2, mt: 2 }}>
                Настройки:
            </StyledTitle>
            <FormGroup>
                {/* <Options/> */}
                <Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                }}>Ограничение по времени(мин)</Box>
            </FormGroup>
        </>
    );
}

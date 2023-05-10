import React from 'react'
import { Box, Checkbox, FormControlLabel } from "@mui/material";

export const Options = () => {
    return (
        <>
            <FormControlLabel disabled control={<Checkbox style={{
                color: "black",
            }} defaultChecked />}
                label={<Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                }}>Перелистывание вопросов</Box>} />
            <FormControlLabel disabled control={<Checkbox style={{
                color: "black",
            }} />}
                label={<Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                }}>Ограничение по времени</Box>} />



            <FormControlLabel disabled control={<Checkbox style={{
                color: "black",
            }} />}
                label={<Box sx={{
                    fontFamily: 'Noto Sans',
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "18px",
                }}>Время начала</Box>} />
        </>
    );
}

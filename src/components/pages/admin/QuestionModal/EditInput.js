import { Box, DialogContent, TextField } from "@mui/material";
import React from "react"
import { StyledButton } from "../style/Button.styled";
import { QInputOne } from "../Modal/QInputOne";
import { QInputMultiple } from "../Modal/QInputMultiple";
import { QInputOpen } from "../Modal/QInputOpen";

export const EditInput = ({ values, handleChange }) => {
    
    const renderSwitch = (type) => {
        switch (type) {
            case "one":
                return <QInputOne handleChange={handleChange} values={values} />;
            case "multiple":
                return <QInputMultiple handleChange={handleChange} values={values} />;
            case "open":
                return <QInputOpen handleChange={handleChange} values={values} />;
            default:
        };
    }

    return (
        <DialogContent>
            <Box component="form"
                // onSubmit={values.text ? handleSubmitEdit : handleSubmitCreate}
                noValidate sx={{
                    mt: 1, display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <TextField variant='outlined'
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label="Текст вопроса"
                    name="text"
                    defaultValue={values.text}
                    sx={{ width: "326px", }}
                    onChange={(e) => handleChange("text", e.target.value)}
                />
                {renderSwitch(values.type)}
                <Box sx={{ display: "flex", alignItems: "center", }}>
                    <div>Кол-во баллов:</div>
                    <TextField label=""
                        id="points"
                        name="points"
                        required
                        defaultValue={values ? values.points : ""}
                        sx={{ width: "80px", mt: 2, mb: 1 }}
                        onChange={(e) => handleChange("points", e.target.value)}
                    />
                </Box>
                <StyledButton type="submit"
                    // onClick={() => {
                    // closeModal();
                    // handleEditQuestion();
                    // }}
                    sx={{
                        width: "376px",
                        height: "43px"
                    }}
                >сохранить изменения</StyledButton>

            </Box>
        </DialogContent>
    );
}
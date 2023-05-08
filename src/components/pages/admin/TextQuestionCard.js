import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TextQuestionCard({ question }) {

    const typeLabels = {
        "open": "текст",
        "one": "с одним ответом",
        "multiple": "с вариантами ответа"
    };

    // let [isSelected, setSelected] = useState(true);





    const [openCheck, setOpenCheck] = useState(false);

    return (
        <>
            <Dialog
                open={openCheck}
                onClose={() => setOpenCheck(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Удаление вопроса"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы уверены, что хотите удалить этот вопрос?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => setOpenCheck(false)}>нет</Button>
                </DialogActions>
            </Dialog>
            <Card
                sx={{
                    width: "360px",
                    backgroundColor: "#E6E6E6"
                }}
            >
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Typography gutterBottom variant="h5" component="div"
                        sx={{
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                        }}
                    >
                        {question.text}
                    </Typography>


                </CardContent>
                {/* <CssBaseline /> */}
                <Toolbar
                    position="sticky"
                    style={{ padding: 0 }}
                >
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1,
                        marginLeft: "16px",
                    }}>
                        <Chip label={question.tag} sx={{ height: "24px", fontSize: "12px" }} />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Chip label={typeLabels[question.type]} sx={{ height: "24px", fontSize: "12px", ml: "6px" }} />

                    </Box>
                </Toolbar>
            </Card>
        </>
    );
}
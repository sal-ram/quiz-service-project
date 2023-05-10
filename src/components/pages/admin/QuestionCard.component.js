import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function QuestionCard({ question, handleDelete, handleEdit, handleSelect, selected }) {

    const typeLabels = {
        "open": "текст",
        "one": "с одним ответом",
        "multiple": "с вариантами ответа"
    };

    // let [isSelected, setSelected] = useState(true);

    const handleChange = () => {
        handleSelect(question.id, !selected);
    }

    const handleDeleteModal = () => {
        setOpenDelete(true);
    }

    const handleClick = () => {
        console.log("edit" + question.id);
        handleEdit(question);
    }



    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <Dialog
                open={openDelete}
                onClose={() => setOpenDelete(false)}
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
                    <Button onClick={() => { handleDelete(question.id); setOpenDelete(false) }} autoFocus>
                        да
                    </Button>
                    <Button onClick={() => setOpenDelete(false)}>нет</Button>
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
                    <Checkbox
                        checked={!!selected}
                        onChange={handleChange}
                        style={{
                            color: "black",
                        }}
                    />

                </CardContent>
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
                        <IconButton onClick={handleClick}
                            style={{ padding: 1 }}
                        >
                            <EditIcon style={{
                                color: "black",
                                fontSize: "24px",
                            }} />
                        </IconButton>
                        <IconButton onClick={handleDeleteModal}
                            style={{ padding: 1 }}
                            sx={{ marginRight: "16px", }}
                        >
                            <DeleteIcon style={{
                                color: "black",
                            }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Card>
            
        </>
    );
}
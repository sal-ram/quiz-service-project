import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, Chip, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteQuestion } from '../../use_cases/DeleteQuestion';

export default function QuestionCard({ question }) {

    const typeLabels = {
        "open": "текст",
        "one": "с одним ответом",
        "multiple": "с вариантами ответа"
    };

    let [isSelected, setSelected] = useState(true);

    const handleChange = () => {
        setSelected(!isSelected);
    }

    const handleDelete = () => {
        console.log("delete" + question.id);
        deleteQuestion(question.id);
    }

    const handleEdit = () => {
        console.log("edit" + question.id);
        // editQuestion();
    }

    return (
        <Card
            sx={{ maxWidth: 345 }}
        >
            <CardContent>
                <Checkbox
                    checked={isSelected}
                    onChange={handleChange} />
                <Typography gutterBottom variant="h5" component="div">
                    {question.text}
                </Typography>

            </CardContent>
            <Toolbar
                position="sticky"
            >
                <Box sx={{
                    display: "flex",
                    flexGrow: 1
                }}>
                    <Chip label={question.tag} />
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Chip label={typeLabels[question.type]} />
                    <IconButton onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </Card>
    );
}
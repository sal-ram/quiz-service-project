import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from '../firebase';


export default function CreateQuiz() {

    // const addQuestion = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const docRef = await addDoc(collection(db, "todos"), {
    //             todo: todo,
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    const [questions, setQuestions] = useState([]);
    const db = getFirestore();

    const fetchPost = async () => {

        await getDocs(collection(db, "questions"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setQuestions(newData);
                console.log(questions, newData);
            })

    }

    useEffect(() => {
        console.log("fetch");
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            create
            <br />
            <Button variant="contained">добавить вопрос</Button>
            <br />
            questions
        </div>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Context } from '..';
import { useCollection } from "react-firebase-hooks/firestore";
import QuestionCard from './QuestionCard.component';
import Loader from '../Loader.component';


export default function CreateQuiz() {
    const [questions, setQuestions] = useState([]);
    const { firestore } = useContext(Context);

    const fetchQuestions = async () => {
        const querySnapshot = await getDocs(collection(firestore, "questions"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
        });
        setQuestions(querySnapshot);
    }


    const addQuestion = async () => {
        const citiesRef = collection(firestore, "questions");
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
    }

    const [ques, loading, error] = useCollection(
        collection(firestore, 'cities')
    );

    useEffect(() => {
        console.log("fetch");
        fetchQuestions();
        console.log(ques);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <div>
            <br />
            <Button variant="contained" onClick={addQuestion}>добавить вопрос</Button>
            <br />
            {/* {ques.map(question =>
                <>
                    <Grid container>
                        <div>{question.type}</div>
                    </Grid>
                    <div>{question.text}</div>
                </>

            )} */}
            <QuestionCard/>
        </div>
    )
}

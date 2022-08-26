import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './completedtoday.module.css'
import { collection, doc, getDoc, updateDoc } from '@firebase/firestore';
import db from '../../firebase'
import { UserAuth } from '../../contexts/AuthContext';

export default function CompletedToday() {


    const {user} = UserAuth();
    let nav = useNavigate();

    async function setCompleted(ans){

        var usersRef = collection(db, 'users')

        var docRef = await getDoc(doc(db, 'users', user.uid))
    
            if (docRef.exists()) {
    
            await updateDoc(doc(usersRef, user.uid), 
                {
                    completed: ans ? new Date() : "fail",
                }
                );
                
            }else return user;

    }

    return (
        <div className={styles.mainContainer}>

            <h1>Did You Complete Your Goals Today?</h1>


            <div className={styles.buttonRow}>

                <Button
                    onClick={async () => {
                        await setCompleted(true);
                        nav('/congrats')

                    }}
    
                >
                    Yes
                </Button>

                <Button
                    onClick={async () => {
                        await setCompleted(false)
                        nav('/fail')
                    }}
                >
                    No
                </Button>

            </div>


        </div>
    )
}

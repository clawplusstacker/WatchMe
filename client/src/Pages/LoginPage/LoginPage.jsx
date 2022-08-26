import React, { useState } from 'react'
import { UserAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './loginpage.module.css'
import GoogleButton from 'react-google-button'
import db from '../../firebase'
import { collection, doc, setDoc, getDoc, updateDoc } from '@firebase/firestore';
import { Spin } from 'antd';


export default function LoginPage() {


  const [loading, setLoading] = useState(false)
  const {googleSignIn, user} = UserAuth();
  const navigate = useNavigate();


  //Google signin
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error){
      console.log(error);
    }
  }


  //Creating user / navigating 
  useEffect(() => {

    const redirect = async () => {
      if(user != null){
        setLoading(true);
        await createUser(user);
        navigate('/')
      }
    }

    redirect().catch(console.error)

  }, [user, navigate])


  

  async function createUser(user){

    var usersRef = collection(db, 'users')

    var docRef = await getDoc(doc(db, 'users', user.uid))

      if (!docRef.exists()) {

        await setDoc(doc(usersRef, user.uid), 
            {
              name: user.displayName,
              imageURL: user.photoURL,
              email: user.email
            }
          );

      }else return user;
  }
  

  return (
    
    <div className={styles.mainContainer}>

      {loading ? <Spin /> :
        <GoogleButton 
            onClick={handleGoogleSignIn}
        />
      }
    </div>

  )
}

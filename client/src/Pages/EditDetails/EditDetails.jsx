import { Button, Form, Input } from 'antd'
import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import styles from './editdetails.module.css'
import { Select } from 'antd';
import { collection, doc, getDoc, updateDoc } from '@firebase/firestore';
import { UserAuth } from "../../contexts/AuthContext";
import db from '../../firebase'



const { Option } = Select;

export default function EditDetails({data, refetch}) {

    const {user} = UserAuth();
    let nav = useNavigate();



    const [calories, setCalories] = useState()
    const [fat, setFat] = useState()
    const [carbs, setCarbs] = useState()
    const [protien, setProtien] = useState()
    const [water, setWater] = useState()
    const [vitamins, setVitamins] = useState()
    const [workout, setWorkout] = useState()
    const [read, setRead] = useState()

    // useEffect(() => {

    //     async function checkDate(){

    //         if(new Date(data.lastEditDate).getDate() < new Date().getDate()){

    //             var usersRef = collection(db, 'users')

    //             var docRef = await getDoc(doc(db, 'users', user.uid))

    //             if (docRef.exists()) {

    //                 await updateDoc(doc(usersRef, user.uid), 
    //                     {
    //                         calories: "",
    //                         fat: "",
    //                         carbs: "",
    //                         protien: "",
    //                         water: "",
    //                         vitamins: false,
    //                         workout: false,
    //                         read: false,
    //                     }
    //                 );

    //                 refetch()
                    
    //             }else return user;

    //         }
    //     }

    //     checkDate();

    // }, [user])

    async function saveDetails(){

        var usersRef = collection(db, 'users')

        var docRef = await getDoc(doc(db, 'users', user.uid))

        if (docRef.exists()) {

            await updateDoc(doc(usersRef, user.uid), 
                {
                    calories: calories ? calories : data.calories,
                    fat: fat ? fat : data.fat,
                    carbs: carbs ? carbs : data.carbs,
                    protien: protien ? protien : data.protien,
                    water: water ? water : data.water,
                    vitamins: vitamins != null ? vitamins : data.vitamins,
                    workout: workout != null ? workout : data.workout,
                    read: read != null ? read : data.read,
                    lastEditDate: String(new Date())
                }
            );
            
        }else return user;

    }


    return (
        <div className={styles.mainContainer}>

            <h1>Edit Your Day</h1>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >

                <Form.Item label="Calories">
                    <Input 
                        defaultValue={data.calories}
                        onChange={(val) => setCalories(val.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Fat">
                <Input 
                        defaultValue={data.fat}
                        onChange={(val) => setFat(val.target.value)}
                    />                
                </Form.Item>

                <Form.Item label="Carbs">
                <Input 
                        defaultValue={data.carbs}
                        onChange={(val) => setCarbs(val.target.value)}
                    />                
                </Form.Item>

                <Form.Item label="Protien">
                    <Input 
                        defaultValue={data.protien}
                        onChange={(val) => setProtien(val.target.value)}
                    />                
                </Form.Item>

                <Form.Item label="Water Intake">
                    <Input 
                        defaultValue={data.water}
                        onChange={(val) => setWater(val.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Did You Take Your Vitamins?">
                    <Select
                        defaultValue={data.vitamins}
                        onChange={(val) => setVitamins(val)}
                    >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>                
                </Form.Item>

                <Form.Item label="Did You Workout?">
                    <Select
                        defaultValue={data.workout}
                        onChange={(val) => setWorkout(val)}
                    >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>                     
                </Form.Item>

                <Form.Item label="Did You Read?">
                    <Select
                        defaultValue={data.read}
                        onChange={(val) => setRead(val)}

                    >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>                     
                </Form.Item>

                <Button
                    onClick={async () => {
                        await saveDetails()
                        refetch()
                        nav('/')
                    }}                
                >
                    Save
                </Button>

                        
            </Form>

        </div>
    )
}

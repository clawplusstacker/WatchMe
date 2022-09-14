import { Button, Form, Input, Spin } from 'antd'
import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import styles from './editdetails.module.css'
import { Select } from 'antd';
import { collection, doc, getDoc, updateDoc } from '@firebase/firestore';
import { UserAuth } from "../../contexts/AuthContext";
import db from '../../firebase'
import {CheckOutlined} from '@ant-design/icons'


const { Option } = Select;

export default function EditDetails({data, refetch}) {

    const {user} = UserAuth();
    let nav = useNavigate();


    const [loading, setLoading] = useState(false)


    const [calories, setCalories] = useState()
    const [fat, setFat] = useState()
    const [carbs, setCarbs] = useState()
    const [protien, setProtien] = useState()
    const [water, setWater] = useState()
    const [vitamins, setVitamins] = useState()
    const [workout, setWorkout] = useState()
    const [read, setRead] = useState()

    function checkForCompletion(data){
        return (
            parseInt(data.calories) <= 1528 &&
            parseInt(data.fat) <= 49 &&
            parseInt(data.carbs) <= 142 &&
            parseInt(data.protien) >= 100 &&
            parseInt(data.water) >= 1 &&
            data.vitamins && data.workout && data.read
        )    
    }

    useEffect(() => {

        setLoading(true)

        async function checkDate(){

            if(new Date(data.lastEditDate).getDate() < new Date().getDate()){

                var usersRef = collection(db, 'users')
                var docRef = await getDoc(doc(db, 'users', user.uid))

                if (docRef.exists()) {
                    await updateDoc(doc(usersRef, user.uid), 
                        {
                            calories: "0",
                            fat: "0",
                            carbs: "0",
                            protien: "0",
                            water: "0",
                            vitamins: false,
                            workout: false,
                            read: false,
                            lastEditDate: String(new Date())
                        }
                    );
                }else return user;

                refetch();
            }
            setLoading(false);
        }
        checkDate();
    }, [])

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
                }
            );
            
        }else return user;
    }

    return (

        <div className={styles.mainContainer}>

            {checkForCompletion(data) ? <h1>You Have Completed Your Goals!</h1> : <h1>Edit Your Day</h1>}


            {loading ? <Spin></Spin> : 


            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >

                <Form.Item label={
                    parseInt(data.calories) <= 1528 ? 
                    <p>Calories (1528) <CheckOutlined style={{color: 'green'}}/></p>:
                    "Calories (1528)"
                }>
                    <Input 
                        defaultValue={data.calories}
                        onChange={(val) => setCalories(val.target.value)}
                        style={parseInt(data.calories) <= 1528 ? {backgroundColor: 'lime'} : {}}
                    />
                </Form.Item>

                <Form.Item label={
                    parseInt(data.fat) <= 49 ? 
                    <p>Fat (49g) <CheckOutlined style={{color: 'green'}}/></p>:
                    "Fat (49g)"
                }>
                <Input 
                        defaultValue={data.fat}
                        onChange={(val) => setFat(val.target.value)}
                        style={parseInt(data.fat) <= 49 ? {backgroundColor: 'lime'} : {}}
                    />                
                </Form.Item>

                <Form.Item label={
                    parseInt(data.carbs) <= 142 ? 
                    <p>Carbs (142g) <CheckOutlined style={{color: 'green'}}/></p>:
                    "Carbs (142g)"
                }>
                <Input 
                        defaultValue={data.carbs}
                        onChange={(val) => setCarbs(val.target.value)}
                        style={parseInt(data.carbs) <= 142 ? {backgroundColor: 'lime'} : {}}
                    />                
                </Form.Item>

                <Form.Item label={
                    parseInt(data.protien) >= 100 ? 
                    <p>Protien (100g) <CheckOutlined style={{color: 'green'}}/></p>:
                    "Protien (100g)"
                }>
                    <Input 
                        defaultValue={data.protien}
                        onChange={(val) => setProtien(val.target.value)}
                        style={parseInt(data.protien) >= 142 ? {backgroundColor: 'lime'} : {}}
                    />                
                </Form.Item>

                <Form.Item label={
                    parseInt(data.water) >= 1 ? 
                    <p>Water (1 gallon) <CheckOutlined style={{color: 'green'}}/></p>:
                    "Water (1 gallon)"
                }>
                    <Input 
                        defaultValue={data.water}
                        onChange={(val) => setWater(val.target.value)}
                        style={parseInt(data.water) >= 1 ? {backgroundColor: 'lime'} : {}}
                    />
                </Form.Item>

                <Form.Item label={
                    data.vitamins ? 
                    <p>Did You Take Your Vitamins? <CheckOutlined style={{color: 'green'}}/></p>:
                    "Did You Take Your Vitamins?"
                }>
                    <Select
                        defaultValue={data.vitamins}
                        onChange={(val) => setVitamins(val)}
                    >
                        <Option value={true} >Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>                
                </Form.Item>

                <Form.Item label={
                    data.workout ? 
                    <p>Did You Workout? <CheckOutlined style={{color: 'green'}}/></p>:
                    "Did You Workout?"
                }>
                    <Select
                        defaultValue={data.workout}
                        onChange={(val) => setWorkout(val)}
                    >
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>                     
                </Form.Item>

                <Form.Item label={
                    data.read ? 
                    <p>Did You Read? <CheckOutlined style={{color: 'green'}}/></p>:
                    "Did You Read?"
                }>
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
            
        }

        </div>
    )
}

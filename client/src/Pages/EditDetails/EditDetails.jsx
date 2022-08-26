import { Button, Form, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { Link} from 'react-router-dom'
import styles from './editdetails.module.css'

export default function EditDetails() {
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

                <Form.Item label="Caloriess">
                    <Input />
                </Form.Item>

                <Form.Item label="Fat">
                    <Input />
                </Form.Item>

                <Form.Item label="Carbs">
                    <Input />
                </Form.Item>

                <Form.Item label="Protien">
                    <Input />
                </Form.Item>

                <Form.Item label="Your Workout">
                    <TextArea />
                </Form.Item>

                <Form.Item label="What You Read">
                    <TextArea />
                </Form.Item>


                <Button
                >
                    <Link to="/">Save</Link>
                </Button>

                        
            </Form>

        </div>
    )
}

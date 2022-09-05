import React from 'react'
import { Link } from 'react-router-dom'
import styles from './successpage.module.css'

export default function SuccessPage() {
    return (

        <div className={styles.mainContainer}>

            <h1>Congratulations!</h1>
            <h1>You Completed Your Goals Today :)</h1>

            <Link to="/editDetails">
                Edit Details About Your Day Here
            </Link>

        </div>

    )
}

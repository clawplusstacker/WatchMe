import React from 'react'
import { Link } from 'react-router-dom'
import styles from './failpage.module.css'

export default function FailPage() {
    return (

        <div className={styles.mainContainer}>

            <h1>You Did Not Complete Your Goals Today :(</h1>

            <Link to="/answer">
                Change Your Answer
            </Link>

        </div>

    )
}

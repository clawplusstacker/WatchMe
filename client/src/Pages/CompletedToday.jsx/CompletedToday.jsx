import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './completedtoday.module.css'

export default function CompletedToday() {
  return (
    <div className={styles.mainContainer}>

        <h1>Did You Complete Your Goals Today?</h1>


        <div className={styles.buttonRow}>

            <Button>
                <Link to="/congrats">
                    Yes
                </Link>
            </Button>

            <Button>
                <Link to="/fail">
                    No
                </Link>            
            </Button>

        </div>


    </div>
  )
}

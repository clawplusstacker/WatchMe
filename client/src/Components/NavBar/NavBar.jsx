import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../Logout'
import styles from './navbar.module.css'

export default function NavBar() {
    return (
        <div className={styles.navContainer}>

            <Link to="/">
                <h1>WatchMe</h1>
            </Link>
            <Logout />
        
        </div>
    )
}

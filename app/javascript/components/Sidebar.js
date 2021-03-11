import React, {useState, useEffect} from 'react'
import styles from '../stylesheets/sidebar.module.css'

export default function Sidebar({
    projects
}) {
    return (
        <section id={styles.sidebar}>
            <div>
                <h1>SuperTonic</h1>
            </div>
            <div>
                list projects here
            </div>
        </section>
    )
}
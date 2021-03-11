import React, {useState, useEffect} from 'react'
import styles from '../stylesheets/sidebar.module.css'

export default function Sidebar({
    projects,
    newProjClicked
}) {
    return (
        <section id={styles.sidebar}>
            <div style={{
            }}>
                <h1>SuperTonic</h1>
            </div>
            <div>
                list projects here
            </div>
            <button
                onClick={newProjClicked}
                className='round-btn submit-btn'
                style={{
                    position:'absolute',
                    bottom:170,
                }}
            >
                New Project
            </button>
        </section>
    )
}
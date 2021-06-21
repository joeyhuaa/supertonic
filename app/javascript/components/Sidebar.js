import React, {useState, useEffect, useContext} from 'react'
import ThingsContext from './ThingsContext'
import styles from '../stylesheets/sidebar.module.css'
import Link from 'react-router-dom'

export default function Sidebar({
    newProjClicked,
    projectSelected,
}) {
    const { user, projects } = useContext(ThingsContext)
    
    return (
        <section id={styles.sidebar}>
            <div style={{
                borderBottom: 'solid gray 1px',
                paddingBottom: '10px',
            }}>
                <h1>SuperTonic</h1>
                <p>Welcome, {user.full_name}</p>
                <a href='/users/sign_out'>Sign Out</a>
            </div>
            <div style={{
                paddingTop: '10px',
            }}>
                {projects.map((proj, i) => {
                    return (
                        <div 
                            key={`proj-${i}`}
                            style={{cursor:'pointer'}}
                        >
                            {/* <h3 onClick={() => projectSelected(proj.id)}>{proj.name}</h3> */}
                            <a href={`/projects/${proj.id}`} onClick={() => {}}>{proj.name}</a>
                        </div>
                    )
                })}
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
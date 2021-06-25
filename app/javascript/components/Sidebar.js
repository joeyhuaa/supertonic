import React, {useState, useEffect, useContext} from 'react'
import ThingsContext from './ThingsContext'
import styles from '../stylesheets/sidebar.module.css'
import useProjects from '../hooks/useProjects'
// import { useRouter } from 'next/router'

export default function Sidebar({
    newProjClicked,
}) {
  const { user } = useContext(ThingsContext)
  const { data, isError, isLoading } = useProjects()
  const projects = data?.projects
  
  return (
    <section id={styles.sidebar}>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {projects &&
        <>
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
            {projects && projects.map((proj, i) => {
              return (
                <div 
                  key={`proj-${i}`}
                  style={{cursor:'pointer'}}
                >
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
        </>
      }
    </section>
  )
}
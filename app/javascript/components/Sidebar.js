import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'

import {
  MdSettings
} from 'react-icons/md'

import { THEME } from '../aesthetics'
import Context from './Context'
import IconClickable from '../molecules/IconClickable'
import useProjects from '../hooks/useProjects'
import useCreateProject from '../hooks/useCreateProject'

function Menu() {
  return (
    <div style={{
      display: 'flex'
    }}>
      <Link to='/settings'>
        <IconClickable 
          icon={<MdSettings color='white' size={20} />} 
          onclick={() => {}} 
        />
      </Link>
    </div>
  )
}

export default function Sidebar() {
  const { user, theme } = useContext(Context)
  const { data, isError, isLoading } = useProjects()
  const projects = data?.projects
  const createProject = useCreateProject()
  const styles = {
    sidebar: {
      backgroundColor: THEME[theme]?.color1,
      maxWidth: '200px',
      height: '100%',
      position: 'relative',
    },
    pBrowser: {
      overflowY: 'scroll',
      height: '500px'
    }
  }

  let newProjClicked = () => {
    createProject.mutate()
  }
  
  return (
    <section id='sidebar' style={styles.sidebar}>
      <div style={{
        borderBottom: 'solid gray 1px',
        paddingBottom: '10px',
      }}>
        <h1>SuperTonic</h1>
        <p>Welcome, {user.full_name}</p>
        <Menu />
      </div>
      <div style={{ paddingTop: '10px' }}>
        {isError && <span>Error.</span>}
        {isLoading && <span>Loading...</span>}

        <div id='project-browser' style={styles.pBrowser}>
          {projects && projects.map((proj) => {
            return (
              <div 
                key={proj.id}
                className={`clickable`}
              >
                <Link to={`/projects/${proj.id}`}>
                  {proj.name}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <button
        onClick={newProjClicked}
        className='round-btn submit-btn'
        style={{
          position: 'absolute',
          bottom: 170,
        }}
      >
        New Project
      </button>
    </section>
  )
}
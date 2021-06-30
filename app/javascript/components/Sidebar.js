import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'

import {
  MdSettings
} from 'react-icons/md'

import { THEME } from '../aesthetics'
import Context from './Context'
import IconClickable from '../molecules/IconClickable'
import useProjects from '../hooks/useProjects'

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

export default function Sidebar({
    newProjClicked,
}) {
  const { user, theme } = useContext(Context)
  const { data, isError, isLoading } = useProjects()
  const projects = data?.projects
  const styles = {
    backgroundColor: THEME[theme]?.color1,
    maxWidth: '200px',
    height: '100%',
    position: 'relative'
  }
  
  return (
    <section id='sidebar' style={styles}>
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
        {projects && projects.map((proj) => {
          return (
            <div 
              key={proj.id}
              className={`clickable`}
            >
              <Link to={`/projects/${proj.id}`}>{proj.name}</Link>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => newProjClicked(true)}
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
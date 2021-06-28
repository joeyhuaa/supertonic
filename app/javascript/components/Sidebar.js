import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'

import {
  MdSettings
} from 'react-icons/md'

import Context from './Context'
import Clickable from './Clickable'
import IconButton from './IconButton'
import styles from '../stylesheets/sidebar.module.css'
import useProjects from '../hooks/useProjects'

function SettingsButton() {
  return (
    <IconButton 
      icon={<MdSettings color='white' size={30} />} 
      onclick={() => {}} 
    />
  )
}

function Menu() {
  return (
    <div style={{
      display: 'flex'
    }}>
      {/* <Clickable> 
        <Link 
          to={'/settings'}
          component={SettingsButton}
        />
      </Clickable> */}
      <Link to='/settings'>Settings</Link>
    </div>
  )
}

export default function Sidebar({
    newProjClicked,
}) {
  const { user } = useContext(Context)
  const { data, isError, isLoading } = useProjects()
  const projects = data?.projects
  
  return (
    <section id={styles.sidebar}>
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
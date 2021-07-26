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
import useTheme from '../hooks/useTheme'
import Clickable from '../molecules/Clickable'

function Menu() {
  return (
    <div style={{ display: 'flex' }}>
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

  const [currProjId, setCurrProjId] = useState(null)
  const { user } = useContext(Context)

  useEffect(() => {
    let projId = parseInt( window.location.pathname.split('/').pop() )
    setCurrProjId(projId)
  }, [])

  useEffect(() => {
    let newPath = window.location.pathname
    if (!newPath.includes('project')) {
      setCurrProjId(null)
    }
  }, [window.location.pathname])

  const theme = useTheme().data
  const { data, isError, isLoading } = useProjects()
  const projects = data?.projects
  const createProject = useCreateProject()
  const styles = {
    sidebar: {
      backgroundColor: THEME[theme]?.color1,
      maxWidth: '200px',
      position: 'relative',
      // border: 'solid white 1px'
    },
    pBrowser: {
      overflowY: 'auto',
      height: '20%',
      // border: 'solid yellow 1px',
      width: '100%'
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
      <div id='pBrowser' style={{ paddingTop: '10px' }}>
        {isError && <span>Error.</span>}
        {isLoading && <span>Loading...</span>}

        <div id='project-browser' style={styles.pBrowser}>
          {projects && projects.map((proj) => {
            // console.log(proj.id);
            return (
              <Link 
                to={`/projects/${proj.id}`} 
                className='no-decoration'
                key={proj.id}
              >
                <Clickable
                  key={proj.id}
                  isSelected={currProjId === proj.id}
                  onclick={() => setCurrProjId(proj.id)}
                >
                  {proj.name}
                </Clickable>
              </Link>
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
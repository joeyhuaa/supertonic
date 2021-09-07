import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'

import {
  MdSettings
} from 'react-icons/md'

import { THEME } from '../aesthetics'
import Context from './Context'
import IconClickable from '../molecules/IconClickable'
import Clickable from '../molecules/Clickable'

import { useProjects, useCreateProject, useTheme } from '../hooks'

function Menu() {
  return (
    <div style={{ display: 'flex' }}>
      <Link to='/settings'>
        <IconClickable 
          icon={<MdSettings color='white' size={20} />} 
          onClick={() => {}} 
        />
      </Link>
    </div>
  )
}

export default function Sidebar() {
  const [currProjId, setCurrProjId] = useState(null)
  const { user } = useContext(Context)

  const theme = useTheme().data
  const { data, isError, isLoading, isFetching } = useProjects()
  const createProject = useCreateProject()

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

  let newProjClicked = () => {
    createProject.mutate({
      id: Date.now(),
      name: 'Untitled Project',
    })
  }
  
  return (
    <section 
      id='sidebar' 
      style={{ backgroundColor: THEME[theme]?.color1 }}
    >
      <div id='top'>
        <h1>SuperTonic</h1>
        <p>Welcome, {user.full_name}</p>
        {/* {isFetching && <p>fetching...</p>} */}
        <Menu />
      </div>
      <div id='browser' className='fade-ends'>
        {isError && <span>Error.</span>}
        {isLoading && <span>Loading...</span>}
        {data?.map((proj) => {
          return (
            <Link 
              to={`/projects/${proj.id}`} 
              className='no-decor'
              key={proj.id}
            >
              <Clickable
                isSelected={currProjId === proj.id}
                onClick={() => setCurrProjId(proj.id)}
              >
                {proj.name}
              </Clickable>
            </Link>
          )
        })}
      </div>
      <button
        onClick={newProjClicked}
        id='new-project-btn'
        className='round-btn submit-btn grow'
      >
        New Project
      </button>
    </section>
  )
}
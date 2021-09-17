import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { MdSettings } from 'react-icons/md'
import { BsX } from 'react-icons/bs'

import { THEME } from '../aesthetics'
import Context from './Context'
import IconClickable from '../molecules/IconClickable'
import Clickable from '../molecules/Clickable'

import { 
  useProjects, 
  useCreateProject, 
  useTheme, 
  useDeleteProject 
} from '../hooks'

function Menu() {
  return (
    <div style={{ display: 'flex' }} aria-label='Settings'>
      <Link to='/settings'>
        <IconClickable 
          icon={<MdSettings color='white' size={20} />} 
        />
      </Link>
    </div>
  )
}

export default function Sidebar() {
  const [currProjId, setCurrProjId] = useState(null)
  const [isHoveringOverDelete, setHoveringOverDelete] = useState(false)

  const { user } = useContext(Context)

  const theme = useTheme().data
  const { data, isError, isLoading } = useProjects()
  const _createProject = useCreateProject()
  const _deleteProject = useDeleteProject()

  // * get projId from url and set state
  useEffect(() => {
    let projId = window.location.pathname.split('/').pop() // typeof projId = string
    setCurrProjId(projId)
  }, [])

  // * if a non-proj link is clicked, clear state
  useEffect(() => {
    let newPath = window.location.pathname
    if (!newPath.includes('project')) {
      setCurrProjId(null)
    }
  }, [window.location.pathname])

  // * functions
  let selectProject = projectId => {
    if (!isHoveringOverDelete) {
      setCurrProjId(projectId)
    }
  }

  let createProject = () => {
    _createProject.mutate({
      id: `${Date.now()}-proj`,
      name: 'Untitled Project',
    })
  }

  let deleteProject = (projectId) => {
    _deleteProject.mutate({ id: projectId })
  }

  return (
    <section 
      id='sidebar' 
      style={{ backgroundColor: THEME[theme]?.color1 }}
    >
      <div id='top'>
        <h1>SuperTonic</h1>
        <p>Welcome, {user.full_name}</p>
        <Menu />
      </div>
      <div id='browser' className='fade-bottom'>
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
                onClick={() => selectProject(proj.id)}
              >
                <div className='project ellipse df aic jc-sb'>
                  {proj.name}
                  <Link
                    className='delete-proj-btn'
                    to={
                      currProjId === proj.id ? (
                        `/projects`
                      ) : (
                        `/projects/${currProjId}`
                      )
                    }
                  >
                    <IconClickable
                      onClick={() => deleteProject(proj.id)}
                      onMouseEnter={() => setHoveringOverDelete(true)}
                      onMouseLeave={() => setHoveringOverDelete(false)}
                      icon={<BsX size={20} />}
                    />
                  </Link>
                </div>
              </Clickable>
            </Link>
          )
        })}
      </div>
      <button
        onClick={createProject}
        id='new-project-btn'
        className='round-btn submit-btn grow'
      >
        New Project
      </button>
    </section>
  )
}
import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Songs from './Songs'
import Context, { Provider } from './Context'
import useProject from '../hooks/useProject'
import useCreateBranch from '../hooks/useCreateBranch'

import styles from '../stylesheets/project.module.css'

const BranchSelect = React.forwardRef((props, ref) => {
  const branchNames = Object.keys(props.branches)
  const { project, switchBranch } = useContext(Context)
  let [newBranch, setNewBranch] = useState('')
  let createBranch = useCreateBranch()

  let onSubmit = (e) => {
    // post new branch
    e.preventDefault()
    console.log('new branch', newBranch, 'for project', project.id)

    if (newBranch !== '' && !branchNames.includes(newBranch)) {
      createBranch.mutate({ 
        branch: newBranch,
        id: project.id
      })
      // set state to new branch
      // url change? how to put Link into select...
      
    } else if (newBranch === '') {
      alert('You must enter a branch name.')
    } else if (branchNames.includes(newBranch)) {
      alert ('That branch already exists in this project.')
    }
  }

  return (
    <form 
      id={styles.branch} 
      className={styles.header_item}
      onSubmit={onSubmit}
    >
      <select
        id={styles.branch_dropdown} 
        ref={ref}
        onChange={e => switchBranch(e.target.value)}
      >
        {branchNames.map(branch => (
          <option key={branch}>
            {/* <Link to={`/projects/${project.id}/${branch}`}> */}
              {branch}
            {/* </Link> */}
          </option>
        ))}
      </select>
      <input 
        id={styles.branch_input}
        placeholder='Add New Branch'
        onChange={e => setNewBranch(e.target.value)}
        value={newBranch}
      />
    </form>
  )
})

const ProjectHeader = React.forwardRef((props, ref) => {
  const { 
    project,
    deleteProj
  } = props

  return (
    <div id={styles.header}>
      <h1>{project.name}</h1>
      <BranchSelect branches={project.branches} ref={ref} />
      <div className={`${styles.header_item} clickable`} onClick={deleteProj}>
        <span>Delete</span>
      </div>
      <div className={`${styles.header_item} clickable`}>
        <span>New Branch</span>
      </div>
      <div className={`${styles.header_item} clickable`}>
        <span>Delete Current Branch</span>
      </div>
    </div>
  )
})

export default function Project({
  // toggleNewBranchForm,
}) {
  let [state, setState] = useState({
    currBranch: 'main',
    showNewBranchForm: false
  })
  const branchDropdown = useRef()
  const { projectId } = useParams()
  const { data, isError, isLoading } = useProject(projectId)
  const project = data

  const appContext = useContext(Context)
  const projectContext = {
    project: project,
    switchBranch: (newBranch) => {
      setState({ ...state, currBranch: newBranch })
    }
  }

  let deleteProj = async () => await fetch(`/api/projects/${project.id}/destroy`, { method: 'DELETE' }).then(() => window.location.reload())

  return (
    <section id={styles.project_view}>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {project &&
        <div>
          <Provider value={projectContext}>
            <ProjectHeader 
              project={project}
              // toggleNewBranchForm={toggleNewBranchForm}
              deleteProj={deleteProj}
              ref={branchDropdown}
            />
          </Provider>
          <Provider value={appContext}>
            <Songs project={project} branch={state.currBranch} />
          </Provider>
        </div>
      }
    </section>
  )
}
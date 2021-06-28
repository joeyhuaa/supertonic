import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Songs from '../components/Songs'
import FloatDropdown from '../components/FloatDropdown'
import Context, { Provider } from '../components/Context'
import useProject from '../hooks/useProject'
import useCreateBranch from '../hooks/useCreateBranch'

import styles from '../stylesheets/project.module.css'

const BranchSelect = React.forwardRef((props, ref) => {
  const branchNames = Object.keys(props.branches)
  const { switchBranch } = useContext(Context)

  return (
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
  )
})

const ProjectHeader = React.forwardRef((props, ref) => {
  const { 
    project,
    deleteProj
  } = props

  let [newBranch, setNewBranch] = useState('')
  let createBranch = useCreateBranch()
  let branchNames = Object.keys(project.branches)


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
    <div id={styles.header}>
      <div id={styles.header_heading}>
        <h1>{project.name}</h1>
        <FloatDropdown 
          options={[
            {name: 'Add Files', danger: false},
            {name: 'Delete Project', danger: true},
            {name: 'Delete Current Branch', danger: true}
          ]}
        />
      </div>
      <BranchSelect branches={project.branches} ref={ref} />
      <form 
        id={styles.branch} 
        className={styles.header_item}
        onSubmit={onSubmit}
      >
        <input 
          id={styles.branch_input}
          placeholder='Add New Branch'
          onChange={e => setNewBranch(e.target.value)}
          value={newBranch}
        />
      </form>
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
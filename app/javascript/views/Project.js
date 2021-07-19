import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { THEME } from '../aesthetics'

import Clickable from '../molecules/Clickable'

import Songs from '../components/Songs'
import AddSongsForm from '../components/AddSongsForm'
import FloatDropdown from '../components/FloatDropdown'
import Context, { Provider } from '../components/Context'

import useProject from '../hooks/useProject'
import useCreateBranch from '../hooks/useCreateBranch'
import useUpdateProject from '../hooks/useUpdateProject'
import useDeleteProject from '../hooks/useDeleteProject'

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
    branch
  } = props

  let [showAddSongsForm, setAddSongsForm] = useState(false)
  let [newBranch, setNewBranch] = useState('')
  let createBranch = useCreateBranch()
  let updateProject = useUpdateProject()
  let deleteProject = useDeleteProject()
  let branchNames = Object.keys(project.branches)

  let onSubmit = (e) => {
    // post new branch
    e.preventDefault()
    // console.log('new branch', newBranch, 'for project', project.id)

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

  let toggleAddSongsForm = val => {
    setAddSongsForm(val)
  }

  let changeProjName = () => {
    let newName = prompt('Enter a new project name')
    if (newName) {
      console.log(newName)
      updateProject.mutate({
        id: project.id,
        name: newName
      })
    }
  }

  let deleteProj = () => {
    deleteProject.mutate({
      id: project.id
    })
  }

  return (
    <div id={styles.header}>
      <div id={styles.header_heading}>
        <h1 onClick={changeProjName}>{project.name}</h1>
        <FloatDropdown 
          options={[
            {
              name: 'Delete Project', 
              danger: true, 
              onclick: deleteProj, 
              returnHome: true
            },
            {
              name: 'Delete Current Branch', 
              danger: true, 
              onclick: () => {}
            }
          ]}
        />
      </div>
      <BranchSelect branches={project.branches} ref={ref} />
      <Clickable onclick={() => toggleAddSongsForm(true)}>Add Songs</Clickable>
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

      {showAddSongsForm && 
        <AddSongsForm
          projectId={project.id}
          branch={branch}
          closeSelf={() => toggleAddSongsForm(false)}
        />
      }
    </div>
  )
})

export default function Project({
  // toggleNewBranchForm,
}) {
  const [state, setState] = useState({
    currBranch: 'main',
    showNewBranchForm: false
  })
  const branchDropdown = useRef()
  const { projectId } = useParams()
  const { data, isError, isLoading } = useProject(projectId)
  const project = data
  
  const appContext = useContext(Context)
  appContext.switchBranch = (newBranch) => {
    setState({ ...state, currBranch: newBranch })
  }

  return (
    <section id={styles.project_view}>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {project &&
        <div>
          <ProjectHeader 
            project={project}
            branch={state.currBranch}
            ref={branchDropdown}
          />
          <Songs project={project} branch={state.currBranch} />
        </div>
      }
    </section>
  )
}
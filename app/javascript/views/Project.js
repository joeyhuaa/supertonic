import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Clickable from '../molecules/Clickable'
import Songs from '../components/Songs'
import AddSongsForm from '../components/AddSongsForm'
import FloatDropdown from '../components/FloatDropdown'
import Context from '../components/Context'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject 
} from '../hooks'

import styles from '../stylesheets/project.module.css'

const BranchSelect = React.forwardRef((props, ref) => {
  const { branches } = props
  const { switchBranch } = useContext(Context)

  return (
    <select
      id={styles.branch_dropdown} 
      ref={ref}
      onChange={e => switchBranch(e.target.value)}
    >
      {branches.map(branch => (
        <option key={branch.id}>
          {/* <Link to={`/projects/${project.id}/${branch}`}> */}
            {branch.name}
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
  let [newBranchName, setnewBranchName] = useState('')
  let createBranch = useCreateBranch()
  let updateProject = useUpdateProject()
  let deleteProject = useDeleteProject()
  let branchNames = Object.keys(project.branches)

  console.log('branch', branch);

  let onSubmit = (e) => {
    // post new branch
    e.preventDefault()
    // console.log('new branch', newBranchName, 'for project', project.id)

    if (newBranchName !== '' && !branchNames.includes(newBranchName)) {
      createBranch.mutate({ 
        newBranchName: newBranchName,
        sourceBranchId: branch.id,
        projId: project.id
      })
      // set state to new branch
      // url change? how to put Link into select...
      
    } else if (newBranchName === '') {
      alert('You must enter a branch name.')
    } else if (branchNames.includes(newBranchName)) {
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
          onChange={e => setnewBranchName(e.target.value)}
          value={newBranchName}
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
  // togglenewBranchNameForm,
}) {
  const branchDropdown = useRef()
  const { projectId } = useParams()
  const { data, isError, isLoading } = useProject(projectId)
  const project = data

  const [state, setState] = useState({
    currBranch: 'main',
    shownewBranchNameForm: false
  })
  
  const appContext = useContext(Context)
  appContext.switchBranch = (newBranchName) => {
    setState({ ...state, currBranch: newBranchName })
  }

  return (
    <section id='project-view'>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {project &&
        <div id='project'>
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
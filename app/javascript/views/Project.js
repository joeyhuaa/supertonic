import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Clickable from '../molecules/Clickable'
import Songs from '../components/Songs'
import AddSongsForm from '../components/AddSongsForm'
import FloatDropdown from '../components/FloatDropdown'
import Context from '../components/Context'

import { AiOutlineFileAdd } from 'react-icons/ai'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject 
} from '../hooks'
import IconClickable from '../molecules/IconClickable'

const BranchSelect = React.forwardRef((props, ref) => {
  const { branches, className } = props
  const { switchBranch } = useContext(Context)

  return (
    <select
      id='branch-dropdown'
      className={className}
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
    <div id='header'>
      <div id='heading' className='header-item'>
        <h1 onClick={changeProjName}>{project.name}</h1>
        <FloatDropdown 
          className='header-item'
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
      <BranchSelect className='header-item' branches={project.branches} ref={ref} />

      <div id='file-input' className='header-item'>
        <input type='file' id='file' />
        <label for='file'>
          <IconClickable 
            icon={<AiOutlineFileAdd size={25} />}
          />
        </label>
      </div>
      <form 
        id='branch-form' 
        className='header-item'
        onSubmit={onSubmit}
      >
        <input 
          id='branch-input'
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
    <section id='project'>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {project &&
        <>
          <ProjectHeader 
            project={project}
            branch={state.currBranch}
            ref={branchDropdown}
          />
          <Songs project={project} branch={state.currBranch} />
        </>
      }
    </section>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import { useStore } from '../store'

import { AiOutlineFileAdd } from 'react-icons/ai'
import { BiGitBranch } from 'react-icons/bi'
import { GoTriangleDown } from 'react-icons/go'

import { ScaleLoader, ClipLoader } from 'react-spinners'

import Songs from '../components/Songs'

import DropdownMenu from '../molecules/DropdownMenu'
import FancyFileInput from '../molecules/FancyFileInput'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject,
} from '../hooks/project'

// * HEADER COMPONENTS
const AddBranchForm = ({ project, sourceBranchName }) => {
  let [newBranchName, setNewBranchName] = useState('')
  let { mutate } = useCreateBranch()
  let branchNames = project.branches.map(branch => branch.name)

  let onSubmit = (e) => {
    e.preventDefault()

    // logic
    if (newBranchName !== '' && !branchNames.includes(newBranchName)) {
      mutate({ 
        newBranchName: newBranchName,
        sourceBranchName: sourceBranchName,
        projId: project.id,
      })
    } else if (newBranchName === '') {
      alert('Branch name cannot be blank.')
    } else if (branchNames.includes(newBranchName)) {
      alert ('That branch already exists in this project.')
    }

    // clear input
    setNewBranchName('')
  }

  return (
    <form
      id='branch-form'
      className='header-item'
      onSubmit={onSubmit}
    >
      <input 
        id='branch-input'
        placeholder='Add New Branch'
        onChange={e => setNewBranchName(e.target.value)}
        value={newBranchName}
      />
    </form>
  )
}

const BranchSelect = (props) => {
  const { branches, currBranch, setCurrBranch, className } = props
  const items = branches.map(branch => ({
    label: branch.name,
    callback: () => setCurrBranch(branch.name)
  }))

  return (
    <DropdownMenu 
      className={className}
      items={items}
      label={currBranch}
      icon={<BiGitBranch />}
      showBorder
    />
  )
}

const TitleHeading = props => {
  const {
    project,
  } = props

  let updateProject = useUpdateProject()
  let deleteProject = useDeleteProject()

  function changeProjName() {
    let newName = prompt('Enter a new project name', project.name)
    if (newName) {
      updateProject.mutate({
        id: project.id,
        name: newName
      })
    }
  }

  function deleteProj() {
    deleteProject.mutate({ id: project.id })
  }

  return (
    <div id='heading' className='header-item'>
      <h2 
        className='ellipse'
        onClick={changeProjName}
      >{project.name}</h2>
      <DropdownMenu 
        icon={<GoTriangleDown />}
        items={
          [
            {
              label: 'Delete Project',
              callback: deleteProj
            },
            {
              label: 'Delete Current Branch',
              callback: () => {} // todo - finish this func
            }
          ]
        }
      />
    </div>
  )
}

// * HEADER
const ProjectHeader = (props) => {
  const { 
    project,
    branchName,
    setCurrBranch,
    isFetching,
  } = props

  let [files, setFiles] = useState([])

  const spinnerCSS = css`
    position: absolute;
    right: 30px;
  `

  return (
    <div id='header'>
      <TitleHeading
        project={project}
      />

      <FancyFileInput 
        className='header-item'
        icon={<AiOutlineFileAdd size={20} />} 
        onChange={files => setFiles( Array.from(files) )}
        accept='.mp3, .wav'
        multiple
      />

      <AddBranchForm 
        project={project} 
        sourceBranchName={branchName} 
      />

      <BranchSelect 
        className='header-item'
        branches={project.branches} 
        currBranch={branchName}
        setCurrBranch={setCurrBranch}
      />

      {files.length > 0 && 
        <AddSongsForm
          files={files}
          projectId={project.id}
          branchName={branchName}
        />
      }

      {isFetching && (
        <ClipLoader 
          color='whitesmoke' 
          size={20}
          css={spinnerCSS}
        />
      )}
    </div>
  )
}

// * PROJECT
export default function Project() {
  const { projectId } = useParams()
  const { data, isError, isLoading, isFetching } = useProject(projectId)
  const { currBranch, setCurrBranch } = useStore(state => ({
    setProject: state.setProject,
    currBranch: state.currBranch,
    setCurrBranch: state.setCurrBranch,
  }))

  // * reset branch to main when new proj is selected
  useEffect(() => {
    setCurrBranch('main')
  }, [projectId])
  
  if (isLoading) {
    return (
      <section id='loading-project'>
        <ScaleLoader color='whitesmoke' />
      </section>
    )
  }

  return (
    <section id='project'>
      {isError && <span>Error.</span>}
      {data &&
        <>
          <ProjectHeader 
            project={data}
            branchName={currBranch}
            setCurrBranch={setCurrBranch}
            isFetching={isFetching}
          />
          <Songs 
            project={data} 
            branchName={currBranch} 
          />
        </> 
      }
    </section>
  )
}
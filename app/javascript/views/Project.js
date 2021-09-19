import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import { AiOutlineFileAdd } from 'react-icons/ai'
import { BiGitBranch } from 'react-icons/bi'
import { GoTriangleDown } from 'react-icons/go'

import { ScaleLoader, ClipLoader } from 'react-spinners'

import Context from '../components/Context'
import Songs from '../components/Songs'

import DropdownMenu from '../molecules/DropdownMenu'
import FancyFileInput from '../molecules/FancyFileInput'
import Modal from '../molecules/Modal'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject,
  useCreateSongs
} from '../hooks'

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

const AddSongsForm = ({
  files,
  projectId,
  branchName,
  onClose,
}) => {
  const { mutate, isLoading, isSuccess, error } = useCreateSongs()
  const { setShowOverlay } = useContext(Context)

  useEffect(() => {
    setShowOverlay(true)
    return () => setShowOverlay(false)
  }, [])

  useEffect(() => {
    if (isSuccess) onClose()
  }, [isSuccess])

  let audioToBase64 = (audioFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const b64 = e.target.result;
        let audio = document.createElement('audio')
        audio.src = b64;
        audio.addEventListener('loadedmetadata', () => {
          resolve({
            b64: b64,
            duration: audio.duration
          });
        })
      }
      reader.onerror = reject;
      reader.readAsDataURL(audioFile);
    });
  }

  let handleAddSongs = () => {
    // set up formdata
    let formdata = new FormData()

    // create array of proms for converting audio files -> b64
    let songPromises = []
    files.forEach( file => songPromises.push( audioToBase64(file) ) )

    // resolve the array of proms
    Promise.all(songPromises) // !this was the missing piece of the puzzle!
      .then(result => {
        let songs = result.map((obj, i) => {
          return {
            name: files[i].name,
            b64: obj.b64,
            duration: obj.duration,
          }
        })
        formdata.append('files', JSON.stringify(songs))

        // mutate
        mutate({
          files: JSON.stringify(songs),
          branchName: branchName,
          id: projectId
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <Modal 
      modalId='add-songs-modal'
      title={`Add Songs (${files.length})`}
      showClose={!isLoading}
      onClose={onClose}
      body={
        <>
          <div id='file-list'>
            {files.map(file => (
              <div>
                {file.name}
              </div>
            ))}
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading ? (
              <ClipLoader color='white' />
            ) : (
              <button
                className='round-btn submit-btn grow'
                onClick={handleAddSongs}
              >ADD SONGS</button>
            )}
          </div>
        </>
      }
    />
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
          onClose={() => setFiles([])}
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

  const [currBranch, setCurrBranch] = useState('main')

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
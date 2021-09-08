import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Context from '../components/Context'

import Songs from '../components/Songs'
import FloatDropdown from '../components/FloatDropdown'

import IconClickable from '../molecules/IconClickable'
import DropdownMenu from '../molecules/DropdownMenu'

import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsX } from 'react-icons/bs'
import { BiGitBranch } from 'react-icons/bi'

import { ScaleLoader, ClipLoader } from 'react-spinners'

import { FancyFileInput, FlyoutMenu } from '@types/joeys-components'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject,
  useCreateSongs
} from '../hooks'

const AddBranchForm = ({ project, sourceBranchName }) => {
  let [newBranchName, setNewBranchName] = useState('')
  let createBranch = useCreateBranch()
  let branchNames = project.branches.map(branch => branch.name)

  let onSubmit = (e) => {
    e.preventDefault()

    if (newBranchName !== '' && !branchNames.includes(newBranchName)) {
      createBranch.mutate({ 
        newBranchName: newBranchName,
        sourceBranchName: sourceBranchName,
        projId: project.id
      })
      // set state to new branch
      // url change? how to put Link into select...
      
    } else if (newBranchName === '') {
      alert('Branch name cannot be blank.')
    } else if (branchNames.includes(newBranchName)) {
      alert ('That branch already exists in this project.')
    }
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
  closeSelf
}) => {
  const { mutate, isLoading, isSuccess, error } = useCreateSongs()
  const { setShowOverlay } = useContext(Context)

  useEffect(() => {
    setShowOverlay(true)
    return () => setShowOverlay(false)
  }, [])

  useEffect(() => {
    if (isSuccess) closeSelf()
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
    <section id='add-songs-form'>
      <div id='top'>
        {!isLoading && 
          <IconClickable
            onClick={closeSelf}
            icon={<BsX size={30} />}
            className='top-right-n-8'
          />
        }
        <h2 style={{ margin: 'auto' }}>Add Songs</h2>
      </div>

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
    </section>
  )
}

const BranchSelect = React.forwardRef((props, ref) => {
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
    />
  )
})

const ProjectHeader = React.forwardRef((props, ref) => {
  const { 
    project,
    branchName,
    setCurrBranch,
  } = props

  let [files, setFiles] = useState([])
  let updateProject = useUpdateProject()
  let deleteProject = useDeleteProject()

  let changeProjName = () => {
    let newName = prompt('Enter a new project name')
    if (newName) {
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
        <h2 
          className='ellipse'
          onClick={changeProjName}
        >{project.name}</h2>
        <FloatDropdown 
          className='header-item'
          options={[
            {
              name: 'Delete Project', 
              danger: true, 
              onClick: deleteProj, 
              returnHome: true
            },
            {
              name: 'Delete Current Branch', 
              danger: true, 
              onClick: () => {}
            }
          ]}
        />
      </div>

      <BranchSelect 
        className='header-item'
        branches={project.branches} 
        currBranch={branchName}
        setCurrBranch={setCurrBranch}
        ref={ref} 
      />

      <div id='file-input' className='header-item'>
        <input 
          type='file' 
          id='file' 
          multiple 
          accept='.mp3, .wav'
          onChange={e => setFiles( Array.from(e.target.files) )}
        />
        <label for='file'>
          <IconClickable 
            icon={<AiOutlineFileAdd size={20} />}
          />
        </label>
      </div>

      <AddBranchForm 
        project={project} 
        sourceBranchName={branchName} 
      />

      {files.length > 0 && 
        <AddSongsForm
          files={files}
          projectId={project.id}
          branchName={branchName}
          closeSelf={() => setFiles([])}
        />
      }
    </div>
  )
})

export default function Project() {
  const branchDropdown = useRef()
  const { projectId } = useParams()
  const { data, isError, isLoading, isFetching } = useProject(projectId)

  const [currBranch, setCurrBranch] = useState('main')
  
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
            ref={branchDropdown}
          />
          <Songs project={data} branchName={currBranch} />
        </>
      }
    </section>
  )
}
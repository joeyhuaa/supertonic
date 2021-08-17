import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'

import Songs from '../components/Songs'
import FloatDropdown from '../components/FloatDropdown'
import Context from '../components/Context'
import IconClickable from '../molecules/IconClickable'

import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsX } from 'react-icons/bs'

import { ScaleLoader } from 'react-spinners'

import  { 
  useProject, 
  useCreateBranch, 
  useUpdateProject, 
  useDeleteProject,
  useCreateSongs
} from '../hooks'

const AddSongsForm = ({
  files,
  projectId,
  branch,
  closeSelf
}) => {
  const { mutate, isLoading, error } = useCreateSongs()

  let audioToBase64 = async (audioFile) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        let b64 = e.target.result;
        let audio = document.createElement('audio')
        audio.src = b64;
        audio.addEventListener('loadedmetadata', () => {
          resolve({
            b64: b64,
            duration: audio.duration
          });
        })
      }
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
          branch: branch,
          id: projectId
        })

        // close form
        closeSelf()
      })
      .catch(err => console.log(err))
  }

  return (
    <section id='add-songs-form'>
      <div id='top'>
        <span
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={closeSelf}
        >
          <BsX size={30} color='whitesmoke' />
        </span>
        <h1 style={{ margin: 'auto' }}>Add Songs</h1>
      </div>

      <div>
        {files.map(file => (
          <div>
            {file.name}
          </div>
        ))}
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          className='round-btn submit-btn grow'
          onClick={handleAddSongs}
        >ADD SONGS</button>
      </div>
    </section>
  )
}

const BranchSelect = React.forwardRef((props, ref) => {
  const { branches } = props
  const { switchBranch } = useContext(Context)

  return (
    <select
      id='branch-dropdown'
      className='header-item'
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

  let [files, setFiles] = useState(null)
  let [newBranchName, setnewBranchName] = useState('')
  let createBranch = useCreateBranch()
  let updateProject = useUpdateProject()
  let deleteProject = useDeleteProject()
  let branchNames = Object.keys(project.branches)

  useEffect(() => {
    if (files) console.log(files);
  }, [files])

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

      <BranchSelect branches={project.branches} ref={ref} />

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

      {files && 
        <AddSongsForm
          files={files}
          projectId={project.id}
          branch={branch}
          closeSelf={() => setFiles(null)}
        />
      }
    </div>
  )
})

export default function Project() {
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
      {project &&
        <>
          <ProjectHeader 
            project={project}
            branch={state.currBranch}
            ref={branchDropdown}
          />
          <Songs project={project} branchName={state.currBranch} />
        </>
      }
    </section>
  )
}
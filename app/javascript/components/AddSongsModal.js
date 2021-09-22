import React, { useEffect } from 'react'

import { ClipLoader } from 'react-spinners'

import { useStore } from '../store'
import { useCreateSongs } from '../hooks/song'
import { audioToBase64 } from '../util/helpers'

import Modal from '../molecules/Modal'

const AddSongsModal = () => {
  const { mutate, isLoading, isSuccess, error } = useCreateSongs()
  const { 
    songsToUpload,
    project,
    currBranch,
    closeModal, 
  } = useStore.getState()

  useEffect(() => {
    if (isSuccess) closeModal()
  }, [isSuccess])

  let handleAddSongs = () => {
    // set up formdata
    let formdata = new FormData()

    // create array of proms for converting audio files -> b64
    let songPromises = []
    songsToUpload.forEach( file => songPromises.push( audioToBase64(file) ) )

    // resolve the array of proms
    Promise.all(songPromises)
      .then(result => {
        let songs = result.map((obj, i) => {
          return {
            name: songsToUpload[i].name,
            b64: obj.b64,
            duration: obj.duration,
          }
        })
        formdata.append('files', JSON.stringify(songs))

        // mutate
        mutate({
          files: JSON.stringify(songs),
          branchName: currBranch,
          id: project.id
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <Modal 
      modalId='add-songs-modal'
      title={`Add Songs (${songsToUpload.length})`}
      showClose={!isLoading}
      body={
        <>
          <div id='file-list'>
            {songsToUpload.map(file => (
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

export default AddSongsModal
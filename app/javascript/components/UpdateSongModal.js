import React, { useState } from 'react'

import { useStore } from '../store'
import { useUpdateSong } from '../hooks/song'
import { audioToBase64 } from '../util/helpers'

import Modal from '../molecules/Modal'

export default function UpdateSongModal() {
  const [newFile, setNewFile] = useState(null)
  const { mutate, isLoading } = useUpdateSong()
  const { songToUpdate } = useStore.getState()

  async function handleUpdateSong() {
    // * read file
    const b64 = await audioToBase64(newFile)
    console.log(b64)

    // * formdata
    let formdata = new FormData()

    // * mutate
    // mutate({
    //   id: song.id,
    //   newFile: newFile,
    // })
  }

  return (
    <Modal 
      modalId='update-song-modal'
      title={`Update Song`}
      showClose={!isLoading}
      body={
        <>
          <p>Choose a file to replace "{songToUpdate?.name}"</p>
          <input 
            type='file' 
            accept='.mp3, .wav'
            onChange={e => setNewFile(e.target.file)} 
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading ? (
              <ClipLoader color='white' />
            ) : (
              <button
                className='round-btn submit-btn grow'
                onClick={handleUpdateSong}
              >UPDATE SONG</button>
            )}
          </div>
        </>
      }
    />
  )
}
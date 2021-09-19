import React from 'react'

import { useStore } from '../store'
import { useCreateSongs } from '../hooks/song'

const AddSongsModal = () => {
  const { mutate, isLoading, isSuccess, error } = useCreateSongs()
  const { 
    songsToUpload,
    project,
    currBranch,
  } = useStore(state => ({
    songsToUpload: state.songsToUpload,
    project: state.project,
    currBranch: state.currBranch,
  }))

  useEffect(() => {
    if (isSuccess) closeModal()
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
    songsToUpload.forEach( file => songPromises.push( audioToBase64(file) ) )

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
          branchName: currBranch,
          id: project.id
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <Modal 
      modalId='add-songs-modal'
      title={`Add Songs (${files.length})`}
      showClose={!isLoading}
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

export default AddSongsModal
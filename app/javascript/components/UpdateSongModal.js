import React from 'react'

export default function UpdateSongModal({}) {
  return (
    <Modal 
      modalId='update-song-modal'
      title={`Update Song`}
      // todo
      // showClose={!isLoading}
      body={
        <>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading ? (
              <ClipLoader color='white' />
            ) : (
              <button
                className='round-btn submit-btn grow'
                onClick={handleAddSongs}
              >UPDATE SONG</button>
            )}
          </div>
        </>
      }
    />
  )
}
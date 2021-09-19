import React, { useContext } from 'react'
import Context from './Context'

import Clickable from '../molecules/Clickable'
import IconClickable from '../molecules/IconClickable'
import FancyFileInput from '../molecules/FancyFileInput'
import DropdownMenu from '../molecules/DropdownMenu'

import { useCreateSongs, useDeleteSong, useUpdateSong } from '../hooks'

import { FaPlay, FaPause } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { GoTriangleDown } from 'react-icons/go' // todo - replace w 3 dots

import { ScaleLoader } from 'react-spinners'

import * as moment from 'moment'
import 'moment-duration-format'

function UpdateSongForm() {
  return (
    <Modal 
      modalId='update-song-modal'
      title={`Update Song`}
      // todo
      // showClose={!isLoading}
      // onClose={onClose}
      body={
        <>
          <div id=''>
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
              >UPDATE SONG</button>
            )}
          </div>
        </>
      }
    />
  )
}

function Song({ song }) {
  const updateSong = useUpdateSong()
  const deleteSong = useDeleteSong()
  const { playPause, isPlaying, currSong } = useContext(Context)

  let update = () => {
    updateSong.mutate({
      id: song.id,
      // newFile: // TODO - new song file
    })
  }

  let destroy = () => deleteSong.mutate({ 
    id: song.id, 
    projectId: song.project_id,
    branchName: 'main' // TODO - make this dynamic
  })

  return (
    <Clickable className='song'>
      <IconClickable
        className='clickable play song-item'
        onClick={() => playPause(song.id)}
        icon={
          isPlaying && currSong.id === song.id ? (
            <FaPause className='grow' />
          ) : (
            <FaPlay className='grow' />
          )
        }
      />
      <span className='name ellipse song-item'>
        {song.name}
      </span>
      <span className='time song-item'>
        {moment.duration(song.duration, 'seconds').format('m:ss')}
      </span>
      <span className='date song-item'>
        {moment(new Date(song.created_at)).format('MM/DD/YYYY')}
      </span>
      <DropdownMenu 
        icon={<GoTriangleDown />}
        items={
          [
            {
              label: 'Change File',
              callback: update
            },
            {
              label: 'Delete',
              callback: destroy 
            }
          ]
        }
      />
    </Clickable>
  )
}

export default function Songs({ project, branchName }) {
  const { isLoading, error } = useCreateSongs()

  const songs = project.songs
  const branch = project.branches.find(b => b.name === branchName)

  if (songs.length === 0) {
    return (
      <div id='empty-songs'>
        {isLoading && <ScaleLoader color='whitesmoke' />}
        {!isLoading && 
          <FancyFileInput
            icon={<GiMusicalNotes size={50} />}
            accept='.mp3, .wav'
            label='Add Music'
            onChange={() => console.log('changing songs')}
            multiple
          />
        }
      </div>
    )
  }
  
  return (
    <div id='songs' className='fade-bottom'>
      {branch?.songs?.map(song => 
        <div key={song.id}>
          <Song song={song} />
        </div>
      )}
    </div>
  )
}
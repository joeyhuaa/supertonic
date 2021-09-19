import React, { useContext } from 'react'

import { useStore } from '../store'
import Context from './Context'

import Clickable from '../molecules/Clickable'
import IconClickable from '../molecules/IconClickable'
import FancyFileInput from '../molecules/FancyFileInput'
import DropdownMenu from '../molecules/DropdownMenu'

import { 
  useCreateSongs, 
  useDeleteSong, 
  useUpdateSong 
} from '../hooks/song'

import { FaPlay, FaPause } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { GoTriangleDown } from 'react-icons/go' // todo - replace w 3 dots

import { ScaleLoader } from 'react-spinners'

import * as moment from 'moment'
import 'moment-duration-format'

function Song({ song }) {
  const deleteSong = useDeleteSong()
  const { playPause, isPlaying, currSong } = useContext(Context)
  const { setSongToUpdate, openModal, currBranch } = useStore.getState()

  function handleOpenUpdateSongModal() {
    setSongToUpdate(song)
    openModal('update-song')
  }

  function destroy() { 
    deleteSong.mutate({ 
      id: song.id, 
      projectId: song.project_id,
      branchName: currBranch,
    })
  }

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
              callback: handleOpenUpdateSongModal
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
import React, { useContext } from 'react'
import Context from './Context'
import Clickable from '../molecules/Clickable'

import { useDeleteSong } from '../hooks'

import { FaPlay, FaPause } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'

import moment from 'moment'
import IconClickable from '../molecules/IconClickable'

function Song({ song }) {
  const deleteSong = useDeleteSong()
  const { playPause, isPlaying, currSong } = useContext(Context)

  let destroy = () => {
    deleteSong.mutate({
      id: song.id
    })
  }

  return (
    <div className='song' key={song.id}>
      <div className='play' onClick={() => playPause(song.id)}>
        {isPlaying && currSong.id === song.id ? <FaPause color='white' /> : <FaPlay color='white' />}
      </div>
      <span className='name'>{song.name}</span>
      <span className='time'>time</span>
      <span className='date'>
        {moment(new Date(song.created_at)).format('MMMM Do, YYYY')}
      </span>
      <div className='filechange clickable'>
        <span>Change</span>
      </div>
      <div className='filechange clickable' onClick={destroy}>
        <span>Delete</span>
      </div>
    </div>
  )
}

export default function Songs({ project, branchName }) {
  // console.log(project)

  const songs = project.songs
  const branch = project.branches.find(b => b.name === branchName)
  
  return (
    <div id='songs'>
      {songs.filter(song =>
        branch.includes(song.id)).map(song => (
          <Clickable styles={{ padding: '5px 15px' }} elemKey={song.id}>
            <Song song={song} />
          </Clickable>
        ))
      }
      {songs.length === 0 &&
        <div id='file-input'>
          <input type='file' id='file' />
          <label for='file'>
            <IconClickable 
              icon={<GiMusicalNotes size={50} />}
              padding={15}
            />
            Add Music
          </label>
        </div>
      }
    </div>
  )
}
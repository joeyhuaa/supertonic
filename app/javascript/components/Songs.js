import React, { useContext } from 'react'
import Context from './Context'
import Clickable from '../molecules/Clickable'
import IconClickable from '../molecules/IconClickable'
import FancyFileInput from '../molecules/FancyFileInput'

import { useCreateSongs, useDeleteSong } from '../hooks'

import { FaPlay, FaPause } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { BsX } from 'react-icons/bs'
import { VscNewFile } from 'react-icons/vsc'

import { ScaleLoader, FadeLoader } from 'react-spinners'

import * as moment from 'moment'
import 'moment-duration-format'

function Song({ song }) {
  const deleteSong = useDeleteSong()
  const { playPause, isPlaying, currSong } = useContext(Context)

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
        {moment(new Date(song.created_at)).format('MMMM Do, YYYY')}
      </span>
      <IconClickable 
        className='filechange clickable song-item'
        icon={<VscNewFile className='grow' />}
      />
      <IconClickable 
        className='filechange clickable song-item' 
        onClick={destroy}
        icon={
          deleteSong.isLoading ? (
            <FadeLoader size={15} color={'white'} />
          ) : (
            <BsX className='grow' size={15} />
          )
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
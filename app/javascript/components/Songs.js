import React, { useContext } from 'react'
import Context from './Context'
import Clickable from '../molecules/Clickable'

import styles from '../stylesheets/project.module.css'

import { FaPlay, FaPause } from 'react-icons/fa'
import moment from 'moment'

import useDeleteSong from '../hooks/useDeleteSong'

function Song({ song }) {
  const deleteSong = useDeleteSong()
  const { playPause, isPlaying, currSong } = useContext(Context)

  let destroy = () => {
    deleteSong.mutate({
      id: song.id
    })
  }

  return (
    <div className={styles.song} key={song.id}>
      <div className={styles.song_play} onClick={() => playPause(song.id)}>
        {isPlaying && currSong.id === song.id ? <FaPause color='white' /> : <FaPlay color='white' />}
      </div>
      <span className={styles.song_name}>{song.name}</span>
      <span className={styles.song_time}>time</span>
      <span className={styles.song_date}>
        {moment(new Date(song.created_at)).format('MMMM Do, YYYY')}
      </span>
      <div className={`${styles.song_filechange} clickable`}>
        <span>Change</span>
      </div>
      <div className={`${styles.song_filechange} clickable`} onClick={destroy}>
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
    <div>
      {songs.filter(song =>
        branch.includes(song.id)).map(song => (
          <Clickable styles={{ padding: '5px 15px' }} elemKey={song.id}>
            <Song song={song} />
          </Clickable>
        ))
      }
    </div>
  )
}
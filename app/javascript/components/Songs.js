import React, { useContext } from 'react'
import Context from './Context'

import styles from '../stylesheets/project.module.css'

import { FaPlay, FaPause } from 'react-icons/fa'
import moment from 'moment'

function Song({song}) {
  const { playPause, isPlaying, currSong } = useContext(Context)
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
      <div className={`${styles.song_filechange} clickable`}>
        <span>Delete</span>
      </div>
    </div>
  )
}

export default function Songs({project, branch}) {
  // console.log(branch)
  return (
    <div style={{ padding: '10px' }}>
      {project.files.filter(
        file => project.branches[branch].includes(file.id)).map(
          song => (
            <Song key={song.id} song={song} />
          )
        )
      }
    </div>
  )
}
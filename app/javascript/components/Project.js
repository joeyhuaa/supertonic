import React, { useState, useEffect, useRef, useContext } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import moment from 'moment'
import { useParams } from 'react-router-dom'

import ThingsContext from './ThingsContext'
import useProject from '../hooks/useProject'

import styles from '../stylesheets/project.module.css'

export default function Project({
  toggleNewBranchForm,
}) {
  let [state, setState] = useState({
    currBranch: 'main',
    showNewBranchForm: false
  })
  const { projectId } = useParams()
  const { user, playPause, isPlaying, currSong } = useContext(ThingsContext)
  const { data, isError, isLoading } = useProject(projectId)
  const project = data
  const branchDropdown = useRef(null)

  // switching branches
  let switchBranch = () => {
    setState({ ...state, currBranch: branchDropdown.current.value })
  }

  let destroyProj = async () => await fetch(`/api/projects/${project.id}/destroy`, { method: 'DELETE' }).then(() => window.location.reload())

  return (
    <section id={styles.project_view}>
      {isError && <span>Error.</span>}
      {isLoading && <span>Loading...</span>}
      {project &&
        <div>
          <div id={styles.header}>
            <h1>{project.name}</h1>
            <div className={`${styles.header_item} clickable`} onClick={destroyProj}>
              <span>Destroy</span>
            </div>
            <div id={styles.branch} className={styles.header_item}>
              <select id={styles.branch_dropdown} onChange={switchBranch} ref={branchDropdown}>
                {Object.keys(project.branches).map(branch => (
                  <option key={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <div className={`${styles.header_item} clickable`} onClick={() => toggleNewBranchForm(true)}>
              <span>New Branch</span>
            </div>
            <div className={`${styles.header_item} clickable`}>
              <span>Delete Current Branch</span>
            </div>
          </div>
          <div style={{
            paddingTop: '10px',
          }}>
            {project.files.filter(song => project.branches[state.currBranch].includes(song.id)).map(song => (
              <div className={styles.song} key={song.id}>
                <div className={styles.song_play} onClick={() => playPause(song.id)}>
                  {isPlaying && currSong.id === song.id ? <FaPause color='white' /> : <FaPlay color='white' />}
                </div>
                <span className={styles.song_name}>{song.name}</span>
                <span className={styles.song_time}>time</span>
                <span className={styles.song_date}>
                  {moment(new Date(song.date_created)).format('MMMM Do, YYYY')}
                </span>
                <div className={`${styles.song_filechange} clickable`}>
                  <span>Change</span>
                </div>
                <div className={`${styles.song_filechange} clickable`}>
                  <span>Delete</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </section>
  )
}
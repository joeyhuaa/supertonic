import React, {useState, useEffect, useRef, useContext} from 'react'
import ThingsContext from './ThingsContext'
import styles from '../stylesheets/project.module.css'
import {FaPlay, FaPause} from 'react-icons/fa'
import moment from 'moment'

export default function Project({
    toggleNewBranchForm,
    match
}) {
    let [state, setState] = useState({
        currBranch: 'main',
        showNewBranchForm: false
    })
    const {user, projects, playPause, isPlaying, currSong} = useContext(ThingsContext)
    const project = projects.find(p => p.id === parseInt(match.params.projectId))
    const branchDropdown = useRef(null)

    // switching branches
    let switchBranch = () => {
        setState({...state, currBranch: branchDropdown.current.value})
    }

    return (
        <section id={styles.project_view}>
            {project && 
                <div>
                    <div id={styles.header}>
                        <h1>
                            {project.name}
                        </h1>
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
                                    {moment( new Date(song.date_created) ).format('MMMM Do, YYYY')}
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
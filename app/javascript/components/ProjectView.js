import React, {useState, useEffect, useRef} from 'react'
import styles from '../stylesheets/projectview.module.css'
import {FaPlay, FaPause} from 'react-icons/fa'
import moment from 'moment'

export default function ProjectView({
    project,
    isPlaying,
    currSong,
    playPause,
    toggleNewBranchForm
}) {
    let [state, setState] = useState({
        currBranch: 'main',
        showNewBranchForm: false
    })

    useEffect(() => {
        console.log(window.location.href)
    })

    let branchDropdown = useRef(null)

    let dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

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
                        {project.songs.filter(song => project.branches[state.currBranch].includes(song.id)).map(song => (
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
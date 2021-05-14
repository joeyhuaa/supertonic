import React, {useEffect} from 'react'
import styles from '../stylesheets/projectview.module.css'
import {FaPlay, FaPause} from 'react-icons/fa'
import moment from 'moment'

export default function ProjectView({
    project,
    isPlaying,
    currSong,
    playPause
}) {

    useEffect(() => {
        if (project) project.songs.map(song => console.log(dataURLtoFile(song.b64)))
    },[])

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

    return (
        <section
            id={styles.project_view}
        >
            {project && 
                <div>
                    <h1 style={{
                        borderBottom: 'solid gray 1px',
                        paddingBottom: '10px',
                    }}>{project.name}</h1>
                    <div style={{
                        paddingTop: '10px',
                    }}>
                        {project.songs.map(song => (
                            <div className={styles.song} key={song.id}>
                                <div className={styles.song_play} onClick={() => playPause(song.id)}>
                                    {isPlaying && currSong.id === song.id ? <FaPause color='white' /> : <FaPlay color='white' />}
                                </div>
                                <span className={styles.song_name}>{song.name}</span>
                                <span className={styles.song_time}>time</span>
                                <span className={styles.song_date}>
                                    {moment( new Date(song.date_created) ).format('MMMM Do, YYYY')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}
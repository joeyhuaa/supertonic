import React from 'react'
import styles from '../stylesheets/projectview.module.css'
import {FaPlay} from 'react-icons/fa'

export default function ProjectView({
    project,
    getCurrSong
}) {
    const csrf_token = document.head.querySelector("[name=csrf-token]").content
    let getAudioB64 = id => {
        // get the song
        fetch(`/song/${id}`, {
            method: 'GET',
            headers: {
                "X-CSRF-Token": csrf_token
            },
        })
        .then(result => result.json())
        .then(data => {
            // send song to App
            getCurrSong(data.song) 
        })
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
                            <div className={styles.song} key={song['id']}>
                                <div className={styles.song_play} onClick={() => getAudioB64(song['id'])}>
                                    <FaPlay color='white' />
                                </div>
                                <span className={styles.song_name}>{song['name']}</span>
                                <span className={styles.song_time}>time</span>
                                <span className={styles.song_date}>date added</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}
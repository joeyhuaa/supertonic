import React from 'react';
import styles from '../stylesheets/projectview.module.css'

export default function ProjectView({
    project
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
        .then(data => console.log(data))
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
                            <p onClick={() => getAudioB64(song['id'])}>{song['name']}</p>
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}
import React, {useState} from 'react'
import {BsX} from 'react-icons/bs'

let styles = {
    form_container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        position:'absolute',
        bottom:'25%',
        left:'30%',
        borderRadius:'3px',
        backgroundColor:'#4e4f52',
        width:'500px',
        height:'400px',
        padding:'20px',
        zIndex: 3
    },
    top: {
        textAlign:'center',
        width:'100%',
    },
    name_input: {
        width:'75%',
    },
    description_input: {
        width:'75%',
        height:'150px',
    }
}

export default function NewProjectForm({
    closeSelf
}) {
    let [name, setName] = useState()
    let [description, setDescription] = useState()

    let audioToBase64 = async (audioFile) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onerror = reject;
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(audioFile);
        });
    }

    let postNewProj = formdata => {
        fetch('/project/new', {
            method: 'POST',
            body: formdata,
        })
        .then(() => window.location.reload()) // reload app to get new data
    }

    let handleNewProj = () => {
        // set up formdata
        let files = Array.from(document.getElementById('upload').files)
        let formdata = new FormData()
        formdata.append('name', name)
        formdata.append('description', description)

        // create array of proms for converting audio files -> b64
        let promises = []
        files.forEach((file) => {
            promises.push(audioToBase64(file))
        })

        // resolve the array of proms
        Promise.all(promises) // !this was the missing piece of the puzzle!
        .then(result => {
            let songs = result.map((b64, i) => {
                return {
                    name: files[i].name,
                    b64: b64
                }
            })
            formdata.append('files', JSON.stringify(songs))
            postNewProj(formdata) 
        })
        .catch(err => console.log(err))
    }

    return (
        <section style={styles.form_container}>
            <div style={styles.top}>
                <span
                    style={{float:'right', cursor:'pointer'}}
                    onClick={closeSelf}
                >
                    <BsX size={30} color='whitesmoke' />
                </span>
                <h1 style={{margin:'auto'}}>Create Project</h1>
            </div>

            <p>Name</p>
            <input 
                type='text' 
                style={styles.name_input} 
                onChange={e => setName(e.target.value)} 
            />
            <p>Description</p>
            <textarea 
                type='text' 
                style={styles.description_input} 
                onChange={e => setDescription(e.target.value)}
            />
            <p>Upload Files</p>
            <input id='upload' type='file' multiple />

            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                <button 
                    className='round-btn submit-btn'
                    onClick={() => {
                        handleNewProj()
                        closeSelf()
                    }}
                >CREATE</button>
            </div>
        </section>
    )
}
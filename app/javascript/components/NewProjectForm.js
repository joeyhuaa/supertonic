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
    const csrf_token = document.head.querySelector("[name=csrf-token]").content // is this security vulnerability??
    // can't a hacker just parse this code and get the token...
    // can't a hacker literally just paste line 36 and bypass csrf protection>??!?!???? 

    let postNewProj = () => {
        // post to project/new
        let files = Array.from(document.getElementById('upload').files)
        let formdata = new FormData()

        formdata.append('name', name)
        formdata.append('description', description)
        files.forEach(f => formdata.append('files[]', f))

        fetch('/project/new', {
            method: 'POST',
            headers: {
                "X-CSRF-Token": csrf_token
            },
            body: formdata,
        }).then(() => window.location.reload())
    }

    return (
        <section style={styles.form_container}>
            <div style={styles.top}>
                <span
                    style={{float:'right'}}
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
                        postNewProj()
                        closeSelf()
                    }}
                >CREATE</button>
            </div>
        </section>
    )
}
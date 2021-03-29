/**
 * "SuperTonic" 
 * - one up from the first note, home, even better than home... next door is home... 
 * - the super cure/elixir... for music project management 
 */

/**
 * ROADMAP
 * 1. set up the project view
 * 2. create user login
 * 3. other views??
 */

/**
 * COMPONENTS
 * 1. Directory = list of files 
 * 2. MusicPlayer - mp3 streamer on the bottom of page 
 * 3. Uploader - input plus file handling, rest api
 * 4. Header
 * 5. Footer? 
 * 6. Sidebar - list projects (like spotify sidebar)
 */

/** PROPS - pulled from db
 * 1. projects
 * 2. commits
 * 3. name of user
 */

/** STATES
 * 1. current commit
 * 2. files to be uploaded
 * 3. current song playing
 * 4. current project
 * 5. current files being viewed
 */

/**
 * TECH DETAILS
 * 1. all files conv to mp3, upload mp3 preferred but can also use API to online converter
 * 2. no limit to uploads per commit
 * 3. no limit to # of commits
 */

/** 
 * COLOR PALETTE - red tones
 * 1. whitesmoke
 * 2. burgundy - #660033, #cc0044, #990033
 * 3. pink - #cc00cc
 * 4. violet/gray - #666699
 * 5. salmon - #ff9999
 */

/**
 * THEMES
 * nocturne - default
 * con fuoco - burgundy/dark red 
 * flambe - salmon/orange/pink
 * adagio - light blue/chill
 * mezzo forte - black/space gray
 * ad Parnassum - white/quartz
 */

import React, {useState, useEffect} from 'react'
import ProjectView from './ProjectView'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Sidebar from './Sidebar'
import NewProjectForm from './NewProjectForm'

export default function App({
    projects
}) {
    useEffect(() => {
        // base64 -> file
        // if (projects.length > 0) {
        //     projects[0].files.forEach(f => {
        //         console.log(atob(f))
        //     })
        // }
    }, [projects])

    useEffect(() => {
        // console.log('render')
    })

    let [state, setState] = useState({
        showNewProjectForm: false,
        files: []
    })

    let toggleNewProjForm = (val) => {
        setState({...state, showNewProjectForm: val})
    }

    console.log(atob(''))

    return (
        <div id='main'>
            <Sidebar 
                projects={projects}
                newProjClicked={() => toggleNewProjForm(true)}
            />
            {/* <Header /> */}
            <ProjectView />
            <MusicPlayer />

            {state.showNewProjectForm &&
                <NewProjectForm 
                    closeSelf={() => toggleNewProjForm(false)}
                />
            }
        </div>
    )
}
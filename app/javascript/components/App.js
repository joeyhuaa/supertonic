/**
 * "SuperTonic" 
 * - one up from the first note, home, even better than home... next door is home... 
 * - the super cure/elixir... for music project management 
 */

/**
 * ROADMAP
 * 1. set up the project view
 * 2. create user login https://www.honeybadger.io/blog/oauth2-ruby/
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

/**
 *  ROUTING
 * 1. react_component (App) only needed??
 * 2. use react router inside of App.js to handle routing, like when clicking on a project?
 * 3. but then the route would have to be diff than the rails routes
 */

import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { ThingsProvider } from './ThingsContext'

import Container from './Container'
import MusicPlayer from './MusicPlayer'
import Overlay from './Overlay'
import Sidebar from './Sidebar'
import NewProjectForm from './NewProjectForm'
import NewBranchForm from './NewBranchForm'
import Project from './Project'

export default function App({
  user
}) {
  let [state, setState] = useState({
    currSong: null,
    isPlaying: false,
    showNewProjectForm: false,
    showNewProjectForm: false
  })

  useEffect(() => {
    console.log('app')
  })

  const things = {
    user: user,
    isPlaying: state.isPlaying,
    currSong: state.currSong,
    playPause: async (id) => {
      console.log('song', id)
      // if no song is in state, or we are changing songs, make a fetch request and update state
      if (state.currSong === null) {
        let { song } = await getSong(id)
        setState({ ...state, currSong: song, isPlaying: true })
      } else if (state.currSong.id !== id) {
        let { song } = await getSong(id)
        setState({ ...state, currSong: song, isPlaying: true })
        // somehow make 2 successive state changes on isPlaying?
      } else {
        setState({ ...state, isPlaying: !state.isPlaying })
      }
    },
  }

  // send request to server to add branch
  let addBranch = (branchName) => {

  }

  let getSong = async (id) => {
    let data = await fetch(`/api/songs/${id}`)
    return data.json()
  }

  let toggleNewProjForm = (val) => {
    setState({...state, showNewProjectForm: val})
  }

  // pull up a form or some input 
  // call addBranch from inside here
  let toggleNewBranchForm = (val) => {
    setState({...state, showNewBranchForm: val})
  }

  return (
    <ThingsProvider value={things}>
      <BrowserRouter>
        <Container>
          <Overlay show={state.showNewBranchForm || state.showNewProjectForm} />
          <Sidebar
            newProjClicked={() => toggleNewProjForm(true)}
          />
          <Route 
            path='/projects/:projectId' 
            render={() => <Project toggleNewBranchForm={toggleNewBranchForm} />} 
          />
          {state.showNewProjectForm &&
            <NewProjectForm
              closeSelf={() => toggleNewProjForm(false)}
            />
          }
          {state.showNewBranchForm &&
            <NewBranchForm
              closeSelf={() => toggleNewBranchForm(false)}
            />
          }
          <MusicPlayer />
        </Container>
      </BrowserRouter>
    </ThingsProvider>
  )
}
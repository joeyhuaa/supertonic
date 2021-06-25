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
import { ThingsProvider } from './ThingsContext'

import Container from './Container'
import Project from './Project'
import Header from './Header'
import MusicPlayer from './MusicPlayer'
import Sidebar from './Sidebar'

import useProjects from '../hooks/useProjects'

export default function App({
  user
}) {
  let [state, setState] = useState({
    files: [],
    currProj: null,
    currSong: null,
    isPlaying: false,
  })

  const things = {
    user: user,
    projects: useProjects(),
    playPause: async (id) => {
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
    isPlaying: state.isPlaying,
    currSong: state.currSong,
  }

  // send request to server to add branch
  let addBranch = (branchName) => {

  }

  let getSong = async (id) => {
    let data = await fetch(`/song/${id}`)
    return data.json()
  }

  let projectSelected = (id) => {
    // get request to get the project
    // fetch(`/project/${id}`, {
    //     method: 'GET',
    // })
    // .then(result => result.json())
    // .then(data => {
    //     console.log(data)
    //     setState({...state, currProj: data})

    //     // set url
    //     // need a rails route/view to make this work?
    //     // window.location.href = `project/${id}`
    // })
  }

  return (
    <div>
      <ThingsProvider value={things}>
        <Container
          projectSelected={projectSelected}
        >
          <MusicPlayer
            song={state.currSong}
            isPlaying={state.isPlaying}
          />
        </Container>
      </ThingsProvider>
    </div>
  )
}
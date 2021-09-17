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
 *  ROUTING
 * 1. react_component (App) only needed??
 * 2. use react router inside of App.js to handle routing, like when clicking on a project?
 * 3. but then the route would have to be diff than the rails routes
 */

import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Provider } from './Context'
import { useStateCallback } from '../hooks';

import Settings from '../views/Settings';
import Project from '../views/Project'

import Container from './Container'
import MusicPlayer from './MusicPlayer'
import Overlay from './Overlay'
import Sidebar from './Sidebar'

function App({ user }) {
  const [state, setState] = useStateCallback({
    currSong: null,
    isPlaying: false,
    showOverlay: false,
  })

  const appContext = {
    user: user,
    isPlaying: state.isPlaying,
    currSong: state.currSong,
    playPause: async (id) => {
      // if no song is in state, or we are changing songs, make a fetch request and update state
      if (state.currSong === null) {
        let { song } = await getSong(id)
        setState({ ...state, currSong: song, isPlaying: true })
      } else if (state.currSong.id !== id) {
        let { song } = await getSong(id)
        setState(
          { ...state, isPlaying: false },
          newState => setState({ ...newState, currSong: song, isPlaying: true})
        )
      } else {
        setState({ ...state, isPlaying: !state.isPlaying })
      }
    },
    setShowOverlay: val => setState({...state, showOverlay: val})
  }
  
  let getSong = async (id) => {
    let res = await fetch(`/api/songs/${id}`)
    return res.json()
  }

  return (
    <Provider value={appContext}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Container>
          {state.showOverlay && <Overlay />}
          <div style={{
            display: 'flex',
            width: '100%',
            height: '85vh',
          }}>
            <Sidebar />
            <Route 
              path='/projects/:projectId' 
              component={Project}
            />
            <Route 
              path='/projects/:projectId/branch'
              component={Project}
            />
            <Route 
              path='/settings'
              component={Settings}
            />
          </div>
          <MusicPlayer />
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default hot(App)
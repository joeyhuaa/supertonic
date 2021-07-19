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

import { hot } from 'react-hot-loader/root';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Provider } from './Context'
import useStateCallback from '../hooks/useStateCallback'

import Settings from '../views/Settings';
import Project from '../views/Project'

import Container from './Container'
import MusicPlayer from './MusicPlayer'
import Overlay from './Overlay'
import Sidebar from './Sidebar'
import NewBranchForm from './NewBranchForm'

function App({ user }) {
  const [state, setState] = useStateCallback({
    currSong: null,
    isPlaying: false,
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
        console.log('change song')
        let { song } = await getSong(id)
        setState(
          { ...state, isPlaying: false },
          newState => setState({ ...newState, currSong: song, isPlaying: true})
        )
      } else {
        console.log('toggle same song')
        setState({ ...state, isPlaying: !state.isPlaying })
      }
    },
  }

  // send request to server to add branch
  let addBranch = (branchName) => {

  }

  let getSong = async (id) => {
    let res = await fetch(`/api/songs/${id}`)
    return res.json()
  }

  let toggleAddSongsForm = val => {
    setState({...state, showAddSongsForm: val})
  }

  let toggleNewBranchForm = val => {
    setState({...state, showNewBranchForm: val})
  }

  return (
    <Provider value={appContext}>
      <BrowserRouter>
        <Container>
          
          {state.showNewBranchForm &&
            <NewBranchForm
              closeSelf={() => toggleNewBranchForm(false)}
            />
          }

          <Overlay show={state.showNewBranchForm || state.showAddSongsForm} />
          <Sidebar />
          <MusicPlayer />

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
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default hot(App)
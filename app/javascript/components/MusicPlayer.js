import React, { useState, useEffect, useRef, useContext } from 'react'
import shallow from 'zustand/shallow'

import moment from 'moment'
import { FaPlay, FaPause } from 'react-icons/fa'

import Context from './Context'

import { useStore } from '../store'
import { THEME } from '../aesthetics'

export default function MusicPlayer() {
  const [currentTime, setCurrentTime] = useState(null)
  const { currSong, isPlaying, playPause } = useContext(Context)
  const theme = useStore(state => state.theme, shallow)

  useEffect(() => {
    if (isPlaying) {
      music.current.play()  
    } else {
      music.current.pause()
    }
    // console.log('current song', music.current)
  }, [isPlaying])

  let music = useRef(null)
  let playhead = useRef(null)
  let timeline = useRef(null)
  let timelinePast = useRef(null)
  let pButton = useRef(null)

  let getCurrentTime = () => { if (music.current) return music.current.currentTime }

  let getDuration = () => { if (music.current) return music.current.duration }

  let getTimeLineWidth = () => timeline.current.offsetWidth

  // let queueNextSong = () => {
  //     let nextSong = songs[Math.floor(Math.random() * songs.length)]
  //     if (nextSong === currentSong) queueNextSong()
  //     else setCurrentSong(nextSong)
  // }

  let timeUpdate = () => {
    // update the timeline UI
    let playPercent = (music.current.currentTime / getDuration()) * getTimeLineWidth()
    playhead.current.style.marginLeft = playPercent + 'px'
    timelinePast.current.style.width = playPercent + 5 + 'px'

    // set state
    setCurrentTime( msString(getCurrentTime()) )
    if ( getCurrentTime() === getDuration() ) {
      setIsPlaying(false)
      queueNextSong()
    }
  }

  let timeLineClicked = (e) => {
    let timelineLeft = timeline.current.getBoundingClientRect().left
    let clickPercent = (e.clientX - timelineLeft) / getTimeLineWidth()
    music.current.currentTime = getDuration() * clickPercent
    setCurrentTime(msString(getCurrentTime()))
  }

  let msString = (seconds) => {
    let t = moment.duration(seconds * 1000);
    let m = t.minutes()
    let s = t.seconds() < 10 ? '0' + t.seconds() : t.seconds();
    if (Number.isNaN(m) || Number.isNaN(s)) return null;
    else return `${m}:${s}`
  };

  return (
    <section 
      id='player_container' 
      style={{backgroundColor: THEME[theme]?.color4}}
    >
      <audio
        id='music'
        ref={music}
        onTimeUpdate={timeUpdate}
        src={currSong ? currSong.b64 : null}
      />

      <span className='song_title'>
        {currSong ? currSong.name : null}
      </span>

      <div id='pButton' ref={pButton} onClick={() => playPause(currSong.id)}>
        {isPlaying ? (
          <FaPause color='white' className='grow' />
        ) : (
          <FaPlay color='white' className='grow' />
        )}
      </div>

      <span className='timestamp'>
        {music.current ? currentTime : `-:--`} {/* change to if currentSong, not if music.current */}
      </span>

      <div id='timeline' ref={timeline} onClick={e => timeLineClicked(e)}>
        <div id='timeline_past' ref={timelinePast} />
        <div id='playhead' ref={playhead} />
      </div>

      <span className='timestamp'>
        {music.current ? msString(getDuration()) : `-:--`}
      </span>
    </section>
  )
}
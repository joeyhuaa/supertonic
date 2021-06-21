import React, {useState, useEffect, useRef, useContext} from 'react'
import ThingsContext from './ThingsContext'
import moment from 'moment'
import styles from '../stylesheets/musicplayer.module.css'
import {FaPlay, FaPause} from 'react-icons/fa'

export default function MusicPlayer({
    song,
    isPlaying,
}) {
    let [currentTime, setCurrentTime] = useState(null)
    const {playPause} = useContext(ThingsContext)
    // console.log(song)

    useEffect(() => {
        if (isPlaying) {
            music.current.play()
        } else {
            music.current.pause()
        }
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
        setCurrentTime(msString(getCurrentTime()))
        if (getCurrentTime() === getDuration()) {
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

    let button = isPlaying ?  
        <div id={styles.pButton} ref={pButton} onClick={() => playPause(song.id)}><FaPause color='white' /></div> :
        <div id={styles.pButton} ref={pButton} onClick={() => playPause(song.id)}><FaPlay color='white' /></div>

    return (
        <section id={styles.player_container}>
            <audio 
                id='music' 
                ref={music} 
                onTimeUpdate={timeUpdate}
                src={song ? song.b64 : null}
            />

            <span className={styles.song_title}>
                {song ? song.name : null}
            </span>

            {button}

            <span className={styles.timestamp}>
                {music.current ? currentTime :  `-:--`} {/* change to if currentSong, not if music.current */}
            </span>

            <div id={styles.timeline} ref={timeline} onClick={e => timeLineClicked(e)}>
                <div id={styles.timeline_past} ref={timelinePast} />
                <div id={styles.playhead} ref={playhead} />
            </div>

            <span className={styles.timestamp}>
                {music.current ? msString(getDuration()) : `-:--`}
            </span>
        </section>
    )
}
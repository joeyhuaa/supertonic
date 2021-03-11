import React, {useState, useEffect, useRef} from 'react'
import styles from '../stylesheets/musicplayer.module.css'
import play from '../../assets/images/play.png'
import pause from '../../assets/images/pause.png'

export default function MusicPlayer({songs}) {
    let [isPlaying, setIsPlaying] = useState(false)
    //   let [currentSong, setCurrentSong] = useState(songs[Math.floor(Math.random() * songs.length)])
    let [currentTime, setCurrentTime] = useState(null)

    // useEffect(() => {
    //   console.log(music.current.currentSrc)
    //   console.log(music.current.src)
    // },[currentSong])

    let music = useRef(null)
    let playHead = useRef(null)
    let timeline = useRef(null)
    let pButton = useRef(null)

    let getCurrentTime = () => { if (music.current) return music.current.currentTime }

    let getDuration = () => { if (music.current) return music.current.duration }

    let getTimeLineWidth = () => timeline.current.offsetWidth - playHead.current.offsetWidth

    let playPause = () => {
        if (music.current.paused) {
        music.current.play()
        setIsPlaying(true)
        } else {
        music.current.pause()
        setIsPlaying(false)
        }
    }

    // let queueNextSong = () => {
    //     let nextSong = songs[Math.floor(Math.random() * songs.length)]
    //     if (nextSong === currentSong) queueNextSong()
    //     else setCurrentSong(nextSong)
    // }

    let timeUpdate = () => {
        let playPercent = (music.current.currentTime / getDuration()) * getTimeLineWidth()
        playHead.current.style.marginLeft = playPercent + 'px'
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
        <img id={styles.pButton} src={pause} alt='button' ref={pButton} onClick={playPause} /> :
        <img id={styles.pButton} src={play} alt='button' ref={pButton} onClick={playPause} />

    return (
        <section id={styles.player_container}>
            <audio 
                id='music' 
                // key={currentSong.file} 
                ref={music} 
                onTimeUpdate={timeUpdate}
                >
                {/* <source src={currentSong.file} type='audio/mpeg'></source> */}
            </audio>

            {/* <img src={currentSong.art} width={30} alt='cover art' /> */}
            <span className={styles.song_title}>
                {/* {currentSong.title} */}
            </span>
            {button}
            <span className={styles.timestamp}>
                {music.current ? currentTime :  `-:--`}
            </span>
            <div id={styles.timeline} ref={timeline} onClick={e => timeLineClicked(e)}>
                <div id={styles.playHead} ref={playHead}></div>
            </div>
            <span className={styles.timestamp}>
                {music.current ? msString(getDuration()) : `-:--`}
            </span>
        </section>
    )
}
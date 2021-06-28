import React, { useContext } from 'react'
import Context from './Context'
import { THEME } from '../aesthetics'

export default function Container({children}) {
  const { theme } = useContext(Context)
  // console.log(theme)
  // console.log(THEME[theme])
  const styles = {
    backgroundImage: `linear-gradient(to bottom, ${THEME[theme]?.color2}, ${THEME[theme]?.color3} 25%)`,
  }

  return (
    <div id='main' style={styles}>
      {children}
    </div>
  )
}
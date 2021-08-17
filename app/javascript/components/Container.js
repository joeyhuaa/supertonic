import React from 'react'
import { THEME } from '../aesthetics'
import { useTheme } from '../hooks'

export default function Container({children}) {
  const theme = useTheme().data
  const styles = {
    backgroundImage: `linear-gradient(to bottom, ${THEME[theme]?.color2}, ${THEME[theme]?.color3} 25%)`,
  }

  return (
    <div id='main' style={styles}>
      {children}
    </div>
  )
}
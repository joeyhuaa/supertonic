import React from 'react'
import shallow from 'zustand/shallow'
import { useStore } from '../store'
import { THEME } from '../aesthetics'

export default function Container({children}) {
  const theme = useStore(state => state.theme, shallow)
  const styles = {
    backgroundImage: `linear-gradient(to bottom, ${THEME[theme]?.color2}, ${THEME[theme]?.color3} 25%)`,
  }

  return (
    <div id='main' style={styles}>
      {children}
    </div>
  )
}
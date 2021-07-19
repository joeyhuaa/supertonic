import React, { useContext } from 'react'
import Context from './Context'
import { THEME } from '../aesthetics'
import useTheme from '../hooks/useTheme'
import { useEffect } from 'react/cjs/react.development'

export default function Container({children}) {
  // const { theme } = useContext(Context)
  const theme = useTheme().data
  const styles = {
    backgroundImage: `linear-gradient(to bottom, ${THEME[theme]?.color2}, ${THEME[theme]?.color3} 25%)`,
  }

  useEffect(() => {
    console.log('path');
  }, [window.location.pathname])

  return (
    <div id='main' style={styles}>
      {children}
    </div>
  )
}
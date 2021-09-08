import React, { useState, useEffect, useContext } from 'react'
import { THEME } from '../aesthetics'
import {useTheme} from '../hooks'

const Clickable = React.forwardRef((props, ref) => {
  const [isHovering, setHovering] = useState(false)
  const theme = useTheme().data
  const {
    elemKey,
    className,
    children,
    onClick = () => {},
    styles = { padding: '5px' },
    isSelected = false,
  } = props

  // useEffect(() => {
  //   console.log('isHovering:', isHovering)
  // }, [isHovering])

  const getStyles = () => {
    if (isSelected) return {...styles, backgroundColor: THEME[theme].color2 }
    if (isHovering) return {...styles, backgroundColor: THEME[theme].color4 }
    else return styles
  }

  return (
    <div 
      key={elemKey}
      ref={ref}
      className={`clickable ${className}`}
      onClick={() => {
        onClick()
      }} 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={getStyles()}
      tabIndex='0'
    >
      {children}
    </div>
  )
})

export default Clickable
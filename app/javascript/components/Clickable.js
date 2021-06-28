import React, { useState, useContext } from 'react'
import Context from './Context'
import { THEME } from '../aesthetics'

export default function Clickable(props) {
  const [isHovering, setHovering] = useState(false)
  const [isSelected, setSelected] = useState(false)
  const { theme } = useContext(Context)
  const {
    children,
    onclick,
    styles
  } = props

  const getStyles = () => {
    if (isSelected) return {...styles, backgroundColor: THEME[theme].color1}
    if (isHovering) return {...styles, backgroundColor: THEME[theme].color2}
    else return null
  }

  return (
    <div 
      className='clickable' 
      onClick={onclick} 
      onMouseEnter={() => setHovering(true)}
      style={getStyles}
    >
      {children}
    </div>
  )
}
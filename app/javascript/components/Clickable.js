import React, { useState, useContext } from 'react'
import Context from './Context'

export default function Clickable(props) {
  const [isHovering, setHovering] = useState(false)
  const [isSelected, setSelected] = useState(false)
  const { theme } = useContext(Context)
  const {
    children,
    onclick,
    styles
  } = props

  return (
    <div 
      className='clickable' 
      onClick={onclick} 
      onMouseEnter={() => setHovering(true)}
      style={isHovering ? {...styles, backgroundColor: 'black'} : styles}
    >
      {children}
    </div>
  )
}
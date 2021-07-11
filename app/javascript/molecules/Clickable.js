import React, { useState, useEffect, useContext } from 'react'
import Context from '../components/Context'
import { THEME } from '../aesthetics'

const Clickable = React.forwardRef((props, ref) => {
  const [isHovering, setHovering] = useState(false)
  const [isSelected, setSelected] = useState(false)
  const { theme } = useContext(Context)
  const {
    children,
    onclick,
    styles
  } = props

  // useEffect(() => {
  //   console.log('isSelected:', isSelected)
  // }, [isSelected])

  // useEffect(() => {
  //   console.log('isHovering:', isHovering)
  // }, [isHovering])

  const getStyles = () => {
    // console.log('styyyyyle')
    if (isSelected) return {...styles, backgroundColor: THEME[theme].color2 }
    if (isHovering) return {...styles, backgroundColor: THEME[theme].color4 }
    else return styles
  }

  return (
    <div 
      ref={ref}
      className='clickable' 
      onClick={() => {
        onclick()
        setSelected(!isSelected)
      }} 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={getStyles()}
    >
      {children}
    </div>
  )
})

export default Clickable
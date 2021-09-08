import React, { useState } from 'react'
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
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    styles = { padding: '5px' },
    isSelected = false,
  } = props

  const getStyles = () => {
    if (isSelected) return {...styles, backgroundColor: THEME[theme].color2 }
    if (isHovering) return {...styles, backgroundColor: THEME[theme].color4 }
    else return styles
  }

  const _onMouseEnter = () => {
    onMouseEnter()
    setHovering(true)
  }

  const _onMouseLeave = () => {
    onMouseLeave()
    setHovering(false)
  }

  return (
    <div 
      key={elemKey}
      ref={ref}
      className={`clickable ${className}`}
      onClick={() => {
        onClick()
      }} 
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
      style={getStyles()}
      tabIndex='0'
    >
      {children}
    </div>
  )
})

export default Clickable
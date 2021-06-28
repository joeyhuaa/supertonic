import React, { useState, useContext } from "react"
import { THEME } from "../aesthetics"
import Context from "./Context"

const IconButton = React.forwardRef((props, ref) => {
  const {
    onclick,
    icon
  } = props

  const { theme } = useContext(Context)
  const [isClicked, setClicked] = useState(false)
  const btnStyles = {
    border: 'none',
    backgroundColor: isClicked ? THEME[theme]?.color1 : 'transparent',
    display: 'flex',
    alignItems: 'center',
    width: '30px',
    height: '30px',
  }

  return (
    <button 
      ref={ref}
      onClick={() => {
        setClicked(!isClicked)
        onclick()
      }}
      style={btnStyles}
    >
      {icon}
    </button>
  )
})

export default IconButton
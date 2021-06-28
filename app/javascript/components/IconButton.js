import React, { useState } from "react"

const IconButton = React.forwardRef((props, ref) => {
  const {
    onclick,
    icon
  } = props

  const [isClicked, setClicked] = useState(false)
  const btnStyles = {
    border: 'none',
    backgroundColor: isClicked ? 'black' : 'transparent',
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
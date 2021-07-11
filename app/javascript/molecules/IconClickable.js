import React from "react"

import Clickable from "./Clickable"

const IconClickable = React.forwardRef((props, ref) => {
  const {
    onclick,
    icon,
    padding = 5,
  } = props

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${padding}px`
  }  

  return (
    <Clickable
      ref={ref}
      onclick={onclick}
      styles={baseStyles}
    >
      {icon}
    </Clickable>
  )
})

export default IconClickable
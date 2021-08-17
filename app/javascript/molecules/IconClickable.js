import React from "react"

import Clickable from "./Clickable"

const IconClickable = React.forwardRef((props, ref) => {
  const {
    onclick,
    icon,
    padding = 5,
    className
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
      className={className}
    >
      {icon}
    </Clickable>
  )
})

export default IconClickable
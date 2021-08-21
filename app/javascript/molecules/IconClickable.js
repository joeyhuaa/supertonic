import React from "react"

import Clickable from "./Clickable"

const IconClickable = React.forwardRef((props, ref) => {
  const {
    onClick,
    icon,
    padding = 5,
    className,
    style,
  } = props

  const styles = {
    ...style,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${padding}px`
  }  

  return (
    <Clickable
      ref={ref}
      onClick={onClick}
      styles={styles}
      className={className}
    >
      {icon}
    </Clickable>
  )
})

export default IconClickable
import React from "react"

export default function Overlay({
  show
}) {
  return (
    <div
      id='overlay'
      style={{
        display: show ? 'block' : 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'black',
        opacity: 0.6
      }}
    />
  )
}
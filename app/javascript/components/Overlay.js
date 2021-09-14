import React from "react"

export default function Overlay() {
  return (
    <div
      id='overlay'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'black',
        opacity: 0.3
      }}
    />
  )
}
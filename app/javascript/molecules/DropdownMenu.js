import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default function DropdownMenu({
  items,
  label = null,
  icon,
  className,
  showBorder = false,
}) {
  return (
    <Dropdown className={`dropdown ${className}`}>
      <Dropdown.Toggle 
        id="dropdown-basic"
        className='df aic'
        style={{ 
          backgroundColor: 'transparent', 
          border: showBorder ? 'solid whitesmoke 1px' : 'none',
          outline: 'none',
        }}
      >
        {icon}
        {label}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, idx) => (
          <Dropdown.Item 
            key={idx}
            onClick={item.callback}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
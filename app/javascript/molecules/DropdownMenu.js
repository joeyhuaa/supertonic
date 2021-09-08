import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export default function DropdownMenu({
  items,
  label,
  icon,
  className,
}) {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle 
        variant="success" 
        id="dropdown-basic"
        className='df aic'
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
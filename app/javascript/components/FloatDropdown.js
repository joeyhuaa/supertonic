import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePopper } from 'react-popper'
import {
  GoTriangleDown
} from 'react-icons/go'

import IconClickable from '../molecules/IconClickable'

const FloatDropdown = React.forwardRef((props, ref) => {
  const { options } = props

  const [showDropdown, setShowDropdown] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [15, 10],
        },
      },
    ],
  });
  const dangerStyles = {
    color: 'red'
  }

  return (
    <div className='floatdropdown'>
      <IconClickable 
        icon={<GoTriangleDown size={20} />}
        onClick={() => setShowDropdown(!showDropdown)}
        ref={setReferenceElement}
        className='icon'
      />
      {/* {showDropdown &&  */}
        <div 
          ref={setPopperElement} 
          className='dropdown'
          style={{ ...styles.popper }} 
          {...attributes.popper}
          tabIndex='0'
        >
          {options.map(({ name, danger, onClick, returnHome }) => (
            <Link 
              to={returnHome ? '/' : null} 
              style={{ textDecoration: 'none' }}
            >
              <p 
                className='clickable' 
                style={danger ? dangerStyles : null}
                onClick={() => {
                  console.log(name);
                  onClick();
                  setShowDropdown(false);
                }}
              >
                {name}
              </p>
            </Link>
          ))}
        </div>
      {/* } */}
    </div>
  )
})

export default FloatDropdown
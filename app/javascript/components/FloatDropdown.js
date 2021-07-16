import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePopper } from 'react-popper'
import {
  GoTriangleDown
} from 'react-icons/go'

import IconClickable from '../molecules/IconClickable'
import Context from './Context'
import { THEME } from '../aesthetics'

const FloatDropdown = React.forwardRef((props, ref) => {
  const { options } = props

  const [showDropdown, setShowDropdown] = useState(false)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  
  const { theme } = useContext(Context)
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
  const menuStyles = {
    // inset: '0 auto auto 0',
    border: 'solid white 1px',
    zIndex: 999,
    backgroundColor: THEME[theme]?.color1,
    padding: '5px 10px 5px 10px',
  }

  return (
    <div>
      <IconClickable 
        icon={<GoTriangleDown size={20} />}
        onclick={() => setShowDropdown(!showDropdown)}
        ref={setReferenceElement}
      />
      {showDropdown && 
        <div 
          ref={setPopperElement} 
          style={{
            ...styles.popper,
            ...menuStyles
          }} 
          {...attributes.popper}
        >
          {options.map(({ name, danger, onclick, returnHome }) => (
            <Link 
              to={returnHome ? '/' : null} 
              style={{ textDecoration: 'none' }}
            >
              <p 
                className='clickable' 
                style={danger ? dangerStyles : null}
                onClick={() => {
                  onclick();
                  setShowDropdown(false);
                }}
              >
                {name}
              </p>
            </Link>
          ))}
        </div>
      }
    </div>
  )
})

export default FloatDropdown
import React from 'react'
import { BsX } from 'react-icons/bs'

import IconClickable from './IconClickable'

export default function Modal({
  modalId,
  title,
  body,
  showClose = true,
  onClose,
}) {
  return (
    <section id={modalId} className='Modal'>
      <div 
        id='top'
        style={{
          position: 'relative',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {showClose && 
          <IconClickable
            onClick={onClose}
            icon={<BsX size={30} />}
            className='top-right-n-8'
          />
        }
        <h2 style={{ margin: 'auto' }}>{title}</h2>
      </div>

      {body}
    </section>
  )
}
import React, { useEffect, useContext } from 'react'
import { useStore } from '../store'

import { BsX } from 'react-icons/bs'

import Context from '../components/Context'
import IconClickable from './IconClickable'

export default function Modal({
  modalId,
  title,
  body,
  showClose = true,
}) {
  const { setShowOverlay } = useContext(Context)
  const { closeModal } = useStore.getState()

  useEffect(() => {
    setShowOverlay(true)
    return () => setShowOverlay(false)
  }, [])

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
            onClick={closeModal}
            icon={<BsX size={20} />}
            className='top-right-n-8'
          />
        }
        <h3 style={{ margin: 'auto' }}>{title}</h3>
      </div>

      {body}
    </section>
  )
}
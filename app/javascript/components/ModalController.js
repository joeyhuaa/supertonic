import React from 'react'
import shallow from 'zustand/shallow'

import { useStore } from '../store'

import AddSongsModal from './AddSongsModal'
import UpdateSongModal from './UpdateSongModal'

export default function ModalController() {
  const modalName = useStore(state => state.modalName, shallow)

  switch(modalName) {
    case 'add-songs':
      return <AddSongsModal />
    case 'update-song':
      return <UpdateSongModal />
    default:
      return null
  }
}
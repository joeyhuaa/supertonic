import React from 'react'
import { useStore } from '../store'

import AddSongsModal from './AddSongsModal'
import UpdateSongModal from './UpdateSongModal'

export default function ModalController() {
  const { modalName } = useStore.getState()

  switch(modalName) {
    case 'add-songs':
      return <AddSongsModal />
    case 'update-songs':
      return <UpdateSongModal />
    default:
      return null
  }
}
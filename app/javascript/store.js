import create from 'zustand'

export const useStore = create(set => ({
  user: null,
  project: null,
  modalName: '',
  setModalName: (modalName) => set({ modalName: modalName }),
}))
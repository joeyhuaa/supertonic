import create from 'zustand'

export const useStore = create(set => ({
  user: null,
  theme: 'nocturne',
  project: null,
  currBranch: null,
  modalName: null,
  songsToUpload: null,
  setTheme: (theme) => set({ theme: theme }),
  setProject: (project) => set({ project: project }),
  setCurrBranch: (branch) => set({ currBranch: branch }),
  setSongsToUpload: (songs) => set({ songsToUpload: songs }),
  openModal: (modalName) => set({ modalName: modalName }),
  closeModal: () => set({ modalName: null }),
}))
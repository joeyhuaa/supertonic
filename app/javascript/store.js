import create from 'zustand'

export const useStore = create(set => ({
  user: null,
  theme: 'nocturne', // todo - revert back to useTheme
  project: null,
  currBranch: null,
  modalName: null,
  songsToUpload: [],
  songToUpdate: null,
  setTheme: (theme) => set({ theme: theme }), // todo - revert back to useTheme
  setProject: (project) => set({ project: project }),
  setCurrBranch: (branch) => set({ currBranch: branch }),
  setSongsToUpload: (songs) => set({ songsToUpload: songs }),
  setSongToUpdate: (song) => set({ songToUpdate: song }),
  openModal: (modalName) => set({ modalName: modalName }),
  closeModal: () => set({ modalName: null }),
}))
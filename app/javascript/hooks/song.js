import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import lodash from 'lodash'

export function useCreateSongs() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`/api/projects/${data.id}/add_songs`, data),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['projects', { id: data.projId }], data)
      }
    }
  )
}

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation(
    async data => await axios.delete(`/api/songs/${data.id}/destroy`, data),
    {
      onMutate: ({ id, projectId, branchName }) => {
        let songIdToRemove = id

        // optimistic update, remove song from project
        queryClient.setQueryData(['projects', projectId], old => {
          // TODO - delete song is working, but NOT the optimistic update

          // ! need to delete song from that BRANCH not from the project
          // clone the branches
          let branches = lodash.cloneDeep(old.branches)
          console.log('branches');
          console.log(branches);

          // find the branch
          let branch = branches.find(branch => branch.name === branchName)
          console.log('branch');
          console.log(branch);

          // find index of song to delete
          let songIndex = branch.songs.findIndex(song => song.id == songIdToRemove)
          console.log('songIndex');
          console.log(songIndex);

          // delete the song from the branch
          branch.songs.splice(songIndex, 1)

          // return
          return {
            ...old,
            branches: branches
          }
        })
      },
      onSettled: (data) => {
        queryClient.invalidateQueries(['projects', data.projectId])
      }
    }
  )
}

export function useUpdateSong() {
  return useMutation(
    data => axios.post(`'api/songs${data.id}/update'`, data),

  )
}
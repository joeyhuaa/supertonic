import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import lodash from 'lodash'

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  }, []);

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

export function useTheme() {
  return useQuery(
    'theme',
    async () => {
      let res = await fetch('/api/user/theme')
      let { theme } = await res.json()
      return theme
    }
  )
}

export function useChangeTheme() {
  const queryClient = useQueryClient()

  return useMutation(
    theme => axios.put(`/api/user/change_theme`, theme).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('theme') // re-runs useTheme hook
      }
    }
  )
}

export function useCreateBranch() {
  const queryClient = useQueryClient()

  return useMutation(
    (data) => axios.put(`/api/projects/${data.projId}/newbranch`, data),
    {
      onSettled: ({ data }) => {
        queryClient.invalidateQueries(['projects', data.id])
      }
    }
  )
}

export function useProjects() {
  return useQuery(
    'projects',
    async () => {
      let res = await fetch('/api/projects')
      return res.json()
    }
  )
}

export function useProject(projectId) {
  return useQuery(
    ['projects', projectId],
    async () => {
      const res = await fetch(`/api/projects/${projectId}`)
      return res.json()
    },
    {
      onSettled: data => {
        console.log(data);
      }
    }
  )
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`/api/projects/${data.id}/update`, data),
    {
      onMutate: async projToBeUpdated => {
        await queryClient.cancelQueries('projects')
        let oldProj = queryClient.getQueryData(['projects', projToBeUpdated.id])

        // optimistic update project view
        queryClient.setQueryData(['projects', projToBeUpdated.id], old => ({
          ...old,
          name: projToBeUpdated.name
        }))

        // optimistic update sidebar
        queryClient.setQueryData('projects', old => {
          let proj = old.find(p => p.id === projToBeUpdated.id)
          proj.name = projToBeUpdated.name
          return old;
        })

        return { oldProj }
      },
      onSettled: ({ data }) => {
        queryClient.invalidateQueries('projects') 
        queryClient.invalidateQueries(['projects', data.id])
      }
    }
  )
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.post(`/api/projects/new`, data),
    {
      onMutate: async newProject => {
        await queryClient.cancelQueries('projects')
        const prevProjects = queryClient.getQueryData('projects')
        queryClient.setQueryData('projects', old => [newProject, ...old])
        return { prevProjects }
      },
      onSettled: ({ data }) => {
        queryClient.invalidateQueries('projects')

        // * SETTING PROJECT IN CACHE AFTER CREATING IT
        queryClient.setQueryData(['projects', data.projId], data)
      }
    }
  )
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation(
    project => axios.delete(`/api/projects/${project.id}/destroy`, project).then(res => res.data),
    {
      onMutate: async project => {
        await queryClient.cancelQueries('projects')
        const prevProjects = queryClient.getQueryData('projects')
        queryClient.setQueryData('projects', old => old.filter(proj => proj.id != project.id))
        return { prevProjects }
      },
      onSuccess: () => {
        queryClient.invalidateQueries('projects') // refetch projects
      }
    }
  )
}

export function useCreateSongs() {
  const queryClient = useQueryClient()

  return useMutation(
    data => {
      return axios.put(`/api/projects/${data.id}/add_songs`, data)
    },
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
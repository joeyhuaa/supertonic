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
  return useMutation(
    (data) => (
      axios.put(`/api/projects/${data.projId}/newbranch`, data)
    ),
  ),
  {
    onSettled: (data) => {
      queryClient.invalidateQueries(['project', data.project.id])
    }
  }
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
  const queryClient = useQueryClient()

  return useQuery(
    ['project', projectId],
    async () => {
      let res = await fetch(`/api/projects/${projectId}`)
      return res.json()
    },
    {
      refetchOnWindowFocus: false,
      onSettled: (data) => {
        console.log('fetching', data.id)
        queryClient.setQueryData(['project', data.id], data)
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
        let oldProj = queryClient.getQueryData(['project', projToBeUpdated.id])

        console.log('updating', oldProj.id)

        // ! NOT WORKING
        queryClient.setQueryData(['project', projToBeUpdated.id], old => ({
          ...old,
          name: projToBeUpdated.name
        }))

        // * WORKING
        queryClient.setQueryData('projects', old => {
          let proj = old.find(p => p.id === projToBeUpdated.id)
          proj.name = projToBeUpdated.name
          return old;
        })

        return { oldProj }
      },
      onSettled: ({ data }) => {
        console.log('settled', data)
        queryClient.invalidateQueries('projects') 
        queryClient.invalidateQueries(['project', data.id])
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
        console.log('new', newProject)
        // await queryClient.cancelQueries('projects')
        const prevProjects = queryClient.getQueryData('projects')
        queryClient.setQueryData('projects', old => [newProject, ...old])
        return { prevProjects }
      },
      onSettled: ({ data }) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['project', data.projId], data)
      }
    }
  )
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.delete(`/api/projects/${data.id}/destroy`, data).then(res => res.data),
    {
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
      onMutate: async data => {
        console.log(data)
      },
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('project')
        queryClient.setQueryData(['project', { id: data.projId }], data)
      }
    }
  )
}

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.delete(`/api/songs/${data.songId}/destroy`, data),
    {
      onMutate: async data => {
        // optimistic update, remove song from project
        console.log(data)
        let songIdToRemove = data.songId
        queryClient.setQueryData(['project', { id: data.projectId }], old => {
          let songs = lodash.cloneDeep(old.songs)
          let index = songs.findIndex(song => song.id == songIdToRemove)
          songs.splice(index, 1)
          return (
            {
              ...old,
              songs: songs
            }
          )
        })
      },
      onSettled: (data, vars) => {
        queryClient.setQueryData(['project', { id: vars.id }], data)
      }
    }
  )
}
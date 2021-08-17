import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

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
    // {
    //   onMutate: (newBranch) => {
    //     const oldBranchs = queryCache.getQueryData('Branchs')

    //     if (queryCache.getQueryData('Branchs')) {
    //       queryCache.setQueryData('Branchs', old => [...old, newBranch])
    //     }

    //     return () => queryCache.setQueryData('Branchs', oldBranchs)
    //   },
    // }
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
    ['project', projectId],
    async () => {
      let res = await fetch(`/api/projects/${projectId}`)
      return res.json()
    }
  )
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`/api/projects/${data.id}/update`, data).then(res => res.data),
    {
      // onMutate: async newProj => {
      //   // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      //   await queryClient.cancelQueries(['projects', newProj.id])

      //   // Snapshot the previous value
      //   let prevProj = queryClient.getQueryData(['projects', newProj.id])

      //   // Optimistically update to the new value
      //   queryClient.setQueryData(['projects', newProj.id], newProj)

      //   // Return a context with the previous and new value
      //   return { prevProj, newProj }
      // },
      onError: context => {
        queryClient.setQueryData(
          ['projects', context.newProj.id],
          context.prevProj
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries('projects') // refetch projects
      }
    }
  )
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    newProject => axios.post(`/api/projects/new`, newProject),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['project', { id: res.data.projId }], res.data)
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
      onMutate: () => console.log('new songs'),
      onSuccess: (res) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['project', { id: res.data.projId }], res.data)
      }
    }
  )
}

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.delete(`/api/songs/${data.songId}/destroy`, data).then(res => res.data),
    {
      onMutate: async data => {
        // optimistic update, remove song from project
        // let songIdToRemove = data.songId
        // queryClient.setQueryData(['project', data.projectId], old => ({
        //   ...old,
        //   songs: {
        //     ...
        //   }
        // }))
      },
      onSettled: (data, vars) => {
        queryClient.setQueryData(['project', { id: vars.id }], data)
      }
    }
  )
}
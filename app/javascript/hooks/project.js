import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useStore } from '../store'

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
  const { setProject } = useStore.getState()

  return useQuery(
    ['projects', projectId],
    async () => {
      const res = await fetch(`/api/projects/${projectId}`)
      return res.json()
    },
    {
      onSettled: data => {
        console.log(data);
        setProject(data) // update state
      }
    }
  )
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  const { setProject } = useStore(state => state.setProject)

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
        setProject(data) // update state
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

export function useCreateBranch() {
  const queryClient = useQueryClient()
  const { setProject } = useStore.getState()

  return useMutation(
    (data) => axios.put(`/api/projects/${data.projId}/newbranch`, data),
    {
      onSettled: ({ data }) => {
        queryClient.invalidateQueries(['projects', data.id])
        setProject(data) // update state
      }
    }
  )
}
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    newProject => axios.post(`/api/projects/new`, newProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
      }
    }
    // {
    //   onMutate: (newProject) => {
    //     const oldProjects = queryCache.getQueryData('projects')

    //     if (queryCache.getQueryData('projects')) {
    //       queryCache.setQueryData('projects', old => [...old, newProject])
    //     }

    //     return () => queryCache.setQueryData('projects', oldProjects)
    //   },
    // }
  )
}
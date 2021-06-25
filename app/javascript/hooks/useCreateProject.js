import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useCreateProject() {
  return useMutation(
    newProject => axios.post(`/api/projects/new`, newProject),
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
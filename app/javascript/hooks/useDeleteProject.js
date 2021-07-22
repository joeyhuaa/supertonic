import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.delete(`/api/projects/${data.id}/destroy`, data).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('project') // refetch projects
      }
    }
  )
}
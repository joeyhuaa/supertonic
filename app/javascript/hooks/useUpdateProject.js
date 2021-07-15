import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`/api/projects/${data.id}/change_name`, data).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects') // refetch projects
      }
    }
  )
}
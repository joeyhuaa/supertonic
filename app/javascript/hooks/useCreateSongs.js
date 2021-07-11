import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'

export default function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => {
      return axios.put(`/api/projects/${data.id}/add_songs`, data)
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('projects')
        // queryClient.setQueryData(['project', { id: res.data.projId }], res.data)
      }
    }
  )
}
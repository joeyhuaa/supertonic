import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.delete(`/api/songs/${data.id}/destroy`, data).then(res => res.data),
    {
      onSuccess: (data, vars) => {
        queryClient.setQueryData(['project', { id: vars.id }], data)
      }
    }
  )
}
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useChangeTheme() {
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
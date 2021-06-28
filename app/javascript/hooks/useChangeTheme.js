import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useChangeTheme() {
  return useMutation(
    data => axios.put(`/api/user/change_theme`, data),
  )
}
import axios from 'axios'
import { useQuery } from 'react-query'

export default function useProjects() {
  return useQuery(
    'projects',
    () => axios.get('/projects').then(res => res.data)
  )
}
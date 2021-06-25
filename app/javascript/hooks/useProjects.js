import { useQuery } from 'react-query'

export default function useProjects() {
  return useQuery(
    'projects',
    async () => {
      let res = await fetch('/api/projects')
      return res.json()
    }
  )
}
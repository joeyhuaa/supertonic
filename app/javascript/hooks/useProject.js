import { useQuery } from 'react-query'

export default function useProject(projectId) {
  console.log('fetching', projectId)
  return useQuery(
    ['project', projectId],
    async () => {
      let res = await fetch(`/api/projects/${projectId}`)
      return res.json()
    }
  )
}
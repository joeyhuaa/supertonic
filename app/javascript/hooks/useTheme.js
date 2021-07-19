import { useQuery } from 'react-query'

export default function useTheme() {
  return useQuery(
    'theme',
    async () => {
      let res = await fetch('/api/user/theme')
      let { theme } = await res.json()
      return theme
    }
  )
}
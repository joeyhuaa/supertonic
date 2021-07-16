import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`/api/projects/${data.id}/update`, data).then(res => res.data),
    {
      onMutate: async newProj => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['projects', newProj.id])

        // Snapshot the previous value
        let prevProj = queryClient.getQueryData(['projects', newProj.id])

        // Optimistically update to the new value
        queryClient.setQueryData(['projects', newProj.id], newProj)

        // Return a context with the previous and new value
        return { prevProj, newProj }
      },
      onError: context => {
        queryClient.setQueryData(
          ['projectss', context.newProj.id],
          context.prevProj
        )
      },
      onSettled: () => {
        queryClient.invalidateQueries('projects') // refetch projects
      }
    }
  )
}
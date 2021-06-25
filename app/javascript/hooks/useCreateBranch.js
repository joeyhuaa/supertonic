import axios from 'axios'
import { useMutation, queryCache } from 'react-query'

export default function useCreateBranch() {
  return useMutation(
    (data) => (
      axios.put(`/api/projects/${data.id}/newbranch`, data)
    ),
    // {
    //   onMutate: (newBranch) => {
    //     const oldBranchs = queryCache.getQueryData('Branchs')

    //     if (queryCache.getQueryData('Branchs')) {
    //       queryCache.setQueryData('Branchs', old => [...old, newBranch])
    //     }

    //     return () => queryCache.setQueryData('Branchs', oldBranchs)
    //   },
    // }
  )
}
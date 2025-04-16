import { Wedding } from '@models/wedding'
import { getWedding } from '../api/wedding'
import { useQuery } from 'react-query'

function useWedding() {
  const { data, isLoading, error } = useQuery<Wedding>(
    ['wedding'],
    getWedding,
    {
      suspense: true,
    },
  )
  return { wedding: data, isLoading, error }
}

export default useWedding

import { useAppSelector } from '../store/store'

export const useDocument = () => {
  const { ids, documents, isLoading } = useAppSelector(state => state.documents)

  return { documentsIds: ids, documents, documentsLoading: isLoading }
}

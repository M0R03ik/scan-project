import { useAppSelector } from '../store/store'

export const userAuth = () => {
  const { accessToken, expire, isAuth, isLoading, error } = useAppSelector(
    state => state.user
  )

  return {
    accessToken,
    expire,
    isAuth,
    isLoading,
    error,
  }
}

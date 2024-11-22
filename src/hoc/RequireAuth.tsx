import { Navigate, useLocation } from 'react-router-dom'
import { userAuth } from '../hooks/userAuth'

interface IRequireAuth {
  children: JSX.Element
}

export const RequireAuth = ({ children }: IRequireAuth) => {
  const { isAuth } = userAuth()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to='/auth' state={{ from: location }} />
  }

  return children
}

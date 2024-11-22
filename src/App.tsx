import { Layout } from './components/Layout/Layout.tsx'
import { Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main/Main.tsx'
import { Authorization } from './pages/Authorization/Authorization.tsx'
import { Result } from './pages/Result/Result.tsx'
import { Search } from './pages/Search/Search.tsx'
import { RequireAuth } from './hoc/RequireAuth.tsx'
import { useEffect } from 'react'
import { checkUserAuth } from './utils/checkUserAuth.ts'
import { useAppDispatch } from './store/store.ts'
import { setUser } from './store/slices/userSlice.ts'
import { NotFound } from './pages/NotFound/NotFound.tsx'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (checkUserAuth()) {
      const userInfo = {
        accessToken: localStorage.getItem('accessToken'),
        expire: localStorage.getItem('expire'),
      }
      dispatch(setUser(userInfo))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='auth' element={<Authorization />} />
          <Route
            path='search'
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path='result'
            element={
              <RequireAuth>
                <Result />
              </RequireAuth>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

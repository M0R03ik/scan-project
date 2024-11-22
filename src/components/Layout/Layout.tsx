import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header.tsx'
import { Footer } from '../Footer/Footer.tsx'

import s from './layout.module.scss'

export const Layout = () => {
  return (
    <>
      <div className={s.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
}

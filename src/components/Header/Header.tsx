import s from './style.module.scss'
import logo from '../../assets/scanLogo.svg'
import altLogo from '../../assets/altLogo.png'
import { AccountControlPanel } from './AccountControlPanel'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { userAuth } from '../../hooks/userAuth'
import { useAppDispatch } from '../../store/store'
import { removeUser } from '../../store/slices/userSlice'
import { Button } from '../Button/Button'

export const Header = () => {
  const { isAuth } = userAuth()
  const dispatch = useAppDispatch()
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClick = () => {
    setIsOpenModal(!isOpenModal)
  }

  const logOut = () => {
    dispatch(removeUser())
  }

  return (
    <header className={isOpenModal ? `${s.header} ${s.altHeader}` : s.header}>
      <div className={s.logo}>
        <img
          src={isOpenModal ? altLogo : logo}
          alt='Логотип СКАН'
          width={141}
          height={49}
        />
      </div>
      <nav className={s.navMenu}>
        <ul className={s.navList}>
          <li>
            <Link to='/'>Главная</Link>
          </li>
          <li>
            <a href=''>Тарифы</a>
          </li>
          <li>
            <a href=''>FAQ</a>
          </li>
        </ul>
      </nav>
      <AccountControlPanel />
      <div
        className={
          isOpenModal ? `${s.burgerMenu} ${s.activeBurgerMenu}` : s.burgerMenu
        }
        onClick={handleClick}
      ></div>
      {isOpenModal ? (
        <div className={s.modal}>
          <nav className={s.modalNavMenu} onClick={handleClick}>
            <ul className={s.modalNavList}>
              <li>
                <Link to='/' className={s.modalLink}>
                  Главная
                </Link>
              </li>
              <li>
                <a href='' className={s.modalLink}>
                  Тарифы
                </a>
              </li>
              <li>
                <a href='' className={s.modalLink}>
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
          <div className={s.modalAuthorized} onClick={handleClick}>
            {!isAuth ? (
              <>
                <a className={s.modalSignUp} href=''>
                  Зарегистрироваться
                </a>
                <Link to='/auth' className={s.modalLoginButton}>
                  Войти
                </Link>
              </>
            ) : (
              <Button className={s.modalLoginButton} onClick={logOut}>
                Выйти
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

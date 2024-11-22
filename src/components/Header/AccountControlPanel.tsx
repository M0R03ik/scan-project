import { Link } from 'react-router-dom'
import s from './style.module.scss'
import { userAuth } from '../../hooks/userAuth'
import { useAppDispatch } from '../../store/store'
import { removeUser } from '../../store/slices/userSlice'
import { MouseEvent, useEffect } from 'react'
import { Loader } from '../Loader/Loader'
import { useCompanyLimits } from '../../hooks/useCompanyLimits'
import { getUserInfo } from '../../store/slices/companyLimitsSlice'

const AccountPanel = ({ url = null, userName = 'Алексей А.' }) => {
  const dispatch = useAppDispatch()
  const { isAuth } = userAuth()
  const { isLoading, companyLimit, usedCompanyCount } = useCompanyLimits()

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserInfo())
    }
  }, [isAuth])

  if (isAuth) {
    const logOut = (e: MouseEvent<HTMLAnchorElement>): void => {
      e.preventDefault()
      dispatch(removeUser())
    }

    return (
      <div className={s.authorized}>
        <div className={s.statistic}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                Использовано компаний
                <span className={s.companyUsed}>{usedCompanyCount}</span>
              </div>
              <div>
                Лимит по компаниям
                <span className={s.companyLimit}>{companyLimit}</span>
              </div>
            </>
          )}
        </div>
        <div className={s.userMenu}>
          <div>
            <div className={s.userName}>{userName}</div>
            <a className={s.logOut} href='' onClick={logOut}>
              Выйти
            </a>
          </div>
          <div className={s.avatarWrap}>
            {url ? (
              <img className={s.avatar} src={url} alt='Аватар' />
            ) : (
              userName[0]
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.login}>
      <a className={s.signUp} href=''>
        Зарегистрироваться
      </a>
      <span className={s.verticalLine}></span>
      <Link to='/auth' className={s.loginButton}>
        Войти
      </Link>
    </div>
  )
}

export const AccountControlPanel = () => {
  return (
    <div className={s.userPanel}>
      <AccountPanel />
    </div>
  )
}

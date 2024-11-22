import { Link } from 'react-router-dom'
import s from './notFound.module.scss'

export const NotFound = () => {
  return (
    <div>
      <h2 className={s.title}>Такая страница не найдена</h2>
      <Link to='/' className={s.link}>
        На главную
      </Link>
    </div>
  )
}

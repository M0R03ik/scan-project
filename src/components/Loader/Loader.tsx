import loader from '../../assets/icons/loader.png'
import s from './Loader.module.scss'

interface ILoader {
  children?: string
}

export const Loader = ({ children }: ILoader) => {
  return (
    <div className={s.wrapper}>
      <img className={s.loader} src={loader} alt='' width={24} height={24} />
      <div>{children}</div>
    </div>
  )
}

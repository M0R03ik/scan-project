import s from './advantagesCard.module.scss'

interface IAdvantagesCard {
  imgUrl?: string
  children?: string
}

export const AdvantagesCard = ({
  imgUrl,
  children,
}: IAdvantagesCard): JSX.Element => {
  return (
    <div className={s.card}>
      <div className={s.imageWrap}>
        <img
          className={s.cardImage}
          src={imgUrl}
          alt=''
          width={64}
          height={64}
        />
      </div>
      <p className={s.description}>{children}</p>
    </div>
  )
}

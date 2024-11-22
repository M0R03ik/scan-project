import { Button } from '../../../../components/Button/Button'
import s from './PriceCard.module.scss'

interface IPriceCard {
  type: 'beginner' | 'pro' | 'business'
  isActive: boolean
}

const content = {
  beginner: {
    title: 'Beginner',
    subtitle: 'Для небольшого исследования',
    price: '799 ₽',
    oldPrice: '1 200 ₽',
    deferredPayment: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    rateDescription: [
      'Безлимитная история запросов',
      'Безопасная сделка',
      'Поддержка 24/7',
    ],
  },
  pro: {
    title: 'Pro',
    subtitle: 'Для HR и фрилансеров',
    price: '1 299 ₽',
    oldPrice: '2 600 ₽',
    deferredPayment: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    rateDescription: [
      'Все пункты тарифа Beginner',
      'Экспорт истории',
      'Рекомендации по приоритетам',
    ],
  },
  business: {
    title: 'Business',
    subtitle: 'Для корпоративных клиентов',
    price: '2 379 ₽',
    oldPrice: '3 700 ₽',
    deferredPayment: null,
    rateDescription: [
      'Все пункты тарифа Pro',
      'Безлимитное количество запросов',
      'Приоритетная поддержка',
    ],
  },
}

export const PriceCard = ({ type, isActive }: IPriceCard) => {
  return (
    <div className={`${s.card} ${isActive ? s[`${type}Active`] : ''}`}>
      <header className={`${s.header} ${s[type]}`}>
        <h3 className={s.title}>{content[type].title}</h3>
        <p className={s.subtitle}>{content[type].subtitle}</p>
      </header>
      <div className={s.body}>
        {isActive ? <div className={s.currentRate}>Текущий тариф</div> : null}
        <div>
          <h4 className={s.price}>
            {content[type].price}
            <span className={s.oldPrice}>{content[type].oldPrice}</span>
          </h4>
          <p className={s.deferredPayment}>{content[type].deferredPayment}</p>
        </div>

        <div className={s.rateDescription}>
          <p className={s.descriptionTitle}>В тариф входит:</p>
          <ul className={s.descriptionList}>
            {content[type].rateDescription.map((element, index) => {
              return (
                <li className={s.item} key={index}>
                  {element}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <footer className={s.footer}>
        <Button className={`${s.button} ${isActive ? s.activeButton : ''}`}>
          {isActive ? 'Перейти в личный кабинет' : 'Подробнее'}
        </Button>
      </footer>
    </div>
  )
}

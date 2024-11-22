import s from './main.module.scss'
import { Button } from '../../components/Button/Button'
import heroBg from '../../assets/images/hero-bg.png'
import advantagesBg from '../../assets/images/advantages-bg.svg'

import { AdvantagesCard } from '../../components/AdvantagesCard/AdvantagesCard'
import { MainSlider } from './components/MainSlider/MainSlider'
import { PriceCard } from './components/PriceCard/PriceCard'
import { userAuth } from '../../hooks/userAuth'
import { Link } from 'react-router-dom'

export const Main = () => {
  const { isAuth } = userAuth()

  return (
    <>
      <section className={s.hero}>
        <div className={s.body}>
          <h1 className={s.title}>
            сервис по поиску публикаций <br /> о компании
            <br /> по его ИНН
          </h1>
          <p className={s.description}>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          {isAuth ? (
            <Link to='search'>
              <Button>Запросить данные</Button>
            </Link>
          ) : null}
        </div>
        <div className={s.imageWrap}>
          <img
            className={s.heroImage}
            src={heroBg}
            alt=''
            width={577}
            height={575}
            loading='lazy'
          />
        </div>
      </section>
      <section className={s.advantages}>
        <h2 className={s.subTitle}>Почему именно мы</h2>
        <div className={s.sliderContainer}>
          <MainSlider>
            <AdvantagesCard imgUrl={'./icons/stopwatch.png'}>
              Высокая и оперативная скорость обработки заявки
            </AdvantagesCard>
            <AdvantagesCard imgUrl={'./icons/magnifier.png'}>
              Огромная комплексная база данных, обеспечивающая объективный ответ
              на запрос
            </AdvantagesCard>
            <AdvantagesCard imgUrl={'./icons/shield.png'}>
              Защита конфиденциальных сведений, не подлежащих разглашению по
              федеральному законодательству
            </AdvantagesCard>
          </MainSlider>
        </div>
        <div className={s.advantagesBgWrap}>
          <img
            className={s.advantagesBg}
            width='1307'
            height='576'
            src={advantagesBg}
            alt=''
          />
        </div>
      </section>
      <section className={s.prices}>
        <h2 className={s.subTitle}>Наши тарифы</h2>
        <div className={s.tariffs}>
          <PriceCard type='beginner' isActive={isAuth} />
          <PriceCard type='pro' isActive={false} />
          <PriceCard type='business' isActive={false} />
        </div>
      </section>
    </>
  )
}

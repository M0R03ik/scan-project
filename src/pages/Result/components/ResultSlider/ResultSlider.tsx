import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './ResultSlider.module.scss'
import arrowRight from '../../../../assets/icons/arrow-right-active.png'
import { useAppSelector } from '../../../../store/store'
import { Loader } from '../../../../components/Loader/Loader'

interface IResultSlider {
  children: JSX.Element[]
}

const PrevArrow = ({ onClick }) => {
  return (
    <button className={`${s.prevArrow} ${s.arrow}`} onClick={onClick}>
      <img src={arrowRight} alt='' width={39} height={39} />
    </button>
  )
}

const NextArrow = ({ onClick }) => {
  return (
    <button className={`${s.nextArrow} ${s.arrow}`} onClick={onClick}>
      <img src={arrowRight} alt='' width={39} height={39} />
    </button>
  )
}

export const ResultSlider = ({ children }: IResultSlider) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
    initialSlide: 0,
    // className: s.slider,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const { isLoading } = useAppSelector(state => state.histograms)

  return (
    <div className={s.carouselContainer}>
      <div className={s.resultTable}>
        <div className={s.tableHeader}>
          <div>Период</div>
          <div>Всего</div>
          <div>Риски</div>
        </div>

        <div className={s.tableBody}>
          {isLoading ? (
            <Loader>Загружаем данные</Loader>
          ) : (
            <Slider {...sliderSettings}>{children}</Slider>
          )}
        </div>
      </div>
    </div>
  )
}

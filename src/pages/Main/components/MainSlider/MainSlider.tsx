import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './MainSlider.module.scss'
import arrowLeft from '../../../../assets/icons/arrow-left.png'

interface IMainSlider {
  children: JSX.Element[]
}

const PrevArrow = ({ onClick }) => {
  return (
    <button className={`${s.prevArrow} ${s.arrow}`} onClick={onClick}>
      <img src={arrowLeft} alt='' width={39} height={39} />
    </button>
  )
}

const NextArrow = ({ onClick }) => {
  return (
    <button className={`${s.nextArrow} ${s.arrow}`} onClick={onClick}>
      <img src={arrowLeft} alt='' width={39} height={39} />
    </button>
  )
}

export const MainSlider = ({ children }: IMainSlider) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    className: s.slider,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return <Slider {...sliderSettings}>{children}</Slider>
}

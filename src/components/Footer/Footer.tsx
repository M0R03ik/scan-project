import s from './Footer.module.scss'
import logo from '../../assets/images/footer-logo.png'

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footerContainer}>
        <div className={s.logo}>
          <img
            className={s.logoImage}
            src={logo}
            alt='Лого'
            width={141}
            height={48}
          />
        </div>
        <div>
          <address className={s.contacts}>
            <p>г. Москва, Цветной б-р, 40</p>
            <p>
              <a className={s.link} href='tel:84957712111'>
                +7 495 771 21 11
              </a>
            </p>
            <p>
              <a className={s.link} href='mailto:info@skan.ru'>
                info@skan.ru
              </a>
            </p>
          </address>

          <div className={s.copyright}>
            Copyright. <time dateTime='2022'>2022</time>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Button } from '../../../../components/Button/Button'
import s from './card.module.scss'
import defaultImage from '../../../../assets/images/result-bg.svg'

interface IPublicationCard {
  title: string
  datePublication: string
  url: string
  source: string
  article: string
  wordCount: number
  isTechNews: boolean
  isAnnouncement: boolean
  isDigest: boolean
}

export const PublicationCard = ({
  title,
  datePublication,
  url,
  source,
  article,
  wordCount,
  isTechNews,
  isAnnouncement,
  isDigest,
}: IPublicationCard) => {
  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html

    return txt.value
  }

  const getImage = (str: string) => {
    const img = str.match(/img[^>]+src="([^">]+)"/)
    return img?.[1]
  }

  return (
    <article className={s.card}>
      <header className={s.header}>
        <div className={s.cardInfo}>
          <time dateTime='2021-09-13'>{datePublication}</time>
          <a className={s.link} href={url} target='_blanc'>
            {source}
          </a>
        </div>
        <h2 className={s.title}>{title}</h2>
        <div className={s.tagsWrapper}>
          {isTechNews ? (
            <span className={s.tag}>Технические новости</span>
          ) : null}
          {isAnnouncement ? (
            <span className={s.tag}>Анонсы и события</span>
          ) : null}
          {isDigest ? <span className={s.tag}>Сводки новостей</span> : null}
        </div>
      </header>
      <div className={s.cardBody}>
        <figure className={s.cardFigure}>
          <img
            src={getImage(article) || defaultImage}
            alt='Обложка статьи'
            className={s.image}
          />
        </figure>
        <p
          className={s.cardCopy}
          dangerouslySetInnerHTML={{ __html: decodeHtml(article) }}
        />
      </div>
      <footer className={s.footer}>
        <div className={s.cardActions}>
          <Button
            className={s.button}
            onClick={() => {
              window.open(url)
            }}
          >
            Читать в источнике
          </Button>
        </div>
        <div className={s.wordCount}>{wordCount} слова</div>
      </footer>
    </article>
  )
}

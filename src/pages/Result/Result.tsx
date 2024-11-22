import s from './result.module.scss'
import bgImage from '../../assets/images/result-bg.svg'
import { PublicationCard } from './components/PublicationCard/PublicationCard'
import { Button } from '../../components/Button/Button'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { HistogramData, IDocumentsIds, IGeneralSummary } from '../../types'
import { Loader } from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'
import { useDocument } from '../../hooks/useDocument'
import { getDocuments } from '../../store/slices/documentsSlice'
import { ResultSlider } from './components/ResultSlider/ResultSlider'

export const Result = () => {
  const { data } = useAppSelector(state => state.histograms)
  const { documentsIds, documents, documentsLoading } = useDocument()

  const [generalSummary, setGeneralSummary] = useState<IGeneralSummary[]>([])
  const [numberOfPublications, setNumberOfPublications] = useState(0)
  const [currentArticles, setCurrentArticles] = useState<number>(0)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (documentsIds.length) loadArticles()
  }, [documentsIds])

  const loadArticles = () => {
    const STEP_LOAD = 10

    const show = documentsIds.slice(
      currentArticles,
      currentArticles + STEP_LOAD
    )

    const req: IDocumentsIds = { ids: show }
    dispatch(getDocuments(req))
    setCurrentArticles(currentArticles + STEP_LOAD)
  }

  useEffect(() => {
    if (data) {
      getGeneralSummary(data)
    }
  }, [data])

  const getGeneralSummary = (data: HistogramData[]) => {
    const totalDocuments =
      data.find(item => item.histogramType === 'totalDocuments')?.data || []
    const riskFactors =
      data.find(item => item.histogramType === 'riskFactors')?.data || []

    const tranformedData = totalDocuments.map((item, index) => {
      return {
        date: new Date(item.date).toLocaleDateString(),
        all: item.value,
        risks: riskFactors[index].value || 0,
      }
    })

    const publications = tranformedData.reduce((result, item) => {
      return (result += item.all + item.risks)
    }, 0)

    setNumberOfPublications(publications)
    setGeneralSummary(tranformedData)
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerContent}>
          <h1 className={s.mainTitle}>
            Сервис по поиску публикаций о компании по его инн
          </h1>
          <h2 className={s.pageTitle}>Ищем. Скоро будут результаты</h2>
          <p className={s.description}>
            Поиск может занять некоторое время,
            <br /> просим сохранять терпение.
          </p>
        </div>
        <div className={s.bodyImage}>
          <img
            className={s.bgImage}
            src={bgImage}
            alt=''
            width={552}
            height={369}
          />
        </div>
      </div>

      <section className={s.resultSection}>
        <header className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Общая сводка</h2>
          <p className={s.searchInfo}>
            Найдено {numberOfPublications} вариантов
          </p>
        </header>
        <ResultSlider>
          {generalSummary.map(item => (
            <div key={item.date}>
              <div className={s.tableElement}>
                <span className={s.elementItem}>{item.date}</span>
                <span className={s.elementItem}>{item.all}</span>
                <span className={s.elementItem}>{item.risks}</span>
              </div>
            </div>
          ))}
        </ResultSlider>

        <div className={s.publicationContainer}>
          <h2 className={s.sectionTitle}>Список документов</h2>

          <div className={s.publicationList}>
            {documents.map(doc => {
              const { title, issueDate, url, source, attributes, content } = doc

              return (
                <PublicationCard
                  key={url}
                  title={title.text}
                  datePublication={new Date(issueDate).toLocaleDateString()}
                  url={url}
                  source={source.name}
                  article={content.markup}
                  {...attributes}
                />
              )
            })}
          </div>
          {documentsLoading ? (
            <Loader />
          ) : documentsIds.length > currentArticles ? (
            <Button className={s.publicationButton} onClick={loadArticles}>
              Показать больше
            </Button>
          ) : null}
        </div>
      </section>
    </div>
  )
}

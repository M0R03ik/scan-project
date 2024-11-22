import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import s from './search.module.scss'
import bgImage from '../../assets/images/search-bg.svg'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { createRequest } from '../../utils/createRequest'
import { useAppDispatch } from '../../store/store'
import {
  getHistograms,
  removeHistograms,
} from '../../store/slices/histogramSlice'
import { useNavigate } from 'react-router-dom'
import {
  getDocumentsId,
  removeDocuments,
} from '../../store/slices/documentsSlice'
import {
  validateDate,
  validateInn,
  validateQuantity,
} from '../../utils/validateFunctions'

export interface ISearchForm {
  inn: string
  tonality: string
  quantity: string
  firstDate: string
  lastDate: string
  maxFullness: boolean
  inBusinessNews: boolean
  onlyMainRole: boolean
  onlyWithRiskFactors: boolean
  excludeTechNews: boolean
  excludeAnnouncements: boolean
  excludeDigests: boolean
}

export const Search = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState<ISearchForm>({
    inn: '',
    tonality: 'any',
    quantity: '',
    firstDate: '',
    lastDate: '',
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    onlyWithRiskFactors: false,
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false,
  })

  const [error, setError] = useState({
    inn: '',
    quantity: '',
    date: '',
  })
  const [isDisabled, setIsDisabled] = useState(true)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      const request = createRequest(form)

      dispatch(removeHistograms())
      dispatch(removeDocuments())
      dispatch(getHistograms(request))
      dispatch(getDocumentsId(request))

      navigate('/result')
    }
  }

  const validateForm = (): boolean => {
    setError({ inn: '', quantity: '', date: '' })

    const { innValid, innErrorMessage } = validateInn(form.inn)
    const { quantityValid, quantityErrorMessage } = validateQuantity(
      form.quantity
    )
    const { dateValid, dateErrorMessage } = validateDate(
      form.firstDate,
      form.lastDate
    )

    if (!innValid) {
      setError(e => {
        return { ...e, inn: innErrorMessage }
      })
    }
    if (!quantityValid) {
      setError(e => {
        return {
          ...e,
          quantity: quantityErrorMessage,
        }
      })
    }
    if (!dateValid) {
      setError(e => {
        return {
          ...e,
          date: dateErrorMessage,
        }
      })
    }

    return innValid && quantityValid && dateValid
  }

  useEffect(() => {
    if (
      form.inn.trim() !== '' &&
      form.quantity.trim() !== '' &&
      form.firstDate.trim() !== '' &&
      form.lastDate.trim() !== ''
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [form])

  return (
    <div className={s.inner}>
      <div className={s.body}>
        <h1 className={s.mainTitle}>
          Сервис по поиску публикаций о компании по его инн
        </h1>
        <h2 className={s.title}>Найдите необходимые данные в пару кликов.</h2>
        <p className={s.description}>
          Задайте параметры поиска.
          <br />
          Чем больше заполните, тем точнее поиск
        </p>
        <div className={s.bodyImage}></div>
      </div>
      <div className={s.main}>
        <form onSubmit={handleSubmit} className={s.searchForm}>
          <div className={s.mainBlock}>
            <div className={s.searchItem}>
              <label htmlFor='inn'>
                ИНН компании <sup>*</sup>
              </label>
              <Input
                type='text'
                name='inn'
                id='inn'
                placeholder='10 цифр'
                valid={!Boolean(error.inn)}
                value={form.inn}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, inn: e.target.value })
                }
              />
              <div
                className={error.inn ? `${s.error}` : `${s.error} ${s.hidden}`}
              >
                {error.inn}
              </div>
            </div>
            <div className={s.searchItem}>
              <label htmlFor='tonality'>Тональность</label>
              <div className={s.selectWrapper}>
                <select
                  className={s.selectList}
                  id='tonality'
                  name='tonality'
                  value={form.tonality}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setForm({ ...form, tonality: e.target.value })
                  }
                >
                  <option value='any'>Любая</option>
                  <option value='positive'>Позитивная</option>
                  <option value='negative'>Негативная</option>
                </select>
              </div>
            </div>
            <div className={s.searchItem}>
              <label htmlFor='quantity'>
                Количество документов в выдаче <sup>*</sup>
              </label>
              <Input
                type='number'
                name='quantity'
                id='quantity'
                placeholder='От 1 до 1000'
                min='1'
                max='1000'
                valid={!Boolean(error.quantity)}
                value={form.quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, quantity: e.target.value })
                }
              />
              <div
                className={
                  error.quantity ? `${s.error}` : `${s.error} ${s.hidden}`
                }
              >
                {error.quantity}
              </div>
            </div>
            <div className={s.searchItem}>
              <label htmlFor='date'>
                Диапазон поиска <sup>*</sup>
              </label>
              <div className={s.dateBlock}>
                <Input
                  type='date'
                  name='firstDate'
                  id='date'
                  placeholder='Дата начала'
                  valid={!Boolean(error.date)}
                  value={form.firstDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, firstDate: e.target.value })
                  }
                />
                <Input
                  type='date'
                  name='lastDate'
                  id='date'
                  placeholder='Дата конца'
                  valid={!Boolean(error.date)}
                  value={form.lastDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, lastDate: e.target.value })
                  }
                />
              </div>

              <div
                className={error.date ? `${s.error}` : `${s.error} ${s.hidden}`}
              >
                {error.date}
              </div>
            </div>
          </div>
          <div className={s.additionalWrapper}>
            <fieldset className={s.additionalBlock}>
              <Input
                type='checkbox'
                id='max-fullness'
                name='maxFullness'
                checked={form.maxFullness}
                onChange={() => {
                  setForm({ ...form, maxFullness: !form.maxFullness })
                }}
              >
                Признак максимальной полноты
              </Input>
              <Input
                type='checkbox'
                id='in-business-news'
                name='inBusinessNews'
                checked={form.inBusinessNews}
                onChange={() => {
                  setForm({ ...form, inBusinessNews: !form.inBusinessNews })
                }}
              >
                Упоминания в бизнес-контексте
              </Input>
              <Input
                type='checkbox'
                id='main-role'
                name='onlyMainRole'
                checked={form.onlyMainRole}
                onChange={() => {
                  setForm({ ...form, onlyMainRole: !form.onlyMainRole })
                }}
              >
                Главная роль в публикации
              </Input>
              <Input
                type='checkbox'
                id='risk-factors'
                name='onlyWithRiskFactors'
                checked={form.onlyWithRiskFactors}
                onChange={() => {
                  setForm({
                    ...form,
                    onlyWithRiskFactors: !form.onlyWithRiskFactors,
                  })
                }}
              >
                Публикации только с риск-факторами
              </Input>
              <Input
                type='checkbox'
                id='tech-news'
                name='excludeTechNews'
                checked={form.excludeTechNews}
                onChange={() => {
                  setForm({
                    ...form,
                    excludeTechNews: !form.excludeTechNews,
                  })
                }}
              >
                Включать технические новости рынков
              </Input>
              <Input
                type='checkbox'
                id='announcements'
                name='excludeAnnouncements'
                checked={form.excludeAnnouncements}
                onChange={() => {
                  setForm({
                    ...form,
                    excludeAnnouncements: !form.excludeAnnouncements,
                  })
                }}
              >
                Включать анонсы и календари
              </Input>
              <Input
                type='checkbox'
                id='digest'
                name='excludeDigests'
                checked={form.excludeDigests}
                onChange={() => {
                  setForm({
                    ...form,
                    excludeDigests: !form.excludeDigests,
                  })
                }}
              >
                Включать сводки новостей
              </Input>
            </fieldset>
            <div className={s.additionalControls}>
              <Button className={s.searchButton} disabled={isDisabled}>
                Поиск
              </Button>
              <p className={s.formDescription}>
                * Обязательные к заполнению поля
              </p>
            </div>
          </div>
        </form>

        <div className={s.aside}>
          <img
            className={s.bgImage}
            src={bgImage}
            alt=''
            width={442}
            height={470}
          />
        </div>
      </div>
    </div>
  )
}

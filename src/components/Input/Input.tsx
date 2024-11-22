import { ChangeEvent } from 'react'
import s from './input.module.scss'

interface IInput {
  className?: string
  type: 'text' | 'password' | 'number' | 'date' | 'checkbox'
  name: string
  id: string
  placeholder?: string
  min?: string
  max?: string
  isRequired?: boolean
  value?: string
  children?: string
  checked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  valid?: boolean
}

export const Input = ({
  className = '',
  type,
  name,
  id,
  placeholder,
  min,
  max,
  isRequired,
  value,
  children,
  checked,
  onChange,
  valid,
}: IInput): JSX.Element => {
  if (type === 'checkbox') {
    return (
      <div className={s.inner}>
        <input
          className={s.checkbox}
          type={type}
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label className={s.label} htmlFor={id}>
          {children}
        </label>
      </div>
    )
  }

  return (
    <input
      className={valid ? `${s.input} ${className}` : `${s.input} ${s.invalid}`}
      type={type}
      name={name}
      value={value}
      id={id}
      placeholder={placeholder}
      min={min}
      max={max}
      required={isRequired}
      onChange={onChange}
    />
  )
}

import s from './button.module.scss'

interface IButton {
  className?: string
  children: string | JSX.Element
  type?: 'submit'
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  className,
  type,
  disabled = false,
  onClick,
  children,
}: IButton) => {
  return (
    <button
      className={`${s.button} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

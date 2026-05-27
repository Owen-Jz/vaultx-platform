'use client'
import { cn } from './cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
  containerClassName?: string
}

export default function Input({
  label,
  error,
  helper,
  containerClassName,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-secondary mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-3 bg-bg-elevated border border-border-default rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-colors',
          error &&
            'border-status-danger focus:border-status-danger focus:ring-status-danger',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-status-danger">{error}</p>
      )}
      {!error && helper && (
        <p className="mt-1.5 text-xs text-text-muted">{helper}</p>
      )}
    </div>
  )
}

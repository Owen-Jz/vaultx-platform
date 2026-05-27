'use client'
import { cn } from './cn'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent-gold text-bg-primary font-semibold hover:bg-accent-gold-light active:bg-accent-gold-dark',
  secondary:
    'border border-accent-gold text-accent-gold hover:bg-accent-gold/10',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
  danger:
    'bg-status-danger/10 text-status-danger border border-status-danger/30 hover:bg-status-danger/20',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-5 py-2.5 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      {children}
    </button>
  )
}

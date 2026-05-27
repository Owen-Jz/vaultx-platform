import { cn } from './cn'

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'pending'
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  success: 'bg-status-success/10 text-status-success',
  warning: 'bg-status-warning/10 text-status-warning',
  danger: 'bg-status-danger/10 text-status-danger',
  info: 'bg-blue-500/10 text-blue-400',
  pending: 'bg-accent-gold/10 text-accent-gold',
  default: 'bg-bg-elevated text-text-secondary',
}

export default function Badge({
  variant = 'default',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

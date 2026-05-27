import { cn } from './cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'gold'
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-bg-card border border-border-default rounded-xl shadow-card',
  elevated: 'bg-bg-elevated border border-border-default rounded-xl shadow-elevated',
  gold: 'bg-bg-card border border-accent-gold/30 rounded-xl shadow-glow',
}

export default function Card({
  variant = 'default',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(variantStyles[variant], 'p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

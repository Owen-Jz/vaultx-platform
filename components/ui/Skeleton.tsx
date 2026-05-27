import { cn } from './cn'

interface SkeletonProps {
  className?: string
  count?: number
}

export default function Skeleton({ className, count = 1 }: SkeletonProps) {
  if (count > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn('animate-pulse bg-bg-elevated rounded', className)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('animate-pulse bg-bg-elevated rounded', className)} />
  )
}

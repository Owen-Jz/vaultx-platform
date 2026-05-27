'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from './cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg'
}

const maxWidthStyles: Record<NonNullable<ModalProps['maxWidth']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null
  if (typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={cn(
          'relative bg-bg-elevated border border-border-default rounded-2xl shadow-elevated w-full',
          maxWidthStyles[maxWidth],
        )}
      >
        {/* Header */}
        {(title || true) && (
          <div className="flex items-center justify-between p-6 pb-4">
            {title && (
              <h2 className="text-lg font-semibold text-text-primary font-display">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="ml-auto text-text-muted hover:text-text-primary transition-colors rounded-lg p-1 hover:bg-bg-card"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

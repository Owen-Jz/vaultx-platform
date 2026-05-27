'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import DepositModal from '@/components/features/DepositModal'
import { ArrowDownCircle } from 'lucide-react'

export default function DepositPageClient() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="primary"
        size="md"
        onClick={() => setOpen(true)}
      >
        <ArrowDownCircle className="w-4 h-4 mr-1.5" />
        New Deposit
      </Button>
      <DepositModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

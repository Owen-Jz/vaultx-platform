'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import WithdrawModal from '@/components/features/WithdrawModal'
import { ArrowUpCircle } from 'lucide-react'

export default function WithdrawPageClient() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="primary"
        size="md"
        onClick={() => setOpen(true)}
      >
        <ArrowUpCircle className="w-4 h-4 mr-1.5" />
        New Withdrawal
      </Button>
      <WithdrawModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

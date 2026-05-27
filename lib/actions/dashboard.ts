'use server'

import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import Stats from '@/lib/models/Stats'
import Deposit, { IDeposit } from '@/lib/models/Deposit'
import Withdrawal, { IWithdrawal } from '@/lib/models/Withdrawal'
import { getAuthUser } from '@/lib/getAuthUser'
import { DepositSchema, WithdrawSchema, UpdateSettingsSchema } from '@/lib/validations'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

// ---------------------------------------------------------------------------
// getUserStats
// ---------------------------------------------------------------------------
export async function getUserStats(): Promise<Record<string, unknown> | null> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats = await Stats.findOne({ userId: user._id as any }).lean()
  if (!stats) return null

  return JSON.parse(JSON.stringify(stats))
}

// ---------------------------------------------------------------------------
// getUserDeposits
// ---------------------------------------------------------------------------
export async function getUserDeposits(): Promise<Record<string, unknown>[]> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deposits = await Deposit.find({ userId: user._id as any })
    .sort({ createdAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(deposits))
}

// ---------------------------------------------------------------------------
// getUserWithdrawals
// ---------------------------------------------------------------------------
export async function getUserWithdrawals(): Promise<Record<string, unknown>[]> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withdrawals = await Withdrawal.find({ userId: user._id as any })
    .sort({ createdAt: -1 })
    .lean()

  return JSON.parse(JSON.stringify(withdrawals))
}

// ---------------------------------------------------------------------------
// getFullName
// ---------------------------------------------------------------------------
export async function getFullName(): Promise<string | null> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUser = await User.findById(user._id as any).lean() as any
  if (!dbUser) return null
  const fullName = [dbUser.fname, dbUser.lname].filter(Boolean).join(' ')
  return fullName || null
}

// ---------------------------------------------------------------------------
// requestDeposit
// ---------------------------------------------------------------------------
export async function requestDeposit(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const raw = {
    crypto: formData.get('crypto'),
    amount: formData.get('amount'),
  }

  const parsed = DepositSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
    return { success: false, error: firstError }
  }

  const { crypto, amount } = parsed.data

  await Deposit.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: user._id as any,
    crypto,
    amount,
    total: amount,
    status: 'pending',
    type: 'deposit',
  })

  revalidatePath('/dashboard')
  return { success: true }
}

// ---------------------------------------------------------------------------
// requestWithdrawal
// ---------------------------------------------------------------------------
export async function requestWithdrawal(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const raw = {
    crypto: formData.get('crypto'),
    amount: formData.get('amount'),
    walletAddress: formData.get('walletAddress'),
  }

  const parsed = WithdrawSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
    return { success: false, error: firstError }
  }

  const { crypto, amount, walletAddress } = parsed.data

  // Check user has sufficient balance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stats = await Stats.findOne({ userId: user._id as any }).lean() as any
  const balance = (stats?.total ?? 0) as number
  if (balance < amount) {
    return { success: false, error: 'Insufficient balance' }
  }

  await Withdrawal.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: user._id as any,
    crypto,
    amount,
    total: amount,
    status: 'pending',
    walletAddress,
  })

  revalidatePath('/dashboard')
  return { success: true }
}

// ---------------------------------------------------------------------------
// fetchUserSettings
// ---------------------------------------------------------------------------
export async function fetchUserSettings(): Promise<{
  fname: string
  lname: string
  email: string
} | null> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUser = await User.findById(user._id as any).select('fname lname email').lean() as any
  if (!dbUser) return null
  return { fname: dbUser.fname ?? '', lname: dbUser.lname ?? '', email: dbUser.email ?? '' }
}

// ---------------------------------------------------------------------------
// updateUserSettings
// ---------------------------------------------------------------------------
export async function updateUserSettings(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await connectDB()
  const user = await getAuthUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const raw = {
    fname: formData.get('fname'),
    email: formData.get('email'),
    password: formData.get('password') || undefined,
  }

  const parsed = UpdateSettingsSchema.safeParse(raw)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
    return { success: false, error: firstError }
  }

  const { fname, email, password } = parsed.data
  const updateFields: Record<string, unknown> = { fname, email }
  if (password) {
    updateFields.password = await bcrypt.hash(password, 10)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await User.findByIdAndUpdate(user._id as any, { $set: updateFields })

  revalidatePath('/dashboard/settings')
  return { success: true }
}

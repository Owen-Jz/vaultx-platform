'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import Stats from '@/lib/models/Stats'
import Deposit from '@/lib/models/Deposit'
import Withdrawal from '@/lib/models/Withdrawal'

export async function adminLogin(prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    ;(await cookies()).set('adminLoggedIn', 'true', {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    })
    return { success: true }
  }

  return { error: 'Invalid credentials' }
}

export async function adminLogout() {
  ;(await cookies()).delete('adminLoggedIn')
  redirect('/admin')
}

export async function getAllUsers() {
  await connectDB()

  const users = await User.find({}).lean()
  const statsArr = await Stats.find({}).lean()

  const statsMap = new Map(
    statsArr.map((s: any) => [s.userId.toString(), s])
  )

  const result = users.map((user: any) => {
    const stats = statsMap.get(user._id.toString()) || null
    return { user, stats }
  })

  return JSON.parse(JSON.stringify(result))
}

export async function getAllDeposits() {
  await connectDB()

  const deposits = await Deposit.find({}).sort({ date: -1 }).lean()
  const users = await User.find({}).lean()

  const userMap = new Map(
    users.map((u: any) => [
      u._id.toString(),
      { name: `${u.fname} ${u.lname}`.trim(), email: u.email },
    ])
  )

  const result = deposits.map((deposit: any) => {
    const userInfo = userMap.get(deposit.userId.toString()) || {
      name: 'Unknown',
      email: 'N/A',
    }
    return {
      ...deposit,
      userName: userInfo.name,
      userEmail: userInfo.email,
    }
  })

  return JSON.parse(JSON.stringify(result))
}

export async function getAllWithdrawals() {
  await connectDB()

  const withdrawals = await Withdrawal.find({}).sort({ date: -1 }).lean()
  const users = await User.find({}).lean()

  const userMap = new Map(
    users.map((u: any) => [
      u._id.toString(),
      { name: `${u.fname} ${u.lname}`.trim(), email: u.email },
    ])
  )

  const result = withdrawals.map((withdrawal: any) => {
    const userInfo = userMap.get(withdrawal.userId.toString()) || {
      name: 'Unknown',
      email: 'N/A',
    }
    return {
      ...withdrawal,
      userName: userInfo.name,
      userEmail: userInfo.email,
    }
  })

  return JSON.parse(JSON.stringify(result))
}

export async function approveDeposit(depositId: string) {
  await connectDB()

  const deposit = await Deposit.findById(depositId)
  if (!deposit) return { error: 'Deposit not found' }

  deposit.status = 'approved'
  await deposit.save()

  let stats = await Stats.findOne({ userId: deposit.userId })
  if (stats) {
    stats.total = (stats.total || 0) + (deposit.total || 0)
    stats.btc = (stats.btc || 0) + (deposit.amount || 0)
    await stats.save()
  } else {
    await Stats.create({
      userId: deposit.userId,
      total: deposit.total || 0,
      btc: deposit.amount || 0,
      profit: 0,
    })
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function approveWithdrawal(withdrawalId: string) {
  await connectDB()

  const withdrawal = await Withdrawal.findById(withdrawalId)
  if (!withdrawal) return { error: 'Withdrawal not found' }

  withdrawal.status = 'approved'
  await withdrawal.save()

  const stats = await Stats.findOne({ userId: withdrawal.userId })
  if (stats) {
    stats.total = Math.max(0, (stats.total || 0) - (withdrawal.total || 0))
    await stats.save()
  }

  revalidatePath('/admin')
  revalidatePath('/dashboard')
  return { success: true }
}

export async function rejectDeposit(depositId: string) {
  await connectDB()
  const deposit = await Deposit.findById(depositId)
  if (!deposit) return { error: 'Deposit not found' }
  deposit.status = 'rejected'
  await deposit.save()
  revalidatePath('/admin')
  return { success: true }
}

export async function rejectWithdrawal(withdrawalId: string) {
  await connectDB()
  const withdrawal = await Withdrawal.findById(withdrawalId)
  if (!withdrawal) return { error: 'Withdrawal not found' }
  withdrawal.status = 'rejected'
  await withdrawal.save()
  revalidatePath('/admin')
  return { success: true }
}

export async function updateUserStats(
  userId: string,
  data: { profit?: number; btc?: number; total?: number }
) {
  await connectDB()

  await Stats.findOneAndUpdate(
    { userId },
    {
      $set: {
        ...(data.profit !== undefined && { profit: data.profit }),
        ...(data.btc !== undefined && { btc: data.btc }),
        ...(data.total !== undefined && { total: data.total }),
      },
    },
    { upsert: true, new: true }
  )

  revalidatePath('/admin')
  return { success: true }
}

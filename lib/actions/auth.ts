'use server'

import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'
import Stats from '@/lib/models/Stats'
import Deposit from '@/lib/models/Deposit'
import { RegisterSchema, LoginSchema } from '@/lib/validations'
import { createSession, deleteSession } from '@/lib/sessions'

export async function register(prevState: unknown, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    fname: formData.get('fname'),
    lname: formData.get('lname'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { fname, lname, email, password } = validatedFields.data

  await connectDB()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return {
      error: { email: ['Email already registered'] },
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
  })

  await Stats.create({
    userId: user._id,
    profit: 0,
    btc: 100 / 65000,
    total: 100,
  })

  await Deposit.create({
    userId: user._id,
    crypto: 'USD',
    amount: 100,
    total: 100,
    status: 'approved',
    type: 'signup_bonus',
  })

  await createSession(user._id.toString())

  redirect('/dashboard')
}

export async function login(prevState: unknown, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  await connectDB()

  const user = await User.findOne({ email })
  if (!user) {
    return {
      error: { email: ['No account found'] },
    }
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return {
      error: { password: ['Incorrect password'] },
    }
  }

  await createSession(user._id.toString())

  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/auth/login')
}

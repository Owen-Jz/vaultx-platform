'use server'
import { getSessionPayload } from './sessions'
import { connectDB } from './db'
import User, { IUser } from './models/User'

export async function getAuthUser(): Promise<IUser | null> {
  const payload = await getSessionPayload()
  if (!payload?.userId) return null

  await connectDB()
  const user = await User.findById(payload.userId as string).lean()
  return user as IUser | null
}

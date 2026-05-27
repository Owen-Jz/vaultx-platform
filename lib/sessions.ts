import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.SESSION_SECRET!
const key = new TextEncoder().encode(SESSION_SECRET)
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

export async function encrypt(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + EXPIRY_MS))
    .sign(key)
}

export async function decrypt(session: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] })
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + EXPIRY_MS)
  const token = await encrypt({ userId, expiresAt: expiresAt.toISOString() })
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function getSessionPayload(): Promise<Record<string, unknown> | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null
  return decrypt(token)
}

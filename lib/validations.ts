import { z } from 'zod'

export const RegisterSchema = z.object({
  fname: z.string().min(3, 'First name must be at least 3 characters'),
  lname: z.string().min(3, 'Last name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters')
    .regex(/[a-zA-Z]/, 'Password must contain a letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const UpdateSettingsSchema = z.object({
  fname: z.string().min(3, 'First name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
})

export const DepositSchema = z.object({
  crypto: z.string().min(1, 'Select a cryptocurrency'),
  amount: z.coerce.number().min(10, 'Minimum deposit is $10'),
})

export const WithdrawSchema = z.object({
  crypto: z.string().min(1, 'Select a cryptocurrency'),
  amount: z.coerce.number().min(10, 'Minimum withdrawal is $10'),
  walletAddress: z.string().min(10, 'Enter a valid wallet address'),
})

export const AdminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type UpdateSettingsInput = z.infer<typeof UpdateSettingsSchema>
export type DepositInput = z.infer<typeof DepositSchema>
export type WithdrawInput = z.infer<typeof WithdrawSchema>

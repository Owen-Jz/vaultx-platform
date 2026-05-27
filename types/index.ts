export interface User {
  _id: string
  fname: string
  lname: string
  email: string
  password: string
  date_joined: Date
  role?: string
}

export interface Stats {
  _id: string
  userId: string
  profit: number
  btc: number
  total: number
  createdAt: Date
}

export type TxStatus = 'pending' | 'approved' | 'rejected'

export interface Deposit {
  _id: string
  userId: string
  crypto: string
  amount: number
  total: number
  status: TxStatus
  date: Date
  type: string
}

export interface Withdrawal {
  _id: string
  userId: string
  crypto: string
  amount: number
  total: number
  status: TxStatus
  date: Date
  walletAddress: string
}

export interface AdminUser extends User {
  stats?: Stats
}

export interface DashboardData {
  user: User
  stats: Stats
  deposits: Deposit[]
  withdrawals: Withdrawal[]
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string | Record<string, string[]> }

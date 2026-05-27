import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IWithdrawal extends Document {
  userId: Types.ObjectId
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: Date
  walletAddress: string
}

const WithdrawalSchema = new Schema<IWithdrawal>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crypto: { type: String, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now },
  walletAddress: { type: String, required: true },
})

const Withdrawal: Model<IWithdrawal> =
  mongoose.models.Withdrawal ||
  mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema)

export default Withdrawal

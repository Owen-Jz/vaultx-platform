import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IDeposit extends Document {
  userId: Types.ObjectId
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: Date
  type: string
}

const DepositSchema = new Schema<IDeposit>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crypto: { type: String, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now },
  type: { type: String, default: 'deposit' },
})

const Deposit: Model<IDeposit> =
  mongoose.models.Deposit || mongoose.model<IDeposit>('Deposit', DepositSchema)

export default Deposit

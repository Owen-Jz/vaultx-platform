import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IStats extends Document {
  userId: Types.ObjectId
  profit: number
  btc: number
  total: number
  createdAt: Date
}

const StatsSchema = new Schema<IStats>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profit: { type: Number, default: 0 },
    btc: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Stats: Model<IStats> =
  mongoose.models.Stats || mongoose.model<IStats>('Stats', StatsSchema)

export default Stats

import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  fname: string
  lname: string
  email: string
  password: string
  date_joined: Date
  role?: string
}

const UserSchema = new Schema<IUser>({
  fname: { type: String, required: true, trim: true },
  lname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  date_joined: { type: Date, default: Date.now },
  role: { type: String, default: 'user' },
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User

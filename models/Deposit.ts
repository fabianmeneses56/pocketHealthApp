import mongoose, { Schema, model, Model } from 'mongoose'

export interface IDeposit {
  amount: number
  detail: string
}

interface IDepositId extends IDeposit {
  _id?: string
}
const depositSchema = new Schema({
  detail: { type: String, required: false },
  amount: { type: Number, required: true },
  month: { type: String, required: true }
})

const Deposit: Model<IDepositId> =
  mongoose.models.Deposit || model('Deposit', depositSchema)

export default Deposit

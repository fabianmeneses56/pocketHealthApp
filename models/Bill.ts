import mongoose, { Schema, model, Model } from 'mongoose'

import { IBill } from '@/interfaces/bill'

const billSchema = new Schema({
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  date: { type: Date, required: true },
  detail: { type: String, required: false },
  amount: { type: String, required: true },
  month: { type: String, required: true }
})

const Bill: Model<IBill> = mongoose.models.Bill || model('Bill', billSchema)

export default Bill

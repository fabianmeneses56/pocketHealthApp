import mongoose, { Schema, model, Model } from 'mongoose'

import { ICategory } from '@/interfaces/categories'

const categorySchema = new Schema({
  title: { type: String, required: true },
  subcategories: [
    {
      title: { type: String, required: true }
    }
  ]
})

const Category: Model<ICategory> =
  mongoose.models.Category || model('Category', categorySchema)
export default Category

import { db } from '.'

import { Category } from '@/models'

export const getAllCategories = async () => {
  await db.connect()

  const categories = await Category.find().lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(categories))
}

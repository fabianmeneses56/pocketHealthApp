import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { Category } from '@/models'
import { Bill } from '@/models'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getGeneralReport(req, res)
    case 'POST':
      return getMonthReport(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getGeneralReport = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect()

  const categories = await Category.find().lean()
  const bills = await Bill.find({}).lean()

  const responseT = categories.map(category => {
    return bills.filter(bill => bill.category === category.title)
  })

  const categoriesMap = categories.map(res => res.title)

  const amounts = responseT.map(res => {
    if (res.length > 0) {
      const sum = res.reduce((acc, curr) => {
        return acc + Number(curr.amount.replace(',', ''))
      }, 0)

      return sum
    }
    return 0
  })
  await db.disconnect()
  return res.status(201).json({ amounts, categories: categoriesMap })
}

const getMonthReport = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month } = req.body

  await db.connect()

  const categories = await Category.find().lean()
  const bills = await Bill.find({ month }).lean()

  const responseT = categories.map(category => {
    return bills.filter(bill => bill.category === category.title)
  })

  const categoriesMap = categories.map(res => res.title)

  const amounts = responseT.map(res => {
    if (res.length > 0) {
      const sum = res.reduce((acc, curr) => {
        return acc + Number(curr.amount.replace(/,/g, ''))
      }, 0)

      return sum
    }
    return 0
  })

  await db.disconnect()
  return res.status(201).json({ amounts, categories: categoriesMap })
}

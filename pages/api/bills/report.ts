import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { Category } from '@/models'
import { Bill } from '@/models'
import { IBill } from '@/interfaces/bill'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return getGeneralReport(req, res)

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

  const categories2 = categories.map(res => res.title)

  const otro = responseT.map(res => {
    if (res.length > 0) {
      const sum = res.reduce((acc, curr) => {
        return acc + Number(curr.amount.replace(',', ''))
      }, 0)

      return sum
    } else {
      return 0
    }
  })

  return res.status(201).json({ amounts: otro, categories: categories2 })
}

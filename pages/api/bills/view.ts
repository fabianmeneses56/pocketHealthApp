import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IBill } from '@/interfaces/bill'
import { Bill } from '@/models'

type Data =
  | { message?: string; summaryMonth?: number; bills?: IBill[] }
  | IBill[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return getBillsByMonth(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getBillsByMonth = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { month } = req.body
  await db.connect()

  try {
    const bills = await Bill.find({ month }).lean()

    const currencyFormat = bills.map(res => {
      if (res.amount.includes(',')) {
        return Number(res.amount.replace(',', ''))
      } else {
        return Number(res.amount)
      }
    })
    const summaryMonth = currencyFormat.reduce(
      (prev, current) => prev + current,
      0
    )

    await db.disconnect()
    return res.status(201).json({ bills, summaryMonth })
  } catch (error: any) {
    await db.disconnect()

    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }
}

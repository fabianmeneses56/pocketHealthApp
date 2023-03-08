import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IBill } from '@/interfaces/bill'
import { Bill } from '@/models'

type Data = { message: string } | IBill[]

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

    await db.disconnect()
    return res.status(201).json(bills)
  } catch (error: any) {
    await db.disconnect()

    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database'
import { IBill } from '@/interfaces/bill'
import { Bill } from '@/models'

type Data = { message: string } | IBill

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body as IBill

  try {
    const newBill = new Bill({
      ...req.body
    })

    await newBill.save()
    await db.disconnect()

    return res.status(201).json(newBill)
  } catch (error: any) {
    await db.disconnect()
    console.log(error)
    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }

  //   return res.status(201).json(req.body)
}

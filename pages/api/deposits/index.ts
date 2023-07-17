import { db } from '@/database'
import { Deposit } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getAllDeposits(req, res)
    case 'POST':
      return newDeposit(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const newDeposit = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  await db.connect()

  console.log(req.url)

  try {
    const newDeposit = new Deposit({
      ...req.body
    })

    await newDeposit.save()
    await db.disconnect()

    return res.status(201).json(newDeposit)
  } catch (error: any) {
    await db.disconnect()

    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }
}
const getAllDeposits = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect()

  try {
    const deposits = await Deposit.find().lean()

    const depositsValueMap = deposits
      .map(deposit => deposit.amount)
      .reduce((acc, curr) => {
        return acc + Number(curr)
      }, 0)

    await db.disconnect()

    return res.status(201).json({ totalDeposits: depositsValueMap })
  } catch (error: any) {
    await db.disconnect()

    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }
}

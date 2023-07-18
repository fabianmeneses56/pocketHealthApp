import { db } from '@/database'
import { Deposit } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getDepositsByMonth(req, res)
    case 'POST':
      return newDeposit(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const newDeposit = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  await db.connect()
  const { month } = req.query

  try {
    const newDeposit = new Deposit({
      ...req.body,
      month
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
const getDepositsByMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { month } = req.query

  await db.connect()

  try {
    const deposits = await Deposit.find({ month }).lean()

    const depositsValueMap = deposits
      .map(deposit => deposit.amount)
      .reduce((acc, curr) => {
        return acc + Number(curr)
      }, 0)

    await db.disconnect()

    return res.status(201).json({ totalDeposits: depositsValueMap, deposits })
  } catch (error: any) {
    await db.disconnect()

    res.status(400).json({
      message: error.message || 'Revise logs del servidor'
    })
  }
}

import { IBill } from '@/interfaces/bill'
import { Bill } from '@/models'
import { db } from '.'

export const getBillByMonth = async (month: string): Promise<IBill[]> => {
  await db.connect()

  const bills = await Bill.find({ month }).lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(bills))
}

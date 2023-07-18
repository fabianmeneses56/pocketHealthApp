import { useState, useEffect } from 'react'

import { pocketApi } from '@/api'
import { IPieReport } from '@/interfaces/report'
interface reqa {
  month: string
}

export const useHome = (month: string) => {
  const [getReportState, setGetReportState] = useState<IPieReport>({
    amounts: [],
    categories: []
  })

  const [getDepositSum, setGetDepositSum] = useState({ totalDeposits: 0 })

  const body: reqa = {
    month
  }

  const getReport = async () => {
    const { data } = await pocketApi.post('/bills/report', body)
    const { data: DepositsData } = await pocketApi.get(`/deposits/${month}`)

    setGetDepositSum(DepositsData.totalDeposits)
    setGetReportState(data)
  }
  useEffect(() => {
    getReport()
  }, [])

  return { getReportState, getDepositSum }
}

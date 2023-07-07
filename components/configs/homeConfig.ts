import { useState, useEffect } from 'react'

import { pocketApi } from '@/api'
import { IPieReport } from '@/interfaces/report'

export const useHome = () => {
  const [getReportState, setGetReportState] = useState<IPieReport>({
    amounts: [],
    categories: []
  })

  const getReport = async () => {
    const { data } = await pocketApi.get('/bills/report')
    setGetReportState(data)
  }
  useEffect(() => {
    getReport()
  }, [])

  return { getReportState }
}

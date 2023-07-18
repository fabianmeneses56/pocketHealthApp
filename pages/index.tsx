import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  CardActionArea
} from '@mui/material'
import { HiDocument, HiCreditCard, HiCalendar } from 'react-icons/hi'
import { FaPiggyBank, FaMoneyBillWave, FaTicketAlt } from 'react-icons/fa'
import { BsPlusCircleFill } from 'react-icons/bs'

import { monthNames } from '@/utils/months'
import Report from '@/components/ui/report'
import { useHome } from '@/components/configs/homeConfig'
import { IPieReport } from '@/interfaces/report'
import { pocketApi } from '@/api'

interface reqa {
  month: string
}

export const useHandleData = (month: string) => {
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

const Home: NextPage = () => {
  const monthName = monthNames[new Date().getMonth()]
  // const { getReportState, getDepositSum } = useHandleData(monthName)
  const { getReportState, getDepositSum } = useHome(monthName)
  const summaryMonth = getReportState.amounts.reduce(
    (prev, current) => prev + current,
    0
  )

  return (
    <>
      <Head>
        <title>Pocket Health App</title>
        <meta name='description' content='Pocket Health App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-row'>
        <section className='h-screen w-1/5 bg-[#FFFFFF] px-3 flex flex-col items-center'>
          <header className='mt-4'>
            <h1 className='text-xl font-semibold '>🪙Pocket Health App</h1>
          </header>
          <div className='mt-10'>
            <NextLink legacyBehavior href={`/`}>
              <Link className='cursor-pointer no-underline'>
                <div className='flex gap-3 my-4'>
                  <div className='border rounded-lg p-1 flex items-center'>
                    <HiCreditCard size='1em' color='#ecb651' />
                  </div>
                  <h1 className='text-2xl font-normal text-black no-underline'>
                    Presupuesto
                  </h1>
                </div>
              </Link>
            </NextLink>
            <NextLink legacyBehavior href={`/`}>
              <Link className='cursor-pointer no-underline'>
                <div className='flex gap-3 my-4'>
                  <div className='border rounded-lg p-1 flex items-center'>
                    <HiCreditCard size='1em' color='#ecb651' />
                  </div>
                  <h1 className='text-2xl font-normal text-black no-underline'>
                    Deudas
                  </h1>
                </div>
              </Link>
            </NextLink>

            <NextLink legacyBehavior href={`/months/${monthName}`}>
              <Link className='cursor-pointer no-underline'>
                <div className='flex gap-3 my-4'>
                  <div className='border rounded-lg p-1 flex items-center'>
                    <HiCreditCard size='1em' color='#ecb651' />
                  </div>
                  <h1 className='text-2xl font-normal text-black no-underline'>
                    Calendario
                  </h1>
                </div>
              </Link>
            </NextLink>
          </div>
        </section>
        <section className='w-screen p-8'>
          <h1 className='text-3xl font-bold '>Presupuesto - {monthName}</h1>

          <div className='mt-10 grid grid-cols-2 gap-4 grid-rows-3'>
            <div className='w-full h-36 bg-white flex items-center p-6 gap-6 border  rounded-lg border-t-4  border-t-[#52B481]'>
              <div className='p-3 bg-[#D9F8E6] rounded-lg'>
                <FaMoneyBillWave size='1.5em' color='#52B481' />
              </div>
              <div>
                <h1 className='text-base font-normal'>Total de ingresos</h1>
                <h1 className='text-4xl font-semibold'>
                  ${getDepositSum.toLocaleString()}
                </h1>
              </div>
            </div>
            <div className='w-full h-full row-span-2 p-6 bg-white border rounded-lg'>
              <Report dataPie={getReportState} />
            </div>

            <div className='w-full h-36 flex items-center p-6 gap-6 bg-white border rounded-lg border-t-4  border-t-[#C956E7]'>
              <div className='p-3 bg-[#F6E9FD] rounded-lg'>
                <FaTicketAlt size='1.5em' color='#C956E7' />
              </div>
              <div>
                <h1 className='text-base font-normal'>Total de gastos</h1>
                <h1 className='text-4xl font-semibold'>
                  ${summaryMonth.toLocaleString()}
                </h1>
              </div>
            </div>
            <div className='w-full h-full p-6 flex flex-col bg-white border rounded-lg'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-bold '>Ingresos Mensuales</h1>
                <div className='p-2 bg-[#FCF2CE] rounded-lg'>
                  <BsPlusCircleFill size='1em' color='#ECA23C' />
                </div>
              </div>
              <div className='flex justify-between mt-6'>
                <h1 className='text-xl font-normal '>sueldo</h1>
                <h1 className='text-xl font-normal '>900.000</h1>
              </div>
            </div>
            <div className='w-full h-full p-6 flex flex-col bg-white border rounded-lg'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-bold'>Gastos Mensuales</h1>
                <div className='p-2 bg-[#FCF2CE] rounded-lg'>
                  <BsPlusCircleFill size='1em' color='#ECA23C' />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex justify-between mt-6 flex-col'>
                  {getReportState.categories.map(category => (
                    <>
                      <h1 className='text-xl font-normal'>{category}</h1>
                    </>
                  ))}
                </div>
                <div className='flex justify-between mt-6 flex-col'>
                  {getReportState.amounts.map(amount => (
                    <>
                      <h1 className='text-xl font-normal'>
                        {amount.toLocaleString()}
                      </h1>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home

import React from 'react'
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

const Home: NextPage = () => {
  const { getReportState } = useHome()

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
            <div className='flex gap-3 items-center my-4'>
              <div className='border rounded-lg p-1'>
                <HiDocument size='1em' color='#ecb651' />
              </div>
              <h1 className='text-2xl font-normal '>Presupuesto</h1>
            </div>
            <div className='flex gap-3 my-4'>
              <div className='border rounded-lg p-1 flex items-center'>
                <HiCreditCard size='1em' color='#ecb651' />
              </div>
              <h1 className='text-2xl font-normal '>Deudas</h1>
            </div>
            <div className='flex gap-3 my-4'>
              <div className='border rounded-lg p-1 flex items-center'>
                <FaPiggyBank size='1em' color='#ecb651' />
              </div>
              <h1 className='text-2xl font-normal '>Ahorro</h1>
            </div>
            <div className='flex gap-3 my-4'>
              <div className='border rounded-lg p-1 flex items-center'>
                <HiCalendar size='1em' color='#ecb651' />
              </div>
              <h1 className='text-2xl font-normal '>Calendario</h1>
            </div>
          </div>
        </section>
        <section className='w-screen p-8'>
          <h1 className='text-3xl font-bold '>Presupuesto</h1>

          <div className='mt-10 grid grid-cols-2 gap-4 grid-rows-3'>
            <div className='w-full h-36 bg-white flex items-center p-6 gap-6 border  rounded-lg border-t-4  border-t-[#52B481]'>
              <div className='p-3 bg-[#D9F8E6] rounded-lg'>
                <FaMoneyBillWave size='1.5em' color='#52B481' />
              </div>
              <div>
                <h1 className='text-base font-normal'>Total de ingresos</h1>
                <h1 className='text-4xl font-semibold'>$500,000</h1>
              </div>
            </div>
            <div className='w-full h-full row-span-2 p-6 bg-white border rounded-lg'>
              <h1 className='text-3xl font-normal '>grafica</h1>
            </div>
            <div className='w-full h-36 flex items-center p-6 gap-6 bg-white border rounded-lg border-t-4  border-t-[#C956E7]'>
              <div className='p-3 bg-[#F6E9FD] rounded-lg'>
                <FaTicketAlt size='1.5em' color='#C956E7' />
              </div>
              <div>
                <h1 className='text-base font-normal'>Total de gastos</h1>
                <h1 className='text-4xl font-semibold'>$500,000</h1>
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
              <div className='flex justify-between mt-6'>
                <h1 className='text-xl font-normal'>mercado</h1>
                <h1 className='text-xl font-normal'>900.000</h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home

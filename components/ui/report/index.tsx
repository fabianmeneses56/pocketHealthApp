import React from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { IPieReport } from '@/interfaces/report'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DivCharts = styled('div')(({ theme }) => ({
  width: '70%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))

const Report = ({ dataPie }: { dataPie: IPieReport }) => {
  const data = {
    labels: dataPie.categories,
    datasets: [
      {
        data: dataPie.amounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(227, 242, 253, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(184, 223, 252, 1)'
        ],
        borderWidth: 1
      }
    ]
  }
  return (
    <div style={{ marginTop: 10, padding: 4 }}>
      <Typography
        // sx={{ fontSize: 25, textDecoration: 'none', padding: 2 }}
        // color='black'
        className='text-2xl font-normal'
      >
        Report
      </Typography>
      <DivCharts>
        <Pie data={data} />
      </DivCharts>
    </div>
  )
}

export default Report

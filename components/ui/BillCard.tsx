import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions
} from '@mui/material'
import dayjs from 'dayjs'

import { handleDeleteCard } from '@/pages/months/monthConfig'
import { IBill } from '@/interfaces/bill'

interface cardProps {
  res: IBill
  getData: () => Promise<void>
}
const BillCard = ({ res, getData }: cardProps) => {
  return (
    <Card
      sx={{
        width: 350,
        backgroundColor: '#DCD7C9',
        margin: '7px 0'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 15, textDecoration: 'none' }} color='black'>
          CATEGORÍA: {res.category}
        </Typography>
        <Typography sx={{ fontSize: 15, textDecoration: 'none' }} color='black'>
          SUBCATEGORÍA: {res.subCategory}
        </Typography>

        <Typography sx={{ fontSize: 15, textDecoration: 'none' }} color='black'>
          FECHA: {dayjs(res.date).format('D/MMM/YY')}
        </Typography>

        <Typography sx={{ fontSize: 15, textDecoration: 'none' }} color='black'>
          DETALLE: {res.detail}
        </Typography>
        <Typography sx={{ fontSize: 15, textDecoration: 'none' }} color='black'>
          IMPORTE: {res.amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          variant='contained'
          style={{
            backgroundColor: '#3F4E4F'
          }}
          onClick={() => handleDeleteCard(res._id, getData)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default BillCard

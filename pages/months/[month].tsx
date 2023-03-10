import React, { Dispatch, useState, SetStateAction, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridRenderCellParams,
  GridRowId
} from '@mui/x-data-grid'

import axios from 'axios'
import { styled } from '@mui/material/styles'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
  Button,
  CardActionArea,
  CardActions
} from '@mui/material'

import { dbBills, dbCategories } from '@/database'
import { IBill } from '@/interfaces/bill'
import DialogComponent from '@/components/ui/DialogComponent'
import { ICategory } from '@/interfaces/categories'
import { pocketApi } from '@/api'

interface Props {
  month: string
  categories: ICategory[]
}

function renderRating(params: GridRenderCellParams<any>) {
  const handleDelete = async () => {
    const test = await pocketApi.delete<IBill>('/bills', {
      data: { id: params.id }
    })
  }

  return (
    <Button variant='contained' color='error' onClick={handleDelete}>
      Delete
    </Button>
  )
}
const columns: GridColDef[] = [
  { field: 'category', headerName: 'CATEGORÍA', width: 250 },
  { field: 'subCategory', headerName: 'SUBCATEGORÍA', width: 250 },
  { field: 'date', headerName: 'FECHA', width: 250 },
  { field: 'detail', headerName: 'DETALLE', width: 250 },
  { field: 'amount', headerName: 'IMPORTE', width: 250 },
  {
    field: '',
    headerName: '',
    width: 250,
    renderCell: renderRating
  }
]

function CustomToolbar(setShowDialog: Dispatch<SetStateAction<boolean>>) {
  return (
    <GridToolbarContainer>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          setShowDialog(true)
        }}
      >
        añadir Gasto
      </Button>
    </GridToolbarContainer>
  )
}

export interface reqa {
  month: string
}
const Root = styled('div')(({ theme }) => ({
  height: 600,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const DivButton = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
const MonthView: NextPage<Props> = ({ month, categories }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [dataMonth, setDataMonth] = useState<IBill[]>([])

  const body: reqa = {
    month: month
  }
  const request = async () => {
    try {
      const { data } = await pocketApi.post<IBill[]>('/bills/view', body)

      return {
        hasError: false,
        message: data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      return {
        hasError: true,
        message: 'Error no controlado, hable con el administrador'
      }
    }
  }

  const test = async () => {
    const { message } = await request()
    setDataMonth(message)
  }
  useEffect(() => {
    test()
  }, [])

  const rows = dataMonth?.map(res => ({
    id: res._id,
    ...res
  }))

  const handleDeleteCard = async (id: string | undefined) => {
    const test = await pocketApi.delete<IBill>('/bills', {
      data: { id: id }
    })
  }
  return (
    <div style={{ width: '100%', backgroundColor: '#b1b1b1' }}>
      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        categories={categories}
        reloadFunction={test}
      />
      <DivButton>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            setShowDialog(true)
          }}
        >
          añadir Gasto
        </Button>

        {rows.map(res => (
          <Card
            key={res.id}
            sx={{
              width: 350,
              backgroundColor: '#9DA2AE',
              margin: '7px 0'
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 15, textDecoration: 'none' }}
                color='black'
              >
                CATEGORÍA:{res.category}
              </Typography>
              <Typography
                sx={{ fontSize: 15, textDecoration: 'none' }}
                color='black'
              >
                SUBCATEGORÍA:{res.subCategory}
              </Typography>

              <Typography
                sx={{ fontSize: 15, textDecoration: 'none' }}
                color='black'
              >
                FECHA:{String(res.date)}
              </Typography>

              <Typography
                sx={{ fontSize: 15, textDecoration: 'none' }}
                color='black'
              >
                DETALLE:{res.detail}
              </Typography>
              <Typography
                sx={{ fontSize: 15, textDecoration: 'none' }}
                color='black'
              >
                IMPORTE:{res.amount}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                variant='contained'
                color='error'
                onClick={() => handleDeleteCard(res._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </DivButton>
      <Root>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: () => CustomToolbar(setShowDialog)
          }}
        />
      </Root>
    </div>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const { month = '' } = query

  const categories = await dbCategories.getAllCategories()
  return {
    props: {
      month,
      categories
    }
  }
}

export default MonthView
